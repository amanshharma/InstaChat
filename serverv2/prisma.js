import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://192.168.99.100:4466/"
  //secret: process.env.PRISMA_SECRET
});

// console.log("hello");

// prisma.query.users(null, "{ id }").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

export default prisma;
