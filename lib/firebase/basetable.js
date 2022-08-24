const { getFirestore } = require("firebase-admin/firestore");

module.exports = class BaseTable {
  constructor(collectionName) {
    if (this.constructor === BaseTable) {
      throw new Error('Class "BaseTable" cannot be instantiated');
    }
    this.db = getFirestore();
    this.collectionName = collectionName;
  }

  setOnSnapshotToCollection() {
    this.db.collection(this.collectionName).onSnapshot((snap) => {
      snap.forEach((doc) => {
        // ここでデータの追加・更新・削除に応じて、Elastic Searchの方も触る。
        console.info(doc);
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
