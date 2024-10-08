import {PrismaClient} from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
}

/**
 * Global variable to hold the Prisma client instance.
 * @global
 * @name prismaGlobal
 * @type {undefined | ReturnType<typeof prismaClientSingleton>}
 */
declare global{
  var prismaGlobal : undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if(process.env.NODE_ENV !== 'production'){
  globalThis.prismaGlobal = prisma;
}