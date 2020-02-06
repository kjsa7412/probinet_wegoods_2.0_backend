import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, files, title, description, action } = args;
      const { user } = request;
      const post = await prisma.$exists.post({
        id,
        user: { id: user.id }
      });
      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            data: {
              files: { set: files },
              title,
              description
            },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        } else {
          throw Error("You can't do that. Action is undefined.");
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
