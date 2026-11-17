/* =================================
   PLAYER SYSTEM
================================= */

let playerName = "Guest";

const enterArcadeBtn =
    document.getElementById("enterArcadeBtn");


enterArcadeBtn.addEventListener(
    "click",
    function() {

        const name =
            document
            .getElementById("playerName")
            .value
            .trim();


        if (name !== "") {

            playerName = name;

        }


        document
            .getElementById(
                "displayPlayerName"
            )
            .textContent =
            playerName;


        document
            .getElementById(
                "startScreen"
            )
            .style
            .display =
            "none";

    }
);


/* =================================
   SOUND SYSTEM
================================= */

const sounds = {

    click:
        new Audio(
            "https://actions.google.com/sounds/v1/cartoon/pop.ogg"
        ),

    win:
        new Audio(
            "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        ),

    lose:
        new Audio(
            "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
        )

};


function playSound(soundName) {

    try {

        sounds[soundName]
            .currentTime =
            0;


        sounds[soundName]
            .play();

    }

    catch (error) {

        console.log(
            "Sound unavailable"
        );

    }

}


/* =================================
   LEADERBOARD SYSTEM
================================= */

function getLeaderboard() {

    return JSON.parse(
        localStorage.getItem(
            "arcadeLeaderboard"
        )
    ) || [];

}


function saveScore(
    game,
    score
) {

    const leaderboard =
        getLeaderboard();


    leaderboard.push({

        player:
            playerName,

        game:
            game,

        score:
            score,

        date:
            new Date()
            .toLocaleDateString()

    });


    leaderboard.sort(
        (a, b) =>
            b.score -
            a.score
    );


    const topScores =
        leaderboard.slice(
            0,
            20
        );


    localStorage.setItem(
        "arcadeLeaderboard",
        JSON.stringify(
            topScores
        )
    );

}


function showLeaderboard() {

    const leaderboard =
        getLeaderboard();


    const list =
        document
        .getElementById(
            "leaderboardList"
        );


    list.innerHTML = "";


    if (
        leaderboard.length === 0
    ) {

        list.innerHTML =
            "<p>No scores yet!</p>";

    }


    leaderboard.forEach(
        function(
            entry,
            index
        ) {

            const item =
                document
                .createElement(
                    "div"
                );


            item.classList.add(
                "leaderboard-item"
            );


            item.innerHTML =
                `
                <span>
                    #${index + 1}
                    ${entry.player}
                </span>

                <span>
                    ${entry.game}
                    -
                    ${entry.score}
                </span>
                `;


            list.appendChild(
                item
            );

        }
    );


    document
        .getElementById(
            "leaderboardModal"
        )
        .classList
        .add(
            "active"
        );

}


function closeLeaderboard() {

    document
        .getElementById(
            "leaderboardModal"
        )
        .classList
        .remove(
            "active"
        );

}


/* =================================
   GAME OVER
================================= */

function gameOver(
    gameName,
    score
) {

    playSound(
        "lose"
    );


    saveScore(
        gameName,
        score
    );


    document
        .getElementById(
            "gameOverMessage"
        )
        .innerHTML =
        `
        ${playerName}<br><br>

        Your Score:
        <b>${score}</b>
        `;


    document
        .getElementById(
            "gameOverScreen"
        )
        .classList
        .add(
            "active"
        );

}


function closeGameOver() {

    document
        .getElementById(
            "gameOverScreen"
        )
        .classList
        .remove(
            "active"
        );

}


/* =================================
   SCROLL
================================= */

function scrollToGames() {

    document
        .getElementById(
            "games"
        )
        .scrollIntoView({

            behavior:
                "smooth"

        });

}


/* =================================
   OPEN GAME
================================= */

function openGame(
    gameName
) {

    const games =
        document
        .querySelectorAll(
            ".game-panel"
        );


    games.forEach(
        function(game) {

            game
            .classList
            .remove(
                "active"
            );

        }
    );


    const selectedGame =
        document
        .getElementById(
            gameName
        );


    selectedGame
        .classList
        .add(
            "active"
        );


    selectedGame
        .scrollIntoView({

            behavior:
                "smooth",

            block:
                "center"

        });


    playSound(
        "click"
    );

}


/* =================================
   GENERIC TIMER SYSTEM
================================= */

function startTimer(
    elementId,
    seconds,
    callback
) {

    let time =
        seconds;


    const display =
        document
        .getElementById(
            elementId
        );


    display.textContent =
        time;


    const timer =
        setInterval(
            function() {

                time--;


                display.textContent =
                    time;


                if (
                    time <= 0
                ) {

                    clearInterval(
                        timer
                    );


                    callback();

                }

            },
            1000
        );


    return timer;

}


/* =================================
   SHOOTING GAME
================================= */

let shootScore = 0;

let shootLives = 3;

let shootTimer;

let shootingActive =
    false;


const target =
    document
    .getElementById(
        "target"
    );


const shootingArea =
    document
    .getElementById(
        "shootingArea"
    );


function startShooting() {

    clearInterval(
        shootTimer
    );


    shootScore = 0;

    shootLives = 3;

    shootingActive = true;


    document
        .getElementById(
            "shootScore"
        )
        .textContent =
        shootScore;


    document
        .getElementById(
            "shootLives"
        )
        .textContent =
        shootLives;


    target.style.display =
        "block";


    moveTarget();


    shootTimer =
        startTimer(

            "shootTime",

            30,

            function() {

                shootingActive =
                    false;


                target.style.display =
                    "none";


                gameOver(
                    "Shooting",
                    shootScore
                );

            }

        );

}


function moveTarget() {

    if (
        !shootingActive
    ) return;


    const x =
        Math.random()
        *
        (
            shootingArea
            .clientWidth
            -
            70
        );


    const y =
        Math.random()
        *
        (
            shootingArea
            .clientHeight
            -
            70
        );


    target.style.left =
        x + "px";


    target.style.top =
        y + "px";

}


target.addEventListener(
    "click",
    function() {

        if (
            !shootingActive
        ) return;


        shootScore++;


        document
            .getElementById(
                "shootScore"
            )
            .textContent =
            shootScore;


        playSound(
            "click"
        );


        moveTarget();

    }
);


/* =================================
   HOCKEY CONTROLS
================================= */

let hockeyPlayer =
    300;


function moveHockey(
    amount
) {

    hockeyPlayer +=
        amount;


    hockeyPlayer =
        Math.max(
            0,
            Math.min(
                600,
                hockeyPlayer
            )
        );

}


/* =================================
   RACING CONTROLS
================================= */

let carX = 220;


function moveCar(
    amount
) {

    carX +=
        amount;


    carX =
        Math.max(
            0,
            Math.min(
                440,
                carX
            )
        );

}


/* =================================
   MAZE CONTROLS
================================= */

function moveMaze(
    direction
) {

    let eventKey =
        "";


    if (
        direction === "up"
    ) {

        eventKey =
            "ArrowUp";

    }


    if (
        direction === "down"
    ) {

        eventKey =
            "ArrowDown";

    }


    if (
        direction === "left"
    ) {

        eventKey =
            "ArrowLeft";

    }


    if (
        direction === "right"
    ) {

        eventKey =
            "ArrowRight";

    }


    console.log(
        "Move maze:",
        eventKey
    );

}


/* =================================
   BASKETBALL
================================= */

let basketball = {

    shooting:
        false

};


function shootBasketball() {

    basketball.shooting =
        true;


    playSound(
        "click"
    );

}


/* =================================
   FOOTBALL
================================= */

let footballPlayer =
    300;


function moveFootball(
    amount
) {

    footballPlayer +=
        amount;


    footballPlayer =
        Math.max(
            0,
            Math.min(
                600,
                footballPlayer
            )
        );

}


/* =================================
   KEYBOARD CONTROLS
================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "ArrowLeft"
        ) {

            moveHockey(
                -20
            );

            moveCar(
                -20
            );

            moveFootball(
                -20
            );

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            moveHockey(
                20
            );

            moveCar(
                20
            );

            moveFootball(
                20
            );

        }


        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            shootBasketball();

        }

    }
);