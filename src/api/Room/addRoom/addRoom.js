import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toUserId, title, file } = args;

      return prisma.createRoom({
        participants: {
          connect: [{ id: user.id }, { id: toUserId }]
        },
        title,
        file
      });
    }
  }
};
