import { BiMessageEdit } from "react-icons/bi";
import { useConfigContext } from "../services/configContext";
import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiIcon,
  VuiPrompt,
  VuiSpacer,
  VuiTextColor,
  VuiText,
} from "../ui";

type Props = {
  updateSearchValue: (value?: string) => void;
  onSearch: (value?: string, isPersistable?: boolean) => void;
};

export const LandingPage = ({ updateSearchValue, onSearch }: Props) => {
  const { REACT_APP_Q1, REACT_APP_Q2, REACT_APP_Q3, REACT_APP_Q4 } =
    useConfigContext();

  const preparedQueries = [
    REACT_APP_Q1,
    REACT_APP_Q2,
    REACT_APP_Q3,
    REACT_APP_Q4,
  ];

  return (
    <>
      <VuiFlexContainer spacing="xs" alignItems="center">
        <VuiFlexItem>
          <VuiIcon iconElement={BiMessageEdit} size={20} color="accent" />
        </VuiFlexItem>
        <VuiFlexItem>
          <VuiText size="s">
            <p>
              <VuiTextColor color="accent">
                Enter your search above or try one of these.
              </VuiTextColor>
            </p>
          </VuiText>
        </VuiFlexItem>
      </VuiFlexContainer>

      <VuiSpacer size="l" />

      <VuiFlexContainer spacing="m" wrap>
        {preparedQueries.map((preparedQuery) => (
          <VuiFlexItem grow={1}>
            <VuiPrompt
              key={preparedQuery}
              className="prompt"
              onClick={() => {
                updateSearchValue(preparedQuery);
                onSearch(preparedQuery);
              }}
            >
              {preparedQuery}
            </VuiPrompt>
          </VuiFlexItem>
        ))}
      </VuiFlexContainer>
    </>
  );
};
