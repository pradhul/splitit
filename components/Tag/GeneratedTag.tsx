import { View } from "react-native";
import PrimaryInput from "@/components/PrimaryInput";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { useDelay } from "@/hooks/useBounce";
import Animated from "react-native-reanimated";

interface GeneratedTagProps {
  addCategory: (name: string) => void;
}

export default function GeneratedTag({ addCategory }: GeneratedTagProps) {
  const [name, setName] = useState("");
  const { delay, delayStyle } = useDelay();

  return (
    <View style={{ flexDirection: "row" }}>
      <PrimaryInput
        placeholder="Category"
        onValueChange={(val) => {
          setName(val);
          delay(val.length === 0 ? "hide" : "show");
        }}
        inputValue={name}
      />
      <Animated.View style={delayStyle}>
        <Entypo
          style={[delayStyle]}
          onPress={() => addCategory(name)}
          name="chevron-with-circle-right"
          size={24}
        />
      </Animated.View>
    </View>
  );
}
