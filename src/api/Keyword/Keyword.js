import { prisma } from "../../../generated/prisma-client";

export default {
  Keyword: {
    goodses: ({ id }) => prisma.keyword({ id }).goodses(),
    posts: ({ id }) => prisma.keyword({ id }).posts()
  }
};
