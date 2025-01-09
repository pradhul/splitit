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
import { Margins, Paddings } from "@/constants/Dimensions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRecentTransactions, saveNewCategory, saveTransaction } from "@/apis";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import React, { useEffect, useState } from "react";
import { setTransactions } from "./transactionSlice";
import PaymentOptions from "@/app/RecordPayment/PaymentOptions";
import RecentTransactions from "@/app/RecordPayment/RecentTransactions/RecentTransactions";
import { RecordPaymentPage } from "@/constants/Strings";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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

  const saveCategory = useMutation({
    mutationFn: saveNewCategory,
    onSuccess: () => console.log("Successfully added category"),
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

  const storeNewCategory = (category: string) => {
    if (!category) return;
    console.log("Saving new category:", category);
    saveCategory.mutate(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
        <PaymentOptions
          updateCategories={setCategories}
          updatePaymentTo={setPaidTo}
          getNewCategory={storeNewCategory}
        />
        <PrimaryInput
          placeholder={RecordPaymentPage.rupeeSymbol}
          keyboardType="number-pad"
          inputValue={paidAmount}
          onValueChange={setPaidAmount}
          size="large"
        />
        <PrimaryButton title={RecordPaymentPage.recordPaymentButton} onPress={recordPayment} />
      </View>
      <View style={styles.recentPaymentsContainer}>
        <RecentTransactions {...{ isPending: isFetching, recents, onRefresh: refetch }} />
      </View>
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
    width: "100%",
  },
  paymentDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Paddings.normal,
  },
  paymentCategoryContainer: {
    flex: 1,
  },
  paymentCategories: {
    flexDirection: "row",
    padding: Paddings.normal,
  },
  paymentPartiesContainer: {
    flex: 1,
    flexDirection: "row",
  },
  recentPaymentsContainer: {
    width: "100%",
    marginTop: Margins.large,
    flex: 1,
  },
});
