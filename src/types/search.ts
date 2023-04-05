
export type DocMetadata = {
    name: string;
    value: string;
  };

export type SearchResponseDoc = {
  id: string;
  metadata: DocMetadata[];
};

export type SearchResponseResult = {
  corpusKey: {
    corpusId: string;
    customerId: string;
    dim: string[];
  };
  documentIndex: string;
  resultLength: number;
  resultOffset: number;
  score: number;
  text: string;
};

export type SearchResponseSummary = {
  text?: string;
  status?: string;
};

export type SearchResponse = {
  document: SearchResponseDoc[];
  generated: SearchResponseSummary[];
  response: SearchResponseResult[];
};

export type CombinedResult = {
  document: SearchResponseDoc, 
  generated: SearchResponseSummary, 
  response: SearchResponseResult
};
export type CombinedResults = CombinedResult[];
