import { Margins, Paddings } from "@/constants/Dimensions";
import { StyleSheet, View, Text } from "react-native";

export default function RecentsListItem() {
  return (
    <View style={styles.recentsItemContainer}>
      <View style={styles.recentsIcon}></View>

      <View style={styles.recentsDetailContainer}>
        <Text>Graphic</Text>
        <Text>Someone paid 100 to someone</Text>
        <Text>on 29th Friday evening 4:30</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recentsItemContainer: {
    borderWidth: 1,
    margin: Margins.large,
    flexDirection: "row",
    alignItems: "center",
  },
  recentsIcon: {
    borderWidth: 1,
    width: 50,
    height: 50,
  },
  recentsDetailContainer: {
    borderWidth: 1,
    padding: Paddings.normal,
    flexDirection: "column",
    flexGrow: 1,
  },
});
