import { Prisma, PrismaClient } from "@prisma/client";

export let db: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

if (process.env.NODE_ENV === "production") {
    db = new PrismaClient();
} else {
    if (!(global as any).db) {
        (global as any).db = new PrismaClient();
    }

    db = (global as any).db;
}