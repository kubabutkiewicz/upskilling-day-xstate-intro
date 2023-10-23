import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../context/AuthContext";

const Page = () => {
  const { authService } = useAuthContext();
  const login = () => {
    authService.send("LOGIN");
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Unathenticated</Text>
        <Pressable style={styles.pressable} onPress={login}>
          <Text style={styles.text}>Login</Text>
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
    borderRadius: 10,
  },
  text: {
    color: "white",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
