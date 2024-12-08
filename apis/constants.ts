/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-16 04:48:08
 * @modify date 2024-11-16 04:48:08
 * @desc [description]
 */

const BASE_URL = `https://firestore.googleapis.com/v1beta1/projects/${process.env.EXPO_PUBLIC_PROJECTID}/databases/(default)/`;
const RUN_QUERY_DOCUMENTS = "documents:runQuery";
const GET_BATCH_DOCUMENTS = "documents:batchGet";

export const GET_ALL_DOCUMENTS = `${BASE_URL}${RUN_QUERY_DOCUMENTS}`;
export const GET_DOCUMENTS_BATCH = `${BASE_URL}${GET_BATCH_DOCUMENTS}`;
export const SAVE_DOCUMENTS = `${BASE_URL}documents/`;
export const DOCUMENT_LIMIT = 10;

export const collectionNames = {
  users: "users",
  transactions: "transactions",
};

//"projects/groupbill-f9c8d/databases/(default)/documents/users/5XM8nNSpEtKlucYHXdLJ"
