const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let score = 0;
let direction;

document.addEventListener('keydown', setDirection);

function setDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

function collision(head, array) {
    return array.some(segment => head.x === segment.x && head.y === segment.y);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let segment of snake) {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'UP') snakeY -= box;
    if (direction === 'DOWN') snakeY += box;
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'RIGHT') snakeX += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById('score').textContent = `Очки: ${score}`;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 || snakeY < 0 || 
        snakeX >= canvas.width || snakeY >= canvas.height || 
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert('Гра закінчена!');
    }

    snake.unshift(newHead);
}

const game = setInterval(drawGame, 100);