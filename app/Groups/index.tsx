import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import { Colors } from "@/constants/Colors";
import { Margins, Paddings } from "@/constants/Dimensions";
import { SetStateAction } from "react";
import { View, Text, StyleSheet } from "react-native";

const NewGroup = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subSection}>
        <Text style={styles.titleText}>New Group</Text>
        <View style={[styles.card, styles.cardIndividual]}>
          <Text style={[styles.cardText, styles.primaryText]}>Select Users</Text>
          <PrimaryInput placeholder="Select users by name" inputValue={""} onValueChange={() => {}} />
          <PrimaryInput placeholder="Invite by email" inputValue={""} onValueChange={() => {}} />
        </View>

        <PrimaryButton title="Create Group" onPress={() => {}} />
      </View>
      <View style={styles.subSection}>
        <Text style={styles.titleText}>Existing Groups</Text>

        <View style={[styles.card, styles.cardIndividual]}>
          <Text style={[styles.cardText, styles.primaryText]}>Weekend Getaway</Text>
          <Text style={[styles.cardText]}>4 People | A trip to the Mountains</Text>
          <View style={[styles.cardText, styles.status]}>
            <Text>Status :</Text>
            <Text>Settled</Text>
          </View>
        </View>

        <View style={[styles.card, styles.cardIndividual]}>
          <Text style={[styles.cardText, styles.primaryText]}>Weekend Getaway</Text>
          <Text style={[styles.cardText]}>4 People | A trip to the Mountains</Text>
          <View style={[styles.cardText, styles.status]}>
            <Text>Status :</Text>
            <Text>Settled</Text>
          </View>
        </View>

        <View style={[styles.card, styles.cardIndividual]}>
          <Text style={[styles.cardText, styles.primaryText]}>Weekend Getaway</Text>
          <Text style={[styles.cardText]}>4 People | A trip to the Mountains</Text>
          <View style={[styles.cardText, styles.status]}>
            <Text>Status :</Text>
            <Text>Settled</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.neutral,
    padding: Paddings.large,
  },
  subSection: {
    marginVertical: Margins.large,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: Margins.large,
  },
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

export default NewGroup;
