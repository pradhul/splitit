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
  GET_DOCUMENTS_BATCH,
  SAVE_DOCUMENTS,
  regEx,
} from "@/apis/constants";
import axios from "axios";
import { auth } from "@/firebaseConfig";
import { ITransaction } from "@/types/transactions";
import { getFilteredDocuments } from "./FirestoreService";

interface ITransactionPayload extends Omit<ITransaction, "_modified" | "_created" | "from"> {}
type FireStoreStringField = "stringValue" | "referenceValue" | "timestampValue" | "arrayValue";
type FireStoreNumberField = "integerValue";
type FireStoreField = FireStoreStringField | FireStoreNumberField;
type FireStoreRecord =
  | {
      [key: string]: { [name: string]: string };
    }
  | { [key: string]: { values: { [dynamicKey: string]: string }[] } };

export const saveTransaction = async (transactionPayload: ITransactionPayload) => {
  const token = await _getAuthToken();
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

  return axios
    .post(
      `${SAVE_DOCUMENTS}${collectionNames.transactions}`,
      _transformToFireStoreRecord(transaction),
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => console.log("Successfully Saved Transaction"))
    .catch((error) => {
      throw new Error(error);
    });
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
      const docId = name.split("/").pop();
      const transformed = await _transformFromFireStoreRecord(fields);
      return { ...transformed, docId };
    })
  );
};

/** Internal Methods */

const _getAuthToken = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is signed in");
  return user.getIdToken();
};

/**
 * Gets Documents in batches
 * @param {string} documents[] : an array of reference paths to the documents needed to be retrieved, 
 * must confirm to firestoreReference RegEx @see regEx.firestoreReference
 */
const _getDocumentsBatch = (documents: string[]) =>
  axios
    .post(GET_DOCUMENTS_BATCH, {
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
      return { name: { stringValue: "" } };
    });

/**
 * Determines if a given field name is a valid Firestore field type.
 *
 * This function acts as a type guard to check if the provided field name
 * corresponds to one of the supported Firestore field types.
 *
 * @param fieldName - The name of the field to check.
 * @returns A boolean indicating whether the field name is a valid Firestore field type.
 *          Returns true if the fieldName is one of: "stringValue", "referenceValue",
 *          "timestampValue", "integerValue", or "arrayValue". Otherwise, returns false.
 */
function _isFireStoreField(fieldName: string): fieldName is FireStoreField {
  return (
    fieldName === "stringValue" ||
    fieldName === "referenceValue" ||
    fieldName === "timestampValue" ||
    fieldName === "integerValue" ||
    fieldName === "arrayValue"
  );
}

/**
 * Changes a firestore document to usable app objects
 * by changing them to {key:value} and getting readable names from reference objects
 **/
async function _transformFromFireStoreRecord(record: FireStoreRecord) {
  const keys = Object.keys(record);
  try {
    const result = await keys.reduce(async (accPromise: Promise<Record<string, any>>, key) => {
      const acc = await Promise.resolve(accPromise);
      const fireStoreFieldName = Object.keys(record[key])[0] as FireStoreField;
      const fireStoreFieldObject = record[key] as {
        [key in FireStoreField]: any;
      };
      if (_isFireStoreField(fireStoreFieldName)) {
        if (fireStoreFieldName === "integerValue") {
          acc[key.trim()] = parseInt(fireStoreFieldObject[fireStoreFieldName]);
        } else if (fireStoreFieldName === "referenceValue") {
          const result = await _getDocumentsBatch([fireStoreFieldObject[fireStoreFieldName]]);
          const readableName = result?.name?.stringValue;
          acc[key.trim()] = readableName;
        } else if (fireStoreFieldName === "arrayValue") {
          acc[key.trim()] = await Promise.all(
            (fireStoreFieldObject[fireStoreFieldName].values as any[]).map((value) =>
              _transformFromFireStoreRecord({ [key.trim()]: value })
            )
          );
        } else {
          acc[key.trim()] = fireStoreFieldObject[fireStoreFieldName];
        }
      } else {
        throw Error("Data Not in Firestore Record Structure!");
      }
      return acc;
    }, Promise.resolve({}));
    return _flattenArrays(result);
  } catch (err) {
    console.error("Error Occurred Transforming Record From Firestore", err);
  }
}

/**
 * Flattens arrays of objects into a single array of values
 */
function _flattenArrays(result: Record<string, any>): any {
  const flattened: Record<string, any> = {};
  Object.keys(result).forEach((key) => {
    if (Array.isArray(result[key])) {
      flattened[key] = result[key].map((i) => Object.values(i)[0]);
    } else {
      flattened[key] = result[key];
    }
  });
  return flattened;
}

/**
 * Converts simple JSON values into FireStore Compatible objects
 * @param isTopLevelCallable Determine whether the call is top-level of self call in order to
 * wrap the results in fields object for firestore compatibility before returning the results back
 */
function _transformToFireStoreRecord(record: any, isTopLevelCall = true): FireStoreRecord {
  const firestoreRecord: FireStoreRecord = {};
  Object.keys(record).forEach((key) => {
    const type = _getFirestoreType(record, key);
    switch (type) {
      case "integerValue": {
        firestoreRecord[key] = { integerValue: record[key] };
        break;
      }
      case "stringValue": {
        firestoreRecord[key] = { stringValue: record[key] };
        break;
      }
      case "referenceValue": {
        firestoreRecord[key] = { referenceValue: record[key] };
        break;
      }
      case "timestampValue": {
        firestoreRecord[key] = { timestampValue: record[key] };
        break;
      }
      case "arrayValue": {
        firestoreRecord[key] = {
          arrayValue: {
            values: record[key].map(
              (item: any) => _transformToFireStoreRecord({ item }, false)["item"]
            ),
          },
        };
        break;
      }
    }
  });
  return isTopLevelCall ? { fields: firestoreRecord } : firestoreRecord;
}

/**
 * Determines the Firestore field type for a given value in a record.
 *
 * @param record - An object containing key-value pairs to be analyzed.
 * @param key - The specific key in the record whose value type needs to be determined.
 * @returns A string representing the Firestore field type:
 *          - "integerValue" for numbers
 *          - "referenceValue" for strings matching a Firestore reference pattern
 *          - "timestampValue" for strings in ISO date-time format
 *          - "stringValue" for other strings
 *          - "arrayValue" for arrays
 *          - "unIdentified" for objects or any other type
 */
function _getFirestoreType(record: Record<string, any>, key: string) {
  const value = record[key];
  const type = Object.prototype.toString.call(value);

  switch (type) {
    case "[object Number]":
      return "integerValue";
    case "[object String]": {
      if (typeof value === "string") {
        if (regEx.firestoreReference.test(value)) {
          return "referenceValue";
        }
        if (regEx.isoDateTime.test(value)) {
          return "timestampValue";
        }
        return "stringValue";
      }
    }
    case "[object Array]":
      return "arrayValue";
    case "[object Object]":
    default:
      return "unIdentified";
  }
}
