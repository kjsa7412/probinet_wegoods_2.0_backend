import { prisma } from "../../../generated/prisma-client";

export default {
  Star: {
    childStar: ({ id }) => prisma.star({ id }).childStar(),
    parentsStar: ({ id }) => prisma.star({ id }).parentsStar(),
    registedUser: ({ id }) => prisma.star({ id }).registedUser(),
    user: ({ id }) => prisma.star({ id }).user(),
    goodses: ({ id }) => prisma.star({ id }).goodses(),
    supports: ({ id }) => prisma.star({ id }).supports()
  }
};
