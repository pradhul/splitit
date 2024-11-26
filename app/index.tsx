/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-16 04:48:44
 * @modify date 2024-11-16 04:48:44
 * @desc [description]
 */
import { Colors } from "@/constants/Colors";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import { FontSize, Margins, Paddings } from "@/constants/Dimensions";
import RecentsListItem from "@/components/RecentsListItem";
import { useQuery } from "@tanstack/react-query";
import { getRecentTransactions } from "@/apis";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import { setTransactions } from "./features/transactionSlice";
import { FlashList } from "@shopify/flash-list";

export default function Index() {
  const recents = useAppSelector((store) => store.transactions);
  const dispatch = useAppDispatch();

  const { isPending, isSuccess, data, error } = useQuery({
    queryKey: ["recents"],
    queryFn: getRecentTransactions,
  });

  useEffect(() => {
    if (isSuccess && data) {
      // console.log("Dispatching..", data);
      dispatch(setTransactions(data));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
        <PrimaryInput />
        <PrimaryButton />
      </View>
      {recentTransactionsContainer()}
    </View>
  );

  function recentTransactionsContainer() {
    return (
      <View style={styles.recentPaymentsContainer}>
        <View style={styles.recentTitleContainer}>
          <Text style={styles.recentsTitle}>Recents</Text>
          {isPending && (
            <ActivityIndicator size={"small"} color={colors.primary1} />
          )}
        </View>
        <FlashList
          data={recents}
          keyExtractor={(item) => item._created}
          renderItem={({ item }) => (
            <RecentsListItem
              amount={item.amount}
              from={item.from}
              to={item.to}
              status={item.status}
              category={item.category}
              _created={item._created}
            />
          )}
          estimatedItemSize={50}
        />
      </View>
    );
  }
}

const colors = Colors.light;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: colors.backGround,
    padding: Paddings.normal,
  },
  paymentContainer: {
    borderWidth: 1,
    width: "100%",
  },
  recentPaymentsContainer: {
    width: "100%",
    borderWidth: 1,
    marginTop: Margins.large,
  },
  recentTitleContainer: {
    flexDirection: "row",
  },
  recentsTitle: {
    color: colors.neutral1,
    fontSize: FontSize.normal,
    fontWeight: "bold",
    padding: Paddings.large,
  },
});