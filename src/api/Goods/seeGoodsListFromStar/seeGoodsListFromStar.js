import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeGoodsListFromStar: async (_, args) => {
      const { starId } = args;

      let goodses = [];
      let result = [];

      if (starId !== "") {
        /// startId 가 있으면 해당하는 star 만 가져오고
        goodses = await prisma.goodses({
          where: { star_some: { id: starId } }
        });
      } else {
        /// srartId 가 없으면 해당하는 star 외 아무거나 가져 온다?
        goodses = await prisma.goodses({ orderBy: "createdAt_DESC" });
      }

      if (goodses.length !== 0) {
        result = goodses;
      }

      return result;
    }
  }
};
