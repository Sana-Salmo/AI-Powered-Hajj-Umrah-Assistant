require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});



async function generateAnswer(question, contextChunks) {

   const contextText = contextChunks
    .map(ch => `- (${ch.title}) ${ch.text}`)
    .join("\n");


    
  // لو ما فيه سياق كفاية، لا نسمح للموديل يخترع
  if (!contextChunks || contextChunks.length === 0) {
    return "ما لقيت معلومات كافية عن سؤالك في المصادر المربوطة بالنظام، وبما أن الموضوع شرعي فأنصحك تسأل عالم موثوق أو جهة رسمية مثل وزارة الحج أو الرئاسة العامة لشؤون الحرمين.";
}

  const systemPrompt =  `
أنت مساعد ذكي للرد على أسئلة الحج والعمرة فقط.
تعتمد إجاباتك على النصوص المعطاة في "السياق" من مصادر موثوقة (مثل ابن باز، ابن عثيمين، وزارة الحج).
مهم جداً: لا تضف أي حكم فقهي أو تفاصيل شرعية غير موجودة صراحة في السياق المعطى.
إذا لم تجد الحكم أو التفاصيل في السياق، لا تجتهد ولا تخترع، بل قل للمستخدم بوضوح أن يرجع لعالِم موثوق أو جهة رسمية.
إن كان السؤال بالعربية فأجب بالعربية فقط، وإن كان بالإنجليزية فأجب بالإنجليزية فقط.
`.trim();


  const userContent = `
السؤال / Question:
${question}

السياق المتاح (من ملفات المعرفة):
${contextText || "لا يوجد سياق متاح. إذا كان السؤال فقهيًا خاصًا فأنصح بمراجعة عالم موثوق."}
  `.trim();

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // تقدرين تغيرينه من لوحة Groq إذا حبيتي
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent }
      ],
      temperature: 0.3,
      max_tokens: 600
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    return reply || "ما قدرت أجاوب بشكل آمن، حاول تسألني بطريقة ثانية أو راجع عالمًا موثوقًا.";
  } catch (err) {
    console.error("Groq error:", err);
    return "صار خطأ في الاتصال بموديل الذكاء الاصطناعي. حاول لاحقًا أو تأكد من إعدادات المفتاح.";
  }
}

module.exports = { generateAnswer };
