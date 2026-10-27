
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");
const notice = document.getElementById("notice");

function addMessage(text, sender) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  notice.textContent = "กำลังตอบกลับ...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (response.status === 503) {
      addMessage(
        "ตอนนี้ Backend ทำงานแล้ว แต่ยังไม่ได้ตั้งค่า Gemini API Key เราจะเชื่อม AI ในขั้นตอนถัดไปนะ",
        "bot"
      );
      notice.textContent = "โหมดทดสอบ — ยังไม่ได้เชื่อม AI";
      return;
    }

    if (!response.ok) {
      throw new Error(data.error || "เกิดข้อผิดพลาด");
    }

    addMessage(data.message || data.text || "ได้รับคำตอบแล้ว", "bot");
    notice.textContent = "เชื่อมต่อ Backend แล้ว";
  } catch (error) {
    addMessage(
      "เชื่อมต่อ Backend ไม่สำเร็จ กรุณาตรวจสอบว่าเซิร์ฟเวอร์ยังทำงานอยู่",
      "bot"
    );
    notice.textContent = error.message;
  }
});
