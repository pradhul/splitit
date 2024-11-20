import { Margins, Paddings } from "@/constants/Dimensions";
import { StyleSheet, View, Text } from "react-native";
import { ITransaction } from "../app/features/transactionSlice";

interface IRecentItem extends Omit<ITransaction, "modified"> {
  key: string;
}

const RecentsListItem: React.FC<IRecentItem> = ({
  key,
  amount,
  category,
  from,
  to,
  status,
  created,
}) => {
  return (
    <View key={key} style={styles.recentsItemContainer}>
      <View style={styles.recentsIcon}></View>

      <View style={styles.recentsDetailContainer}>
        <Text>Graphic {status}</Text>
        <Text>
          {from} paid {amount} to {to}
        </Text>
        <Text>on 29th Friday evening 4:30 {created}</Text>
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