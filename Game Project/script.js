const box = document.getElementById("box");
const gameArea = document.getElementById("gameArea");

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

const startBtn = document.getElementById("startBtn");

let score = 0;
let time = 30;
let gameRunning = false;

let timer;


function startGame() {

    score = 0;
    time = 30;

    gameRunning = true;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    box.style.display = "block";

    moveBox();

    startBtn.disabled = true;
    startBtn.textContent = "Game Running...";


    timer = setInterval(function () {

        time--;

        timeDisplay.textContent = time;


        if (time <= 0) {

            endGame();

        }

    }, 1000);

}


function moveBox() {

    if (!gameRunning) {
        return;
    }


    const maxX = gameArea.clientWidth - box.clientWidth;

    const maxY = gameArea.clientHeight - box.clientHeight;


    const randomX = Math.random() * maxX;

    const randomY = Math.random() * maxY;


    box.style.left = randomX + "px";

    box.style.top = randomY + "px";

}


box.addEventListener("click", function () {

    if (!gameRunning) {
        return;
    }


    score++;

    scoreDisplay.textContent = score;


    moveBox();

});


function endGame() {

    gameRunning = false;

    clearInterval(timer);


    box.style.display = "none";


    alert("Game Over! 🎉 Your score is: " + score);


    startBtn.disabled = false;

    startBtn.textContent = "Play Again";

}


startBtn.addEventListener("click", startGame);