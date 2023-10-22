import { useInterpret, useMachine } from "@xstate/react";
import { authMachine } from "../state-machines/auth";
import React from "react";
import { router } from "expo-router";
import { assign } from "xstate";

type AuthContextType = {
  authService: ReturnType<typeof useInterpret<typeof authMachine>>;
};
const AuthContext = React.createContext({} as AuthContextType);
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const authService = useInterpret(authMachine, {
    devTools: true,
    actions: {
      navigateToAuthStack: () => {
        console.log("navigateToAuthStack");
        router.replace("/auth");
      },
      navigateToUnAuthStack: () => {
        console.log("navigateToUnAuthStack");
        router.replace("/unauth");
      },
      setToken: assign({
        token: (_, event) => event.data,
      }),
      removeToken: assign({
        token: () => "",
      }),
    },
  });

  return (
    <AuthContext.Provider value={{ authService }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => React.useContext(AuthContext);
