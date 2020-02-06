import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addSupport: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { files, title, description, target } = args;
      const support = await prisma.createSupport({
        files: { set: files },
        title,
        description,
        target,
        user: { connect: { id: user.id } }
      });

      return support;
    }
  }
};
