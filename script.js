const questions = [
    {
        question: "Who is the father of Western Philosophy?",
        answers: [
            { text: "Socrates", correct: false},
            { text: "Plato", correct: false},
            { text: "Thales", correct: true},
            { text: "Descartes", correct: false}
        ]
    },
    {
        question: "The word 'philosophy' comes from the Greek words 'philo' and 'sophia.' What does the term literally mean?",
        answers: [
            { text: "Love of Wisdom", correct: true},
            { text: "Study of Existence", correct: false},
            { text: "Love of God", correct: false},
            { text: "Study of Nature", correct: false}
        ]
    },
    {
        question: "Which branch of philosophy is primarily concerned with questions of right and wrong, and how we ought to live?   ",
        answers: [
            { text: "Metaphysics", correct: false},
            { text: "Epistemology", correct: false},
            { text: "Ethics", correct: true},
            { text: "Logic", correct: false}
        ]
    },
    {
        question: "Socrates is famous for a teaching style that involves asking a series of questions to help students discover the truth. What is this called?",
        answers: [
            { text: "The Socratic Method", correct: true},
            { text: "The Empirical Method", correct: false},
            { text: "The Lecturing Method", correct: false},
            { text: "The Scientific Method", correct: false}
        ]
    },
    {
        question: "Which branch of philosophy asks questions like 'What is knowledge?' and 'How do we know what we know?'",
        answers: [
            { text: "Existentialism", correct: false},
            { text: "Aesthetics", correct: false},
            { text: "Politics", correct: false},
            { text: "Epistemology", correct: true}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let  currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();