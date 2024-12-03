import { isPending } from "@reduxjs/toolkit";
import { FlashList } from "@shopify/flash-list";
import {
  Text,
  View,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from "react-native";
import RecentsListItem from "../RecentsListItem";
import { Margins, FontSize, Paddings } from "@/constants/Dimensions";
import { Colors } from "@/constants/Colors";
import { ITransaction } from "@/app/features/transactionSlice";

interface IRecentTransactions {
  isPending: boolean;
  recents: ITransaction[];
}

export default function RecentTransactions({
  isPending,
  recents,
}: IRecentTransactions) {
  return (
    <View style={styles.recentPaymentsContainer}>
      <View style={styles.recentTitleContainer}>
        <Text style={styles.recentsTitle}>Recents</Text>
        {isPending && (
          <ActivityIndicator size={"small"} color={Colors.light.primary1} />
        )}
      </View>
      <FlashList
        data={recents}
        keyExtractor={(item) => item._created + Platform.OS}
        renderItem={({ item }) => (
          <RecentsListItem
            amount={item.amount}
            from={item.from}
            to={item.to}
            category={item.category}
            _created={item._created}
          />
        )}
        estimatedItemSize={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  recentPaymentsContainer: {
    width: "100%",
    // borderWidth: 1,
    marginTop: Margins.large,
    // minHeight: 100,
    flex: 1,
  },
  recentTitleContainer: {
    flexDirection: "row",
  },
  recentsTitle: {
    color: Colors.light.neutral1,
    fontSize: FontSize.normal,
    fontWeight: "bold",
    padding: Paddings.large,
  },
});
