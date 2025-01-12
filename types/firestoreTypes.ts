namespace referenceFromDocIds {
  export type SingleDocId = string;
  export type SingleDocIdObject = { docId: string };
  export type ObjectsWithDocIds = {
    [key: string]: SingleDocIdObject;
  };
}
