import { Tag, TagGroup } from "@/components/Tag";
import { Paddings } from "@/constants/Dimensions";
import { View, Text, StyleSheet } from "react-native";

interface IPaymentOptions {
  updateCategories: Function;
  updatePaymentTo: Function;
}
export default function PaymentOptions({
  updateCategories,
  updatePaymentTo,
}: IPaymentOptions) {
  return (
    <View style={styles.paymentDetails}>
      {/* Category section*/}
      <View style={styles.paymentCategoryContainer}>
        <Text>Category</Text>
        <View style={styles.paymentCategories}>
          <TagGroup multiselect onTagChange={updateCategories}>
            <Tag text="Fuel" />
            <Tag text="Food" />
            <Tag text="Alcohol" />
          </TagGroup>
        </View>
      </View>
      {/* To section*/}
      <View style={styles.paymentPartiesContainer}>
        <Text>To</Text>
        <View style={styles.paymentParties}>
          <TagGroup multiselect onTagChange={updatePaymentTo}>
            <Tag type="user" text="Person 1" />
          </TagGroup>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentDetails: {
    // borderWidth: 1,
    padding: Paddings.normal,
  },
  paymentCategoryContainer: {
    // borderWidth: 1,
  },
  paymentCategories: {
    // borderWidth: 1,
    flexDirection: "row",
    padding: Paddings.normal,
    flexWrap: "wrap",
  },
  paymentPartiesContainer: {
    // borderWidth: 1,
    padding: Paddings.normal,
    flex: 1,
    flexDirection: "column",
  },
  paymentParties: {
    flexDirection: "row",
  },
});
