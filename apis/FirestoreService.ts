/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-12 06:21:41
 * @modify date 2024-12-12 06:21:41
 */
import axios from "axios";
import { GET_ALL_DOCUMENTS, collectionNames, DOCUMENT_LIMIT } from "./constants";
import ApiClient from "./ApiClient";

type Direction = "ASCENDING" | "DESCENDING";
type URL = string;

/**
 * Fetches filtered documents from a specified collection using a structured query.
 *
 * @param url - The URL endpoint to send the request to.
 * @param collectionName - The name of the collection to query.
 * @param filterBy - The field to filter and order the results by.
 * @param limit - The maximum number of documents to return. Defaults to DOCUMENT_LIMIT.
 * @param direction - The direction to order the results. Can be "ASCENDING" or "DESCENDING". Defaults to "DESCENDING".
 * @returns A promise that resolves to the axios response containing the filtered documents.
 * @throws Will throw an error if the request fails.
 */
export const getFilteredDocuments = (
  url: URL,
  collectionName: string,
  filterBy: string,
  limit: number = DOCUMENT_LIMIT,
  direction: Direction = "DESCENDING"
) => {
  const structuredQuery = {
    from: [
      {
        collectionId: collectionName,
      },
    ],
    orderBy: [
      {
        field: {
          fieldPath: filterBy,
        },
        direction,
      },
    ],
    limit,
  };
  return ApiClient.post(url, { structuredQuery })
    .then(async (response) => response)
    .catch((error) => {
      console.error("Error fetching documents", error);
      throw new Error(error);
    });
};

/**
 * Gets Documents in batches
 * @param {string} documents[] : an array of reference paths to the documents needed to be retrieved,
 * must confirm to firestoreReference RegEx @see regEx.firestoreReference
 */
export const getDocumentsBatch = (url: URL, documents: string[]) =>
  ApiClient.post(url, {
    documents,
  })
    .then((response) => {
      if (!response || !response.data || !response.data[0].found) {
        throw new Error("Batch request Failed, response is Empty or No documents found");
      }
      return response.data[0]?.found?.fields;
    })
    .catch((err) => {
      console.error("Error in batch response", err);
      return "";
    });
