import { setup } from "xstate";

interface IUser {
  fullname: string;
  email: string;
}

export const userMachine = setup({
  types: {
    context: {} as {
      user: IUser;
      token: string;
    },
    events: {} as
      | {
          type: "IS_LOGGED_ID";
          user: IUser;
        }
      | {
          type: "IS_LOGGED_OUT";
        }
      | {
          type: "LOG_OUT";
        },
  },
}).createMachine({
  id: "user",
  initial: "checkIfLoggedIn",
  states: {
    checkIfLoggedIn: {
      invoke: {},
    },
  },
});
