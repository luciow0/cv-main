const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = "right";

function draw() {
    // Dibuja el fondo
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibuja la serpiente
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

    // Mueve la cabeza de la serpiente en la dirección actual
    if (direction === "right") headX++;
    if (direction === "left") headX--;
    if (direction === "up") headY--;
    if (direction === "down") headY++;

    // Crea una nueva cabeza en la dirección actual
    let newHead = { x: headX, y: headY };

    // Verifica si la cabeza alcanzó la comida
    if (headX === food.x && headY === food.y) {
        // Genera nueva comida
        food = {
            x: Math.floor(Math.random() * (canvas.width / boxSize)),
            y: Math.floor(Math.random() * (canvas.height / boxSize))
        };

        // Agrega la nueva cabeza al inicio de la serpiente
        snake.unshift(newHead);
    } else {
        // Si no hay comida, mueve la serpiente y elimina la última parte del cuerpo
        snake.unshift(newHead);
        snake.pop();
    }
}

function checkCollision() {
    // Verifica si la cabeza choca contra las paredes o el cuerpo de la serpiente
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (
        headX < 0 || headX >= canvas.width / boxSize ||
        headY < 0 || headY >= canvas.height / boxSize ||
        collisionWithBody(headX, headY)
    ) {
        // Reinicia el juego si hay colisión
        resetGame();
    }
}

function collisionWithBody(x, y) {
    // Verifica si la cabeza choca contra el cuerpo de la serpiente
    for (let i = 1; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    // Reinicia la posición de la serpiente y la comida
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    direction = "right";
}

function gameLoop() {
    // Actualiza y dibuja el juego en bucle
    move();
    checkCollision();
    draw();
}

// Controla la dirección de la serpiente con las teclas de flecha y evita el comportamiento del scroll
window.addEventListener("keydown", (event) => {
    // Evita el comportamiento predeterminado (scroll) si es una tecla de dirección
    if (event.key.startsWith("Arrow")) {
        event.preventDefault();
    }

    // Cambia la dirección de la serpiente
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

// Bucle principal del juego
setInterval(gameLoop, 100); // 100 milisegundos (10 FPS)