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
} from "@/apis/constants";
import axios from "axios";

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
      // console.log("Response BatchGet", response);
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
  // console.log("JSON", record);
  const keys = Object.keys(record);
  const result = await keys.reduce(
    async (accPromise: Promise<Record<string, any>>, key) => {
      const acc = await Promise.resolve(accPromise);
      const fireStoreFieldName = Object.keys(record[key])[0] as FireStoreField;
      const fireStoreFieldObject = record[key];
      if (isFireStoreField(fireStoreFieldName)) {
        if (fireStoreFieldName === "integerValue") {
          acc[key.trim()] = parseInt(fireStoreFieldObject[fireStoreFieldName]);
        } else if (fireStoreFieldName === "referenceValue") {
          const readableName = await getDocumentsBatch([
            fireStoreFieldObject[fireStoreFieldName],
          ]);
          // console.log("ReadableName", readableName);
          acc[key.trim()] = readableName;
        } else if (fireStoreFieldName === "arrayValue") {
          console.log(
            "Found ArrayValue",
            (acc[key.trim()], fireStoreFieldObject[fireStoreFieldName])
          );
          acc[key.trim()] = await Promise.all(
            fireStoreFieldObject[fireStoreFieldName].values.map((value) =>
              transformFireStoreRecord({ [key.trim()]: value })
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
  // console.log("Result ", flattenArrays(result));
  return flattenArrays(result);
}

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

