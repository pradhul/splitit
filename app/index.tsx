import { Colors } from "@/constants/Colors";
import { View, StyleSheet, Text } from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import { FontSize, Margins, Paddings } from "@/constants/Dimensions";
import RecentsListItem from "@/components/RecentsListItem";

const colors = Colors.light;

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
        <PrimaryInput />
        <PrimaryButton />
      </View>

      <View style={styles.recentPaymentsContainer}>
        <Text style={styles.recentsTitle}>Recents</Text>
        <RecentsListItem />
        <RecentsListItem />
        <RecentsListItem />
      </View>
    </View>
  );
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
    marginTop: Margins.large
  },
  recentsTitle: {
    color: colors.neutral1,
    fontSize: FontSize.normal,
    fontWeight: 'bold',
    padding: Paddings.large,
  },
});
