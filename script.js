const gameArea = document.getElementById('gameArea');
const net = document.getElementById('net');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const playerNameInput = document.getElementById('playerNameInput');
const scoreBoard = document.getElementById('scoreBoard');
let fruits = [];
let gameInterval;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

highScoreDisplay.textContent = `Högsta Poäng: ${highScore}`;

function startGame() {
    const playerName = document.getElementById('playerName').value;
    if (playerName === '') {
        alert('Ange ditt namn för att starta spelet!');
        return;
    }
    playerNameInput.style.display = 'none';
    scoreBoard.style.display = 'block';
    score = 0;
    updateScore();
    gameInterval = setInterval(createFruit, 1000);
    gameArea.addEventListener('mousemove', moveNet);

    // Spela upp bakgrundsmusik
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
}

function createFruit() {
    const fruit = document.createElement('div');
    fruit.classList.add('fruit');
    const fruitType = Math.floor(Math.random() * 3);
    switch (fruitType) {
        case 0:
            fruit.style.backgroundImage = 'url("banana.png")';
            break;
        case 1:
            fruit.style.backgroundImage = 'url("orange.png")';
            break;
        case 2:
            fruit.style.backgroundImage = 'url("apple.png")';
            break;
    }
    fruit.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
    fruit.style.top = '0px';
    gameArea.appendChild(fruit);
    fruits.push(fruit);
    moveFruit(fruit);
}

function moveFruit(fruit) {
    let fruitInterval = setInterval(() => {
        fruit.style.top = fruit.offsetTop + 5 + 'px';
        if (fruit.offsetTop > gameArea.clientHeight) {
            clearInterval(fruitInterval);
            gameArea.removeChild(fruit);
            fruits = fruits.filter(f => f !== fruit);
        }
        checkCollision(fruit, fruitInterval);
    }, 50);
}

function moveNet(event) {
    const rect = gameArea.getBoundingClientRect();
    const x = event.clientX - rect.left - net.clientWidth / 2;
    const y = event.clientY - rect.top - net.clientHeight / 2;
    net.style.left = `${Math.max(0, Math.min(x, gameArea.clientWidth - net.clientWidth))}px`;
    net.style.top = `${Math.max(0, Math.min(y, gameArea.clientHeight - net.clientHeight))}px`;
}

function checkCollision(fruit, fruitInterval) {
    const netRect = net.getBoundingClientRect();
    const fruitRect = fruit.getBoundingClientRect();
    if (
        netRect.left < fruitRect.left + fruitRect.width &&
        netRect.left + netRect.width > fruitRect.left &&
        netRect.top < fruitRect.top + fruitRect.height &&
        netRect.height + netRect.top > fruitRect.top
    ) {
        clearInterval(fruitInterval);
        gameArea.removeChild(fruit);
        fruits = fruits.filter(f => f !== fruit);
        score++;
        updateScore();
    }
}

function updateScore() {
    scoreDisplay.textContent = `Poäng: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = `Högsta Poäng: ${highScore}`;
    }
}
