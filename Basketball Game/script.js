const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.getElementById("score");
const shotsDisplay = document.getElementById("shots");
const restartBtn = document.getElementById("restartBtn");


// GAME VARIABLES

let score = 0;
let shots = 0;

let keys = {};


// PLAYER

const player = {

    x: 100,

    y: 400,

    width: 50,

    height: 80,

    speed: 6

};


// BASKETBALL

const ball = {

    x: 140,

    y: 390,

    radius: 15,

    velocityX: 0,

    velocityY: 0,

    gravity: 0.4,

    shooting: false

};


// HOOP

const hoop = {

    x: 650,

    y: 180,

    width: 80,

    height: 10

};


// KEYBOARD CONTROLS

document.addEventListener("keydown", function(event) {

    keys[event.key] = true;


    if (event.code === "Space") {

        event.preventDefault();

        shootBall();

    }

});


document.addEventListener("keyup", function(event) {

    keys[event.key] = false;

});


// PLAYER MOVEMENT

function movePlayer() {

    if (keys["ArrowLeft"]) {

        player.x -= player.speed;

    }


    if (keys["ArrowRight"]) {

        player.x += player.speed;

    }


    // Keep player inside screen

    if (player.x < 0) {

        player.x = 0;

    }


    if (player.x + player.width > canvas.width) {

        player.x = canvas.width - player.width;

    }

}


// SHOOT BALL

function shootBall() {

    if (!ball.shooting) {

        ball.shooting = true;

        shots++;

        shotsDisplay.textContent = shots;


        // Shooting power

        ball.velocityX = 9;

        ball.velocityY = -12;

    }

}


// UPDATE BALL

function updateBall() {

    if (!ball.shooting) {

        // Ball follows player

        ball.x = player.x + 45;

        ball.y = player.y + 20;

        return;

    }


    // Move ball

    ball.x += ball.velocityX;

    ball.y += ball.velocityY;


    // Gravity

    ball.velocityY += ball.gravity;


    // Check if ball goes through hoop

    checkScore();


    // Reset ball if it leaves screen

    if (

        ball.x > canvas.width ||
        ball.y > canvas.height ||
        ball.x < 0

    ) {

        resetBall();

    }

}


// CHECK SCORE

function checkScore() {

    const hoopCenter = hoop.x + hoop.width / 2;


    if (

        ball.x > hoop.x &&
        ball.x < hoop.x + hoop.width &&

        ball.y > hoop.y - 10 &&
        ball.y < hoop.y + 20 &&

        ball.velocityY > 0

    ) {

        score++;

        scoreDisplay.textContent = score;


        resetBall();

    }

}


// RESET BALL

function resetBall() {

    ball.shooting = false;

    ball.velocityX = 0;

    ball.velocityY = 0;

}


// DRAW PLAYER

function drawPlayer() {

    // Body

    ctx.fillStyle = "#222";

    ctx.fillRect(

        player.x,

        player.y,

        player.width,

        player.height

    );


    // Head

    ctx.beginPath();

    ctx.arc(

        player.x + 25,

        player.y - 15,

        18,

        0,

        Math.PI * 2

    );

    ctx.fillStyle = "#f5c28b";

    ctx.fill();

}


// DRAW BALL

function drawBall() {

    ctx.beginPath();

    ctx.arc(

        ball.x,

        ball.y,

        ball.radius,

        0,

        Math.PI * 2

    );

    ctx.fillStyle = "orange";

    ctx.fill();


    // Ball lines

    ctx.strokeStyle = "black";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(ball.x - 15, ball.y);

    ctx.lineTo(ball.x + 15, ball.y);

    ctx.stroke();


    ctx.beginPath();

    ctx.arc(

        ball.x,

        ball.y,

        10,

        Math.PI / 2,

        Math.PI * 1.5

    );

    ctx.stroke();

}


// DRAW HOOP

function drawHoop() {

    // Backboard

    ctx.fillStyle = "white";

    ctx.fillRect(

        hoop.x + 70,

        hoop.y - 80,

        10,

        90

    );


    // Rim

    ctx.fillStyle = "red";

    ctx.fillRect(

        hoop.x,

        hoop.y,

        hoop.width,

        hoop.height

    );


    // Net

    ctx.strokeStyle = "white";

    ctx.beginPath();

    ctx.moveTo(hoop.x + 10, hoop.y + 10);

    ctx.lineTo(hoop.x + 20, hoop.y + 50);

    ctx.lineTo(hoop.x + 60, hoop.y + 50);

    ctx.lineTo(hoop.x + 70, hoop.y + 10);

    ctx.stroke();

}


// DRAW COURT

function drawCourt() {

    // Ground

    ctx.fillStyle = "#c68642";

    ctx.fillRect(

        0,

        450,

        canvas.width,

        50

    );


    // Court line

    ctx.strokeStyle = "white";

    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(0, 450);

    ctx.lineTo(canvas.width, 450);

    ctx.stroke();

}


// GAME LOOP

function gameLoop() {

    // Clear screen

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    drawCourt();

    movePlayer();

    updateBall();

    drawPlayer();

    drawBall();

    drawHoop();


    requestAnimationFrame(gameLoop);

}


// RESTART GAME

restartBtn.addEventListener("click", function() {

    score = 0;

    shots = 0;


    scoreDisplay.textContent = score;

    shotsDisplay.textContent = shots;


    player.x = 100;


    resetBall();

});


// START GAME

gameLoop();