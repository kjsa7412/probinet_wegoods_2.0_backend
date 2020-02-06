import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editSupport: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, files, title, description, target, action } = args;
      const { user } = request;
      const support = await prisma.$exists.support({
        id,
        user: { id: user.id }
      });
      if (support) {
        if (action === EDIT) {
          return prisma.updateSupport({
            data: {
              files: { set: files },
              title,
              description,
              target
            },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deleteSupport({ id });
        } else {
          throw Error("You can't do that. Action is undefined.");
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
