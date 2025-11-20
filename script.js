async function sendMessage() {
    let input = document.getElementById("user-input");
    let text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    let res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    let data = await res.json();
    addMessage(data.reply, "bot");
}

function addMessage(text, sender) {
    let box = document.getElementById("chat-box");
    let msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.innerText = text;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}
let currentLang = "ar";  // حاليًا لغة الصفحة العربية

async function sendMessage() {
    let input = document.getElementById("user-input");
    let text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    let res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, lang: currentLang })  // نرسل اللغة مع الرسالة
    });

    let data = await res.json();
    addMessage(data.reply, "bot");
}

// دالة لتغيير اللغة
function changeLanguage() {
    currentLang = currentLang === "ar" ? "en" : "ar";  // التبديل بين العربية والإنجليزية
    document.getElementById("lang-button").innerText = currentLang === "ar" ? "Change to English" : "تغيير إلى العربية";
}
