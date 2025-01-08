function createPlayer(name, type) {
    return {name, type}
}

const gameBoard = (function() {
    let board = Array(9).fill("");

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
    const playGame = () => {
        let player1 = createPlayer("Player1", "X");
        let player2 = createPlayer("Player2", "O");
        let hasWinner = false;

        // Asks for a the players' name.
        player1.name = prompt("What is the first player's name?", player1.name);
        player2.name = prompt("What is the second player's name?", player2.name);

        // Game runs for 9 rounds.
        for (let i = 0; i < 9; i++) {
            const currentType = i % 2 === 0 ? "X" : "O";
            let userInput;

            do {
                userInput = prompt(`Round ${i + 1} - Enter a number between 1 and 9:`);
            } while (isNaN(parseInt(userInput)) || Number(userInput) < 1 || Number(userInput) > 9 || !gameBoard.checkIfEmpty(userInput - 1));

            gameBoard.placeItem(userInput - 1, currentType);
            console.log(gameBoard.getBoard());

            // Runs if a player wins.
            if (gameBoard.checkIfWinner(currentType)) {
                if (currentType === "X") {
                    alert(`${player1.name} wins!`);
                } else {
                    alert(`${player2.name} wins!`);
                }

                hasWinner = true;
                break;
            }
        }

        // Runs if there is a tie.
        if (!hasWinner) alert("No one wins!");
        gameBoard.clearBoard();
    }

    return {playGame};
})();

const displayController = (function() {
    
})();

//gameManager.playGame();




