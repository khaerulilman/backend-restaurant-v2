import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding categories...");

  await prisma.category.createMany({
    data: [
      { name: "Makanan" },
      { name: "Minuman" },
      { name: "Snack" },
      { name: "Dessert" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Categories seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
