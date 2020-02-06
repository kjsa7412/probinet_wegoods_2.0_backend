import { prisma } from "../../../generated/prisma-client";

export default {
  Bookmark: {
    goods: ({ id }) => prisma.like({ id }).goods(),
    user: ({ id }) => prisma.like({ id }).user()
  }
};
