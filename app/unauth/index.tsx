import { View, Text, Pressable } from "react-native";
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
      <View>
        <Text>Unathenticated</Text>
        <Pressable onPress={login}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Page;
