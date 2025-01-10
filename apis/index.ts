/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-16 04:48:17
 * @modify date 2024-11-16 04:48:17
 * @desc [description]
 */

import {
  collectionNames,
  DOCUMENT_LIMIT,
  DOCUMENT_REFERENCE_BASE,
  GET_ALL_DOCUMENTS,
  SAVE_DOCUMENTS,
} from "@/apis/constants";
import { auth } from "@/firebaseConfig";
import { ITransaction } from "@/types/transactions";
import { getAllDocuments, getFilteredDocuments, saveDocument } from "./FirestoreService";
import {
  formatResponse,
  transformFromFireStoreRecord,
  transformToFireStoreRecord,
} from "@/apis/FirestoreUtils";

interface ITransactionPayload extends Omit<ITransaction, "_modified" | "_created" | "from"> {}
interface ICategory {
  category: string;
  _created: string;
  _modified: string;
  iconUsed: string;
}

export const saveTransaction = async (transactionPayload: ITransactionPayload) => {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    console.error("No user is logged in!");
    throw new Error();
  }
  const from = userId ? `${DOCUMENT_REFERENCE_BASE}${collectionNames.users}/${userId}` : "";
  const timestamp = new Date().toISOString();
  const transaction: ITransaction = {
    ...transactionPayload,
    _created: timestamp,
    _modified: timestamp,
    from,
  };

  saveDocument(
    `${SAVE_DOCUMENTS}${collectionNames.transactions}`,
    transformToFireStoreRecord(transaction)
  );
};

export const saveNewCategory = async (category: string) => {
  const timestamp = new Date().toISOString();
  const newCategory: ICategory = {
    category,
    _created: timestamp,
    _modified: timestamp,
    iconUsed: "default",
  };

  saveDocument(
    `${SAVE_DOCUMENTS}${collectionNames.categories}`,
    transformToFireStoreRecord(newCategory),
    category
  );
};

/**
 * Retrieves and processes recent transactions from Firestore.
 *
 * This function fetches the most recent transactions from the Firestore database,
 * transforms the raw Firestore data into a more usable format, and adds a document ID
 * to each transaction record.
 *
 * @async
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of transaction objects.
 *                                   Each object contains the transformed transaction data
 *                                   along with its corresponding document ID.
 * @throws {Error} If there's an issue with fetching or processing the transaction data.
 */
export const getRecentTransactions = async () => {
  const response = await getFilteredDocuments(
    GET_ALL_DOCUMENTS,
    collectionNames.transactions,
    "_created",
    DOCUMENT_LIMIT
  );

  return await Promise.all(
    response.data.map(async ({ document: { fields, name } }: any) => {
      return await formatResponse(name, fields);
    })
  );
};

export const getAllUsers = async () => {
  const result = await getAllDocuments(SAVE_DOCUMENTS, collectionNames.users);
  try {
    return await Promise.all(
      result.documents.map(async ({ fields, name }: any) => {
        return await formatResponse(name, fields);
      })
    );
  } catch (err) {
    console.error("An Error Occurred when getting users", err);
    throw err;
  }
};
