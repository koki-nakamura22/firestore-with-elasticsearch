import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  serverTimestamp,
} from "firebase/firestore";
import Users from "./lib/firebase/users";
import { HitDataType } from "./utils/types";
import * as firebase from "./lib/firebase/firebasewrapper";

import * as elasticsearch from "./lib/elasticsearch/v7/elasticsearch";
const elasticsearchIndexName = "user";

const recreateIndex = async () => {
  const exists = await elasticsearch.Index.exists(elasticsearchIndexName);
  if (exists.body) {
    await elasticsearch.Index.delete(elasticsearchIndexName);
  }
  const userMapping = require("./lib/elasticsearch/user-mapping.json");
  await elasticsearch.Index.create(elasticsearchIndexName, userMapping);
};

const changeCallbackFuncAdded = async (doc: DocumentData) => {
  await elasticsearch.Document.add(elasticsearchIndexName, doc.id, doc.data());
  console.info("changeCallbackFuncAdded: " + doc.id);
};
const changeCallbackFuncModified = async (doc: DocumentData) => {
  await elasticsearch.Document.update(
    elasticsearchIndexName,
    doc.id,
    doc.data()
  );
  console.info("changeCallbackFuncModified: " + doc.id);
};
const changeCallbackFuncRemoved = async (doc: DocumentData) => {
  await elasticsearch.Document.delete(elasticsearchIndexName, doc.id);
  console.info("changeCallbackFuncRemoved: " + doc.id);
};

const main = async () => {
  await recreateIndex();

  firebase.initApp();

  return 0;

  // const firestore_users = new Users();
  // firestore_users.setOnSnapshotToCollection(
  //   changeCallbackFuncAdded,
  //   changeCallbackFuncModified,
  //   changeCallbackFuncRemoved
  // );
  // await firestore_users.deleteAllData();

  // const dataFilePath = "./data/dummyUserData.json";
  // const dataForInsert = require(dataFilePath);
  // // await firestore_users.bulkInsertData(dataForInsert);
  // await firestore_users.insertData(dataForInsert[0]);

  // const searchedESData = await elasticsearch.Document.searchAll(
  //   elasticsearchIndexName
  // );
  // console.info("Searched Elasticsearch data");
  // searchedESData.body.hits.hits.forEach((element: HitDataType) => {
  //   console.info(element._source);
  // });

  // // console.info("All Firestore data");
  // // await firestore_users.showAllData();
  // console.info("done");
  // process.exit(0);
};
main();
