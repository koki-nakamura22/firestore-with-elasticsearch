import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import * as serviceAccount from "../../../setting/firebase-adminsdk.json";
module.exports.initializeApp = () => {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
};
