import { Margins, Paddings } from "@/constants/Dimensions";
import { StyleSheet, View, Text } from "react-native";
import { ITransaction } from "../app/features/transactionSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TransactionStatus } from "@/constants/Strings";
import { Colors } from "@/constants/Colors";

interface IRecentItem extends Omit<ITransaction, "_modified"> {}

const RecentsListItem: React.FC<IRecentItem> = ({
  amount,
  category,
  from,
  to,
  status,
  _created,
}) => {
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

  return (
    <View key={_created} style={styles.recentsItemContainer}>
      <View style={styles.recentsIcon}></View>

      <View style={styles.recentsDetailContainer}>
        {/* {renderTransactionStatusIcon()} */}
        <Text>
          {from} paid {amount} to {to}
        </Text>
        <Text>on 29th Friday evening 4:30 {_created}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recentsItemContainer: {
    borderWidth: 1,
    margin: Margins.large,
    flexDirection: "row",
    alignItems: "center",
  },
  recentsIcon: {
    borderWidth: 1,
    width: 50,
    height: 50,
  },
  recentsDetailContainer: {
    borderWidth: 1,
    padding: Paddings.normal,
    flexDirection: "column",
    flexGrow: 1,
  },
});

export default RecentsListItem;

function renderTransactionStatusIcon() {
  throw new Error("Function not implemented.");
}
