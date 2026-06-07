let isGameStarted = false;
let score = 0;
let coins = 100;

const targetScore = 25;

const scoreText = document.getElementById("score-point");
const coinText = document.getElementById("coins");
const resultText = document.querySelector(".result");
const actionBtn = document.getElementById("actionBtn");
const cards = document.querySelectorAll(".card");

// 🎮 Start Game
function playGame() {
    if (coins < 10) {
        alert("❌ Not enough coins!");
        return;
    }

    coins -= 10; // entry fee
    updateCoins();

    isGameStarted = true;
    score = 0;

    actionBtn.style.display = "none";
    resultText.innerText = " ";

    updateScore();

    cards.forEach((card, index) => {
        card.classList.remove("active-card");
        card.innerText = "Card " + (index + 1);
        card.removeAttribute("data-points");
    });
}

// 🎯 Card Click
function changeColor(card) {
    if (!isGameStarted) {
        alert("Pehle game start karo!");
        return;
    }

    let activeCards = document.querySelectorAll(".card.active-card");

    if (card.classList.contains("active-card")) {
        card.classList.remove("active-card");

        let points = parseInt(card.getAttribute("data-points")) || 0;
        score -= points;

        card.innerText = "Card";
        updateScore();
        return;
    }

    if (activeCards.length >= 4) {
        alert("Sirf 4 cards select kar sakte ho!");
        return;
    }

    card.classList.add("active-card");

    let randomNumber = Math.floor(Math.random() * 10) + 1;

    card.setAttribute("data-points", randomNumber);
    card.innerText = "+" + randomNumber;

    score += randomNumber;
    updateScore();

    activeCards = document.querySelectorAll(".card.active-card");

    if (activeCards.length === 4) {
        setTimeout(() => {
            if (score >= targetScore) {
                resultText.innerText = "🎉 You Won! +" + 20 + " coins";
                coins += 20;
            } else {
                resultText.innerText = "😢 You Lost!"; 
            }

            updateCoins();

            isGameStarted = false;
            actionBtn.innerText = "Play Again";
            actionBtn.style.display = "inline-block";
        }, 300);
    }
}

// 🔄 Score update
function updateScore() {
    scoreText.innerText = `Score : ${score} (Target : ${targetScore})`;
}

// 🪙 Coin update
function updateCoins() {
    coinText.innerText = `Coins : ${coins}` + " \uD83E\uDE99";
}