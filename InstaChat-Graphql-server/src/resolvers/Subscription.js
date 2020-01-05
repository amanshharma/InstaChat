export default {
  message: {
    subscribe(parent, query, { prisma, pubsub }, info) {
      const { chatId } = query;
      return pubsub.asyncIterator(`message ${chatId}`);
    }
  }
};
