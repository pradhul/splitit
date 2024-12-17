/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-02 04:15:49
 * @modify date 2024-12-02 04:15:49
 * @desc [description]
 */
import { Margins, Paddings } from "@/constants/Dimensions";
import { StyleSheet, View, Text } from "react-native";
import { ITransaction } from "@/types/transactions";
import { Colors } from "@/constants/Colors";

interface IRecentItem extends Omit<ITransaction, "_modified"> {}

const RecentsListItem = ({
  amount,
  category,
  from,
  to,
  _created,
}: IRecentItem) => {
  function _getReadableDateTime(dateTime: string): string {
    const today = new Date();
    const pastDate = new Date(dateTime);

    const differenceMillis = today.getTime() - pastDate.getTime();
    const differenceInDays = Math.floor(differenceMillis / (1000 * 60 * 60 * 24));
    if (differenceInDays > 5) {
      return `${pastDate.toLocaleDateString()} at ${pastDate.toLocaleTimeString()}`;
    }
    if (differenceInDays === 1) {
      return `Yesterday at ${pastDate.toLocaleTimeString()}`;
    }
    if (differenceInDays === 0) {
      return `Today at ${pastDate.toLocaleTimeString()}`;
    }
    return `${differenceInDays} days ago at  ${pastDate.toLocaleTimeString()}`;
  }

  /**
   * Converts an array of names into a readable string format.
   * If the array has only one name, it returns the name itself.
   * If the array has more than one name, it joins all names except the last one with a comma,
   * and appends the last name with the word "and".
   *
   * @param to - An array of names to be converted into a readable string.
   * @returns A string representing the names in a readable format.
   *
   */
  const _makeReadableText = (to: string[]): string =>
    to.length < 2 ? to[0] || "" : [to.slice(0, -1).join(", "), to[to.length - 1]].join(" and ");

  return (
    <View style={styles.recentsItemContainer}>
      <View style={styles.recentsIcon}></View>

      <View style={styles.recentsDetailContainer}>
        <Text style={styles.transactionText}>
          <Text style={styles.from}>{from}</Text> Paid <Text style={styles.amount}>{amount}₹</Text>{" "}
          To
          <Text style={styles.to}> {_makeReadableText(to)}</Text>
        </Text>
        <Text>{_getReadableDateTime(_created)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recentsItemContainer: {
    // borderWidth: 1,
    margin: Margins.large,
    flexDirection: "row",
    alignItems: "center",
  },
  recentsIcon: {
    // borderWidth: 1,
    width: 50,
    height: 50,
  },
  recentsDetailContainer: {
    // borderWidth: 1,
    padding: Paddings.normal,
    flexDirection: "column",
    flexGrow: 1,
  },
  transactionText: {
    fontWeight: "bold",
    color: Colors.light.primary,
    fontSize: 16,
  },
  amount: {
    color: Colors.light.accent,
  },
  from: {
    color: Colors.light.primary,
  },
  to: {
    color: Colors.light.primary,
  },
});

export default RecentsListItem;

function renderTransactionStatusIcon() {
  throw new Error("Function not implemented.");
}
