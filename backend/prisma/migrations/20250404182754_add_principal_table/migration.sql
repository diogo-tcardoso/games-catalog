-- CreateTable
CREATE TABLE "principal" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "console" TEXT NOT NULL,
    "gênero" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "iniciado" TIMESTAMP(3) NOT NULL,
    "finalizado" TIMESTAMP(3) NOT NULL,
    "tempo" INTEGER NOT NULL,
    "nota" TEXT NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "zeramento" TEXT NOT NULL,

    CONSTRAINT "principal_pkey" PRIMARY KEY ("id")
);
