import { inspect } from "@xstate/inspect";
import AuthContextProvider from "../context/AuthContext";
import Loader from ".";
import { Redirect, Slot, Stack } from "expo-router";

export default function App() {
  return (
    <AuthContextProvider>
      <Stack />
    </AuthContextProvider>
  );
}
