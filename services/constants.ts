/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-16 04:48:08
 * @modify date 2024-11-16 04:48:08
 * @desc [description]
 */

export const BASE_URL = `${process.env.EXPO_PUBLIC_FIRESTORE_URL}${process.env.EXPO_PUBLIC_PROJECTID}/databases/(default)/`;

const RUN_QUERY_DOCUMENTS = "documents:runQuery";
export const GET_ALL_DOCUMENTS = RUN_QUERY_DOCUMENTS;
export const SAVE_DOCUMENTS = `documents/`;
export const DOCUMENT_LIMIT = 10;
export const DOCUMENT_REFERENCE_BASE = `projects/${process.env.EXPO_PUBLIC_PROJECTID}/databases/(default)/documents/`;

export const collectionNames = {
  users: "users",
  transactions: "transactions",
  categories: "categories",
  groups: "groups",
};

export const regEx = {
  firestoreReference: new RegExp(
    /^projects\/[^/]+\/databases\/[^/]+\/documents\/.*$/
  ),
};

