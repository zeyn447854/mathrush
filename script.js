// Seçim butonları
document.getElementById('ilkokulBtn').addEventListener('click', function(){
  startGame("ilkokul");
});

document.getElementById('ortaokulBtn').addEventListener('click', function(){
  startGame("ortaokul");
});

let score = 0;
let time = 30;
let currentAnswer = 0;
let timerInterval;

function startGame(mode){
  document.getElementById('ilkokulBtn').style.display = "none";
  document.getElementById('ortaokulBtn').style.display = "none";
  document.getElementById('gameArea').style.display = "block";

  score = 0;
  time = 30;
  document.getElementById('score').innerText = "Puan: " + score;
  document.getElementById('timer').innerText = "Süre: " + time;

  generateQuestion(mode);

  timerInterval = setInterval(function(){
    time--;
    document.getElementById('timer').innerText = "Süre: " + time;
    if(time <= 0){
      clearInterval(timerInterval);
      alert("Süre doldu! Puanın: " + score);
      location.reload();
    }
  }, 1000);
}

document.getElementById('submitBtn').addEventListener('click', function(){
  const answer = parseInt(document.getElementById('answerInput').value);
  if(answer === currentAnswer){
    score += 10;
    document.getElementById('score').innerText = "Puan: " + score;
  }
  document.getElementById('answerInput').value = "";
  generateQuestion(score < 15 ? "ilkokul" : "ortaokul"); // örnek zorluk artışı
});

function generateQuestion(mode){
  let a, b, op, questionText;
  const operations = ["+", "-", "x", "÷"];
  op = operations[Math.floor(Math.random() * operations.length)];

  if(mode === "ilkokul"){
    a = Math.floor(Math.random() * 100) + 1;
    b = Math.floor(Math.random() * 100) + 1;
  } else {
    a = Math.floor(Math.random() * 500) + 50;
    b = Math.floor(Math.random() * 300) + 20;
  }

  // Çıkarmada negatif yok
  if(op === "-" && a < b){
    [a, b] = [b, a];
  }

  // Çarpma/Bölmede 1 ve 10 yok
  if(op === "x" || op === "÷"){
    if(a === 1) a++;
    if(b === 1) b++;
    if(a === 10) a--;
    if(b === 10) b--;
    if(op === "÷"){
      a = a * b; // tam bölünecek
    }
  }

  currentAnswer = op === "+" ? a + b :
                  op === "-" ? a - b :
                  op === "x" ? a * b :
                  op === "÷" ? a / b : 0;

  questionText = a + " " + op + " " + b + " = ?";
  document.getElementById('question').innerText = questionText;
}
