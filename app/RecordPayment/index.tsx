/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-16 04:48:44
 * @modify date 2024-11-16 04:48:44
 * @desc [description]
 */
import { Colors } from "@/constants/Colors";
import { View, StyleSheet } from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import { Paddings } from "@/constants/Dimensions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRecentTransactions, saveTransaction } from "@/apis";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import React, { useEffect, useState } from "react";
import { setTransactions } from "../features/transactionSlice";
import PaymentOptions from "@/app/RecordPayment/PaymentOptions";
import RecentTransactions from "@/app/RecordPayment/RecentTransactions/RecentTransactions";
import { RecordPaymentPage } from "@/constants/Strings";

export default function Index() {
  const recents = useAppSelector((store) => store.transactions);
  const dispatch = useAppDispatch();

  const { isFetching, isSuccess, data, refetch } = useQuery({
    queryKey: ["recents"],
    queryFn: getRecentTransactions,
  });

  const mutation = useMutation({
    mutationFn: saveTransaction,
    onSuccess: () => console.log("Successfully added transaction"),
  });

  const [categories, setCategories] = useState([]);
  const [paidTo, setPaidTo] = useState([]);
  const [paidAmount, setPaidAmount] = useState("");

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setTransactions(data));
    }
  }, [isSuccess, data, dispatch]);

  const recordPayment = () => {
    console.log("Recording payment...", paidAmount);
    console.log("Categories:", categories);
    console.log("Paid to:", paidTo);
    if (paidAmount && categories && paidTo) {
      mutation.mutate({
        amount: parseInt(paidAmount),
        category: categories,
        to: paidTo,
      });
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
        <PaymentOptions updateCategories={setCategories} updatePaymentTo={setPaidTo} />
        <PrimaryInput
          placeholder={RecordPaymentPage.rupeeSymbol}
          keyboardType="number-pad"
          inputValue={paidAmount}
          onValueChange={setPaidAmount}
        />
        <PrimaryButton title={RecordPaymentPage.recordPaymentButton} onPress={recordPayment} />
      </View>
      <RecentTransactions {...{ isPending: isFetching, recents, onRefresh: refetch }} />
    </View>
  );
}

const colors = Colors.light;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.backGround,
    padding: Paddings.normal,
  },
  paymentContainer: {
    // borderWidth: 1,
    width: "100%",
  },
  paymentDetails: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Paddings.normal,
  },
  paymentCategoryContainer: {
    borderWidth: 1,
    flex: 1,
  },
  paymentCategories: {
    flexDirection: "row",
    padding: Paddings.normal,
  },
  paymentPartiesContainer: {
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
  },
});
