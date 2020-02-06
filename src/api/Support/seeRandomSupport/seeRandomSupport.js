import { prisma } from "../../../../generated/prisma-client";
import { getRandomIntExclusive } from "../../../utils";
import { makePrismaClientClass } from "prisma-client-lib";

/// status front-end 와 동기화 할 것.
const PROCEEDING = 0; /// 진행중
const COMPLETE = 1; /// 모금완료
const PREPARE = 2; /// 준비중
const FINAL_COMPLETE = 3; /// 최종완료
const NOT_PROCEEDING = 4; /// 최종완료

export default {
  Query: {
    seeRandomSupport: async (_, args) => {
      const { supportStatus = [], loadNumber, id = [] } = args;
      const randomResult = [];

      let supports = [];

      if (supportStatus.length !== 0) {
        supports = await prisma.supports({
          where: { status_in: supportStatus }
        });
      } else {
        return randomResult;
      }

      if (supports.length !== 0) {
        const numbers = getRandomIntExclusive(supports.length, loadNumber);

        for (const index of numbers) {
          randomResult.push(supports[index]);
        }
      }

      return randomResult;
    }
  }
};
