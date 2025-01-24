import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import { Colors } from "@/constants/Colors";
import { Margins, Paddings } from "@/constants/Dimensions";
import { View, Text, StyleSheet } from "react-native";
import Card from "@/components/Card";
import { FlashList } from "@shopify/flash-list";

const NewGroup = () => {
  const groupList = [
    {
      name: "Weekend Getaway",
      noOfPeople: 4,
      description: "A trip to the Mountains",
      status: "Settled",
    },
    {
      name: "Beach Trip",
      noOfPeople: 4,
      description: "A trip to the Beaches",
      status: "Not Settled",
    },
    {
      name: "A Long Road Trip",
      noOfPeople: 4,
      description: "A Long road trip",
      status: "Settled",
    },
  ];

  const getGroupCard = ({ item }) => (
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

  return (
    <View style={styles.container}>
      <View style={styles.subSection}>
        <Text style={styles.titleText}>New Group</Text>

        <Card>
          <Text style={[styles.cardText, styles.primaryText]}>Select Users</Text>
          <PrimaryInput placeholder="Select users by name" inputValue={""} onValueChange={() => {}} />
          <PrimaryInput placeholder="Invite by email" inputValue={""} onValueChange={() => {}} />
        </Card>

        <PrimaryButton title="Create Group" onPress={() => {}} />
      </View>
      <View style={styles.subSection}>
        <Text style={styles.titleText}>Existing Groups</Text>
        <FlashList
          data={groupList}
          renderItem={getGroupCard}
          keyExtractor={(item) => `${item.name}${item.noOfPeople}`}
        />
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
