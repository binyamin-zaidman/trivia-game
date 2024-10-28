const current = JSON.parse(localStorage.getItem("currUser"));
const tableScores = JSON.parse(localStorage.getItem("tableScore")) || [];
const useres = JSON.parse(localStorage.getItem("users"));

function showScore() {
  tableScores.sort(function (a, b) {
    return b.score - a.score;
  });

  // הוספת השחקנים לטבלה
  const table = document.getElementById("tableScore");
  for (let i = 0; i < 3 && i < tableScores.length; i++) {
    const row = table.insertRow();
    const userName = row.insertCell(0);
    const userScore = row.insertCell(1);
    userName.innerHTML = tableScores[i].name;
    userScore.innerHTML = tableScores[i].score;
  }
}

function avg() {
  let result = [];
  let sum = 0;
  let counter = 0;
  for (const user of useres) {
    for (const gamer of tableScores) {
      if (gamer.name === user.name) {
        sum += gamer.score;
        counter += 1;
      }
    }
    if (counter > 0) {
      sum = sum / counter;
      const table = document.getElementById("tableAvg");
      const row = table.insertRow();
      const userName = row.insertCell(0);
      const userScore = row.insertCell(1);
      userName.innerHTML = user.name;
      userScore.innerHTML = sum.toFixed(2); 
      result.push({ name: user.name, score: sum });
    }
    counter = 0;
    sum = 0;
  }
}

function resetScore() {
  current.score = 0;
  localStorage.setItem("currUser", JSON.stringify(current));
}

function toGame() {
  document.getElementById("goToGame").addEventListener("click", () => {
    resetScore();
    window.location.href = "index.html";
  });
}

function sineUp() {
  document.getElementById("sineUp").addEventListener("click", () => {
    window.location.href = "login.html";
    current.remove();
  });
}



toGame();
sineUp();
showScore();
avg();
