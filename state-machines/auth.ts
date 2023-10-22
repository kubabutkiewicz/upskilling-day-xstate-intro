import { assign, createMachine } from "xstate";
import * as SecureStore from "expo-secure-store";

const saveTokenInSecureStore = async (context: any) => {
  await SecureStore.setItemAsync("token", context.token);
};

const login = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("my-token");
    }, 1000);
  });
};

const getTokenFromSecureStore = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    return token;
  }
  throw new Error("No token found");
};

const logout = async (): Promise<void> => {
  await SecureStore.deleteItemAsync("token");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

type MachineContext = {
  token: string;
};

type MachineEvents =
  | {
      type: "LOGIN";
    }
  | {
      type: "LOGOUT";
    };

export const authMachine = createMachine<MachineContext, MachineEvents>({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOhzEwGsCoAVAe0rHwGIJ7CSCA3RsEtFjyFS5KjQZN8CHvUzoALrg4BtAAwBddRsSgADvVi4lHXSAAeiAEwBmAKwkAjFYAcztQBYXtxy+8AaEABPRDsrKxIANgB2aLU3aKsPcIBORwBfdMDBHAJiMmwKanw6PlYwACcK+gqSPQAbRQAzGtQBDFyRAqKJMpl8XnkTfG1tMwMjYbNLBFsHZzcrT28bXwDgxA9HBxtEtMj7O121G0zsjuF8gFd8dCuFQvwlIcgWABkAeQBxAEkAOTGSBAE2Mynw00QkUiEWhjhSNl2NhckRcahSgRCCC2HhIcWhHmSBw8akiKTOIByl1IdwezGeihobA4-FkTHaQjy1Puj3pShK-UGDNUmkB+kMoNMQJmKTiJCsR3CLhSVhSLmizgxiCRaicCJsVmi2siBOR5MpnJINJ5uCGjMq1VqDWarXZnXyVrpNoZ-NktuFWk043FUylkOhUSscIRhuRqPRGwQNhiEbsajTYQ8qoJHjNFwtHqeXoUr0+Xw+AFVaKLgcGwRCEDKdfL9a5lar1VZNQg3CQ0YjonYvCk1Oqc1kKXmujcC7zGexOKz+Oap7duZ7bT6BnIhSMRYGgSCQ6AZnMnK53F4fH5Owmky45ftEpFHKSPNEXGPzhyVzOi3aqjUdSNAoLQVG0y7XKutKFhuUACtuwyjPuYqTHWoazPYZ6LMsV7rJiST3nYH67Midh2LE+qZOO+D0BAcBmBBRBBqhkrHogAC0kRdpxvZpnx-F8YcubfvkYjFKUUjMRK4LoXYkS9sORHDtEUIknEdhdqm8nqrEBqDt45FvsJbqkNOa4wYokBSUeFhasivZRsRmaREcKldneuIeDEckEipWanOOjGWuZs4lNZaFsd2JJytspIDkk2zxpiJEkIccLDikqpqFYkTGVSwXQbyVkHrWrG2QgjiOLsJByTl8ThMkrjuWRnneDKRwjtCCJ5RaZmFX+YUlSxMmRck7mRnKUJQiqcTvgaVHpEAA */
  context: {
    token: "",
  },
  id: "auth-machine",
  predictableActionArguments: true,
  initial: "checkingToken",
  states: {
    checkingToken: {
      invoke: {
        src: getTokenFromSecureStore,
        onDone: {
          target: "authenticated",
          actions: "setToken",
        },
        onError: {
          target: "unauthenticated",
        },
      },
    },
    unauthenticated: {
      entry: "navigateToUnAuthStack",
      on: {
        LOGIN: {
          target: "authenticating",
        },
      },
    },
    authenticating: {
      invoke: {
        src: login,
        onDone: {
          target: "authenticated",
          actions: "setToken",
        },
        onError: {
          target: "unauthenticated",
        },
      },
    },
    authenticated: {
      invoke: {
        src: saveTokenInSecureStore,
      },
      entry: "navigateToAuthStack",
      on: {
        LOGOUT: {
          target: "unauthenticating",
          actions: "removeToken",
        },
      },
    },
    unauthenticating: {
      invoke: {
        src: logout,
        onDone: {
          target: "unauthenticated",
        },
        onError: {
          target: "authenticated",
        },
      },
    },
  },
});
