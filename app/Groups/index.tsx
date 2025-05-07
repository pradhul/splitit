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
import { View, Text, StyleSheet, Modal } from "react-native";
import Card from "@/components/Card";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllGroups, saveNewGroup } from "@/services";
import { GroupListItem } from "./GroupListItem";
import AntDesign from "@expo/vector-icons/AntDesign";

const NewGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState("");
  const [emails, setEmails] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const {
    isRefetching,
    refetch,
    data: groups,
    error,
  } = useQuery({
    queryKey: ["groups"],
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

  return (
    <View style={styles.container}>
      <View style={styles.subSection}>
        {/* New Group */}
        <Modal visible={modalVisible} onRequestClose={() => setModalVisible(!setModalVisible)} transparent animationType="slide">
          <View style={styles.modalSection}>
            <Card style={styles.modelContent}>
              <Text style={styles.titleText}>New Group</Text>
              <Card>
                <PrimaryInput placeholder="Group Name" inputValue={groupName} onValueChange={setGroupName} />
                <PrimaryInput placeholder="Description" inputValue={description} onValueChange={setDescription} />
                <PrimaryInput placeholder="Select Users By Name" inputValue={users} onValueChange={setUsers} />
                <PrimaryInput placeholder="Invite Users By Email" inputValue={emails} onValueChange={setEmails} />
              </Card>
              <PrimaryButton
                title="Create Group"
                status={status as Status}
                onPress={() => {
                  createNewGroup();
                  setModalVisible(false);
                }}
              />
            </Card>
          </View>
        </Modal>
      </View>
      {/* Existing Groups */}
      <View style={[styles.subSection, styles.listContainer]}>
        <Text style={styles.titleText}>Existing Groups</Text>
        <FlashList
          onRefresh={async () => await refetch()}
          refreshing={true}
          data={groups || []}
          renderItem={({ item }) => <GroupListItem item={item} />}
          keyExtractor={(item) => `${item.name}${item.noOfPeople}`}
          estimatedItemSize={100}
        />
      </View>
      {!modalVisible && (
        // TODO: Add a floating button component when enough are needed in the app
        <>
          <AntDesign onPress={() => setModalVisible(true)} style={styles.plusButton} name="pluscircle" size={70} color={Colors.light.primary} />)
        </>
      )}
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
  modelContent: {
    width: "90%",
  },
  modalSection: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: Margins.large,
  },
  plusButton: {
    alignSelf: "center",
  },
});

export default NewGroup;
