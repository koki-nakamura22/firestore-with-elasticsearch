const { initializeApp, cert } = require("firebase-admin/app");
const serviceAccount = require("./firestore-with-elasticsearch.json");
module.exports.initializeApp = () => {
  initializeApp({
    credential: cert(serviceAccount),
  });
};
