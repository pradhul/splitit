/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-12 06:21:41
 * @modify date 2024-12-12 06:21:41
 */
import { DOCUMENT_LIMIT } from "./constants";
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

/**
 * Saves a document to the specified URL. If an ID is provided, the document will be created/updated
 * using a PATCH request. Otherwise, a new document will be created using a POST request.
 *
 * @param {URL} url - The URL to which the document will be saved.
 * @param {any} document - The document to be saved.
 * @param {string} [id] - The optional ID of the document to be updated.
 * @returns {Promise<void>} A promise that resolves when the document is successfully saved.
 * @throws {Error} Throws an error if the save operation fails.
 */
export const saveDocument = (url: URL, document: any, id?: string) => {
  let promise = id ? ApiClient.patch(url + `/${id}`, document) : ApiClient.post(url, document);
  return promise
    .then((response) => console.log("Successfully Saved Document"))
    .catch((error) => {
      throw new Error(error);
    });
};

export const getAllDocuments = (url: URL, collectionName: string) => {
  return ApiClient.get(url + `${collectionName}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error);
    });
};