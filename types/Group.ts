type Group = {
  name: string;
  noOfPeople: number;
  description: string;
  status: "Settled" | "Not Settled" | "New";
  _created?: string;
  _modified?: string;
  docId?: string;
};
