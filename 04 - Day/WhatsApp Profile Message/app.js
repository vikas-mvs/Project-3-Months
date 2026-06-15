const input = document.getElementById("msgInput");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");

function sendMessage() {
    let text = input.value.trim();

    if (text === "") return;

    let msg = document.createElement("div");
    msg.classList.add("message", "sent");
    msg.innerText = text;

    chatBox.appendChild(msg);
    input.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});