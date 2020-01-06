import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://<IP ADDRESS>:4466/" //Prisma end point
  //secret: process.env.PRISMA_SECRET
});
export default prisma;
