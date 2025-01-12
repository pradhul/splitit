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
import { useMutation, useQueries } from "@tanstack/react-query";
import { getAllUsers, getRecentTransactions, saveNewCategory, saveTransaction } from "@/apis";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import React, { useEffect, useState } from "react";
import { setTransactions } from "@/app/slices/transactionSlice";
import PaymentOptions from "@/app/RecordPayment/PaymentOptions";
import RecentTransactions from "@/app/RecordPayment/RecentTransactions/RecentTransactions";
import { RecordPaymentPage } from "@/constants/Strings";
import { DOCUMENT_REFERENCE_BASE } from "@/apis/constants";
import { setUsers } from "../slices/usersSlice";
import { referenceFromDocIds } from "@/apis/FirestoreUtils";

export default function Index() {
  const recents = useAppSelector((store) => store.transactions);
  const users = useAppSelector((store) => store.users);
  const dispatch = useAppDispatch();

  const results = useQueries({
    queries: [
      {
        queryKey: ["recents"],
        queryFn: getRecentTransactions,
      },
      {
        queryKey: ["allUsers"],
        queryFn: getAllUsers,
      },
    ],
  });

  const [recentsResult, usersResult] = results;
  const { isFetching, isSuccess, data: recentTransactions, refetch } = recentsResult;
  const { data: usersData, isSuccess: isGetUsersSuccess } = usersResult;

  const mutation = useMutation({
    mutationFn: saveTransaction,
    onSuccess: () => console.log("Successfully added transaction"),
    onError: (error) => {
      console.log("Error adding transaction");
      alert(RecordPaymentPage.errorSavingTransaction);
    },
  });

  const saveCategory = useMutation({
    mutationFn: saveNewCategory,
    onSuccess: () => console.log("Successfully added category"),
  });
  type SelectedTags = {
    selectedTags: any;
  };
  const [categories, setCategories] = useState<SelectedTags>({
    selectedTags: {},
  });
  const [paidTo, setPaidTo] = useState<SelectedTags>({
    selectedTags: {},
  });
  const [paidAmount, setPaidAmount] = useState("");

  useEffect(() => {
    if (isSuccess && recentTransactions) {
      dispatch(setTransactions(recentTransactions));
    }
    if (isGetUsersSuccess && usersData) {
      dispatch(setUsers(usersData));
    }
  }, [isSuccess, recentTransactions, usersData, dispatch]);

  const recordPayment = () => {
    console.log("Recording payment...", paidAmount);
    if (paidAmount && categories && paidTo) {
      mutation.mutate({
        amount: parseInt(paidAmount),
        category: Object.keys(categories.selectedTags),
        to: referenceFromDocIds(paidTo.selectedTags as referenceFromDocIds.ObjectsWithDocIds),
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
          usersList={users}
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
