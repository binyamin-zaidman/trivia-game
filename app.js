const question = [
  {
    id: 1,
    question: "?מי גנב את העוגיות מהקופסא",
    answer: ["מוישי", "בצלאל", "יוחנן", "אליצור"],
    rightAnswer: "מוישי",
  },
  {
    id: 2,
    question: "?מה פירוש המילה שונרא בארמית",
    answer: ["חתול", "אריה", "שפן", "תוכי"],
    rightAnswer: "חתול",
  },
  {
    id: 3,
    question: "מהו זג?",
    answer: ["הולך לא ישר", "סוג של דג", "קליפת הענב", "זנב של גמל"],
    rightAnswer: "קליפת הענב",
  },
  {
    id: 4,
    question: "הסרת הלוט פירושו?",
    answer: ["התייעצות חשאית", "פרסום רב", "חשיפה של מוצג", "ישנו שקרן בינינו"],

    rightAnswer: "חשיפה של מוצג",
  },
  {
    id: 5,
    question: "מה הפירוש התפיל?",
    answer: [
      "שאיפתו ותקותו של אדם, חלום",
      "הסתכסכו,התקוטטו,התעמתו",
      "הפך לתפל,הפך מי ים למי שתיה",
      "סלל דרך",
    ],
    rightAnswer: "הפך לתפל,הפך מי ים למי שתיה",
  },
  {
    id: 6,
    question: "השועלים פעילים בעיקר בשעות...",
    answer: ["הערב", "צהריים", "אחר צהריים", "הלילה"],
    rightAnswer: "הלילה",
  },
  {
    id: 7,
    question: "איזה בעל חיים מסמל חריצות?",
    answer: ["נמלה", "אריה", "חמור", "ינשוף"],
    rightAnswer: "נמלה",
  },
];

const asked = [];
const tableScore = JSON.parse(localStorage.getItem("tableScore")) || [];
const currUser = JSON.parse(localStorage.getItem("currUser"));
let score = 0;
let timerInterval;

const rightSound = new Audio("./aoudio/3.mp3");
const wrongSound = new Audio("./aoudio/poyon.mp3");
const backgroundAudio = new Audio("./aoudio/251524.mp3");

function updateScoreRight() {
  updateScore(10);
}

function updateScoreWrong() {
  updateScore(-5);
}

function updateScore(scoreToUpdate) {
  score += scoreToUpdate;
  currUser.score += scoreToUpdate;
  document.getElementById("myscore").innerText = `Score: ${score}`;
}
function sendScore() {
  tableScore.push(currUser);
  localStorage.setItem("tableScore", JSON.stringify(tableScore));
}

function chooseRight(btn) {
  btn.classList.add("good");
  rightSound.play();
  setTimeout(() => {
    updateScoreRight();
    btn.classList.remove("good");
    getQuestion();
  }, 1500);
}

function chooseWrong(btnFalse, btnTrue) {
  btnFalse.classList.add("bad");
  wrongSound.play();
  const rightAnswer = getRightAnswer();
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button.innerText === rightAnswer) {
      btnTrue = button;
    }
  });
  btnTrue.classList.add("good");
  setTimeout(() => {
    updateScoreWrong();
    btnFalse.classList.remove("bad");
    btnTrue.classList.remove("good");
    getQuestion();
  }, 1500);
}

function listen() {
  document.getElementById("btn0").addEventListener("click", checkResult);
  document.getElementById("btn1").addEventListener("click", checkResult);
  document.getElementById("btn2").addEventListener("click", checkResult);
  document.getElementById("btn3").addEventListener("click", checkResult);
}

function getRightAnswer() {
  const currQuestion = question[asked.at(-1)];
  const rightAnswer = currQuestion.rightAnswer;
  return rightAnswer;
}

function checkResult(event) {
  clearTimeout(timerInterval);
  if (event.target.innerText == getRightAnswer()) {
    chooseRight(event.target);
  } else {
    chooseWrong(event.target);
  }
}

function getQuestion() {
  if (asked.length >= question.length) {
    currUser.round += 1;
    localStorage.setItem("currUser", JSON.stringify(currUser));
    showGameOver();
    return;
  }

  let getNum;
  do {
    getNum = getNumberIndex();
  } while (asked.includes(getNum));

  createQuestion(getNum);
}

function getNumberIndex() {
  return Math.floor(Math.random() * question.length);
}

function createQuestion(number) {
  asked.push(number);
  console.log(number);

  const currQuestion = question[number];

  for (let j = 0; j < 4; j++) {
    console.log(currQuestion.question);
    console.log(currQuestion.answer[j]);

    document.getElementById(`btn${j}`).innerHTML = currQuestion.answer[j];
  }
  document.getElementById("myqoastion").innerHTML = currQuestion.question;

  // אתחול הטיימר מחדש
  resetTimer();
}

function startTimer() {
  const sand = document.getElementById("sand");
  sand.style.animation = "none";
  setTimeout(() => {
    sand.style.animation = "";
    sand.style.animation = "hourglass 5s linear forwards";
  }, 50);

  timerInterval = setTimeout(() => {
    if (asked.length < question.length) {
      getQuestion();
    } else {
      showGameOver();
    }
  }, 5000);
}

function resetTimer() {
  clearTimeout(timerInterval);
  startTimer();
}

function showGameOver() {
  const main = document.querySelector(".maincontact");
  const cont = document.querySelector(".container");

  main.classList.add("hidden");

  const divOver = document.createElement("div");
  divOver.className = "gameOver";

  const scoreDisplay = document.createElement("h2");
  scoreDisplay.innerText = `Your score: ${score}`;
  divOver.appendChild(scoreDisplay);

  const playAgainBtn = document.createElement("button");
  playAgainBtn.innerText = "Play Again";
  playAgainBtn.className = "btn";
  playAgainBtn.addEventListener("click", () => {
    currUser.score = 0;
    localStorage.setItem("currUser", JSON.stringify(currUser));
    window.location.href = "game.html";
  });
  divOver.appendChild(playAgainBtn);

  const exitBtn = document.createElement("button");
  exitBtn.innerText = "Exit";
  exitBtn.className = "btn";

  exitBtn.addEventListener("click", () => (window.location.href = "home.html"));
  cont.appendChild(divOver);
  cont.removeChild(main);
  divOver.appendChild(exitBtn);
  sendScore();
}


// const person1 = createPerson("3083083083", "gal", {address, car, hobby});

// person1.haveAccountBank();
// person1.shouldWork();


// const stamObject = {address:"1", car:"@", hobby:"hobby", haveAccountBank:"yes", shouldWork:"yes"}
// const person2 = createPerson("3083083083", "gal2", person1);

// createElementAndChangeText("h1", {text:"gal"});

// function createElementAndChangeText(element, {text, id}) {
//   const newElement = document.createElement(element);
//   if (text){
//     newElement.innerText = text;
//   }
//   if (id) {
//     newElement.id = id;
//   }
//   return newElement;
// }

getQuestion();
listen();

backgroundAudio.play();
