/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-01 03:56:03
 * @modify date 2024-12-01 03:56:03
 * @desc [description]
 */
import { Colors } from "@/constants/Colors";
import { Paddings, BorderRadius, FontSize } from "@/constants/Dimensions";
import { RecordPaymentPage } from "@/constants/Strings";
import { Pressable, StyleSheet, Text } from "react-native";

const colors = Colors.light;

export default function PrimaryButton() {
  return (
    <Pressable
      testID="primary-button"
      style={styles.buttonPayment}
      onPress={() => {}}
    >
      <Text style={styles.TextPayment}>
        {RecordPaymentPage.recordPaymentButton}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonPayment: {
    backgroundColor: colors.primary1,
    padding: Paddings.large,
    borderRadius: BorderRadius.button,
    opacity: 0.9,
  },
  TextPayment: {
    color: colors.neutral1,
    fontSize: FontSize.normal,
    textAlign: "center",
    fontWeight: "bold",
  },
});
