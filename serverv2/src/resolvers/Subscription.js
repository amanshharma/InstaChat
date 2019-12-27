export default {
  message: {
    subscribe(parent, query, { prisma, pubsub }, info) {
      const { chatId } = query;
      //console.log("CHATID", chatId);
      return pubsub.asyncIterator(`message ${chatId}`);
    }
  }
};
