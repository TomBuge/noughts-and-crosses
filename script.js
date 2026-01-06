function createGameBoard () {
    const gameBoard = [ "", "", "", "", "", "", "X", "X", "X"];
    console.log(gameBoard);
    return gameBoard;

    
    }

const rules = () => {
        const board = createGameBoard();
        if ((board[0] === "X" && board[1] === "X" && board[2] === "X")
        ||  (board[3] === "X" && board[4] === "X" && board[5] === "X")
        ||  (board[6] === "X" && board[7] === "X" && board[8] === "X") 
        ||  (board[0] === "X" && board[3] === "X" && board[6] === "X") 
        ||  (board[1] === "X" && board[4] === "X" && board[7] === "X") 
        ||  (board[2] === "X" && board[5] === "X" && board[8] === "X") 
        ||  (board[0] === "X" && board[4] === "X" && board[8] === "X") 
        ||  (board[6] === "X" && board[4] === "X" && board[2] === "X")) {
            console.log("Game Over! Player X wins!")
        } 

        if ((board[0] === "0" && board[1] === "0" && board[2] === "0")
        ||  (board[3] === "0" && board[4] === "0" && board[5] === "0")
        ||  (board[6] === "0" && board[7] === "0" && board[8] === "0") 
        ||  (board[0] === "0" && board[3] === "0" && board[6] === "0") 
        ||  (board[1] === "0" && board[4] === "0" && board[7] === "0") 
        ||  (board[2] === "0" && board[5] === "0" && board[8] === "0") 
        ||  (board[0] === "0" && board[4] === "0" && board[8] === "0") 
        ||  (board[6] === "0" && board[4] === "0" && board[2] === "0")) {
            console.log("Game Over! Player 0 wins!")

        }
    }

rules()

function createPlayer(name) {
    let player1 = ""
    let player2 = ""; 
    if (player1 === "") {
        player1 = name;
    } else {
        player2 = name;
    }

    return { player1, player2}

}

const tom = createPlayer("Tom");
console.log(tom);

