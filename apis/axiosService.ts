/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-12 06:21:41
 * @modify date 2024-12-12 06:21:41
 */
import axios from "axios";
import { GET_ALL_DOCUMENTS, collectionNames, DOCUMENT_LIMIT } from "./constants";

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
  return axios
    .post(url, { structuredQuery })
    .then(async (response) => response)
    .catch((error) => {
      console.error("Error fetching documents", error);
      throw new Error(error);
    });
};
