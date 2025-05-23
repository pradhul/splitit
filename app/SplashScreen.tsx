/**
 * @author Pradhul
 * @email pradhudev.1990@gmail.com
 * @create date 2024-12-20 14:55:48
 * @modify date 2024-12-20 14:55:48
 * @desc [description]
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
});
