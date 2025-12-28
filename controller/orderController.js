import prisma from "../config/db.js";

class OrderController {
  static async create(req, res) {
    try {
      const { menuId, qty, email, noMeja, note, noTelp } = req.body;

      if (
        menuId == null ||
        qty == null ||
        noMeja == null ||
        (email == null && noTelp == null)
      ) {
        return res.status(400).json({
          success: false,
          message: "menuId, qty, noMeja dan (email atau noTelp) wajib diisi",
        });
      }

      const menu = await prisma.menu.findUnique({
        where: { id: Number(menuId) },
      });

      if (!menu) {
        return res.status(404).json({
          success: false,
          message: "menu tidak ditemukan",
        });
      }

      const newOrder = await prisma.order.create({
        data: {
          qty: Number(qty),
          email: email || null,
          noMeja: Number(noMeja),
          note: note || null,
          noTelp: noTelp ? String(noTelp) : null,
          menu: {
            connect: { id: Number(menuId) },
          },
        },
      });

      return res.status(201).json({
        success: true,
        message: "order berhasil dibuat",
        data: newOrder,
      });
    } catch (error) {
      console.error("Create order error:", error);
      return res.status(500).json({
        success: false,
        message: "gagal membuat order",
        error: error.message,
      });
    }
  }
}

export default OrderController;
