import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding menus...");

  const menus = [
    // Nasi Goreng Variants
    {
      name: "Nasi Goreng Ayam",
      description: "Nasi goreng dengan potongan ayam gurih",
      price: 16000,
      categoryId: 1,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929217/nasi_goreng_ayam_ehvua5.png",
    },
    {
      name: "Nasi Goreng Seafood",
      description: "Nasi goreng udang dan cumi",
      price: 20000,
      categoryId: 1,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929221/nasgor_Seafood_oecpks.jpg",
    },

    // Mie
    {
      name: "Mie Ayam Bakso",
      description: "Mie ayam dengan tambahan bakso",
      price: 16000,
      categoryId: 1,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929222/mie_ayam_bakso_nli909.png",
    },

    // Minuman
    {
      name: "Es Teh Manis",
      description: "Teh manis dingin menyegarkan",
      price: 5000,
      categoryId: 2,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929220/teh_manis_kom9kd.png",
    },
    {
      name: "Es Jeruk",
      description: "Jeruk peras segar dingin",
      price: 6000,
      categoryId: 2,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929220/es_jeruk_epygic.png",
    },
    {
      name: "Es Kopi Susu Mocacinno",
      description: "Kopi susu dengan gula aren",
      price: 12000,
      categoryId: 2,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929222/es_kopi_mocacinno_sa2orp.jpg",
    },

    // Topping
    {
      name: "Risolles",
      description: "Telur ceplok setengah matang",
      price: 4000,
      categoryId: 3,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929218/risolles_g63rzo.png",
    },
    {
      name: "Batagor",
      description: "Tambahan bakso sapi",
      price: 4000,
      categoryId: 3,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929220/batagor_ttaxpz.png",
    },
    {
      name: "Dimsum",
      description: "Keju cheddar parut",
      price: 5000,
      categoryId: 3,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929222/dimsum_wjt4iv.png",
    },

    // Dessert
    {
      name: "Pudding Coklat",
      description: "Pudding coklat lembut manis",
      price: 7000,
      categoryId: 4,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929220/pudding_q4vp92.png",
    },
    {
      name: "Es Krim Vanilla",
      description: "Es krim vanilla creamy",
      price: 8000,
      categoryId: 4,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929217/es_krim_vanilla_s1jkqw.png",
    },
    {
      name: "Cheesecake",
      description: "Cheesecake lembut creamy",
      price: 12000,
      categoryId: 4,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929217/chesscake_yvoglz.png",
    },
    {
      name: "Donat Gula",
      description: "Donat empuk tabur gula",
      price: 6000,
      categoryId: 4,
      image:
        "https://res.cloudinary.com/diu1sdvtv/image/upload/v1766929217/donat_gula_dw160k.png",
    },
  ];

  await prisma.menu.createMany({
    data: menus,
    skipDuplicates: true,
  });

  console.log("✅ Menus seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
