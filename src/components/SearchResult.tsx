import { parseContext } from "../services/parseContext";
import { truncateEnd, truncateStart } from "../services/truncateString";
import {
  SearchResponseResult,
  SearchResponseDoc,
  SearchResponseSummary,
} from "../types/search";
import { VuiLink, VuiTitle, VuiText, VuiTextColor, VuiSpacer } from "../ui";
import "./SearchResult.scss";

type Props = {
  doc: SearchResponseDoc;
  gen: SearchResponseSummary;
  res: SearchResponseResult;
  position: number;
};

const titleCase = (value: string) => {
  return value
    .toLowerCase()
    .split(" ")
    .map((word: string) => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
};

const CONTEXT_MAX_LENGTH = 200;

export const SearchResult = ({ doc, gen, res, position }: Props) => {
  const {
    corpusKey,
    documentIndex,
    resultLength,
    resultOffset,
    score,
    text: rawText,
  } = res;
  const { pre, post, text } = parseContext(rawText);
  const { id, metadata } = doc || { id: "", metadata: [] };
  var title: string = "";
  for (var i = 0; i < metadata.length; i++) {
    if (metadata[i].name == "title") {
      title = metadata[i].value;
    }
  }

  const url = id;
  const siteCategory = url || "NA";

  return (
    <div className="searchResult">
      <div className="searchResult__position">{position + 1}</div>

      <VuiTitle size="m">
        {url ? (
          <VuiLink href={url} target="_blank">
            {title}
          </VuiLink>
        ) : (
          <div>{title}</div>
        )}
      </VuiTitle>

      <VuiSpacer size="xs" />

      <VuiText size="s">
        <p>
          <VuiTextColor color="subdued">{titleCase(siteCategory)}</VuiTextColor>
        </p>
      </VuiText>

      <VuiSpacer size="s" />

      <VuiText size="s">
        <p>
          {truncateStart(pre, CONTEXT_MAX_LENGTH)} <strong>{text}</strong>{" "}
          {truncateEnd(post, CONTEXT_MAX_LENGTH)}
        </p>
      </VuiText>
    </div>
  );
};
