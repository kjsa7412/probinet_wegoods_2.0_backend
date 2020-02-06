import { prisma } from "../../../generated/prisma-client";

export default {
  Comment: {
    user: ({ id }) => prisma.comment({ id }).user(),
    goods: ({ id }) => prisma.comment({ id }).goods(),
    post: ({ id }) => prisma.comment({ id }).post(),
    support: ({ id }) => prisma.comment({ id }).support()
  }
};
