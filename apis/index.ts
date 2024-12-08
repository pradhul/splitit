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
  GET_ALL_DOCUMENTS,
  GET_DOCUMENTS_BATCH,
  SAVE_DOCUMENTS,
} from "@/apis/constants";
import axios from "axios";
import { auth } from "@/firebaseConfig";
import RecentTransactions from "../app/RecordPayment/RecentTransactions/RecentTransactions";

const getAuthToken = async () => {
  console.log("Getting auth token");
  const user = auth.currentUser;
  console.log("Getting auth token", user);
  if (!user) throw new Error("No user signed in");
  return user.getIdToken();
};

//test postData , to be removed later
const postData = {
  fields: {
    amount: { integerValue: 100 },
    categories: {
      arrayValue: {
        values: [{ stringValue: "Category1" }, { stringValue: "Category2" }],
      },
    },
    to: {
      arrayValue: {
        values: [
          {
            referenceValue:
              "projects/YOUR_PROJECT_ID/databases/(default)/documents/collectionName/docID1",
          },
          {
            referenceValue:
              "projects/YOUR_PROJECT_ID/databases/(default)/documents/collectionName/docID2",
          },
        ],
      },
    },
  },
};

export const saveTransaction = async () => {
  const token = await getAuthToken();
  console.log(
    "Saving transaction to",
    `${SAVE_DOCUMENTS}${collectionNames.transactions}`
  );
  return axios
    .post(`${SAVE_DOCUMENTS}${collectionNames.transactions}`, postData, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => console.log("OK", response))
    .catch((error) => console.error("Error", error));
};

export const getRecentTransactions = () =>
  axios
    .post(GET_ALL_DOCUMENTS, {
      structuredQuery: {
        from: [
          {
            collectionId: collectionNames.transactions,
          },
        ],
        orderBy: [
          {
            field: {
              fieldPath: "_created",
            },
            direction: "DESCENDING",
          },
        ],
        limit: DOCUMENT_LIMIT,
      },
    })
    .then(async (response) => {
      return await Promise.all(
        response.data.map((record: any) => {
          return transformFireStoreRecord(record.document.fields);
        })
      );
    });

/**
 * Gets Documents in batches
 * FIXME: This now returns specifically the name field under a firestore reference,
 * and only returns the first one
 */
const getDocumentsBatch = (documents: string[]) =>
  axios
    .post(GET_DOCUMENTS_BATCH, {
      documents,
    })
    .then((response) => {
      return response.data[0].found.fields.name.stringValue;
    });

type FireStoreStringField =
  | "stringValue"
  | "referenceValue"
  | "timestampValue"
  | "arrayValue";
type FireStoreNumberField = "integerValue";
type FireStoreField = FireStoreStringField | FireStoreNumberField;
type FireStoreRecord =
  | {
      [key: string]: { [name: string]: string };
    }
  | { [key: string]: { values: { [dynamicKey: string]: string }[] } };

function isFireStoreField(fieldName: string): fieldName is FireStoreField {
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
async function transformFireStoreRecord(record: FireStoreRecord) {
  const keys = Object.keys(record);
  const result = await keys.reduce(
    async (accPromise: Promise<Record<string, any>>, key) => {
      const acc = await Promise.resolve(accPromise);
      const fireStoreFieldName = Object.keys(record[key])[0] as FireStoreField;
      const fireStoreFieldObject = record[key] as {
        [key in FireStoreField]: any;
      };
      if (isFireStoreField(fireStoreFieldName)) {
        if (fireStoreFieldName === "integerValue") {
          acc[key.trim()] = parseInt(fireStoreFieldObject[fireStoreFieldName]);
        } else if (fireStoreFieldName === "referenceValue") {
          const readableName = await getDocumentsBatch([
            fireStoreFieldObject[fireStoreFieldName],
          ]);
          acc[key.trim()] = readableName;
        } else if (fireStoreFieldName === "arrayValue") {
          acc[key.trim()] = await Promise.all(
            (fireStoreFieldObject[fireStoreFieldName].values as any[]).map(
              (value) => transformFireStoreRecord({ [key.trim()]: value })
            )
          );
        } else {
          acc[key.trim()] = fireStoreFieldObject[fireStoreFieldName];
        }
      } else {
        throw Error("Not Firestore Data");
      }
      return acc;
    },
    Promise.resolve({})
  );
  return flattenArrays(result);
}

/**
 * Flattens arrays of objects into a single array of values
 */
function flattenArrays(result: Record<string, any>): any {
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

