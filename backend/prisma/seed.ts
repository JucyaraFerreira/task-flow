import { prisma } from "../src/config/prisma.js";
import { hashPassword } from "../src/utils/password.js";

async function main() {
  await prisma.task.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: "Demo",
      email: "demo@todo.app",
      password: await hashPassword("demo1234"),
    },
  });

  const [estudos, trabalho] = await Promise.all([
    prisma.category.create({ data: { name: "Estudos", color: "#6366f1", userId: user.id } }),
    prisma.category.create({ data: { name: "Trabalho", color: "#10b981", userId: user.id } }),
  ]);

  await prisma.task.createMany({
    data: [
      { title: "Estudar Node.js", userId: user.id, categoryId: estudos.id },
      { title: "Configurar Prisma", completed: true, userId: user.id, categoryId: estudos.id },
      { title: "Revisar PR do time", userId: user.id, categoryId: trabalho.id },
    ],
  });

  console.log("Seed done. Login: demo@todo.app / demo1234");
}

main().finally(() => prisma.$disconnect());
