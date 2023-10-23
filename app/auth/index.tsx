import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../context/AuthContext";

const Page = () => {
  const { authService } = useAuthContext();
  const logout = () => {
    authService.send("LOGOUT");
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Authenticated</Text>
        <Pressable style={styles.pressable} onPress={logout}>
          <Text style={styles.text}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "#9381FF",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
