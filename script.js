let canvas;
let canvasContext;
let ballPosition;
const ballRadius = 10;
let ballDir;
// this variable is set to the middle of the player block
let playerPosition;
// this variable is set to top left of the bot block
let opponentPosition;
const blockHeight = 80;
const blockWidth = 15;
let playerWins = 0;
let botWins = 0;
//change this variable to change the speed of the game
const ballSpeed = 10;
//increase this variable for a harder gameplay
const opponentStep = 5;


window.onload = function () {
    canvas = document.getElementById("gameWindow");
    canvasContext = canvas.getContext("2d");
    canvasContext.canvas.width = window.innerWidth - 20;
    canvasContext.canvas.height = window.innerHeight - 20;
    canvasContext.font = "20pt Arial";

    canvasContext.fillStyle = "green";
    //draw background on entire canvas
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);


    startGame()
}

function startGame() {

    drawPlayer(15, canvas.height / 2 - blockHeight / 2);

    drawOpponent(canvas.width - 15 - blockWidth, canvas.height / 2 - blockHeight / 2);

    //adds the driver function to the game
    canvas.addEventListener("mousemove", getMouseHeight);

    //throw the ball in random direction
    ballDir = rand(-60,60) * Math.PI / 180 + Math.PI * rand(0,1);

    drawBall(canvas.width / 2, canvas.height / 2);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function play(playerY) {
    moveBall();

    // move player
    drawPlayer(playerPosition.x, playerY);

    moveOpponent();
}

function moveBall() {
    //first check if the ball hit the bottom or top borders
    if (ballPosition.y - ballRadius < 1 || ballPosition.y + ballRadius > canvas.height - 1) {
        ballDir *= -1;
    //else check if the ball reached the right or left borders to restart the game
    } else if (ballPosition.x - ballRadius < 1 || ballPosition.x + ballRadius > canvas.width) {
        (ballPosition.x - ballRadius < 1) ? botWins += 1 : playerWins += 1;
        startGame();
    //else check if the ball collided with the player block
    } else if (ballPosition.x - ballRadius - playerPosition.x - blockWidth < 0.5 &&
        ballPosition.y - playerPosition.y < blockHeight/2 + ballRadius/2 &&
        ballPosition.y - playerPosition.y > -blockHeight/2 - ballRadius/2) {
        let m = (ballPosition.y - playerPosition.y) / (ballPosition.x - (playerPosition.x + blockWidth / 2));
        ballDir = Math.atan(m);
    //else check if the ball collided with the bot block
    } else if (opponentPosition.x - ballPosition.x - ballRadius < 0.5 &&
        ballPosition.y - opponentPosition.y < blockHeight + ballRadius &&
        ballPosition.y - opponentPosition.y > -ballRadius) {
        let m = ((opponentPosition.y + blockHeight / 2) - ballPosition.y) / ((opponentPosition.x + blockWidth / 2) - ballPosition.x);
        ballDir = Math.atan(m) + Math.PI;
    }
    drawBall(ballPosition.x + ballSpeed * Math.cos(ballDir), ballPosition.y + ballSpeed * Math.sin(ballDir));
}

function moveOpponent() {
    //pretty simple "AI"
    //moves the bot lower if the ball is lower than the middle of the bot block
    //otherwise move the bot higher
    if (ballPosition.y < opponentPosition.y + blockHeight / 2) drawOpponent(opponentPosition.x, opponentPosition.y - opponentStep);
    else drawOpponent(opponentPosition.x, opponentPosition.y + opponentStep);
}

function drawBall(x, y) {
    //clears the ball from last frame
    if (typeof ballPosition !== 'undefined') {
        canvasContext.fillStyle = "green";
        canvasContext.fillRect(ballPosition.x - ballRadius - 1, ballPosition.y - ballRadius - 1, 2 * ballRadius + 2, 2 * ballRadius + 2);
    } else {
        canvasContext.fillStyle = "green";
        canvasContext.fillRect(canvas.width / 2 - ballRadius, canvas.height / 2 - ballRadius, 2 * ballRadius, 2 * ballRadius);
    }
    //redraws the ball and updates variables
    ballPosition = {x, y};
    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    canvasContext.arc(x, y, ballRadius, 0, 2 * Math.PI);
    canvasContext.fill();
}

function drawPlayer(x, y) {
    //clears the player block from last frame
    canvasContext.fillStyle = "green";
    if (typeof playerPosition !== 'undefined') {
        canvasContext.fillRect(playerPosition.x, playerPosition.y - blockHeight / 2, blockWidth, blockHeight);
    } else {
        canvasContext.fillRect(15, canvas.height / 2 - blockHeight / 2, blockWidth, blockHeight);
    }
    //redraws the player block and updates variables
    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    playerPosition = {x, y};
    drawRectangle(playerPosition.x, y - blockHeight / 2);
    canvasContext.fill();
}

function drawOpponent(x, y) {
    //clears the bot block from last frame
    canvasContext.fillStyle = "green";
    if (typeof opponentPosition !== 'undefined') {
        canvasContext.fillRect(opponentPosition.x, opponentPosition.y, blockWidth, blockHeight);
    } else {
        canvasContext.fillRect(canvas.width - 15 - blockWidth, canvas.height / 2 - blockHeight / 2, blockWidth, blockHeight);
    }
    //redraws the bot block and updates variables
    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    opponentPosition = {x, y};
    drawRectangle(opponentPosition.x, y);
    canvasContext.fill();
}

function drawRectangle(x, y) {
    //helper function to draw the player and bot blocks
    canvasContext.fillRect(x, y, blockWidth, blockHeight);
}

function getMouseHeight(event) {
    //clears the score detail text
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    //draws the new frame
    play(event.clientY - (canvas.offsetTop - window.pageYOffset));
    //rewrite the score text
    canvasContext.fillText("     Player: " + playerWins + ", Opponent: " + botWins, 20, 20);
}