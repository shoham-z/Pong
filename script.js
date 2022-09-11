let canvas;
let canvasContext;
let canvasWidth;
let canvasHeight;
let ballPosition;
const ballRadius = 10;
let ballSpeed = 10;
let ballDir;
let playerPosition;
let opponentPosition;
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
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    canvasContext.fillStyle = "green";
    //draw background / rect on entire canvas
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);


    startGame()
}

function startGame() {
    drawPlayer(15, canvasHeight / 2 - blockHeight / 2);

    drawOpponent(canvasWidth - 15 - blockWidth, canvasHeight / 2 - blockHeight / 2);

    canvas.addEventListener("mousemove", getMouseHeight);
    ballDir = Math.floor(Math.random() * 360) * Math.PI / 180;

    drawBall(canvasWidth / 2, canvasHeight / 2);
    play();
}

function play(playerY) {

    moveBall();

    // move player
    drawPlayer(playerPosition.x, playerY);
    // move opponent

    moveOpponent(Math.floor(Math.random() * 3) - 1);
}

function moveBall() {
    if (ballPosition.y - ballRadius < 1 || ballPosition.y + ballRadius > canvasHeight - 1) {
        ballDir *= -1;
    } else if (ballPosition.x - ballRadius < 1 || ballPosition.x + ballRadius > canvasWidth) {
        (ballPosition.x - ballRadius < 1) ? botWins += 1 : playerWins += 1;
        startGame();
    } else if (ballPosition.x - ballRadius - playerPosition.x - blockWidth < 0.5 &&
        ballPosition.y - playerPosition.y < blockHeight + ballRadius &&
        ballPosition.y - playerPosition.y > -ballRadius) {
        // Bug in this conditions
        let m = (ballPosition.y - (playerPosition.y + blockHeight/2)) / (ballPosition.x - (playerPosition.x + blockWidth / 2));
        ballDir = Math.atan(m);
    } else if (opponentPosition.x - ballPosition.x - ballRadius < 0.5 &&
        ballPosition.y - opponentPosition.y < blockHeight + ballRadius &&
        ballPosition.y - opponentPosition.y > -ballRadius) {
        let m = ((opponentPosition.y + blockHeight / 2) - ballPosition.y) / ((opponentPosition.x + blockWidth / 2) - ballPosition.x);
        ballDir = Math.atan(m) + Math.PI;
    }
    drawBall(ballPosition.x + ballSpeed * Math.cos(ballDir), ballPosition.y + ballSpeed * Math.sin(ballDir));
}

function moveOpponent(y) {
    if (ballPosition.y < opponentPosition.y + blockHeight / 2) drawOpponent(opponentPosition.x, opponentPosition.y + y - 2);
    else drawOpponent(opponentPosition.x, opponentPosition.y + y + Math.floor(canvasHeight/200));
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
        canvasContext.fillRect(canvasWidth - 15 - blockWidth, canvas.height / 2 - blockHeight / 2, blockWidth, blockHeight);
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
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
    play(event.clientY - (canvas.offsetTop - window.pageYOffset));
    canvasContext.fillText( "     Player: " + playerWins + ", Opponent: " + botWins, 20, 20);
}