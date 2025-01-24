import { Paddings, Margins } from "@/constants/Dimensions";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const Card = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    padding: Paddings.large,
    marginBottom: Margins.large,
  },
});

export default Card;
