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
const client = new Client({ node: elasticsearchSetting.v6url });

module.exports.Index = class {
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
};

module.exports.Document = class {
  static async add(indexName, id, body) {
    const response = await client.index({
      index: indexName,
      type: "_doc",
      id: id,
      body: body,
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

  static async update(indexName, id, body) {
    const response = await client.update({
      index: indexName,
      type: "_doc",
      id: id,
      body: body,
      refresh: true,
    });
    return response;
  }

  static async delete(indexName, id) {
    const response = await client.delete({
      index: indexName,
      type: "_doc",
      id: id,
      refresh: true,
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
};
