import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { inspect } from "react-native-flipper-xstate";
import { useAuthContext } from "../context/AuthContext";
import { useActor, useSelector } from "@xstate/react";

if (__DEV__) {
  inspect();
}
const selector = (state) => {
  return state.matches("checkingToken") || state.matches("authenticating");
};
const Page = () => {
  const { authService } = useAuthContext();
  const isLoading = useSelector(authService, selector);
  if (isLoading) {
    return (
      <SafeAreaView>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
