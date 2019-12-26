export default {
  async addMessage(parent, query, { prisma, pubsub }, info) {
    console.log("query one", query);
    const { id, message } = query;
    const result = await prisma.mutation.createMessage(
      {
        data: {
          message,
          chat: {
            connect: {
              id
            }
          },
          user: {
            connect: {
              id: "ck4j374ho00fy0737binvd00f"
            }
          }
        }
      },
      info
    );

    console.log(result);
    return result;
  }
};
