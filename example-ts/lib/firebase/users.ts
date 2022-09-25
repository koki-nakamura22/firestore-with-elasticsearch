import { FirestoreUserType } from "../../utils/types";
import { BaseCollection } from "./basecollection";

export default class Users extends BaseCollection {
  constructor() {
    const collectionName = "users";
    super(collectionName);
  }

  async bulkInsertData(dataForInsert: FirestoreUserType[] | null) {
    if (dataForInsert === null) {
      throw new Error("Must pass dataForInsert.");
    }

    const batch = this.db.batch();
    dataForInsert.forEach(async (eachData: FirestoreUserType) => {
      const docRef = this.db
        .collection(this.collectionName)
        .doc(`${eachData["first_name"]}${eachData["last_name"]}`);
      batch.set(docRef, {
        first_name: eachData["first_name"],
        last_name: eachData["last_name"],
        email: eachData["last_name"],
      });
    });
    await batch.commit();
  }

  async insertData(dataForInsert: FirestoreUserType | null) {
    if (dataForInsert === null) {
      throw new Error("Must pass dataForInsert.");
    }

    const first_name = dataForInsert["first_name"];
    const last_name = dataForInsert["last_name"];
    const email = dataForInsert["email"];
    const docRef = this.db
      .collection(this.collectionName)
      .doc(`${first_name}${last_name}`);
    await docRef.set({
      first_name: first_name,
      last_name: last_name,
      email: email,
    });
  }
}
