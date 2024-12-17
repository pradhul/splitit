/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-02 04:15:44
 * @modify date 2024-12-02 04:15:44
 * @desc [description]
 */
import { Colors } from "@/constants/Colors";
import { Paddings, Margins, FontSize } from "@/constants/Dimensions";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput } from "react-native";

const colors = Colors.light;
interface IPrimaryInput {
  autofocus?: boolean;
  keyboardType?: "number-pad" | "default";
  size?: "normal" | "large";
  placeholder: string;
  inputValue: string;
  onValueChange: Dispatch<SetStateAction<string>>;
}

function PrimaryInput({
  autofocus = true,
  keyboardType = "default",
  size = "normal",
  placeholder = "",
  inputValue,
  onValueChange,
}: React.PropsWithChildren<IPrimaryInput>) {
  const _size = { fontSize: size === "normal" ? 14 : 50 };

  return (
    <TextInput
      autoFocus={autofocus}
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={inputValue || ""}
      style={[styles.inputPayment, _size]}
      onChangeText={(value) => onValueChange(value)}
    />
  );
}

const styles = StyleSheet.create({
  inputPayment: {
    color: colors.primary,
    padding: Paddings.normal,
    textAlign: "center",
    marginBottom: Margins.large,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.primary,
  },
});

export default React.memo(PrimaryInput);
