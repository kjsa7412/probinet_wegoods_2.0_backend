import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchGoods: async (_, args) => {
      const { term, starId } = args;

      let result = [];

      try {
        if (term.length !== 0) {
          /// 완전히 일치하는 것
          const exactResult = await prisma.goodses({
            where: {
              AND: [
                { title: term },
                {
                  star_some: starId !== "" ? { id: starId } : { id_not: starId }
                }
              ]
            }
          });
          // 첫번째 결과 저장
          if (exactResult.length !== 0) {
            for (const element of exactResult) {
              result.push(element);
            }
          }

          /// 검색어를 포함하는 것
          const containResult = await prisma.goodses({
            where: {
              AND: [
                { title_contains: term },
                {
                  star_some: starId !== "" ? { id: starId } : { id_not: starId }
                }
              ]
            }
          });
          /// 두번째 결과저장
          if (containResult.length !== 0) {
            for (const element of containResult) {
              result.push(element);
            }
          }

          //중복제거;
          result = result.filter(
            (item, index, array) =>
              array.findIndex(element => element.id === item.id) === index
          );

          if (result.length !== 0) {
            return result;
          } else {
            return null;
          }
        } else {
          return null;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
