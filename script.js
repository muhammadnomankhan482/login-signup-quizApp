class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
        this.email = email;
        this.password = password;
    }
}


function showSignup(event) {
    event.preventDefault();
    document.getElementById("signupContainer").style.display = "block";
    document.getElementById("loginContainer").style.display = "none";
}

function showLogin(event) {
    event.preventDefault();
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("signupContainer").style.display = "none";
}

function details(event) {
    event.preventDefault();
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var message = document.getElementById("message");

    if (firstName === "" || lastName === "" || email === "" || password === "") {
        message.innerText = "Please fill all fields before signing up!";
        message.style.color = "red";
        return;
    }

    var users = JSON.parse(localStorage.getItem("user")) || [];

    let result = users.find((element) => element.email == email)
    if (result?.email) {
        alert("user already exist")
    } else {
        let user = new User(firstName, lastName, email, password)
        users.push(user)
        localStorage.setItem("user", JSON.stringify(users))
    }

    document.getElementById("signupContainer").style.display = "none";
    document.getElementById("loginContainer").style.display = "block";
}

function login(event) {
    event.preventDefault();
    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("loginPassword").value;
    var loginMessage = document.getElementById("loginMessage");

    var users = JSON.parse(localStorage.getItem("user")) || [];
    let loggedInUser = users.find((element) => element.email === loginEmail && element.password === loginPassword);

    if (loggedInUser) {
        startQuiz();
    } else {
        loginMessage.innerHTML = "Invalid email or password! Please try again.";
        loginMessage.style.color = "red";
    }

}

function logout() {
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("loginContainer").style.display = "block";
    var loginEmail = document.getElementById("loginEmail").value = "";
    var loginPassword = document.getElementById("loginPassword").value = "";
}
// quiz section
const quiz = [
    {
        question: "Which is the odd one out?",
        options: ["Dog", "Cat", "Tiger", "Rose"],
        correctAnswer: "Rose"
    },
    {
        question: "If 5 pens cost $10, how much will 8 pens?",
        options: ["$14", "$16", "$18", "$20"],
        correctAnswer: "$16"
    },
    {
        question: "Find the missing number: 3, 6, 12, 24, _ _?",
        options: [36, 48, 60, 72],
        correctAnswer: 48
    },
    {
        question: "What is the capital of Pakistan?",
        options: ["Lahore", "Karachi", "Islamabad", "Peshawar"],
        correctAnswer: "Islamabad"
    },
    {
        question: "Which is the national sport of Pakistan?",
        options: ["Hockey", "Cricket", "Football", "Squash"],
        correctAnswer: "Hockey"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "How many continents are there in the world?",
        options: [5, 6, 7, 8],
        correctAnswer: 7
    },
    {
        question: "Who was the founder of Pakistan?",
        options: ["Allama Iqbal", "Liaquat Ali Khan", "Quaid-e-Azam", "Ayub Khan"],
        correctAnswer: "Quaid-e-Azam"
    },
    {
        question: "Which is the largest ocean in the world?",
        options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Which is the fastest animal on land?",
        options: ["Tiger", "Cheetah", "Horse", "Lion"],
        correctAnswer: "Cheetah"
    }

]

var currentQuestion = 0;
var score = 0;
var quizNumber
var quizNumberCount = 0;
var correctCount = 0
var wrongCount = 0
var quizOptions = document.getElementById("quizOption");
let currentSelection = null;
let nextQuestionButton = document.getElementById("next");

function startQuiz() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("signupContainer").style.display = "none";
    document.getElementById("quizContainer").style.display = "block";
    renderQuestions();
}

function renderQuestions() {
    var questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz[currentQuestion].question;
    quizNumberCount++;
    quizNumber = document.getElementById("score");
    quizNumber.innerHTML = `${quizNumberCount} / ${quiz.length}`

    quizOptions.innerHTML = ''
    for (var i = 0; i < quiz[currentQuestion].options.length; i++) {
        quizOptions.innerHTML += `<li class = "non-active" onclick="checkCorrect(event)" style="padding-bottom: 20px">${quiz[currentQuestion].options[i]}</li>`

    }
}
var wrongSelection = [];
function goToNext() {
    if (quiz[currentQuestion].correctAnswer == currentSelection.innerHTML) {
        score += 10;
        correctCount++;
    } else {
        wrongCount++;
        wrongSelection.push(`Question No.${currentQuestion + 1}:  ${currentSelection.innerHTML}`);
    }

    if (currentQuestion === quiz.length - 1) {
        showFinalResult()
        return;
    }
    currentQuestion++;
    renderQuestions()
    nextQuestionButton.disabled = true;

    if (currentQuestion === quiz.length - 1) {
        nextQuestionButton.innerHTML = "Check Result";
    }
}

function checkCorrect(event) {
    event.target.classList.add("active")
    for (var i = 0; i < quizOptions.children.length; i++) {
        if (event.target !== quizOptions.children[i]) {
            quizOptions.children[i].classList.remove("active")
        }
    }

    currentSelection = event.target
    nextQuestionButton.disabled = false
}

function showFinalResult() {
    var quizContainer = document.getElementById("quizContainer")
    if (score >= 80) {
        quizContainer.innerHTML = `
        <h2>Quiz Completed</h2>
        <h3 style="color: green;">Congratulations, you’ve reached the top!</h3>
        <p>Total Questions: ${quiz.length}</p>
        <p>Correct Answers: ${correctCount}</p>
        <p>Wrong Answers: ${wrongCount}</p>
        <p>Your Score: ${score} / ${quiz.length * 10}</p>
        <h3 id="wrong-answers-heading">wrong answers</h3><br><ul id="wrong-answers-list"><li class='wrong-answer'>${wrongSelection.join("</li><li class='wrong-answer'>")}</li></ul>
        <button onclick="logout()" id="logoutBtn">Logout</button>
        <button onclick="restartQuiz()">Restart Quiz</button>  
         `
    } else if (score >= 50) {
        quizContainer.innerHTML = `
        <h2>Quiz Completed</h2>
        <h3 style="color: orange;">Well done, you are improving steadily!</h3>
        <p>Total Questions: ${quiz.length}</p>
        <p>Correct Answers: ${correctCount}</p>
        <p>Wrong Answers: ${wrongCount}</p>
        <p>Your Score: ${score} / ${quiz.length * 10}</p>
        <h3 id="wrong-answers-heading">wrong answers</h3><br><ul id="wrong-answers-list"><li class='wrong-answer'>${wrongSelection.join("</li><li class='wrong-answer'>")}</li></ul>
        <button onclick="logout()" id="logoutBtn">Logout</button>
        <button onclick="restartQuiz()">Restart Quiz</button>  
         `
    } else if (score < 50) {
        quizContainer.innerHTML = `
        <h2>Quiz Completed</h2>
        <h3 style="color: red;">Keep practicing, practice makes perfect!</h3>
        <p>Total Questions: ${quiz.length}</p>
        <p>Correct Answers: ${correctCount}</p>
        <p>Wrong Answers: ${wrongCount}</p>
        <p>Your Score: ${score} / ${quiz.length * 10}</p>
        <h3 id="wrong-answers-heading">wrong answers</h3><br><ul id="wrong-answers-list"><li class='wrong-answer'>${wrongSelection.join("</li><li class='wrong-answer'>")}</li></ul>
        <button onclick="logout()" id="logoutBtn">Logout</button>
        <button onclick="restartQuiz()">Restart Quiz</button>  
         `
    }

}

// restarting the quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    quizNumberCount = 0;
    wrongSelection = [];
    nextQuestionButton.innerHTML = "Next";

    document.getElementById("quizContainer").innerHTML = `
        <div class="header">
            <p id="question"></p>
            <button onclick="goToNext()" id="next" disabled>Next</button>
        </div>
        <ul id="quizOption"></ul>
        <div id="final"></div>
        <button onclick="logout()" id="logoutBtn">Logout</button>
        <div id="score">Score </div>
    `;

    quizNumber = document.getElementById("score");
    quizOptions = document.getElementById("quizOption");
    nextQuestionButton = document.getElementById("next");
    renderQuestions();
}

