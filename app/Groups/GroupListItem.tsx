import { View, Text, StyleSheet } from "react-native";
import Card from "@/components/Card";
import { Colors } from "@/constants/Colors";
import { Margins, Paddings } from "@/constants/Dimensions";

/** An individual group card for the existing groups list */
export const GroupListItem = ({ item }: { item: Group }) => (
  <Card>
    <Text style={[styles.cardText, styles.primaryText]}>{item.name}</Text>
    <Text style={[styles.cardText]}>
      {item.noOfPeople} People | {item.description}
    </Text>
    <View style={[styles.cardText, styles.status]}>
      <Text>Status :</Text>
      <Text>{item.status}</Text>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  primaryText: {
    color: Colors.light.accent,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    padding: Paddings.large,
    marginBottom: Margins.large,
  },
  cardIndividual: {},
  cardText: {
    paddingVertical: Paddings.normal,
  },
  status: {
    flexDirection: "row",
  },
});
