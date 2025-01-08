function createPlayer(name, type) {
    return {name, type};
}

const gameBoard = (function() {
    let board = Array(9).fill("");

    // Returns a replica of the board array.
    const getBoard = () => [...board];

    const checkIfEmpty = (position) => {
        return board[position] === "";
    }

    const placeItem = (position, type) => {
        board[position] = type;
    }

    const checkIfWinner = (type) => {
        // Check for columns.
        for (let i = 0; i < 3; i++) {
            if (board[i] === type && board[i + 3] === type && board[i + 6] === type) {
                return true;
            }
        }

        // Check for rows.
        for (let i = 0; i < 3; i++) {
            if (board[i * 3] === type && board[i * 3 + 1] === type && board[i * 3 + 2] === type) {
                return true;
            }
        }

        // Check for diagonals.
        if (board[0] === type && board[4] === type && board[8] === type) {
            return true;
        }
        if (board[2] === type && board[4] === type && board[6] === type) {
            return true;
        }

        return false;
    }

    const clearBoard = () => {
        board.fill("");
    }

    return {getBoard, checkIfEmpty, placeItem, checkIfWinner, clearBoard};
})();

const gameManager = (function() {
    let player1, player2;
    let canInput = false;
    let round = 0;

    // Initializes pre-game values.
    const startGame = (player1Name, player2Name) => {
        player1 = createPlayer(player1Name, "X");
        player2 = createPlayer(player2Name, "O");
        canInput = true;
        round = 0;
    }

    // Places an item depending on the current type.
    const playRound = (number, currentType) => {
        gameBoard.placeItem(number, currentType);
        round++;
    }

    const endRound = () => {
        gameBoard.clearBoard();
        canInput = false;
    };

    const askingForPrompt = () => {
        return canInput;
    }

    const getRound = () => {
        return round;
    }

    const getPlayerName = (type) => {
        if (type === "X") {
            return player1.name;
        } else {
            return player2.name;
        }
    }

    return {startGame, playRound, endRound, askingForPrompt, getRound, getPlayerName};
})();

const displayController = (function() {
    const startButton = document.querySelector("#start-button");
    const gameSection = document.querySelector("#game-section");
    const statusSection = document.querySelector("#status-section");
    const player1Name = document.querySelector("#player1-name");
    const player2Name = document.querySelector("#player2-name");

    startButton.addEventListener("click", () => {
        gameBoard.clearBoard();
        gameManager.startGame(player1Name.value, player2Name.value);

        for (let i = 0; i < gameSection.children.length; i++) {
            gameSection.children[i].textContent = "";
        }
        statusSection.textContent = "";
    })

    for (let i = 0; i < gameSection.children.length; i++) {
        gameSection.children[i].addEventListener("click", () => {
            if (gameManager.askingForPrompt() && gameBoard.checkIfEmpty(i)) {
                let currentType = gameManager.getRound() % 2 === 0 ? "X" : "O"
                gameManager.playRound(i, currentType);
                gameSection.children[i].textContent = currentType;
                gameSection.children[i].style.color = currentType === "X" ? "red" : "black";

                if (gameBoard.checkIfWinner(currentType)) {
                    gameManager.endRound();
                    statusSection.textContent = `${gameManager.getPlayerName(currentType)} wins!`;
                } else if (gameManager.getRound() >= 9) {
                    gameManager.endRound();
                    statusSection.textContent = "No one wins.";
                }    
            }
        })
    }
})();




