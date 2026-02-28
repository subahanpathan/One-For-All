const startScreen = document.getElementById("startScreen");
const configScreen = document.getElementById("configScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");

const finalScore = document.getElementById("finalScore");
const performanceMessage = document.getElementById("performanceMessage");

let selectedDifficulty = "";
let selectedCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;

/* ==== SAMPLE QUESTIONS (15 each category recommended) ==== */
const questions = {
    math: [
        { question: "What is 10 + 5?", options: ["12", "15", "18", "20"], answer: 1 },
        { question: "Square root of 64?", options: ["6", "7", "8", "9"], answer: 2 }
    ],
    science: [
        { question: "H2O is?", options: ["Oxygen", "Hydrogen", "Water", "Salt"], answer: 2 }
    ],
    history: [
        { question: "Who was first PM of India?", options: ["Nehru", "Gandhi", "Modi", "Patel"], answer: 0 }
    ],
    geography: [
        { question: "Capital of India?", options: ["Mumbai", "Delhi", "Chennai", "Kolkata"], answer: 1 }
    ]
};

/* ==== START BUTTON ==== */
document.getElementById("startBtn").onclick = () => {
    startScreen.classList.remove("active");
    configScreen.classList.add("active");
};

/* ==== SELECT DIFFICULTY ==== */
document.querySelectorAll(".difficulty").forEach(btn => {
    btn.onclick = () => selectedDifficulty = btn.dataset.level;
});

/* ==== SELECT CATEGORY ==== */
document.querySelectorAll(".category").forEach(btn => {
    btn.onclick = () => selectedCategory = btn.dataset.category;
});

/* ==== BEGIN QUIZ ==== */
document.getElementById("beginQuiz").onclick = () => {
    if (!selectedDifficulty || !selectedCategory) {
        alert("Select difficulty and category!");
        return;
    }

    configScreen.classList.remove("active");
    quizScreen.classList.add("active");
    loadQuestion();
};

/* ==== LOAD QUESTION ==== */
function loadQuestion() {
    const currentQuestions = questions[selectedCategory];
    const question = currentQuestions[currentQuestionIndex];

    questionNumber.innerText = `Question ${currentQuestionIndex + 1} / 15`;
    questionText.innerText = question.question;

    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
    });

    startTimer();
}

/* ==== CHECK ANSWER ==== */
function checkAnswer(selected) {
    const correct = questions[selectedCategory][currentQuestionIndex].answer;

    if (selected === correct) {
        score++;
    }

    nextQuestion();
}

/* ==== NEXT QUESTION ==== */
function nextQuestion() {
    clearInterval(timer);
    currentQuestionIndex++;

    if (currentQuestionIndex < 2) {
        loadQuestion();
    } else {
        showResult();
    }
}

/* ==== TIMER ==== */
function startTimer() {
    timeLeft = 20;
    progressBar.style.width = "100%";

    timer = setInterval(() => {
        timeLeft--;
        progressBar.style.width = (timeLeft / 20) * 100 + "%";

        if (timeLeft <= 0) {
            nextQuestion();
        }
    }, 1000);
}

/* ==== RESULT ==== */
function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.innerText = `Score: ${score} / 15`;

    if (score >= 12) {
        performanceMessage.innerText = "Excellent Performance!";
    } else if (score >= 8) {
        performanceMessage.innerText = "Good Job!";
    } else {
        performanceMessage.innerText = "Keep Practicing!";
    }
}

/* ==== RESTART ==== */
document.getElementById("restartBtn").onclick = () => {
    location.reload();
};