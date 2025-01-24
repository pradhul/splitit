/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-01 03:56:03
 * @modify date 2025-01-24 22:07:42
 * @desc [description]
 */
import { Colors } from "@/constants/Colors";
import { Paddings, BorderRadius, FontSize } from "@/constants/Dimensions";
import { Pressable, StyleSheet, Text } from "react-native";

const colors = Colors.light;

export default function PrimaryButton({ title, onPress, disabled = false }: { title: string; onPress: Function; disabled?: boolean }) {
  const bgColor = { backgroundColor: disabled ? colors.disabled : colors.primary };
  return (
    <Pressable
      testID="primary-button"
      style={[styles.buttonPayment, bgColor]}
      disabled={disabled}
      onPress={() => onPress()}
    >
      <Text style={styles.TextPayment}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonPayment: {
    backgroundColor: colors.primary,
    padding: Paddings.large,
    borderRadius: BorderRadius.button,
    opacity: 0.9,
  },
  TextPayment: {
    color: colors.neutral,
    fontSize: FontSize.normal,
    textAlign: "center",
    fontWeight: "bold",
  },
});
