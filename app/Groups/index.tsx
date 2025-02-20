/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2025-01-24 22:08:00
 * @modify date 2025-01-24 22:08:00
 * @desc [description]
 */
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import { Colors } from "@/constants/Colors";
import { Margins, Paddings } from "@/constants/Dimensions";
import { View, Text, StyleSheet } from "react-native";
import Card from "@/components/Card";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllGroups, saveNewGroup } from "@/services";

const NewGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState("");
  const [emails, setEmails] = useState("");

  const { isRefetching, refetch, data: groups, error } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
  });


  const { status, ..._saveNewGroup } = useMutation({
    mutationFn: saveNewGroup,
    onSuccess: () => console.log("Successfully added group"),
    onError: (err) => console.log("Error adding group", err),
    onSettled: () => console.log("Settled adding group"),
  });

  const createNewGroup = () => {
    const newGroup: Group = {
      name: groupName,
      noOfPeople: 4,
      description,
      status: "New",
    };
    _saveNewGroup.mutate(newGroup);
  };

  /** An individual group card for the existing groups list */
  const getGroupCard = ({ item }: { item: Group }) => (
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
          <PrimaryInput
            placeholder="Group Name"
            inputValue={groupName}
            onValueChange={setGroupName}
          />
          <PrimaryInput placeholder="Description" inputValue={description} onValueChange={setDescription} />
          <PrimaryInput placeholder="Select Users By Name" inputValue={users} onValueChange={setUsers} />
          <PrimaryInput placeholder="Invite Users By Email" inputValue={emails} onValueChange={setEmails} />
        </Card>

        <PrimaryButton title="Create Group" status={status as Status} onPress={createNewGroup} />
      </View>
        <View style={[styles.subSection, styles.listContainer]}>
          <Text style={styles.titleText}>Existing Groups</Text>
          <FlashList
            onRefresh={async() => await refetch()}
            refreshing={true}
            data={groups || []}
            renderItem={getGroupCard}
            keyExtractor={(item) => `${item.name}${item.noOfPeople}`}
            estimatedItemSize={100}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backGround,
    padding: Paddings.large,
  },
  subSection: {
    marginVertical: Margins.large,
  },
  listContainer: {
    flex: 1,
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
