export default {
  async getMessages(parent, query, { prisma, pubsub }, info) {
    const { id } = query;
    const res = await prisma.query.messages(
      {
        where: {
          chat: {
            id
          }
        },
        orderBy: "createdAt_DESC"
      },
      info
    );
    return res;
  },
  async getChats(parent, query, { prisma, pubsub }, info) {
    const { chatIds } = query;
    return await prisma.query.chats(
      {
        where: {
          id_in: chatIds
        }
      },
      info
    );
  },
  async getUsers(parent, query, { prisma }, info) {
    return await prisma.query.users(null, info);
  }
};
