import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editGoods: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, files, title, description, supportPercent, action } = args;
      const { user } = request;
      const goods = await prisma.$exists.goods({ id, user: { id: user.id } });
      if (goods) {
        if (action === EDIT) {
          return prisma.updateGoods({
            data: {
              files: { set: files },
              title,
              description,
              supportPercent
            },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deleteGoods({ id });
        } else {
          throw Error("You can't do that. Action is undefined.");
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
