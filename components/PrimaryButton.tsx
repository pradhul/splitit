/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-01 03:56:03
 * @modify date 2025-01-24 22:07:42
 * @desc [description]
 */
import { Colors } from "@/constants/Colors";
import { Paddings, BorderRadius, FontSize } from "@/constants/Dimensions";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const colors = Colors.light;

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  status = "idle",
}: {
  title: string;
  onPress: Function;
  disabled?: boolean;
  status?: Status;
}) {
  const bgColor = { backgroundColor: disabled ? colors.disabled : colors.primary };

  const buttonContent = (status: Status) => {
    switch (status) {
      case "pending":
        return <ActivityIndicator size={"small"} color={Colors.light.white} />;
      case "success":
        return <MaterialIcons style={{ alignSelf: "center" }} name="done" size={24} color={Colors.light.white} />;
      case "error":
        return <MaterialIcons style={{ alignSelf: "center" }} name="error" size={24} color={Colors.light.white} />;
      default:
        return <Text style={[styles.text]}>{title}</Text>;
    }
  };

  return (
    <Pressable testID="primary-button" style={[styles.button, bgColor]} disabled={disabled} onPress={() => onPress()}>
      {buttonContent(status)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  debug: {
    borderWidth: 1,
    alignSelf: "center",
  },
  button: {
    backgroundColor: colors.primary,
    padding: Paddings.large,
    borderRadius: BorderRadius.button,
    opacity: 0.9,
  },
  text: {
    color: colors.neutral,
    fontSize: FontSize.normal,
    textAlign: "center",
    fontWeight: "bold",
  },
});
