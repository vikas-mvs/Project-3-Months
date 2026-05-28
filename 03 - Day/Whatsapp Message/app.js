function sendMessage() {
    let number = document.getElementById("number").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!number || !message) {
        alert("Please fill all fields");
        return;
    }

    // Remove all non-numbers
    number = number.replace(/\D/g, "");

    // Fix common mistakes
    if (number.startsWith("0")) {
        number = number.substring(1);
    }

    if (!number.startsWith("91")) {
        number = "91" + number;
    }

    let encodedMessage = encodeURIComponent(message);

    let url = `https://api.whatsapp.com/send?phone=${number}&text=${encodedMessage}`;

    console.log(url); // debugging

    window.open(url, "_blank");
}