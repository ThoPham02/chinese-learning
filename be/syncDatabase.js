const sequelize = require("./config/db"); // Kết nối Sequelize
const models = require("./models"); // Import tất cả model

async function syncDatabase() {
  try {
    console.log("🔄 Syncing database...");
    await sequelize.sync({ alter: true }); // hoặc { force: true } để xóa tạo lại
    console.log("✅ Database synced successfully!");
  } catch (error) {
    console.error("❌ Failed to sync database:", error);
  } finally {
    await sequelize.close(); // Đóng kết nối sau khi sync
  }
}

syncDatabase();
