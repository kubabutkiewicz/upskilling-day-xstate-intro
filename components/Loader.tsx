import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useSelector } from "@xstate/react";
import { useAuthContext } from "../context/AuthContext";

const selector = (state) => {
  return (
    state.matches("checkingToken") ||
    state.matches("authenticating") ||
    state.matches("unauthenticating")
  );
};

const Loader = ({ children }: { children: React.ReactNode }) => {
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
  return <View>{children}</View>;
};

export default Loader;
