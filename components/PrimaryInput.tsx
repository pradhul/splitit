/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-02 04:15:44
 * @modify date 2024-12-02 04:15:44
 * @desc [description]
 */
import { Colors } from "@/constants/Colors";
import { Paddings, Margins } from "@/constants/Dimensions";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput } from "react-native";

const colors = Colors.light;
interface IPrimaryInput {
  autofocus?: boolean;
  keyboardType?: "number-pad" | "default";
  placeholder: string;
  inputValue: string;
  onValueChange: Dispatch<SetStateAction<string>>;
}

function PrimaryInput({
  autofocus = true,
  keyboardType = "default",
  placeholder = "",
  inputValue,
  onValueChange,
}: React.PropsWithChildren<IPrimaryInput>) {
  return (
    <TextInput
      autoFocus={autofocus}
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={inputValue || ""}
      style={styles.inputPayment}
      onChangeText={(value) => onValueChange(value)}
    />
  );
}

const styles = StyleSheet.create({
  inputPayment: {
    color: colors.primary1,
    padding: Paddings.normal,
    textAlign: "center",
    fontSize: 50,
    marginBottom: Margins.large,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.primary1,
  },
});

export default React.memo(PrimaryInput);
