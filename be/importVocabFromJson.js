const fs = require("fs");
const path = require("path");
const sequelize = require("./config/db");
const { Vocab } = require("./models");

async function importVocabFromFile(fileName, level) {
  const filePath = path.join(__dirname, "assets", fileName);
  const rawData = fs.readFileSync(filePath, "utf-8");
  const vocabList = JSON.parse(rawData);

  let inserted = 0;

  for (const item of vocabList) {
    const meaning = item.meaning || "";

    // Check tồn tại theo hanzi để tránh trùng
    const [vocab, created] = await Vocab.findOrCreate({
      where: { hanzi: item.word },
      defaults: {
        pinyin: item.pinyin,
        meaning,
        level,
      },
    });

    if (!created) {
      vocab.example_vi = item.example_vn || "";
      vocab.example_cn = item.example_cn || "";
      vocab.example_pinyin = item.example_pinyin || "";
      vocab.pinyin = item.pinyin;
      vocab.meaning = meaning;
      vocab.level = level;
      await vocab.save();
    }

    inserted++;
  }

  console.log(`✅ ${fileName} → Thêm/Cập nhật ${inserted} từ (level ${level})`);
}

async function importAllVocab() {
  try {
    const assetDir = path.join(__dirname, "assets");
    const files = fs.readdirSync(assetDir).filter(f => f.startsWith("hsk-level-") && f.endsWith(".json"));

    for (const file of files) {
      const match = file.match(/hsk-level-(\d+)\.json/);
      if (match) {
        const level = parseInt(match[1], 10);
        await importVocabFromFile(file, level);
      }
    }

    console.log("🎉 Toàn bộ từ vựng đã được nhập xong.");
  } catch (error) {
    console.error("❌ Lỗi khi thêm từ vựng:", error);
  } finally {
    await sequelize.close();
  }
}

importAllVocab();
