/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-01 03:55:55
 * @modify date 2024-12-01 03:55:55
 * @desc [description]
 */
import { Colors } from "@/constants/Colors";
import { Margins, Paddings } from "@/constants/Dimensions";
import { useBounce } from "@/hooks/useBounce";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Animated from "react-native-reanimated";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export interface ITagProps {
  text: string;
  onTagSelected?: Function;
  onTagPress?: Function;
  isSelected?: boolean;
}
export default function Tag({
  text,
  onTagSelected,
  onTagPress,
  isSelected,
}: ITagProps) {
  const { bounce, bounceStyle } = useBounce();
  const tagTextStyle = {
    ...styles.tagText,
    fontWeight: isSelected ? "bold" : "normal",
  } as TextStyle;
  const tagBGColor = {
    ...styles.categoryTag,
    backgroundColor: isSelected ? colors.accent1Selected : colors.accent1,
  };

  function tagSelected(): void {
    bounce();
    onTagPress && onTagPress();
  }

  return (
    <AnimatedTouchable
      style={[tagBGColor, bounceStyle]}
      activeOpacity={1}
      onPress={() => tagSelected()}
    >
      <MaterialCommunityIcons name="fuel" size={20} color={colors.neutral1} />
      <Text style={tagTextStyle}>{text}</Text>
    </AnimatedTouchable>
  );
}
const colors = Colors.light;

const styles = StyleSheet.create({
  categoryTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Paddings.large,
    paddingVertical: Paddings.normal,
    borderRadius: 40,
    margin: Margins.small,
  },
  tagText: {
    color: colors.neutral1,
  },
});
