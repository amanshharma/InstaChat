export default {
  async getMessages(parent, query, { prisma, pubsub }, info) {
    const { id } = query;
    //console.log("IDD", id);
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
    console.log("CHATIDS", chatIds);
    return await prisma.query.chats(
      {
        where: {
          id_in: chatIds
        }
      },
      info
    );
  }
};
