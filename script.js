const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bowl = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 30,
    width: 50,
    height: 30,
    dx: 5
};

const fruit = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 20,
    dy: 2
};

let score = 0;
let gameOver = false;

function drawBowl() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(bowl.x, bowl.y, bowl.width, bowl.height);
}

function drawFruit() {
    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x, fruit.y, fruit.width, fruit.height);
}

function moveBowl() {
    if (rightPressed && bowl.x < canvas.width - bowl.width) {
        bowl.x += bowl.dx;
    } else if (leftPressed && bowl.x > 0) {
        bowl.x -= bowl.dx;
    }
}

function updateFruit() {
    fruit.y += fruit.dy;

    if (fruit.y + fruit.height > canvas.height) {
        if (fruit.x > bowl.x && fruit.x < bowl.x + bowl.width) {
            score++;
            resetFruit();
        } else {
            gameOver = true;
        }
    }
}

function resetFruit() {
    fruit.x = Math.random() * (canvas.width - fruit.width);
    fruit.y = 0;
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 8, 20);
}

function drawGameOver() {
    ctx.font = '32px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBowl();
    drawFruit();
    drawScore();

    if (gameOver) {
        drawGameOver();
    } else {
        updateFruit();
        moveBowl();
        requestAnimationFrame(draw);
    }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

draw();
