/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-11-19 10:16:35
 * @modify date 2024-11-19 10:16:35
 * @desc [description]
 */
import { Titles } from "@/constants/Strings";
import { router, Slot, Stack } from "expo-router";
import { DevToolsBubble } from "react-native-react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
const queryClient = new QueryClient();

//FIXME: even though the loading screen is implemented here it wont work properly
// there needs to be an additional _layout screen to protect the authenticated screens from rendering
// @see https://docs.expo.dev/router/reference/authentication/#using-react-context-and-route-groups
export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user Authenticated ?", !!user);
      setIsAuthenticated(!!user);
      if (!user) {
        router.replace("/"); // Navigate to login page if not authenticated.
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          {isAuthenticated === null ? (
            <Stack.Screen name="SplashScreen" />
          ) : isAuthenticated ? (
            <>
              <Stack.Screen name="RecordPayment" options={{ title: Titles.recordPaymentPage }} />
              <Slot />
            </>
          ) : (
            <>
              <Stack.Screen name="index" options={{ title: "Welcome!" }} />
            </>
          )}
        </Stack>
        <DevToolsBubble />
      </QueryClientProvider>
    </Provider>
  );
}
