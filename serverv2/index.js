import "regenerator-runtime/runtime";
import { GraphQLServer, PubSub } from "graphql-yoga";
import Query from "./src/resolvers/Query";
import Mutation from "./src/resolvers/Mutation";
import prisma from "./prisma";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation
  },
  context: {
    pubsub,
    prisma
  }
});

server.start({ port: process.env.PORT || 4000 }, () =>
  console.log("Server hasbeen started!!")
);
