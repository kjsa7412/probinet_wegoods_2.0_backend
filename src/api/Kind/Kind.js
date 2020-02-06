import { prisma } from "../../../generated/prisma-client";

export default {
  Kind: {
    goodses: ({ id }) => prisma.kind({ id }).goodses()
  }
};
