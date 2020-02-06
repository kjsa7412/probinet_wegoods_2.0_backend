import { prisma } from "../../../generated/prisma-client";

export default {
  News: {
    comments: ({ id }) => prisma.news({ id }).comments(),
    user: ({ id }) => prisma.news({ id }).user(),

    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { news: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
