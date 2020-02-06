import { prisma } from "../../../generated/prisma-client";
import typeDef from "../../../typeDef";

export default {
  User: {
    goodses: ({ id }) => prisma.user({ id }).goodses(),
    posts: ({ id }) => prisma.user({ id }).posts(),
    news: ({ id }) => prisma.user({ id }).news(),
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    bookmarks: ({ id }) => prisma.user({ id }).bookmarks(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms(),
    favorites: ({ id }) => prisma.user({ id }).favorites(),

    uncheckedAlarmsCount: ({ id }) =>
      prisma
        .alarmsConnection({
          where: { AND: [{ toUser: { id } }, { viewStatus: false }] }
        })
        .aggregate()
        .count(),

    goodsesCount: ({ id }) =>
      prisma
        .goodsesConnection({ where: { user: { id } } })
        .aggregate()
        .count(),

    reviewsCount: ({ id }) =>
      prisma
        .reviewsConnection({ where: { goods: { user: { id } } } })
        .aggregate()
        .count(),

    postsCount: ({ id }) =>
      prisma
        .postsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),

    newsCount: ({ id }) =>
      prisma
        .newsesConnection({ where: { user: { id } } })
        .aggregate()
        .count(),

    certificationsCount: ({ id }) =>
      prisma
        .certificationsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),

    supportHistoriesCount: ({ id }) =>
      prisma
        .supportHistoriesConnection({ where: { user: { id } } })
        .aggregate()
        .count(),

    buyCount: ({ id }) =>
      prisma
        .ordersConnection({ where: { user: { id } } })
        .aggregate()
        .count(),

    ordersCount: ({ id }) =>
      prisma
        .ordersConnection({
          where: {
            AND: [
              { goods: { user: { id } } },
              { deliveryStatus_gte: typeDef.DELIVERY_STATUS_COMPLETE_PAYMENT },
              { deliveryStatus_lte: typeDef.DELIVERY_STATUS_COMPLETE_SHIPPING }
            ]
          }
        })
        .aggregate()
        .count(),

    followingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),
    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_some: { id } } })
        .aggregate()
        .count(),

    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              following_some: {
                id: parentId
              }
            }
          ]
        });
      } catch {
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
