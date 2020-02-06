import { prisma } from "../../../generated/prisma-client";

export default {
  Like: {
    post: ({ id }) => prisma.like({ id }).post(),
    support: ({ id }) => prisma.like({ id }).support(),
    user: ({ id }) => prisma.like({ id }).user()
  }
};
