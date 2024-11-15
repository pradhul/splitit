import { Titles } from "@/constants/Strings";
import { Stack } from "expo-router";
import { DevToolsBubble } from "react-native-react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{ headerShown: true, title: Titles.recordPaymentPage }}
      >
        <Stack.Screen name="index" />
        <DevToolsBubble />
      </Stack>
      <DevToolsBubble />
    </QueryClientProvider>
  );
}
