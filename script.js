let canvas;
let canvasContext;
let canvasWidth;
let canvasHeight;
let ballPosition;
const ballRadius = 10;
let ballDir;
let playerPosition;
let opponentPosition;
const blockHeight = 80;
const blockWidth = 15;

window.onload = function () {
    canvas = document.getElementById("gameWindow");
    canvasContext = canvas.getContext("2d");
    canvasContext.canvas.width = window.innerWidth - 20;
    canvasContext.canvas.height = window.innerHeight - 20;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    canvasContext.fillStyle = "green";
    //draw background / rect on entire canvas
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);


    drawPlayer(15, canvasHeight / 2 - blockHeight / 2);

    drawOpponent(canvasWidth - 15 - blockWidth, canvasHeight / 2 - blockHeight / 2);

    canvas.addEventListener("mousemove", getMouseHeight);
    ballDir = Math.floor(Math.random() * 360);

    drawBall(canvasWidth / 2, canvasHeight / 2);
    play();
}
let i = 100;

function play(playerY) {

    drawBall(i, i);
    //i+=1;
    // move player
    drawPlayer(playerPosition.x, playerY);
    // move opponent

    moveOpponent(Math.floor(Math.random() * 3)-1);
    // check if ball hit borders

    // redirect the ball if needed

    /*
    TODO:
    1. throw ball at random direction at start
    2. match left rectangle to mouse's height
    3. physics - to bounce the ball from top and bottom borders and players
    4. in case the ball reaches the left or right borders - game over
     */
}

function moveOpponent(y) {
    //add some more logic for simple AI
    drawOpponent(opponentPosition.x, opponentPosition.y + y);
}

function drawBall(x, y) {
    if (typeof ballPosition !== 'undefined') {
        canvasContext.fillStyle = "green";
        canvasContext.fillRect(ballPosition.x - ballRadius, ballPosition.y - ballRadius, 2 * ballRadius, 2 * ballRadius);
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
    //console.log(event.clientY - (canvas.offsetTop - window.pageYOffset));
    play(event.clientY - (canvas.offsetTop - window.pageYOffset));
}