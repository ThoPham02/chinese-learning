const fs = require("fs");
const { Groq } = require("groq-sdk");
const getPronunciationPrompt = require("../utils/speechPrompt");

exports.pronunciation = async (req, res) => {
  try {
    const expectedTextRaw = req.body.expectedText;
    const expectedText = expectedTextRaw ? expectedTextRaw.toLowerCase() : null;
    const audioFile = req.file;
    const groq = new Groq();

    if (!audioFile || !expectedText) {
      return res.status(400).json({ error: "Thiếu file voice hoặc từ gốc." });
    }

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(audioFile.path),
      model: "whisper-large-v3-turbo",
      prompt: "Please transcribe the Mandarin audio and output the result as pinyin with tone marks (e.g., nǐ hǎo, wǒ shì). Do not return Chinese characters or English.",
      response_format: "verbose_json",
      timestamp_granularities: ["word", "segment"],
      language: "zh",
      temperature: 0.0,
    });

    const recognizedText = transcription.text?.trim().toLowerCase();

    const isCorrect = recognizedText === expectedText;
    const feedback = isCorrect
      ? "Phát âm chính xác."
      : `Phát âm chưa đúng. Bạn đã nói: "${recognizedText}".`;

    res.json({
      expectedText,
      recognizedText,
      feedback,
      isCorrect
    });

    fs.unlink(audioFile.path, () => { });
  } catch (err) {
    console.error("Pronunciation error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.feedback = async (req, res) => {
  try {
    const expectedText = req.body.expectedText;
    const recognizedText = req.body.recognizedText;

    const groq = new Groq();
    const prompt = getPronunciationPrompt(expectedText, recognizedText);
    const chatRes = await groq.chat.completions.create({
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      messages: [
        { role: "system", content: "Bạn là một trợ lý luyện phát âm." },
        { role: "user", content: prompt }
      ]
    });
    const feedback = chatRes.choices[0].message.content;
    res.json({
      feedback: feedback
    })

  } catch (err) {
    console.error("Review error:", err);
    res.status(500).json({ error: err.message });
  }
};
