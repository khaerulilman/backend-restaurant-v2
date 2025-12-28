import prisma from "../config/db.js";

class CategoryController {
  static async getAll(req, res) {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
      });

      return res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      console.error("Get categories error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch categories",
      });
    }
  }
}

export default CategoryController;
