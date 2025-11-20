const fs = require("fs");
const path = require("path");

const kbDir = path.join(__dirname, "knowledge_base");

let allChunks = [];

// تحميل كل ملفات الـ JSON مرة واحدة
function loadKnowledgeBase() {
  if (allChunks.length > 0) return;

  const files = fs.readdirSync(kbDir).filter(f => f.endsWith(".json"));

  files.forEach(file => {
    const fullPath = path.join(kbDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const json = JSON.parse(raw);

    json.forEach(chunk => {
      allChunks.push({
        ...chunk,
        fileName: file
      });
    });
  });

  console.log(`Loaded ${allChunks.length} chunks from knowledge_base ✅`);
}

// تحويل النص لكلمات بسيطة
function textToTokens(text) {
  return text
    .toLowerCase()
    .replace(/[^ء-يa-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

// نظام سكورنق بسيط: كم كلمة مشتركة بين السؤال والنص
function scoreChunk(question, chunk) {
  const qTokens = textToTokens(question);
  const cTokens = textToTokens(chunk.title + " " + chunk.text);
  const cSet = new Set(cTokens);
  let score = 0;
  for (const t of qTokens) {
    if (cSet.has(t)) score++;
  }
  return score;
}

// دالة ترجع أفضل المقاطع (topK)
function getRelevantChunks(question, topK = 3) {
  loadKnowledgeBase();

  const scored = allChunks.map(ch => ({
    chunk: ch,
    score: scoreChunk(question, ch)
  }));

  scored.sort((a, b) => b.score - a.score);

  const filtered = scored.filter(s => s.score > 0).slice(0, topK);

  return filtered.map(s => s.chunk);
}

module.exports = { getRelevantChunks };

