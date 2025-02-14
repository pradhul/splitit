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
import { StyleSheet, TextInput, Platform } from "react-native";

const colors = Colors.light;
interface IPrimaryInput {
  autofocus?: boolean;
  keyboardType?: "number-pad" | "default";
  size?: "normal" | "large";
  placeholder: string;
  inputValue: string;
  style?: object;
  onFocused?: () => void;
  onValueChange: Dispatch<SetStateAction<string>>;
}

function PrimaryInput({
  autofocus = true,
  keyboardType = "default",
  size = "normal",
  placeholder = "",
  inputValue,
  onValueChange,
  style,
  onFocused,
}: React.PropsWithChildren<IPrimaryInput>) {
  const _size = { fontSize: size === "normal" ? 14 : 50 };
  const _textAlignment = { textAlign: keyboardType === "number-pad" ? "center" : "left" };

  return (
    <TextInput
      autoFocus={autofocus}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor={colors.disabled}
      value={inputValue || ""}
      style={[style, styles.inputPayment, _size, _textAlignment]}
      onChangeText={(value) => onValueChange(value)}
      onFocus={onFocused}
      underlineColorAndroid="transparent"
    />
  );
}

const styles = StyleSheet.create({
  inputPayment: {
    backgroundColor: Colors.light.white,
    color: colors.primary,
    padding: Paddings.normal,
    marginBottom: Margins.large,
    borderRadius: 20,
    // Remove focus outline styles for web
    ...(Platform.OS === 'web' ? {
      outlineWidth: 0,
      outlineColor: 'transparent',
      WebkitAppearance: 'none',
      boxShadow: 'none',
    } : {}),
  },
});

export default React.memo(PrimaryInput);
