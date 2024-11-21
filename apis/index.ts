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
  RUN_QUERY_URL,
} from "@/apis/constants";
import axios from "axios";

export const getRecentTransactions = () =>
  axios
    .post(RUN_QUERY_URL, {
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
    .then((response) => {
      return response.data.map((record: any) =>
        transformFireStoreRecord(record.document.fields)
      );
    });

type FireStoreStringField = "stringValue" | "referenceValue" | "timestampValue";
type FireStoreNumberField = "integerValue";
type FireStoreField = FireStoreStringField | FireStoreNumberField;

function isFireStoreField(fieldName: string): fieldName is FireStoreField {
  return (
    fieldName === "stringValue" ||
    fieldName === "referenceValue" ||
    fieldName === "timestampValue" ||
    fieldName === "integerValue"
  );
}

function transformFireStoreRecord(record: any) {
  const keys = Object.keys(record);
  let t;
  t = keys.map((key) => {
    const fireStoreFieldName = Object.keys(record[key])[0];
    const fireStoreFieldValue = record[key];
    if (isFireStoreField(fireStoreFieldName)) {
      if (fireStoreFieldName === "integerValue") {
        return {
          [key.trim()]: parseInt(fireStoreFieldValue[fireStoreFieldName]),
        };
      } else {
        return { [key.trim()]: fireStoreFieldValue[fireStoreFieldName] };
      }
    } else {
      throw Error("Not Firestore Data");
    }
  });
  console.log("+++++++++++++++++++", Object.assign({}, ...t));
  return Object.assign({}, ...t);
}

