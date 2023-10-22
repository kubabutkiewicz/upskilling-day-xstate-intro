import { inspect } from "@xstate/inspect";
import AuthContextProvider from "../context/AuthContext";
import Loader from ".";
import { Redirect, Slot, Stack } from "expo-router";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  return (
    <AuthContextProvider>
      <Stack />
    </AuthContextProvider>
  );
}
