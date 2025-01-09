/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-20 14:56:08
 * @modify date 2024-12-20 14:56:08
 * @desc [description]
 */
import { Tag, TagGroup, GeneratedTag } from "@/components/Tag";
import { Paddings } from "@/constants/Dimensions";
import { View, Text, StyleSheet } from "react-native";

interface IPaymentOptions {
  updateCategories: Function;
  updatePaymentTo: Function;
  getNewCategory: (name: string) => void;
}
export default function PaymentOptions({
  updateCategories,
  updatePaymentTo,
  getNewCategory,
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
            <GeneratedTag addCategory={getNewCategory} />
          </TagGroup>
        </View>
      </View>
      {/* To section*/}
      <View style={styles.paymentPartiesContainer}>
        <Text>To</Text>
        <View style={styles.paymentParties}>
          <TagGroup multiselect onTagChange={updatePaymentTo}>
            <Tag
              type="user"
              text="projects/groupbill-f9c8d/databases/(default)/documents/users/5XM8nNSpEtKlucYHXdLJ" //FIXME: remove this, and implement logic for sending any info from inside
            />
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
