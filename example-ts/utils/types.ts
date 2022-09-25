// Elasticsearch
export type MappingType = {
  mapping: {
    properties: Object;
  };
};

export type HitDataType = {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: object;
};

export type SearchResponseType = {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: HitDataType[];
  };
};

// Firestore
export type FirestoreErrorType = {
  code: string;
};

// Firestore user collection
export type FirestoreUserType = {
  first_name: string;
  last_name: string;
  email: string;
};
