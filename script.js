const gameBoard = document.getElementById('gameBoard');
const gameMessage = document.getElementById('gameMessage');
const resetButton = document.getElementById('resetButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scores = { X: 0, O: 0 };
let gameActive = true;

// Initialize board
function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.dataset.index = index;
        cellElement.addEventListener('click', handleCellClick);
        cellElement.textContent = cell;
        gameBoard.appendChild(cellElement);
    });
    updateMessage(`Player ${currentPlayer}'s turn`);
}

// Handle cell click
function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (!board[index] && gameActive) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            updateMessage(`Player ${currentPlayer} wins!`);
            scores[currentPlayer]++;
            updateScore();
            gameActive = false;
        } else if (board.every(cell => cell)) {
            updateMessage("It's a draw!");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateMessage(`Player ${currentPlayer}'s turn`);
        }
    }
}

// Check win conditions
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );
}

// Update game message
function updateMessage(message) {
    gameMessage.textContent = message;
}

// Update score
function updateScore() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

// Reset game
resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    createBoard();
});

// Initialize game
createBoard();
