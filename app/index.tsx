import PrimaryButton from "@/components/PrimaryButton";
import { router } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function Registration() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    responseType: "id_token",
    scopes: ["openid", "email", "profile"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("Google Sign-In response:", JSON.stringify(response));
      const credentials = GoogleAuthProvider.credential(id_token);

      if (!id_token) {
        console.error("Missing id_token in Google Sign-In response.");
        return;
      }
      // Sign in with the credential from the response
      signInWithCredential(auth, credentials)
        .then(() => router.replace("/RecordPayment"))
        .catch((error) => console.log(error.message));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
