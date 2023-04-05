import { ChangeEvent, FormEvent, useState } from "react";
import { useConfigContext } from "../services/configContext";
import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiSearchInput,
  VuiLink,
  VuiSpacer,
  VuiTitle,
  VuiTextColor,
} from "../ui";

type Props = {
  searchValue?: string;
  setSearchValue: (searchValue: string | undefined) => void;
  onSearch: (searchValue?: string) => void;
};

export const Header = ({ searchValue, setSearchValue, onSearch }: Props) => {
  const {
    REACT_APP_search_title_pre,
    REACT_APP_search_title_inner,
    REACT_APP_search_title_post,
    REACT_APP_search_title_url,
  } = useConfigContext();

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="header">
      <VuiFlexContainer alignItems="center" justifyContent="spaceBetween">
        <VuiFlexItem grow={0}>
          <a
            href="/"
          >
            <img src="img/logo.png" alt="Vectara logo" height="20" />
          </a>
        </VuiFlexItem>

        <VuiFlexItem grow={1}>
          <VuiTitle size="xs" align="right">
            <VuiTextColor color="subdued">
              <h1>
                {REACT_APP_search_title_pre}{" "}
                <VuiLink
                  target="_blank"
                  href={REACT_APP_search_title_url ?? ""}
                >
                  {REACT_APP_search_title_inner}
                </VuiLink>{" "}
                {REACT_APP_search_title_post}
              </h1>
            </VuiTextColor>
          </VuiTitle>
        </VuiFlexItem>
      </VuiFlexContainer>

      <VuiSpacer size="m" />

      <VuiSearchInput
        value={searchValue}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        placeholder="Ask me anything..."
        autoFocus
      />
    </div>
  );
};
