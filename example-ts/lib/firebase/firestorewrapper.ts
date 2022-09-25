// const firebase = require("firebase-admin/app"); // TODO
// import { FirestoreErrorType } from "../../utils/types";

// const enablePersistence = () => {
//   firebase
//     .firestore()
//     .enablePersistence()
//     .catch((err: FirestoreErrorType) => {
//       if (err.code == "failed-precondition") {
//         console.error(
//           "Multiple tabs open, persistence can only be enabled in one tab at a a time."
//         );
//       } else if (err.code == "unimplemented") {
//         console.error(
//           "The current browser does not support all of the features required to enable persistence."
//         );
//       }
//     });
// };

// export default enablePersistence;
