import { prisma } from "../../../../generated/prisma-client";
import typeDef from "../../../../typeDef";

/////////////////////////////////////////////////////////////
// Todo List
// 1. 특정 조건을 만족 했을 때 Registed 속성이 True로 변해야함
/////////////////////////////////////////////////////////////

// 스타 등록
async function registerStar(
  userId,
  name,
  engName,
  alternativeName,
  jopType,
  activeType,
  entertainment,
  parentsStarId
) {
  // 1. 존재여부 확인
  let existStar;

  // 1.1. parentsStarId 없을 때
  if (parentsStarId === undefined) {
    existStar = await prisma.stars({
      where: {
        name,
        engName,
        jopType,
        activeType,
        entertainment
      }
    });
  }
  // 1.2. parentsStarId 있을 때
  else {
    existStar = await prisma.stars({
      where: {
        name,
        engName,
        jopType,
        parentsStar_some: { id: parentsStarId },
        activeType,
        entertainment
      }
    });
  }

  // 2. 첫 항목 가져오기
  let targetStar = existStar[0];

  // 3. 존재하지 않으면 신규 생성
  if (targetStar === undefined) {
    // 3.1. parentsStarId 없을 때
    if (parentsStarId === undefined) {
      targetStar = await prisma.createStar({
        name,
        engName,
        alternativeName: { set: alternativeName },
        jopType,
        activeType,
        entertainment,
        registedUser: { connect: { id: userId } }
      });
    }
    // 3.2. parentsStarId 있을 때
    else {
      targetStar = await prisma.createStar({
        name,
        engName,
        alternativeName: { set: alternativeName },
        jopType,
        parentsStar: { connect: { id: parentsStarId } },
        activeType,
        entertainment,
        registedUser: { connect: { id: userId } }
      });
    }

    targetStar.registResult = "신규 등록 되었습니다.";
  }
  // 4. 존재하는 경우
  else {
    // 5. 카테고리화 되었는지 체크
    if (targetStar.registed) {
      targetStar.registResult = "이미 카테고리로 지정된 스타 입니다.";
    }
    // 6. 카테고리화 되어있지 않다면 내가 이미 내가 신규 등록했는지 확인
    else {
      const existUser = await prisma.$exists.star({
        id: targetStar.id,
        registedUser_some: { id: userId }
      });

      // 7. 등록된 User에 자신이 포함되어 있다면 이미 내가 신규 등록한 Star이다.
      if (existUser) {
        targetStar.registResult = "이미 신규 등록한 스타 입니다.";
      }
      // 8. 포함되어 있지 않다면 해당 Star에 나를 연결시켜 신규 등록한다.
      else {
        targetStar = await prisma.updateStar({
          data: { registedUser: { connect: { id: userId } } },
          where: { id: targetStar.id }
        });

        targetStar.registResult = "신규 등록 되었습니다.";
      }
    }
  }

  return targetStar;
}

export default {
  Mutation: {
    addStar: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        name,
        engName,
        alternativeName,
        members,
        jopType,
        activeType,
        entertainment
      } = args;

      const star = [];

      // 1. 개인이거나 그룹 데이터 저장
      const firstStar = await registerStar(
        user.id,
        name,
        engName,
        alternativeName,
        jopType,
        activeType,
        entertainment
      );

      star.push(firstStar);

      // 2. 그룹인데 멤버 데이터가 존재 할 경우 멤버 데이터 저장
      if (
        firstStar !== undefined &&
        members !== undefined &&
        activeType === typeDef.GROUP
      ) {
        // 2.1. 멤버 수 많큼 데이터 저장
        for (const item of members) {
          const starOfMember = await registerStar(
            user.id,
            item.name,
            item.engName,
            item.alternativeName,
            jopType,
            typeDef.MEMBER,
            entertainment,
            firstStar.id
          );

          star.push(starOfMember);
        }
      }

      return star;
    }
  }
};
