const APP_SECRET = "abcdefghijklmnopqrst";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

export default {
  async addMessage(parent, query, { prisma, pubsub }, info) {
    const { id, message, senderId } = query;

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
              id: senderId
            }
          }
        }
      },
      info
    );

    pubsub.publish(`message ${id}`, {
      message: result
    });

    //(result);
    return result;
  },
  async login(parent, query, { prisma, pubsub }, info) {
    const { username, password } = query;
    const user = await prisma.query.user(
      {
        where: {
          email: username
        }
      },
      "{id, email, chats {id}}"
    );

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      user,
      token
    };
  },
  async addChat(parent, query, { prisma, pubsub }, info) {
    console.log("chats data", query);
    const { chatName, userIds } = query;
    const connect = [];
    userIds.forEach(id => {
      connect.push({ id });
    });
    return await prisma.mutation.createChat(
      {
        data: {
          name: chatName,
          friends: {
            connect
          }
        }
      },
      info
    );
  }
};
