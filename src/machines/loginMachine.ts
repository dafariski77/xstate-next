import { loginUser, registerUser } from "@/actions/authActions";
import { assign, fromPromise, setup } from "xstate";
import Cookie from "js-cookie";

interface ICallback<TData = any, TError = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

export const loginMachine = setup({
  types: {
    context: {} as {
      fullname?: string | undefined;
      email: string;
      password: string;
      confirmPassword?: string | undefined;
      isLoading: boolean;
      error?: string;
      message?: string;
      callbacks?: ICallback;
    },
    events: {} as
      | {
          type: "SET_USER_LOGIN";
          value: {
            email: string;
            password: string;
          };
        }
      | {
          type: "SET_USER_REGISTER";
          value: {
            email: string;
            fullname: string | undefined;
            password: string;
            confirmPassword: string | undefined;
          };
        }
      | {
          type: "LOGIN";
          callbacks?: ICallback;
        }
      | {
          type: "REGISTER";
          callbacks?: ICallback;
        }
      | { type: "ERROR" }
      | { type: "SUCCESS" },
    input: {} as {
      fullname: string | undefined;
      email: string;
      password: string;
      confirmPassword: string | undefined;
    },
    tags: {} as
      | "idle"
      | "pending-login"
      | "pending-register"
      | "success"
      | "error",
  },
  actors: {
    login: fromPromise(
      ({ input }: { input: { email: string; password: string } }) => {
        return loginUser(input);
      }
    ),
    register: fromPromise(
      ({
        input,
      }: {
        input: {
          email: string;
          password: string;
          fullname: string;
          confirmPassword: string;
        };
      }) => {
        return registerUser(input);
      }
    ),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBsD2UCWA7AxAZQFEAVAfQFVCAlEgGQHkBxASQDkBtABgF1FQAHVLAwAXDKiy8QAD0QBmAOyyAdADZZARgBMKgCwBWNRw4AOFQBoQAT0TqO8pbJ0BOF7M2zZHBZvUBfXxZomLiEpBQE1JQEzHhEEZw8SCACQqLikjIIsiocDjoK8vJ2xtnmVjaa-oHo2EoYEMhgOPTM7NySKSJiEkmZ6k7qSppGI3pOuvI6FtYIhkMD8prGHPo+mvJVIEG19Y04UTFxlAkdgl3pvTYDQyNGYxNT5Qh6y0pj6vJaLyoqxnqym22WCUfDAWAg2CgAFogTgIOIwHUsAA3VAAa0RQJOSU6aR6oEyw2MSmWRi04z0HByTkeM3yxL0OnUKgGOmMmhpOh+gJqwNB4MhMN5ODAACdRahRSDkABDYQAM0lAFslFj2jizniMogcrknJpKZp3OpjPIfk5poh9MT5C9ZP91osDH4AlteSCwRCsNDRWBMLBhGK4QikaiMUpff7A6LsfxNd1tQh+oNhrd7jpJpaEOsVEoXPmNLbbJMecEPQLvVDIxgA0GxRKpXxZQrlRG-TXo7HkvGLgSdUY8waOEaNKbzVnSkodCZHGa3CsOQDXUClLAAK4AYw3cFgzUYrC7uITlyT11To3GGdpiH+uWMAxZnyW6hepdq663O-20SYsXi6rjVJjz7U8U1uDh00zJ5sicPJ82MdkvGGDZl3detJT3VpDx7fFpB1DMlGHSlHHGRDTSzPQ9EGWwShefVNC5Gk32BdDRW-Q5-0SQDzlwzIVGGKcFH+dRmSKTx1AnZklCKEo3A+e0Xz0fxXSwVAIDgSQgVOIDezwhAoQkp4TVglkXFMLkckmHRmLqBowG0njEwzLN+OUJwixMPRPk8FYbP5L1oS0jUdN4uRPiUZkDRNFRFmMNks2cewOAWforzZRYVD8z1BWrWtRQcrUT3tJLTSo7R8icRxDJmRwGWcdy2UcWR7xsj9t1geBgsck9nKeKj7B0JlfhKdwxgMGzWIK4C9LNPQp1tLw9AY9QqotJ4rxJDwmtM5w3GU3wgA */
  id: "login",
  initial: "idle",
  context: {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: undefined,
    message: undefined,
    isLoading: false,
    callbacks: undefined,
  },
  states: {
    idle: {
      on: {
        LOGIN: {
          target: "pending-login",
          actions: assign({
            callbacks: ({ event }) => event.callbacks,
          }),
        },
        REGISTER: {
          target: "pending-register",
          actions: assign({
            callbacks: ({ event }) => event.callbacks,
          }),
        },
      },
    },
    "pending-login": {
      entry: assign({
        isLoading: true,
      }),
      invoke: {
        id: "login",
        src: "login",
        input: ({ context }) => ({
          email: context.email,
          password: context.password,
        }),
        onError: {
          target: "error",
          actions: [
            assign({
              error: ({ event }) => (event.error as Error).message,
              message: undefined,
              isLoading: false,
            }),
            ({ context, event }) => {
              context.callbacks?.onError?.(event.error);
            },
          ],
        },
        onDone: {
          target: "success",
          actions: [
            assign({
              message: "Success Register",
              error: undefined,
              isLoading: false,
            }),
            ({ context, event }) => {
              Cookie.set("token", event.output.data?.token || "");
              context.callbacks?.onSuccess?.(event.output);
            },
          ],
        },
      },
    },
    "pending-register": {
      entry: assign({
        isLoading: true,
      }),
      invoke: {
        id: "register",
        src: "register",
        input: ({ context }) => ({
          email: context.email,
          fullname: context.fullname || "",
          password: context.password,
          confirmPassword: context.confirmPassword || "",
        }),
        onError: {
          target: "error",
          actions: [
            assign({
              error: ({ event }) => (event.error as Error).message,
              message: undefined,
              isLoading: false,
            }),
            ({ context, event }) => {
              context.callbacks?.onError?.(event.error);
            },
          ],
        },
        onDone: {
          target: "success",
          actions: [
            assign({
              message: "Success Register",
              error: undefined,
              isLoading: false,
            }),
            ({ context, event }) => {
              context.callbacks?.onSuccess?.(event.output);
            },
          ],
        },
      },
    },
    success: {
      on: {
        LOGIN: "pending-login",
        REGISTER: "pending-register",
      },
    },
    error: {
      on: {
        LOGIN: "pending-login",
        REGISTER: "pending-register",
      },
    },
  },
  on: {
    SET_USER_LOGIN: {
      actions: assign({
        email: ({ event }) => event.value.email,
        password: ({ event }) => event.value.password,
      }),
    },
    SET_USER_REGISTER: {
      actions: assign({
        fullname: ({ event }) => event.value.fullname,
        email: ({ event }) => event.value.email,
        password: ({ event }) => event.value.password,
        confirmPassword: ({ event }) => event.value.confirmPassword,
      }),
    },
  },
});
