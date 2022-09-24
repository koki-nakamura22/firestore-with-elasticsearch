// Document
// - GitHub
// https://github.com/elastic/elasticsearch-js
//
// API Referencce
// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.17/api-reference.html

import { MappingType } from "../../../utils/types";
import { Client, ApiResponse, RequestParams } from "@elastic/elasticsearch";
import elasticsearchSetting from "../../../../setting/elasticsearch-setting.json";
const client = new Client({ node: elasticsearchSetting.v7url });

module.exports.Index = class {
  static async exists(indexName: string) {
    return await client.indices.exists({
      index: indexName,
    });
  }

  static async create(indexName: string, indexDefinition: MappingType) {
    return await client.indices.create({
      index: indexName,
      body: indexDefinition,
    });
  }

  static async delete(indexName: string) {
    return await client.indices.delete({
      index: indexName,
    });
  }

  static async refresh(indexName: string) {
    return await client.indices.refresh({
      index: indexName,
    });
  }
};

module.exports.Document = class {
  static async add(indexName: string, id: string, body: object) {
    const response = await client.index({
      index: indexName,
      id: id,
      body: body,
      refresh: true,
    });
    return response;
  }

  static async bulkAdd(indexName: string, docList: object[]) {
    const body = docList.flatMap((doc: object) => [
      { index: { _index: indexName } },
      doc,
    ]);
    const response = await client.bulk({
      refresh: true,
      body: body,
    });
    return response;
  }

  static async update(indexName: string, id: string, body: object) {
    const response = await client.update({
      index: indexName,
      id: id,
      body: body,
      refresh: true,
    });
    return response;
  }

  static async delete(indexName: string, id: string) {
    const response = await client.delete({
      index: indexName,
      id: id,
      refresh: true,
    });
    return response;
  }

  static async searchAll(indexName: string) {
    return await client.search({
      index: indexName,
    });
  }

  static async searchPartialMatch(indexName: string, condition: object) {
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
