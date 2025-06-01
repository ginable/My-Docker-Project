document.addEventListener("DOMContentLoaded", () => {
  const messageList = document.getElementById("messages");
  const form = document.getElementById("message-form");
  const input = document.getElementById("message");
  const toggleBtn = document.getElementById("dark-toggle");
  const visitor = document.getElementById("visitor-count");

  const loadMessages = async () => {
    const res = await fetch("http://localhost:8000/messages");
    const messages = await res.json();
    messageList.innerHTML = "";
    messages.forEach(msg => {
      const li = document.createElement("li");
      li.textContent = `${msg.timestamp} - ${msg.content}`;
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.onclick = async () => {
        await fetch(`http://localhost:8000/messages/${msg.id}`, { method: "DELETE" });
        loadMessages();
      };
      li.appendChild(delBtn);
      messageList.appendChild(li);
    });
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input.value }),
    });
    input.value = "";
    loadMessages();
  };

  toggleBtn.onclick = () => {
    document.body.classList.toggle("dark");
  };

  const updateVisitor = async () => {
    const res = await fetch("http://localhost:8000/visitors");
    const data = await res.json();
    visitor.textContent = `Visitors: ${data.visits}`;
  };

  updateVisitor();
  loadMessages();
});