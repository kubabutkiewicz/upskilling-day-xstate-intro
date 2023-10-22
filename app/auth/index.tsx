import { View, Text, Pressable } from "react-native";
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
      <View>
        <Text>Authenticated</Text>
        <Pressable onPress={logout}>
          <Text>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Page;
