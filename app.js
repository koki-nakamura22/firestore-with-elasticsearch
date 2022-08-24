const firebase = require("./lib/firebase/firebase");
const Users = require("./lib/firebase/users");

const main = async () => {
  firebase.initializeApp();

  const firestore_users = new Users();

  // await firestore_users.setOnSnapshotToCollection();
  // await firestore_users.deleteAllData();

  const dataFilePath = "./data/dummyUserData.json";
  const dataForInsert = require(dataFilePath);
  await firestore_users.bulkInsertData(dataForInsert);
  // await firestore_users.insertData(dataForInsert[0]);

  // await firestore_users.showAllData();
  console.info("done");
  process.exit(0);
};
main();
