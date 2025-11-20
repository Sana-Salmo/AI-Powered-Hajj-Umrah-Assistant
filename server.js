const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { getRelevantChunks } = require("./rag");
const { generateAnswer } = require("./llm");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    if (!userMessage.trim()) {
      return res.json({
        reply: "اكتب سؤالك عن الحج أو العمرة عشان أقدر أساعدك 🌙"
      });
    }

    // 1) نجيب أفضل المقاطع من ملفات المعرفة
    const chunks = getRelevantChunks(userMessage, 3);

    // 2) نرسل السؤال + السياق للـ LLM
    const answer = await generateAnswer(userMessage, chunks);

    // 3) نرجّع الرد للفرونت
    res.json({ reply: answer });
  } catch (err) {
    console.error("Chat endpoint error:", err);
    res.status(500).json({
      reply: "صار خطأ غير متوقع في الخادم. حاول مرة ثانية بعد شوي 🙏"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
