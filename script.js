let canvas;
let canvasContext;
const blockHeight = 80;
const blockWidth = 15;

window.onload = function() {
    canvas = document.getElementById("gameWindow");
    canvasContext = canvas.getContext("2d");
    canvasContext.canvas.width  = window.innerWidth-20;
    canvasContext.canvas.height = window.innerHeight-20;
    const w = canvas.width;
    const h = canvas.height;

    canvasContext.fillStyle = "green";
    //draw background / rect on entire canvas
    canvasContext.fillRect(0,0,w,h);

    canvasContext.fillStyle = "black";
    //middle line
    canvasContext.beginPath();
    canvasContext.moveTo(w/2, 0);
    canvasContext.lineTo(w/2, h);
    canvasContext.stroke();
    //left border
    canvasContext.beginPath();
    canvasContext.moveTo(1, 0);
    canvasContext.lineTo(1, h);
    canvasContext.stroke();
    //right border
    canvasContext.beginPath();
    canvasContext.moveTo(w-1, 0);
    canvasContext.lineTo(w-1, h);
    canvasContext.stroke();
    //top border
    canvasContext.beginPath();
    canvasContext.moveTo(0, 1);
    canvasContext.lineTo(w-1, 1);
    canvasContext.stroke();
    //bottom border
    canvasContext.beginPath();
    canvasContext.moveTo(0, h-1);
    canvasContext.lineTo(w-1, h-1);
    canvasContext.stroke();


    canvasContext.fillStyle = "red";
    canvasContext.fillRect(15,h/2-blockHeight/2, blockWidth,blockHeight);

    canvasContext.fillRect(w-15-blockWidth,h/2-blockHeight/2, blockWidth,blockHeight);

    drawBall(w/2,h/2,10);
    play()
}

function play(){
    /*
    TODO:
    1. throw ball at random direction at start
    2. match left rectangle to mouse's height
    3. physics - to bounce the ball from top and bottom borders and players
    4. in case the ball reaches the left or right borders - game over
     */
}

function drawBall(x,y,r){
    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    canvasContext.arc(x, y, r, 0, 2 * Math.PI);
    canvasContext.fill();
}