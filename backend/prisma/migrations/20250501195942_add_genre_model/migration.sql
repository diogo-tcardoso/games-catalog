-- CreateTable
CREATE TABLE "principal" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "iniciado" TIMESTAMP(3) NOT NULL,
    "finalizado" TIMESTAMP(3) NOT NULL,
    "tempo" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "zeramento" TEXT NOT NULL,
    "systemId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "principal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "systems" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "systems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "principal" ADD CONSTRAINT "principal_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "principal" ADD CONSTRAINT "principal_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "systems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
