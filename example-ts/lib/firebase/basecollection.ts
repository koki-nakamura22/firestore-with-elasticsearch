import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestore } from "firebase-admin/firestore";

export class BaseCollection {
  protected readonly db: FirebaseFirestore.Firestore;
  protected readonly collectionName: string;

  constructor(collectionName: string) {
    if (this.constructor === BaseCollection) {
      throw new Error('Class "BaseTable" cannot be instantiated');
    }
    this.db = getFirestore();
    this.collectionName = collectionName;
  }

  async setOnSnapshotToCollection(
    changeCallbackFuncAdded: (doc: DocumentData) => void,
    changeCallbackFuncModified: (doc: DocumentData) => void,
    changeCallbackFuncRemoved: (doc: DocumentData) => void
  ): Promise<void> {
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

  async deleteAllData(): Promise<void> {
    const batch: FirebaseFirestore.WriteBatch = this.db.batch();
    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await this.db.collection(this.collectionName).get();
    snapshot.forEach((doc: DocumentData) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }

  async showAllData(): Promise<void> {
    const snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData> =
      await this.db.collection("users").get();
    snapshot.forEach((doc: DocumentData) => {
      console.log(doc.id, "=>", doc.data());
    });
  }
}
