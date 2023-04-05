import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.scss";
import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiHorizontalRule,
  VuiSpacer,
  VuiSpinner,
} from "./ui";
import { SearchResponse } from "./types/search";
import { sendSearchRequest } from "./services/sendSearchRequest";
import { Header } from "./components/Header";
import { SearchResults } from "./components/SearchResults";
import { LandingPage } from "./components/LandingPage";
import { useConfigContext } from "./services/configContext";

let searchCount = 0;

export const App = () => {
  const {
    isConfigLoaded,
    REACT_APP_corpus_id,
    REACT_APP_customer_id,
    REACT_APP_auth_api_key,
    REACT_APP_endpoint,
  } = useConfigContext();

  let [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState<string>();

  // Basic search
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<any>();
  const [searchResponse, setSearchResponse] = useState<SearchResponse>();

  // Use the browser back and forward buttons to traverse history
  // of searches.
  useEffect(() => {
    if (isConfigLoaded) {
      const urlParams = new URLSearchParams(searchParams);
      const persistedSearchValue = decodeURIComponent(
        urlParams.get("query") ?? ""
      );

      setSearchValue(persistedSearchValue);
      onSearch(persistedSearchValue, false);
    }
  }, [searchParams]);

  if (!isConfigLoaded) {
    return <VuiSpinner size="xl" />;
  }

  if (
    !REACT_APP_corpus_id ||
    !REACT_APP_customer_id ||
    !REACT_APP_endpoint ||
    !REACT_APP_auth_api_key
  ) {
    return (
      <div>Sorry, there was an error - missing environment variables.</div>
    );
  }

  const onSearch = async (value?: string, isPersistable = true) => {
    const searchId = ++searchCount;

    if (value?.trim()) {
      // Persist to URL.
      if (isPersistable) {
        setSearchParams(
          new URLSearchParams(`?query=${encodeURIComponent(value)}`)
        );
      }

      // First call - only search results - should come back quicky while we wait for summarization
      setIsSearching(true);
      try {
        const response = await sendSearchRequest({
          query_str: value,
          customerId: REACT_APP_customer_id,
          corpusId: REACT_APP_corpus_id,
          endpoint: REACT_APP_endpoint,
          apiKey: REACT_APP_auth_api_key,
        });
        // If we send multiple requests in rapid succession, we only want to
        // display the results of the most recent request.
        if (searchId === searchCount) {
          setIsSearching(false);
          setSearchError(undefined);
          setSearchResponse(response);
        }
      } catch (error) {
        setIsSearching(false);
        setSearchError(error);
        setSearchResponse(undefined);
      }
    } else {
      // Persist to URL.
      if (isPersistable) setSearchParams(new URLSearchParams(""));

      setSearchResponse(undefined);
    }
  };

  const updateSearchValue = (value?: string) => {
    setSearchValue(value);
  };

  let content;

  if (!isSearching && !searchError && !searchResponse) {
    content = (
      <LandingPage onSearch={onSearch} updateSearchValue={updateSearchValue} />
    );
  } else {
    content = (
      <SearchResults
        isSearching={isSearching}
        searchError={searchError}
        searchResponse={searchResponse}
      />
    );
  }

  return (
    <VuiFlexContainer
      className="app"
      direction="column"
      alignItems="center"
      spacing="none"
    >
      <VuiFlexItem className="headerContainer">
        <Header
          searchValue={searchValue}
          setSearchValue={updateSearchValue}
          onSearch={onSearch}
        />
      </VuiFlexItem>

      <VuiHorizontalRule />

      <VuiFlexItem grow={1} className="content">
        <>
          {prompt}
          {content}
        </>
      </VuiFlexItem>
    </VuiFlexContainer>
  );
};
