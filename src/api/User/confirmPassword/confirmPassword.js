import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Query: {
    confirmPassword: async (_, args) => {
      const { term, password } = args;
      var user;
      var isEmail = false;

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (term.includes("@") && term.includes(".") && emailRegex.test(term)) {
        // email 인 경우 와 아닌 경우로 나눠서 어던 것으로 먼저 쿼리를 날려 볼지 선정한다.
        isEmail = true;
      }

      if (isEmail) {
        user = await prisma.user({ email: term });
      } else {
        user = await prisma.user({ username: term });
      }

      if (user) {
        if (user.password === password) {
          return generateToken(user.id);
        } else {
          return "Wrong password";
        }
      } else {
        return "Wrong email or username";
      }
    }
  }
};
