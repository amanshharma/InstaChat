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
              //id: "ck4jyzes500lk0737pme8tqms"
            }
          }
        }
      },
      info
    );

    pubsub.publish(`message ${id}`, {
      message: result
    });

    console.log(result);
    return result;
  }
};
