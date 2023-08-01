const questions = [
  {
    question:
      "Compared to the other planets in our solar system, where is the Earth? The _____ from the sun?",
    answers: [
      { text: "middle rock", correct: false },
      { text: "closest", correct: false },
      { text: "third rock", correct: true },
      { text: "furthest", correct: false },
    ],
  },
  {
    question:
      "About how many individually distinguishable stars could you see WITHOUT the use of a telescope or binoculars, if you were away from the city on a clear night?",
    answers: [
      { text: "20", correct: false },
      { text: "2 billion", correct: false },
      { text: "2 million", correct: false },
      { text: "2000", correct: true },
    ],
  },
  {
    question: "What is a solar eclipse?",
    answers: [
      {
        text: "when the moon moves between the earth and the sun",
        correct: true,
      },
      { text: "when the sun emits solar flares", correct: false },
      { text: "when the sun explodes", correct: false },
      {
        text: "when the sun moves between the earth and the moon",
        correct: false,
      },
    ],
  },
  {
    question:
      "A group of stars named by ancient people because of heroes or animals they reminded them of is called which of these?",
    answers: [
      { text: "galaxy", correct: false },
      { text: "constellation", correct: true },
      { text: "nebula", correct: false },
      { text: "aurora borealis", correct: false },
    ],
  },
  {
    question: "Why do stars appear to twinkle when we look at them?",
    answers: [
      { text: "stars are different colors", correct: false },
      {
        text: "the earth's atmospheric layers bend their light rays",
        correct: true,
      },
      { text: "stars fluctuate their sizes", correct: false },
      { text: "only little stars twinkle", correct: false },
    ],
  },
  {
    question: "What is the name of the closest star to our Earth?",
    answers: [
      { text: "Andromeda", correct: false },
      { text: "Alpha Centauri", correct: false },
      { text: "Sol", correct: true },
      { text: "Polaris", correct: false },
    ],
  },
];

const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let score = 0;
let questionIndex = 0;

function startQuiz() {
  questionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[questionIndex];
  let questionNo = questionIndex + 1;
  questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score += 1;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // any of the buttons cant be clicked
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionEl.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "play again";
  nextBtn.style.display = "block";
}

function handleNextBtn() {
  questionIndex++;
  if (questionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (questionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

startQuiz();
