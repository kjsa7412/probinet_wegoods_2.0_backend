import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const OUT = "OUT";

export default {
  Mutation: {
    editRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { roomId, title, file, action } = args;
      const { user } = request;

      const isParticipants = await prisma.$exists.room({
        id: roomId,
        participants_some: { id: user.id }
      });

      if (isParticipants) {
        if (action === EDIT) {
          // 수정
          return prisma.updateRoom({
            data: {
              title,
              file
            },
            where: { id: roomId }
          });
        } else if (action === OUT) {
          // 나가기 전에 참여자 수를 확인 한다.
          const participantsCount = await prisma
            .usersConnection({ where: { rooms_some: { id: roomId } } })
            .aggregate()
            .count();

          if (participantsCount === 1) {
            // 참여자가 혼자 일 경우에는 나갈 경우 방을 삭제 시킨다
            return prisma.deleteRoom({ id: roomId });
          } else {
            // 그냥 혼자 나가는 경우
            return prisma.updateRoom({
              data: {
                participants: {
                  disconnect: {
                    id: user.id
                  }
                }
              },
              where: { id: roomId }
            });
          }
        } else {
          throw Error("You can't do that. Action is undefined.");
        }
      } else {
        throw Error("You can't do that");
      }
    }
  }
};
