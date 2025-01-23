import { useState, useEffect } from "react";
import { router, Slot, Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Titles } from "@/constants/Strings";

//FIXME: even though the loading screen is implemented here it wont work properly
// there needs to be an additional _layout screen to protect the authenticated screens from rendering
// @see https://docs.expo.dev/router/reference/authentication/#using-react-context-and-route-groups
const Routes = () => {
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

  const splashScreen = () => <Stack.Screen name="SplashScreen" />;
  const welcomeScreen = () => <Stack.Screen name="index" options={{ title: "Welcome!" }} />;
  const appScreens = () => {
    return (
      <>
        <Stack.Screen name="RecordPayment" options={{ title: Titles.recordPaymentPage }} />
        <Slot />
      </>
    );
  };
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated === null ? splashScreen() : isAuthenticated ? appScreens() : <>{welcomeScreen()}</>}
    </Stack>
  );
};

export default Routes;
