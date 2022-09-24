// Elasticsearch
export type MappingType = {
  mapping: {
    properties: Object;
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
