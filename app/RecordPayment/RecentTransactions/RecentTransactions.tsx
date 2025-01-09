import { FlashList } from "@shopify/flash-list";
import { Text, View, ActivityIndicator, Platform, StyleSheet } from "react-native";
import RecentsListItem from "./RecentsListItem";
import { FontSize, Paddings } from "@/constants/Dimensions";
import { Colors } from "@/constants/Colors";
import { ITransaction } from "@/types/transactions";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface IRecentTransactions {
  isPending: boolean;
  recents: ITransaction[];
  onRefresh: Function;
}

export default function RecentTransactions({ isPending, recents, onRefresh }: IRecentTransactions) {
  return (
    <>
      <View style={styles.recentTitleContainer}>
        <Text style={styles.recentsTitle}>Recents</Text>
        {isPending ? (
          <ActivityIndicator size={"small"} color={Colors.light.primary} />
        ) : (
          <FontAwesome
            onPress={() => onRefresh()}
            style={styles.refresh}
            name="refresh"
            size={24}
          />
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
    </>
  );
}

const styles = StyleSheet.create({
  recentTitleContainer: {
    flexDirection: "row",
  },
  recentsTitle: {
    color: Colors.light.neutral,
    fontSize: FontSize.normal,
    fontWeight: "bold",
    padding: Paddings.large,
  },
  refresh: {
    alignContent: "center",
    color: Colors.light.primary,
  },
});
