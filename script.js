const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const instructions = document.getElementById('instructions');

// Load basket image
const basketImg = new Image();
basketImg.src = 'basket.png';

// Load fruit images
const fruitImages = [
    'apple.png',
    'banana.png',
    'orange.png'
];
const fruits = fruitImages.map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

const bowl = {
    x: canvas.width / 2 - 35, // Increase width to 70
    y: canvas.height - 50, // Increase height to 50
    width: 70,
    height: 50,
    dx: 7, // Adjust speed for bigger size
    img: basketImg
};

let fruit = {
    x: Math.random() * (canvas.width - 30), // Increase width to 30
    y: 0,
    width: 30,
    height: 30,
    dy: 2,
    img: fruits[Math.floor(Math.random() * fruits.length)]
};

let score = 0;
let gameOver = false;
let gameStarted = false;

function drawBowl() {
    ctx.drawImage(bowl.img, bowl.x, bowl.y, bowl.width, bowl.height);
}

function drawFruit() {
    ctx.drawImage(fruit.img, fruit.x, fruit.y, fruit.width, fruit.height);
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
            fruit.dy += 0.5; // Increase speed of fruits
        } else {
            gameOver = true;
            gameStarted = false;
            restartButton.style.display = 'block';
        }
    }
}

function resetFruit() {
    fruit.x = Math.random() * (canvas.width - fruit.width);
    fruit.y = 0;
    fruit.img = fruits[Math.floor(Math.random() * fruits.length)];
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

function startGame() {
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    instructions.style.display = 'none';
    canvas.style.display = 'block';
    score = 0;
    fruit.dy = 2;
    gameOver = false;
    gameStarted = true;
    draw();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
