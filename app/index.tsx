/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-16 04:48:44
 * @modify date 2024-11-16 04:48:44
 * @desc [description]
 */
import { Colors } from "@/constants/Colors";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import { FontSize, Margins, Paddings } from "@/constants/Dimensions";
import RecentsListItem from "@/app/RecordPayment/RecentsListItem";
import { useQuery } from "@tanstack/react-query";
import { getRecentTransactions } from "@/apis";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import React, { useEffect, useState } from "react";
import { setTransactions } from "./features/transactionSlice";
import { FlashList } from "@shopify/flash-list";
import PaymentOptions from "@/app/RecordPayment/PaymentOptions";
import RecentTransactions from "@/app/RecordPayment/RecentTransactions/RecentTransactions";
import { isPending } from "@reduxjs/toolkit";
import { RecordPaymentPage } from "@/constants/Strings";

export default function Index() {
  const recents = useAppSelector((store) => store.transactions);
  const dispatch = useAppDispatch();

  const { isPending, isSuccess, data, error } = useQuery({
    queryKey: ["recents"],
    queryFn: getRecentTransactions,
  });

  const [categories, setCategories] = useState([]);
  const [paidTo, setPaidTo] = useState([]);
  const [paidAmount, setPaidAmount] = useState("");

  useEffect(() => {
    console.log("Dispatch check..", isSuccess, data);
    if (isSuccess && data) {
      dispatch(setTransactions(data));
    }
  }, [isSuccess, data, dispatch]);

  const recordPayment = () => {
    console.log("Recording payment...", paidAmount);
    console.log("Categories:", categories);
    console.log("Paid to:", paidTo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
        <PaymentOptions
          updateCategories={setCategories}
          updatePaymentTo={setPaidTo}
        />
        <PrimaryInput
          placeholder={RecordPaymentPage.rupeeSymbol}
          keyboardType="number-pad"
          inputValue={paidAmount}
          onValueChange={setPaidAmount}
        />
        <PrimaryButton
          title={RecordPaymentPage.recordPaymentButton}
          onPress={recordPayment}
        />
      </View>
      <RecentTransactions {...{ isPending, recents }} />
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
