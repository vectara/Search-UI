import { BiMessageCheck } from "react-icons/bi";
import { SearchResponse, SearchResponseDoc, CombinedResults } from "../types/search";
import {
  VuiCallout,
  VuiFlexContainer,
  VuiFlexItem,
  VuiIcon,
  VuiSpacer,
  VuiSpinner,
  VuiTextColor,
  VuiText,
  VuiTitle,
} from "../ui";
import { SearchResult } from "./SearchResult";
var _ = require('underscore');

type Props = {
  isSearching: boolean;
  searchError?: any;
  searchResponse?: SearchResponse;
};

export const SearchResults = ({
  isSearching,
  searchError,
  searchResponse,
}: Props) => {
  if (isSearching) {
    // Loading indicator.
    return (
      <VuiFlexContainer
        className="loadingIndicator"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <VuiSpinner size="xxxl" />

        <VuiSpacer size="m" />

        <VuiTitle size="l" align="center">
          <h2>Searching&hellip;</h2>
        </VuiTitle>
      </VuiFlexContainer>
    );
  }

  if (searchError) {
    // Log for diagnostics.
    console.error(searchError);
    return (
      <VuiCallout
        title="There was an error while searching"
        color="danger"
        headingElement="h2"
      >
        {searchError.message && (
          <VuiText>
            <p>
              <VuiTextColor color="danger">{searchError.message}</VuiTextColor>
            </p>
          </VuiText>
        )}
      </VuiCallout>
    );
  }

  var docs: SearchResponseDoc[] = [];
  for (var i = 0; i < searchResponse?.response.length!; i++) {
    var doc_inx: number = Number(searchResponse?.response[i].documentIndex);
    docs[i] = searchResponse!.document[doc_inx];
  }
  var combined: CombinedResults = _.zip(searchResponse?.document, searchResponse?.generated, searchResponse?.response);
  return (
    <>
      <VuiFlexContainer spacing="xs" alignItems="center">
        <VuiFlexItem>
          <VuiIcon iconElement={BiMessageCheck} size={20} color="success" />
        </VuiFlexItem>
        <VuiFlexItem>
          <VuiText size="s">
            <p>
              <VuiTextColor color="success">
                {searchResponse?.response?.length} results
              </VuiTextColor>
            </p>
          </VuiText>
        </VuiFlexItem>
      </VuiFlexContainer>
      <VuiSpacer size="l" />
      {combined?.map((values, i) => (
        <SearchResult doc={docs[i]!} gen={searchResponse?.generated[i]!} res={searchResponse?.response[i]!}  position={i} />
      ))}
    </>
  );
};
