import { Titles } from "@/constants/Strings";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: true, title: Titles.recordPaymentPage}} >
      <Stack.Screen name="index" />
    </Stack>
  );
}
