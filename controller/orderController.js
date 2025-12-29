import prisma from "../config/db.js";

class OrderController {
  static async create(req, res) {
    try {
      const { email, noMeja, note, items, noTelp } = req.body;

      if (!Array.isArray(items) && items.length == 0) {
        return res.status(400).json({
          success: false,
          message: "Menu items tidak valid",
        });
      }

      if (noMeja == null || (email == null && noTelp == null)) {
        return res.status(400).json({
          success: false,
          message: "noMeja dan (email atau noTelp) wajib diisi",
        });
      }

      const dataOrderArray = items.map((item) => ({
        menuId: Number(item.id),
        qty: Number(item.qty),
        email: email || null,
        note: note || null,
        noTelp: noTelp || null,
        noMeja: Number(noMeja),
      }));

      const newOrder = await prisma.order.createMany({
        data: dataOrderArray,
      });

      return res.status(200).json({
        success: true,
        message: "data berhasil masuk",
        data: newOrder,
      });
    } catch (error) {
      console.error("Create order error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create order",
      });
    }
  }
}

export default OrderController;
