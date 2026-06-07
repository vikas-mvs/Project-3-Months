document.getElementById("guessInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        guess();
    }
});

// Random number generate (1 to 10)
let randomNumber = Math.floor(Math.random() * 5) + 1;
let attempts = 0;
function guess() {
    let userGuess = document.getElementById("guessInput").value;
    let result = document.getElementById("result");

    if (userGuess === "") {
        result.innerText = "⚠️ Please enter a number!";
        return;
    }

    userGuess = Number(userGuess);
    attempts++;

    if (userGuess === randomNumber) {
        result.innerHTML = `🎉 Correct! You guessed in ${attempts} attempts.`;

        setTimeout(() => {
            randomNumber = Math.floor(Math.random() * 5) + 1;
            attempts = 0;
            result.innerText = "🔄 New game started!";
            document.getElementById("guessInput").value = "";
        }, 5000);

    } else if (userGuess < randomNumber) {
        result.innerText = "📉 Too low!";

    } else {
        result.innerText = "📈 Too high!";
    }
}