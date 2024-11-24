import { Prisma, PrismaClient } from '@prisma/client/index-browser';
import { DB } from '@types';



export const createDB = () => new PrismaClient({
    transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    },
}) as DB;