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
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgWgLbIGNMBLAOzADoiwCBrMqAFQHtaxSBiCZ8isgN1aU0WPIRK9qdBizakEA5gWTpiPANoAGALpbtiUAAdmsYqp4GQAD0QAmAMwBWCgEZbADhf2A7O4CcjvYALO4+ADQgAJ6Ijra2FABs3t5emgl+SZqhAL7ZESI4+ERklFL0pExCnGAATjXMNRSGADYqAGYNuBQFYsWSmDTllXIKpILK5qR6epbGppOWNggOzm6ePv6BIeFRiEEuzj72mieOsY5pfrn5GIXiJRSopAXsqhOQHAAyAPIA4gCSADkZkgQHMzGpSItEAkEvE4S5-ClEVlHAkItEEPsghRvGlju40bZYkF7NcQD0ihJhLdXsQJgwuDxKIo2N1br1qeysHSGRVRuMVJDpjpZiYIRZQUs-O4cRlibE-MS-PZVRjEPZ3JpXKr9t4gkEEu5bJpbOTKfdeC9SG8hRUOLV6o0Wu1Oty7n0aTybfS7VABUohRodCCjOKFlKYXDErZEX5kVrCejdgh7EkYxdjVrNEFHMaguaOVSHtbbegPj9ft8AKqMUNg8OQ6EIGXeCi2DJ+XNBYlZlzqhCeCiaFW+E5+PxrdzuQuiYu8J6l32qe3cXisr0ermL2k+vn+xQM4O6UWg8ER0BLFauDxeXwBYKhbwDtPuduT5JBbx+HNBLKzrcHh3b0y0ZR0GiaVp0A6GougtT1HmeXdQP5Q8gymENTzDeYm0jZYnBvdZ7y2J8B1sEIKDzA10knLtiTNclSGYCA4EseDqTFHDJUvRBsGTTFsGcCdhNsBIDk0PF4zJPIKSLS1SgGaQKlkdhOIlKE8McHFNRcfUXFhU1jS7AdYm1ewZXjfw0kcb9pJuOd5MQpd3ggNSL2sDVQgofZ3G8I10l8LUEiCF9vGcQlTKVcSsnIgDORLZDlwYNzcJ4wcTQoJULg8A0lTCvxQrfJxAg7FwTmKmcZPYhKQOXSAUu4jyEBcA4cQSfETTvb9HH7FNitxEJSR6o0Tn0uL50oYCBj3P0Go0tKexfWN21hI0O2JOE81yXIgA */
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
