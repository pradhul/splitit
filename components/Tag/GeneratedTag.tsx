import { View } from "react-native";
import PrimaryInput from "@/components/PrimaryInput";
import { useState } from "react";

export default function GeneratedTag() {
  const [iconName, setIconName] = useState("");
  return (
    <View>
      <PrimaryInput
        placeholder="Category"
        onValueChange={(val) => {
          console.log(val);
          setIconName(val);
        }}
        inputValue={iconName}
      />
    </View>
  );
}
