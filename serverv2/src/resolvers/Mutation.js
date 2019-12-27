const APP_SECRET = "abcdefghijklmnopqrst";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

export default {
  async addMessage(parent, query, { prisma, pubsub }, info) {
    //console.log("query one", query);
    const { id, message, senderId } = query;
    //console.log("query senderId", senderId);

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
      "{id, email}"
    );

    console.log(user);

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      user,
      token
    };
  }
};
