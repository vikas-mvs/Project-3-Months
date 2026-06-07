let isGameStarted = false;
let score = 0;
let coins = 100;

const targetScore = 25;

const scoreText = document.getElementById("score-point");
const coinText = document.getElementById("coins");
const resultText = document.querySelector(".result");
const actionBtn = document.getElementById("actionBtn");
const cards = document.querySelectorAll(".card");

function playGame() {
    if (coins < 10) {
        alert("❌ Not enough coins!");
        return;
    }

    coins -= 10;
    updateCoins();

    isGameStarted = true;
    score = 0;

    actionBtn.style.display = "none";
    resultText.innerText = " ";

    updateScore();

    // Game start hote hi saare cards me pehle se number set karna
    cards.forEach((card) => {
        card.classList.remove("active-card");
        
        // 1 se 10 ke beech ka number pehle se generate kiya
        let randomNumber = Math.floor(Math.random() * 10) + 1;
        card.setAttribute("data-points", randomNumber);
        card.style.color = "transparent"; // Number ko chhupane ke liye
    });
}

// 🎯 Card Click
function changeColor(card) {
    if (!isGameStarted) {
        alert("Pehle game start karo!");
        return;
    }

    let activeCards = document.querySelectorAll(".card.active-card");
    let points = parseInt(card.getAttribute("data-points")) || 0;

    // Agar card pehle se selected hai to deselect karo
    if (card.classList.contains("active-card")) {
        card.classList.remove("active-card");
        score -= points; // Wahi point minus hoga jo pehle mila tha
        card.style.color = "transparent"; // Phir se chhupa diya
        updateScore();
        return;
    }

    // 4 se zyada card select nahi karne dena
    if (activeCards.length >= 4) {
        return;
    }

    // Card select hone par
    card.classList.add("active-card");
    
    // Ab wahi pehle se save kiya hua number dikhega aur add hoga
    card.innerText = points;
    card.style.fontWeight = "extra-bold";
    card.style.fontSize = "60px";
    card.style.color = "#ffffff";
    card.style.transition = "color 0.3s ease";

    score += points;
    updateScore();

    activeCards = document.querySelectorAll(".card.active-card");

    if (activeCards.length === 4) {
        setTimeout(() => {
            if (score >= targetScore) {
                resultText.innerText = "🎉 You Won! +" + 20 + " coins";
                alert("🎉 Congratulations! You won 20 coins!");
                coins += 20;
            } else {
                resultText.innerText = "😢 You Lost!"; 
                alert("😢 Better luck next time!");
            }

            updateCoins();

            isGameStarted = false;
            actionBtn.innerText = "Play Again";
            actionBtn.style.display = "inline-block";
        }, 500);
    }
}

// score update
function updateScore() {
    scoreText.innerText = `Score : ${score} (Target : ${targetScore})`;
}

// coin update
function updateCoins() {
    coinText.innerText = `Coins : ${coins}` + " \uD83E\uDE99";
}