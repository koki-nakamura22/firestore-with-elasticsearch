// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import * as serviceAccount from "../../../setting/firebase-adminsdk.json";
const initApp = () => {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
};

export { initApp };
