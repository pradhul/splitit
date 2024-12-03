import Tag from "@/components/Tag";
import TagGroup from "@/components/TagGroup";
import { Paddings } from "@/constants/Dimensions";
import { View, Text, StyleSheet } from "react-native";

export default function PaymentOptions() {
  return (
    <View style={styles.paymentDetails}>
      <View style={styles.paymentCategoryContainer}>
        <Text>Category</Text>
        <View style={styles.paymentCategories}>
          <TagGroup multiselect>
            <Tag
              onTagSelected={(selected: string) =>
                console.log("Selected Tag", selected)
              }
              text="Fuel"
            />
            <Tag text="Food" />
            <Tag text="Alcohol" />
          </TagGroup>
        </View>
      </View>
      <View style={styles.paymentPartiesContainer}>
        <Text>To</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentDetails: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Paddings.normal,
  },
  paymentCategoryContainer: {
    borderWidth: 1,
    flex: 1,
  },
  paymentCategories: {
    flexDirection: "row",
    padding: Paddings.normal,
  },
  paymentPartiesContainer: {
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
  },
});
