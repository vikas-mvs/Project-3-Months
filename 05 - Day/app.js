const upi = document.getElementById("upi");
const amount = document.getElementById("amount");
let qrcode = document.getElementById("qrcode");

function generate () {
    qrcode.innerHTML = "";
    qrcode.innerText = "UPI QR Generate"
    qrcode.style.margin = "40px auto";
    let data = `upi://pay?pa=${upi.value}&am=${amount.value}`;
    new QRCode(qrcode, { text: data, width: 200, height: 200 });
}