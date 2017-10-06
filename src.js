
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function Ball(x, y, radius, yV, xV, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.yV = yV;
    this.xV = xV;
    this.color = color;
}

let listOfBalls = [];
let speed = 0.6;

canvas.addEventListener("click", createNewBall, false);
canvas.onkeydown = function(e){
    var key = e.keyCode;
    if(key == 38){
        console.log("Hello Word!");
    }
}

function createNewBall(){
    let x = Math.ceil(Math.random() * canvas.width - 50);
    let y = Math.ceil(Math.random() * canvas.height - 50);
    if(x < 75){
        x += 75;
    }
    if(y < 75){
        y += 75;
    }
    let yV;
    let xV;

    let choice = Math.ceil(Math.random()*2);
    if(choice == 1){
        yV = speed;
    }else {
        yV = -speed;
    }
    choice = Math.ceil(Math.random()*2);
    if(choice == 1){
        xV = speed;
    }else {
        xV = -speed;
    }

    let colorValue = Math.ceil(Math.random()*4);
    let color;
    switch(colorValue){
        case 1:
            color = "white";
            break;
        case 2:
            color = "red";
            break;
        case 3:
            color = "yellow";
            break;
        case 4:
            color = "blue";
            break;
    }

    listOfBalls.push(new Ball(x, y, 20, yV, xV,color));
}

function start(){
    for(let i = 0; i < 20; i++){
        createNewBall();
    }
}

function leftClick(){
    createNewBall();
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < listOfBalls.length; i++){
        updateBall(listOfBalls[i]);
        drawBalls(listOfBalls[i]);
    }
}

function updateBall(ball){
    if(ball.x - ball.radius < 0 || ball.x > canvas.width - ball.radius){
        ball.xV = -ball.xV;
    }
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.yV = -ball.yV;
    }
    ball.x += ball.xV;
    ball.y += ball.yV;
}

function drawBalls(ball){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

start();
setInterval(update, 1);

