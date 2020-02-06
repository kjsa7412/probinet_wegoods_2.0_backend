import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { files, title, description } = args;
      const post = await prisma.createPost({
        files: { set: files },
        title,
        description,
        user: { connect: { id: user.id } }
      });

      return post;
    }
  }
};
