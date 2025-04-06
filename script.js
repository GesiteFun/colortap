// Game Elements
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const highScoreDisplay = document.getElementById('high-score');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

// Game Variables
let score = 0;
let timeLeft = 30;
let highScore = localStorage.getItem('colorTapHighScore') || 0;
let gameInterval;
let targetColor = '';
let gameActive = false;

// Initialize
highScoreDisplay.textContent = highScore;

// Generate color boxes
function generateColorBoxes() {
    gameBoard.innerHTML = '';
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', '#FB5607', '#8338EC', '#3A86FF', '#FF006E', '#A5DD9B'];
    colors.forEach(color => {
        const box = document.createElement('div');
        box.className = 'color-box';
        box.style.backgroundColor = color;
        box.dataset.color = color;
        box.addEventListener('click', checkColor);
        gameBoard.appendChild(box);
    });
}

// Start Game
function startGame() {
    if (gameActive) return;
    gameActive = true;
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startBtn.disabled = true;
    generateColorBoxes();
    setTargetColor();
    
    gameInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Set random target color
function setTargetColor() {
    const boxes = document.querySelectorAll('.color-box');
    const randomIndex = Math.floor(Math.random() * boxes.length);
    targetColor = boxes[randomIndex].dataset.color;
    boxes[randomIndex].classList.add('active');
}

// Check clicked color
function checkColor(e) {
    if (!gameActive) return;
    
    const clickedColor = e.target.dataset.color;
    if (clickedColor === targetColor) {
        score++;
        scoreDisplay.textContent = score;
        e.target.classList.remove('active');
        setTargetColor();
    } else {
        score = Math.max(0, score - 1);
        scoreDisplay.textContent = score;
    }
}

// End Game
function endGame() {
    clearInterval(gameInterval);
    gameActive = false;
    startBtn.disabled = false;
    
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
        localStorage.setItem('colorTapHighScore', highScore);
    }
    
    alert(`Game Over! Your Score: ${score}`);
}

// Reset Game
function resetGame() {
    clearInterval(gameInterval);
    gameActive = false;
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startBtn.disabled = false;
    gameBoard.innerHTML = '';
}

// Event Listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);