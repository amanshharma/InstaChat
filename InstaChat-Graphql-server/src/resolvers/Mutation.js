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
    const userExists = await prisma.exists.User({ email: username, password });
    if (!userExists) throw new Error("Incorrect Username or Password");
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
  },
  async register(parent, query, { prisma }, info) {
    const { email, password } = query;
    const userExists = await prisma.exists.User({ email });
    if (userExists) throw new Error("Username Already Taken");
    return await prisma.mutation.createUser(
      {
        data: {
          email,
          password
        }
      },
      info
    );
  }
};
