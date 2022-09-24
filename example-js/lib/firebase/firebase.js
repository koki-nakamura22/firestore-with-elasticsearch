const { initializeApp, cert } = require("firebase-admin/app");
const serviceAccount = require("../../../setting/firebase-adminsdk.json");
module.exports.initializeApp = () => {
  initializeApp({
    credential: cert(serviceAccount),
  });
};
