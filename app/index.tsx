import { Colors } from "@/constants/Colors";
import { View, StyleSheet } from "react-native";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";

const colors = Colors.light;

export default function Index() {
  return (
    <View style={styles.container}>
      <View>
        <PrimaryInput />
        <PrimaryButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backGround,
  },
});
