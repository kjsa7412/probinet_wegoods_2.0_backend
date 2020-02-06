import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUserFromEmail: async (_, args) => {
      const { email } = args;

      const user = await prisma.user({ email });

      if (user) {
        return user;
      } else {
        return { id: "", email: "", password: "", username: "" };
      }
    }
  }
};
