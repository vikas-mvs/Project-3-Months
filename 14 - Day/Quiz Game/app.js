function start() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("option").style.display = "block";
}
// 1. Questions ki list (Array)
const quizData = [
    {
        question: "Which data structure uses LIFO (Last In First Out)?",
        a: "Queue", b: "Stack", c: "Array", d: "Linked List",
        correct: "b"
    },
    {
        question: "Which data structure uses FIFO (First In First Out)?",
        a: "Stack", b: "Binary Tree", c: "Queue", d: "Graph",
        correct: "c"
    },
    {
        question: "Array index starts from which number?",
        a: "1", b: "-1", c: "0", d: "Depends on compiler",
        correct: "c"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// 2. Start Game Function
function start() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("option").style.display = "block";
    loadQuestion();
}

// 3. Question Load karne ka function
function loadQuestion() {
    const currentQuiz = quizData[currentQuestionIndex];
    
    // Question aur Options ko HTML mein badalna
    document.getElementById("question-text").innerText = currentQuiz.question;
    document.getElementById("op1").innerText = currentQuiz.a;
    document.getElementById("op2").innerText = currentQuiz.b;
    document.getElementById("op3").innerText = currentQuiz.c;
    document.getElementById("op4").innerText = currentQuiz.d;
}

// 4. Answer Check karne ka function
function checkAnswer(selectedOption) {
    const currentQuiz = quizData[currentQuestionIndex];
    
    // Agar jawab sahi hai to score badhao
    if (selectedOption === currentQuiz.correct) {
        score++;
    }
    
    // Agle question par jao
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        // Game Khatam, Result dikhao
        showResult();
    }
}

// 5. Result dikhane ka function
function showResult() {
    const optionDiv = document.getElementById("option");
    optionDiv.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: <b>${score}</b> out of <b>${quizData.length}</b></p>
        <button onclick="location.reload()">Play Again</button>
    `;
}
