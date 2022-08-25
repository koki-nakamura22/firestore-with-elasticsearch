// Using ver 6.x because when using ver 7.x or upper, an error happens.
// Probably, the cause is unmatching versions between the server and the client.

// Document
// - GitHub
// https://github.com/elastic/elasticsearch-js
//
// API Referencce
//https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/6.x/api-reference.html

const { Client } = require("@elastic/elasticsearch");
const elasticsearchSetting = require("../elasticsearch-setting.json");
const client = new Client({ node: elasticsearchSetting.url });

class Index {
  static async exists(indexName) {
    return await client.indices.exists({
      index: indexName,
    });
  }

  static async create(indexName, indexDefinition) {
    return await client.indices.create({
      index: indexName,
      body: indexDefinition,
    });
  }

  static async delete(indexName) {
    return await client.indices.delete({
      index: indexName,
    });
  }

  static async refresh(indexName) {
    return await client.indices.refresh({
      index: indexName,
    });
  }
}

class Document {
  static async add(indexName, doc) {
    return await client.index({
      index: indexName,
      document: doc,
    });
  }

  static async bulkAdd(indexName, docList) {
    return await client.bulk({
      index: indexName,
      body: docList,
    });
  }
}

const main = async () => {
  // console.info(client);

  // const result = await existsIndex("books");

  const indexName = "user";
  // const userMappingInfo = require("./user-mapping.json");
  // const result = await Index.create(indexName, userMappingInfo);
  // const result = await Index.delete(indexName);

  const dummyData = require("../../../data/dummyUserData.json");
  const result = await Document.add(indexName, dummyData[0]);

  console.info(result);

  console.info("done");
};
main();
