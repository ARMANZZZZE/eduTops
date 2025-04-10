
async function sendMessage() {
  const input = document.getElementById("userInput");
  const apiKey = document.getElementById("apiKey").value;
  const chatBox = document.getElementById("chatBox");

  const userMessage = input.value.trim();
  if (!userMessage || !apiKey) return;

  chatBox.innerHTML += `<div><strong>Вы:</strong> ${userMessage}</div>`;
  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();
  const aiMessage = data.choices?.[0]?.message?.content || "Ошибка в ответе от ИИ.";
  chatBox.innerHTML += `<div><strong>ИИ:</strong> ${aiMessage}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
