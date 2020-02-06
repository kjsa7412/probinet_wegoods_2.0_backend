import { prisma } from "../../../../generated/prisma-client";
import typeDef from "../../../../typeDef";

export default {
  Query: {
    searchStar: async (_, args) => {
      const { term } = args;
      let result = [];

      try {
        if (term.length !== 0) {
          /// 완전히 일치하는 것
          const exactResult = await prisma.stars({
            where: {
              AND: [
                { registed: true },
                { OR: [{ name: term }, { engName: term }] }
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
          const containResult = await prisma.stars({
            where: {
              AND: [
                { registed: true },
                { OR: [{ name_contains: term }, { engName_contains: term }] }
              ]
            }
          });
          /// 두번째 결과저장
          if (containResult.length !== 0) {
            for (const element of containResult) {
              result.push(element);
            }
          }

          /// 그룹이 검색될 경우 해당 그룹의 맴버도 포함함.
          if (exactResult.length !== 0) {
            for (const element of exactResult) {
              let exactResultGroupMember = [];
              if (element.activeType === typeDef.MEMBER) {
                exactResultGroupMember = await prisma.stars({
                  where: {
                    AND: [
                      { registed: true },
                      { childStar_some: { id: element.id } }
                    ]
                  }
                });
              } else if (element.activeType === typeDef.GROUP) {
                exactResultGroupMember = await prisma.stars({
                  where: {
                    AND: [
                      { registed: true },
                      { parentsStar_some: { id: element.id } }
                    ]
                  }
                });
              }
              if (exactResultGroupMember.length !== 0) {
                for (const element of exactResultGroupMember) {
                  result.push(element);
                }
              }
            }
          }

          /// 정확한 검색이 아닐 경우에는 그 검색된 star 가 그룹일 경우만 추가하는 것으로 해놓자
          if (containResult.length !== 0) {
            for (const element of containResult) {
              if (element.activeType === typeDef.GROUP) {
                const containResultGroup = await prisma.stars({
                  where: {
                    AND: [
                      { registed: true },
                      { parentsStar_some: { id: element.id } }
                    ]
                  }
                });
                if (containResultGroup.length !== 0) {
                  for (const element of containResultGroup) {
                    result.push(element);
                  }
                }
              }
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
