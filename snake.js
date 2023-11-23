const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = "right";

function draw() {
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    ctx.fillStyle = "#00f";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
    }

    // Dibuja la comida
    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

function move() {
    let headX = snake[0].x;
    let headY = snake[0].y;

   
    if (direction === "right") headX++;
    if (direction === "left") headX--;
    if (direction === "up") headY--;
    if (direction === "down") headY++;

    
    let newHead = { x: headX, y: headY };

    
    if (headX === food.x && headY === food.y) {
      
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)),
            y: Math.floor(Math.random() * (canvas.height / boxSize))
        };

        snake.unshift(newHead);
    } else {
       
        snake.unshift(newHead);
        snake.pop();
    }
}

function checkCollision() {
    
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (
        headX < 0 || headX >= canvas.width / boxSize ||
        headY < 0 || headY >= canvas.height / boxSize ||
        collisionWithBody(headX, headY)
    ) {
       
        resetGame();
    }
}

function collisionWithBody(x, y) {
    for (let i = 1; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    direction = "right";
}

function gameLoop() {
    move();
    checkCollision();
    draw();
}

window.addEventListener("keydown", (event) => {
    if (event.key.startsWith("Arrow")) {
        event.preventDefault();
    }

   
    switch (event.key) {
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            direction = "right";
            break;
    }
});

setInterval(gameLoop, 100);  