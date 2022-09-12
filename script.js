let canvas;
let canvasContext;
let ballPosition;
const ballRadius = 10;
const ballSpeed = 2;
let ballDir;
let playerPosition;
let opponentPosition;
let opponentStep = 5;
const blockHeight = 80;
const blockWidth = 15;
let playerWins = 0;
let botWins = 0;

window.onload = function () {
    canvas = document.getElementById("gameWindow");
    canvasContext = canvas.getContext("2d");
    canvasContext.canvas.width = window.innerWidth - 20;
    canvasContext.canvas.height = window.innerHeight - 20;
    canvasContext.font = "20pt Arial";

    canvasContext.fillStyle = "green";
    //draw background / rect on entire canvas
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);


    startGame()
}

function startGame() {
    drawPlayer(15, canvas.height / 2 - blockHeight / 2);

    drawOpponent(canvas.width - 15 - blockWidth, canvas.height / 2 - blockHeight / 2);

    canvas.addEventListener("mousemove", getMouseHeight);
    ballDir = Math.floor(Math.random() * 360) * Math.PI / 180;

    drawBall(canvas.width / 2, canvas.height / 2);
    play();
}

function play(playerY) {

    moveBall();

    // move player
    drawPlayer(playerPosition.x, playerY);
    // move opponent

    moveOpponent();
}

function moveBall() {
    console.log(ballPosition.y - playerPosition.y);
    console.log(-blockHeight/2 - ballRadius/2);
    console.log(playerPosition.y);
    console.log("skip");
    if (ballPosition.y - ballRadius < 1 || ballPosition.y + ballRadius > canvas.height - 1) {
        ballDir *= -1;
    } else if (ballPosition.x - ballRadius < 1 || ballPosition.x + ballRadius > canvas.width) {
        (ballPosition.x - ballRadius < 1) ? botWins += 1 : playerWins += 1;
        startGame();
    } else if (ballPosition.x - ballRadius - playerPosition.x - blockWidth < 0.5 &&
        ballPosition.y - playerPosition.y < blockHeight/2 + ballRadius/2 &&
        ballPosition.y - playerPosition.y > -blockHeight/2 - ballRadius/2) {
        // Bug in this conditions
        let m = (ballPosition.y - playerPosition.y) / (ballPosition.x - (playerPosition.x + blockWidth / 2));
        ballDir = Math.atan(m);
    } else if (opponentPosition.x - ballPosition.x - ballRadius < 0.5 &&
        ballPosition.y - opponentPosition.y < blockHeight + ballRadius &&
        ballPosition.y - opponentPosition.y > -ballRadius) {
        let m = ((opponentPosition.y + blockHeight / 2) - ballPosition.y) / ((opponentPosition.x + blockWidth / 2) - ballPosition.x);
        ballDir = Math.atan(m) + Math.PI;
    }
    drawBall(ballPosition.x + ballSpeed * Math.cos(ballDir), ballPosition.y + ballSpeed * Math.sin(ballDir));
}

function moveOpponent() {
    if (ballPosition.y < opponentPosition.y + blockHeight / 2) drawOpponent(opponentPosition.x, opponentPosition.y - opponentStep);
    else drawOpponent(opponentPosition.x, opponentPosition.y + opponentStep);
}

function drawBall(x, y) {
    if (typeof ballPosition !== 'undefined') {
        canvasContext.fillStyle = "green";
        canvasContext.fillRect(ballPosition.x - ballRadius - 1, ballPosition.y - ballRadius - 1, 2 * ballRadius + 2, 2 * ballRadius + 2);
    } else {
        canvasContext.fillStyle = "green";
        canvasContext.fillRect(canvas.width / 2 - ballRadius, canvas.height / 2 - ballRadius, 2 * ballRadius, 2 * ballRadius);
    }
    ballPosition = {x, y};
    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    canvasContext.arc(x, y, ballRadius, 0, 2 * Math.PI);
    canvasContext.fill();
}

function drawPlayer(x, y) {
    canvasContext.fillStyle = "green";
    if (typeof playerPosition !== 'undefined') {
        canvasContext.fillRect(playerPosition.x, playerPosition.y - blockHeight / 2, blockWidth, blockHeight);
    } else {
        canvasContext.fillRect(15, canvas.height / 2 - blockHeight / 2, blockWidth, blockHeight);
    }

    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    playerPosition = {x, y};
    drawRectangle(playerPosition.x, y - blockHeight / 2);
    canvasContext.fill();
}

function drawOpponent(x, y) {
    canvasContext.fillStyle = "green";
    if (typeof opponentPosition !== 'undefined') {
        canvasContext.fillRect(opponentPosition.x, opponentPosition.y, blockWidth, blockHeight);
    } else {
        canvasContext.fillRect(canvas.width - 15 - blockWidth, canvas.height / 2 - blockHeight / 2, blockWidth, blockHeight);
    }

    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    opponentPosition = {x, y};
    drawRectangle(opponentPosition.x, y);
    canvasContext.fill();
}

function drawRectangle(x, y) {
    canvasContext.fillRect(x, y, blockWidth, blockHeight);
}

function getMouseHeight(event) {
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    play(event.clientY - (canvas.offsetTop - window.pageYOffset));
    canvasContext.fillText("     Player: " + playerWins + ", Opponent: " + botWins, 20, 20);
}