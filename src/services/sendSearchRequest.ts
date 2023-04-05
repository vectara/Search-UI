import axios from "axios";
import { START_TAG, END_TAG } from "./parseContext";

type Config = {
  query_str?: string;
  customerId: string;
  corpusId: string;
  endpoint: string;
  apiKey: string;
};

export const sendSearchRequest = async ({
  query_str,
  customerId,
  corpusId,
  endpoint,
  apiKey,
}: Config) => {
  let body = {
    query: [
      {
        query: query_str,
        start: 0,
        numResults: 10,
        corpusKey: [
          {
            customerId,
            corpusId,
          },
        ],
        context_config: {
          sentences_before: 2,
          sentences_after: 2,
          start_tag: START_TAG,
          end_tag: END_TAG,
        },
      },
    ],
  };

  const url = `https://${endpoint}/v1/query`;
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "customer-id": customerId,
      "x-api-key": apiKey,
    },
  };
  const result = await axios.post(url, body, headers);

  const status = result["data"]["responseSet"][0]["status"];
  if (status.length > 0 && status[0]["code"] == "UNAUTHORIZED") {
    console.log(
      "UNAUTHORIZED access during; check your API key and customer ID"
    );
  }
  return result["data"]["responseSet"][0];
};
