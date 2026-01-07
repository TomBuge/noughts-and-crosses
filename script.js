



function createPlayer(name, playerNumber) {

    const marker = playerNumber === 1 ? 'X' : '0';

    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;

    return {name, marker, getScore, giveScore}
}




function createGameBoard (player1, player2) {
    const gameBoard = [ "X", "", "X", "", "", "", "", "", ""];
    let turn = "";
    console.log(gameBoard);

    const displayController = () => {
        console.log(`${player1.name}: ${player1.getScore()}.  ${player2.name}: ${player2.getScore()}`)
    }

    const getTurn = () => turn;

    const getGameBoard = () => [...gameBoard];

    const turnCounter = (marker = "") => {
        if (marker === "") turn = "";
        else {
        turn = (marker === "X") ? "0" : "X";
        console.log(`it\s ${turn}'s turn`); }
        return turn;
    }

    
    function playTurn(userInput, player) {
        if (gameBoard[userInput] !== "") {
            console.log("square already used!Choose again");
        }
        else if (getTurn() !== player.marker && getTurn() !== "") {
            console.log("Not so fast Dude - it's not your turn!");
        }
        else {   
        player.marker === 'X' ? gameBoard[userInput] = 'X' : gameBoard[userInput] = '0';
        console.log(gameBoard);
        rules(player);
        turnCounter(player.marker);
        }
    }

    const rules = (player) => {
        const board = gameBoard;
        if ((board[0] === "X" && board[1] === "X" && board[2] === "X")
        ||  (board[3] === "X" && board[4] === "X" && board[5] === "X")
        ||  (board[6] === "X" && board[7] === "X" && board[8] === "X") 
        ||  (board[0] === "X" && board[3] === "X" && board[6] === "X") 
        ||  (board[1] === "X" && board[4] === "X" && board[7] === "X") 
        ||  (board[2] === "X" && board[5] === "X" && board[8] === "X") 
        ||  (board[0] === "X" && board[4] === "X" && board[8] === "X") 
        ||  (board[6] === "X" && board[4] === "X" && board[2] === "X")) {
            console.log(`Game Over! ${player.name} wins!`)
            if (player.marker === 'X') player.giveScore();
            displayController();
        } 

        if ((board[0] === "0" && board[1] === "0" && board[2] === "0")
        ||  (board[3] === "0" && board[4] === "0" && board[5] === "0")
        ||  (board[6] === "0" && board[7] === "0" && board[8] === "0") 
        ||  (board[0] === "0" && board[3] === "0" && board[6] === "0") 
        ||  (board[1] === "0" && board[4] === "0" && board[7] === "0") 
        ||  (board[2] === "0" && board[5] === "0" && board[8] === "0") 
        ||  (board[0] === "0" && board[4] === "0" && board[8] === "0") 
        ||  (board[6] === "0" && board[4] === "0" && board[2] === "0")) {
            console.log(`Game Over! ${player.name} wins!`)
            if (player.marker === '0') player.giveScore();
            displayController();
        }
    }

    return {getGameBoard, playTurn, rules, displayController, turnCounter, getTurn};
}

const displayGameBoard = (gameBoard) => {
    console.log(gameBoard);
    const board = document.querySelector('.game-board');

    for (let i = 0; i < gameBoard.length; i++) {
        const div = document.createElement('div');
        div.classList.add('square')
        div.textContent = gameBoard[i];
        board.appendChild(div);
        console.log(`I'm new div ${i}`);
    }
}



const tom = createPlayer("Tom", 1);
console.log(tom);
const soph = createPlayer("Sophie", 2);
console.log(soph);

const newGame = createGameBoard(tom, soph);


displayGameBoard(newGame.getGameBoard());





