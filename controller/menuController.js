import prisma from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import { uploadImage } from "../config/multer.js";

class MenuController {
  // Middleware untuk upload image
  static uploadImage = uploadImage;

  static async create(req, res) {
    try {
      const { name, description, price, categoryId } = req.body;

      // Validasi input
      if (!name || !price || !categoryId) {
        return res.status(404).json({
          success: false,
          message: "input name , price , category dibutuhkan !!",
        });
      }

      // Validasi category exists
      const categorySame = await prisma.category.findUnique({
        where: { id: parseInt(categoryId) },
      });

      if (!categorySame) {
        return res.status(404).json({
          success: false,
          message: "Category tidak tersedia !!",
        });
      }

      // Upload image ke Cloudinary
      let imageUrl = null;

      // Upload image ke Cloudinary jika ada
      if (req.file) {
        try {
          // Convert buffer ke base64
          const base64Image = req.file.buffer.toString("base64");
          const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

          // Upload ke Cloudinary
          const uploadResult = await cloudinary.uploader.upload(dataURI, {
            folder: "restaurant-menu",
            resource_type: "image",
          });

          imageUrl = uploadResult.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return res.status(500).json({
            success: false,
            message: "Gagal mengupload gambar ke Cloudinary",
            error: uploadError.message,
          });
        }
      }

      const menu = await prisma.menu.create({
        data: {
          name,
          description: description || null,
          price: parseInt(price),
          categoryId: parseInt(categoryId),
          image: imageUrl,
        },
        include: {
          category: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Menu berhasil dibuat",
        data: menu,
      });

      // Create menu
    } catch (error) {
      console.error("Create menu error:", error);
      return res.status(500).json({
        success: false,
        message: "Gagal membuat menu",
        error: error.message,
      });
    }
  }

  static async getAll(req, res) {
    try {
      const menus = await prisma.menu.findMany({
        include: {
          category: true,
        },
      });

      return res.json({
        success: true,
        data: menus,
      });
    } catch (error) {
      console.error("Get menus error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch menus",
      });
    }
  }
}

export default MenuController;
