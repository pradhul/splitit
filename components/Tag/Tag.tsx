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
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export interface ITagProps {
  text: string;
  onTagSelected?: Function;
  onTagPress?: Function;
  isSelected?: boolean;
  type?: "category" | "user";
}
export default function Tag({
  text,
  onTagSelected,
  onTagPress,
  isSelected,
  type = "category",
}: ITagProps) {
  const { bounce, bounceStyle } = useBounce();
  const ellipsisLimit = 7;

  const isCategoryType = type === "category";
  const iconName = isCategoryType ? "fast-food" : "person";
  const tagTextStyle = {
    ...styles.tagText,
    fontWeight: isSelected ? "bold" : "normal",
  } as TextStyle;
  const tagStyle = {
    ...styles.categoryTag,
    backgroundColor: isSelected ? colors.accentSelected : colors.accent,
    borderRadius: isCategoryType ? 40 : 100,
    paddingVertical: isCategoryType ? Paddings.normal : Paddings.large,
    flexShrink: 1,
  };

  const truncateText = () => {
    const name = text && text.length > 7 ? `${text.slice(0, ellipsisLimit)}...` : text;
    return <Text style={tagTextStyle}>{name}</Text>;
  };

  const tagSelected = () => {
    bounce();
    onTagPress && onTagPress();
  };

  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <AnimatedTouchable
        style={[tagStyle, bounceStyle]}
        activeOpacity={1}
        onPress={() => tagSelected()}
      >
        <Ionicons name={iconName} size={20} color={colors.neutral} />
        {isCategoryType && truncateText()}
      </AnimatedTouchable>
      {!isCategoryType && truncateText()}
    </View>
  );
}
const colors = Colors.light;

const styles = StyleSheet.create({
  categoryTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Paddings.large,
    margin: Margins.small,
  },
  tagText: {
    color: colors.neutral,
  },
});
