/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-16 04:48:08
 * @modify date 2024-11-16 04:48:08
 * @desc [description]
 */

export const BASE_URL = `${process.env.EXPO_PUBLIC_FIRESTORE_URL}${process.env.EXPO_PUBLIC_PROJECTID}/databases/(default)/`;
export const DEFAULT_REQUEST_TIMEOUT = 5000;
export const DEFAULT_TIMEOUT_ERROR = "Request timed out";

const RUN_QUERY_DOCUMENTS = "documents:runQuery";
const GET_BATCH_DOCUMENTS = "documents:batchGet";
export const GET_ALL_DOCUMENTS = RUN_QUERY_DOCUMENTS;
export const GET_DOCUMENTS_BATCH = GET_BATCH_DOCUMENTS;
export const SAVE_DOCUMENTS = `documents/`;
export const DOCUMENT_LIMIT = 10;
export const DOCUMENT_REFERENCE_BASE = `projects/${process.env.EXPO_PUBLIC_PROJECTID}/databases/(default)/documents/`;

export const collectionNames = {
  users: "users",
  transactions: "transactions",
  categories: "categories",
};

export const regEx = {
  firestoreReference: new RegExp(
    /^projects\/[^/]+\/databases\/[^/]+\/documents\/.*$/
  ),
  isoDateTime: new RegExp(
    "^\\d{4}-\\d{1,2}-\\d{1,2}T\\d{1,2}:\\d{1,2}:\\d{1,2}(\\.\\d{1,3})?([Zz]|(\\+\\d{1,2}:\\d{1,2}))$"
  ),
};
