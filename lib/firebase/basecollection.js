const { getFirestore } = require("firebase-admin/firestore");

module.exports = class BaseCollection {
  constructor(collectionName) {
    if (this.constructor === BaseCollection) {
      throw new Error('Class "BaseTable" cannot be instantiated');
    }
    this.db = getFirestore();
    this.collectionName = collectionName;
  }

  async setOnSnapshotToCollection(
    changeCallbackFuncAdded,
    changeCallbackFuncModified,
    changeCallbackFuncRemoved
  ) {
    this.db.collection(this.collectionName).onSnapshot(async (snap) => {
      snap.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          await changeCallbackFuncAdded(change.doc);
        }
        if (change.type === "modified") {
          await changeCallbackFuncModified(change.doc);
        }
        if (change.type === "removed") {
          await changeCallbackFuncRemoved(change.doc);
        }
      });
    });
  }

  async deleteAllData() {
    const batch = this.db.batch();
    const snapshot = await this.db.collection(this.collectionName).get();
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }

  async showAllData() {
    const snapshot = await this.db.collection("users").get();
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  }

  async bulkInsertData() {
    throw new Error('Method "bulkInsertData" must implement');
  }

  async insertData() {
    throw new Error('Method "insertData" must implement');
  }
};
