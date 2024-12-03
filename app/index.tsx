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
import React, { useEffect } from "react";
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

  useEffect(() => {
    if (isSuccess && data) {
      // console.log("Dispatching..", data);
      dispatch(setTransactions(data));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
        <PaymentOptions />
        <PrimaryInput
          placeholder={RecordPaymentPage.rupeeSymbol}
          keyboardType="number-pad"
        />
        <PrimaryButton title={RecordPaymentPage.recordPaymentButton} />
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
