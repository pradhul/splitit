export interface ITransaction {
  _created: string;
  _modified: string;
  amount: number;
  category: string[];
  from: string;
  to: string[];
}
