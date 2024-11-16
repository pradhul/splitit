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

const colors = Colors.light;

export default function Index() {
  const { isQuery, isPending, isSuccess, data, error } = useQuery({
    queryKey: ["recents"],
    queryFn: getRecentTransactions,
  });

  return (
    <View style={styles.container}>
      {console.log(data[0].document)}
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
        <RecentsListItem />
        <RecentsListItem />
        <RecentsListItem />
      </View>
    );
  }
}

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
