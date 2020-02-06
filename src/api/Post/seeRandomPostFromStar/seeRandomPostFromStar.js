import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";

export default {
  Query: {
    seeRandomPostFromStar: async (_, args) => {
      const { starId, loadNumber, id = [] } = args;
      const randomResult = [];

      let posts = [];
      if (starId !== "") {
        /// startId 가 있으면 해당하는 star 만 가져오고
        posts = await prisma.posts({
          where: { AND: [{ star_some: { id: starId } }, { id_not_in: id }] }
        });
      } else {
        /// srartId 가 없으면 해당하는 star 외 아무거나 가져 온다?
        posts = await prisma.posts({
          where: { id_not_in: id }
        });
      }

      if (posts.length !== 0) {
        const numbers = getRandomIntExclusive(posts.length, loadNumber);

        for (const index of numbers) {
          randomResult.push(posts[index]);
        }
      }

      return randomResult;
    }
  }
};
