import { Margins, Paddings } from "@/constants/Dimensions";
import { StyleSheet, View, Text } from "react-native";
import { ITransaction } from "../app/features/transactionSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TransactionStatus } from "@/constants/Strings";
import { Colors } from "@/constants/Colors";

interface IRecentItem extends Omit<ITransaction, "_modified"> {}

const RecentsListItem = ({
  amount,
  category,
  from,
  to,
  status,
  _created,
}: IRecentItem) => {
  //FIXME: SEttled /Unsettled will not be applicable on single transactions
  function renderTransactionStatusIcon() {
    if (status === TransactionStatus.SETTLED)
      return (
        <Ionicons
          name="checkmark-done-circle"
          size={24}
          color={Colors.light.primary1}
        />
      );
    else return <Text>Graphic {status}</Text>;
  }

  function getReadableDateTime(dateTime: string): string {
    const today = new Date();
    const pastDate = new Date(dateTime);

    const differenceMillis = today.getTime() - pastDate.getTime();
    const differenceInDays = Math.floor(
      differenceMillis / (1000 * 60 * 60 * 24)
    );
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

  return (
    <View style={styles.recentsItemContainer}>
      <View style={styles.recentsIcon}></View>

      <View style={styles.recentsDetailContainer}>
        {/* {renderTransactionStatusIcon()} */}
        <Text style={styles.transactionText}>
          <Text style={styles.from}>{from}</Text> Paid{" "}
          <Text style={styles.amount}>{amount}₹</Text> To
          <Text style={styles.to}> {to}</Text>
        </Text>
        <Text>{getReadableDateTime(_created)}</Text>
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
    color: Colors.light.primary2,
    fontSize: 16,
  },
  amount: {
    color: Colors.light.accent1,
  },
  from: {
    color: Colors.light.primary2,
  },
  to: {
    color: Colors.light.primary2,
  },
});

export default RecentsListItem;

function renderTransactionStatusIcon() {
  throw new Error("Function not implemented.");
}
