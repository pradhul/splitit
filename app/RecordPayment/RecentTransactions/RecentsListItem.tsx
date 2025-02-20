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
import { _getReadableDateTime, _makeReadableText } from "@/utils/stringUtils";
import Card from "@/components/Card";

interface IRecentItem extends Omit<ITransaction, "_modified"> {}

const RecentsListItem = ({ amount, category, from, to, _created }: IRecentItem) => {
  return (
    <Card>
      <View style={styles.recentsItemContainer}>
        <View style={styles.recentsIcon}></View>

        <View style={styles.recentsDetailContainer}>
          <Text style={styles.transactionText}>
            <Text style={styles.from}>{from}</Text> Paid <Text style={styles.amount}>{amount}₹</Text> To
            <Text style={styles.to}> {_makeReadableText(to)}</Text>
          </Text>
          <Text>{_getReadableDateTime(_created || "")}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  recentsItemContainer: {
    margin: Margins.large,
    flexDirection: "row",
    alignItems: "center",
  },
  recentsIcon: {
    width: 50,
    height: 50,
  },
  recentsDetailContainer: {
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
