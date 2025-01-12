/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-17 04:55:12
 * @modify date 2024-12-17 04:55:12
 * @desc [description]
 */

import { DOCUMENT_REFERENCE_BASE, GET_DOCUMENTS_BATCH, regEx } from "./constants";
import { getDocumentsBatch } from "./FirestoreService";

type FireStoreStringField = "stringValue" | "referenceValue" | "timestampValue" | "arrayValue";
type FireStoreNumberField = "integerValue";
type FireStoreField = FireStoreStringField | FireStoreNumberField;
type FireStoreRecord =
  | {
      [key: string]: { [name: string]: string };
    }
  | { [key: string]: { values: { [dynamicKey: string]: string }[] } };

/**
 * Changes a firestore document to usable app objects
 * by changing them to {key:value} and getting readable names from reference objects
 **/
export async function transformFromFireStoreRecord(record: FireStoreRecord) {
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
          //FIXME: this call references back to firestoreService file, fix it later
          const result = await getDocumentsBatch(GET_DOCUMENTS_BATCH, [
            fireStoreFieldObject[fireStoreFieldName],
          ]);
          const readableName = result?.name?.stringValue || "";
          acc[key.trim()] = readableName;
        } else if (fireStoreFieldName === "arrayValue") {
          acc[key.trim()] = await Promise.all(
            (fireStoreFieldObject[fireStoreFieldName].values as any[]).map((value) =>
              transformFromFireStoreRecord({ [key.trim()]: value })
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
 * Converts simple JSON values into FireStore Compatible objects
 * @param isTopLevelCallable Determine whether the call is top-level of self call in order to
 * wrap the results in fields object for firestore compatibility before returning the results back
 */
export function transformToFireStoreRecord(record: any, isTopLevelCall = true): FireStoreRecord {
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
              (item: any) => transformToFireStoreRecord({ item }, false)["item"]
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

export async function formatResponse(referencePath: string, fields: any) {
  const docId = referencePath ? referencePath.split("/").pop() : "";
  const transformed = await transformFromFireStoreRecord(fields);
  return { ...transformed, docId };
}

export function referenceFromDocIds(singleDocIdString: referenceFromDocIds.SingleDocId): string;
export function referenceFromDocIds(
  singleDocIdObject: referenceFromDocIds.SingleDocIdObject
): string;
export function referenceFromDocIds(
  objectsWithDocIds: referenceFromDocIds.ObjectsWithDocIds
): string[];
export function referenceFromDocIds(
  elementDocId:
    | referenceFromDocIds.ObjectsWithDocIds
    | referenceFromDocIds.SingleDocIdObject
    | referenceFromDocIds.SingleDocId
) {
  if (typeof elementDocId === "string") {
    return DOCUMENT_REFERENCE_BASE + "users/" + elementDocId;
  }
  if ("docId" in elementDocId) {
    return DOCUMENT_REFERENCE_BASE + "users/" + elementDocId.docId;
  }
  return Object.keys(elementDocId).reduce((acc: string[], tag: string) => {
    acc.push(DOCUMENT_REFERENCE_BASE + "users/" + elementDocId[tag].docId);
    return acc;
  }, []);
}
