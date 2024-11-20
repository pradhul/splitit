/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-16 04:48:44
 * @modify date 2024-11-16 04:48:44
 * @desc [description]
 */
import { Colors } from "@/constants/Colors";
import { View, StyleSheet, Text } from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import { FontSize, Margins, Paddings } from "@/constants/Dimensions";
import RecentsListItem from "@/components/RecentsListItem";
import { useQuery } from "@tanstack/react-query";
import { getRecentTransactions } from "@/apis";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import { ITransaction, setTransactions } from "./features/transactionSlice";

export default function Index() {
  const recents = useAppSelector((store) => store.transactions);
  const dispatch = useAppDispatch();

  const { isPending, isSuccess, data, error } = useQuery({
    queryKey: ["recents"],
    queryFn: getRecentTransactions,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const transformedData = data.map(
        (item: {
          document: { fields: { amount: { integerValue: any } } };
        }): ITransaction => ({
          created: item.document.fields.amount.integerValue,
          modified: "",
          amount: 0,
          category: "",
          from: "",
          to: "",
          status: "",
        })
      );
      dispatch(setTransactions(transformedData));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
        <PrimaryInput />
        <PrimaryButton />
      </View>

      {isSuccess && recentTransactionsContainer()}
    </View>
  );

  function recentTransactionsContainer() {
    return (
      <View style={styles.recentPaymentsContainer}>
        <Text style={styles.recentsTitle}>Recents</Text>
        {recents.map((transaction, index) => {
          console.dir(transaction);
          return (
            <RecentsListItem
              key={transaction.created}
              amount={transaction.amount}
              from={transaction.from}
              to={transaction.to}
              status={transaction.status}
              category={transaction.category}
              created={transaction.category}
            />
          );
        })}
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
  recentsTitle: {
    color: colors.neutral1,
    fontSize: FontSize.normal,
    fontWeight: "bold",
    padding: Paddings.large,
  },
});