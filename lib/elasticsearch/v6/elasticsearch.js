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
const refresh = (indexName) => {
  client.indices.refresh({
    index: indexName,
  });
};

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
    const response = await client.index({
      index: indexName,
      type: "_doc",
      body: doc,
      refresh: true,
    });
    return response;
  }

  static async bulkAdd(indexName, docList) {
    const body = docList.flatMap((doc) => [
      { index: { _index: indexName } },
      doc,
    ]);
    const response = await client.bulk({
      refresh: true,
      body: body,
    });
    return response;
  }

  static async searchPartialMatch(indexName, condition) {
    return await client.search({
      index: indexName,
      type: "_doc",
      body: {
        query: {
          match: condition,
        },
      },
    });
  }
}

const main = async () => {
  // console.info(client);

  const indexName = "user";

  let result = null;

  // if (Index.exists("user")) {
  //   userMappingInfo = require("./../user-mapping.json");
  //   result = await Index.delete(indexName);
  //   result = await Index.create(indexName, userMappingInfo);
  // }

  // const dummyData = require("../../../data/dummyUserData.json");
  // try {
  //   // result = await Document.add(indexName, dummyData[0]);
  //   result = await Document.bulkAdd(indexName, dummyData);
  //   console.info(result);
  // } catch (error) {
  //   console.info(error);
  // }

  result = await Document.searchPartialMatch(indexName, {
    email: "virginia.edu",
  });

  console.info(result);

  console.info("done");
};
main();
