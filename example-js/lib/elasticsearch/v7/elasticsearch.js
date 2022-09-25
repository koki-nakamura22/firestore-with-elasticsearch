// Document
// - GitHub
// https://github.com/elastic/elasticsearch-js
//
// API Referencce
// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.17/api-reference.html

const { Client } = require("@elastic/elasticsearch");
const elasticsearchSetting = require("../../../../setting/elasticsearch-setting.json");
const client = new Client({ node: elasticsearchSetting.v7url });

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
      id: id,
      body: body,
      refresh: true,
    });
    return response;
  }

  static async delete(indexName, id) {
    const response = await client.delete({
      index: indexName,
      id: id,
      refresh: true,
    });
    return response;
  }

  static async searchAll(indexName) {
    return await client.search({
      index: indexName,
    });
  }

  static async searchPartialMatch(indexName, condition) {
    return await client.search({
      index: indexName,
      body: {
        query: {
          match: condition,
        },
      },
    });
  }
};
