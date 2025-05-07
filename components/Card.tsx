import { Paddings, Margins } from "@/constants/Dimensions";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const Card = ({ children, style }: { children: React.ReactElement | React.ReactElement[]; style?: any }) => {
  return (
    <View testID="card" style={[styles.card, style]}>
      {children}
    </View>
  );
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
