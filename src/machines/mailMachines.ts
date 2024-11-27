import { assign, setup } from "xstate";

export const mailMachine = setup({
  types: {
    context: {} as {
      mailId?: string | undefined;
    },
    events: {} as {
      type: "SET_SELECTED_MAIL";
      value: {
        mailId: string;
      };
    },
    input: {} as {
      mailId: string;
    },
  },
}).createMachine({
  id: "set-mail-id",
  context: {
    mailId: "",
  },
  on: {
    SET_SELECTED_MAIL: {
      actions: assign({
        mailId: ({ event }) => event.value.mailId,
      }),
    },
  },
});
