/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-16 04:48:08
 * @modify date 2024-11-16 04:48:08
 * @desc [description]
 */

const BASE_URL = `https://firestore.googleapis.com/v1beta1/projects/${process.env.EXPO_PUBLIC_PROJECTID}/databases/(default)/`;
const RUN_QUERY = "documents:runQuery";

export const RUN_QUERY_URL = `${BASE_URL}${RUN_QUERY}`;
export const collectionNames = {
  users: "users",
  transactions: "transactions",
};
export const DOCUMENT_LIMIT = 10;
