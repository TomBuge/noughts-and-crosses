



function createPlayer(name, playerNumber) {

    const marker = playerNumber === 1 ? 'X' : '0';

    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;

    return {name, marker, getScore, giveScore}
}




function createGameBoard (player1, player2, playerTurn) {
    const gameBoard = [ "", "", "", "", "", "", "", "", ""];
    

    const displayController = () => {
        console.log(`${player1.name}: ${player1.getScore()}.  ${player2.name}: ${player2.getScore()}`)
    }

    const getPlayerTurn = () => playerTurn;


    const getGameBoard = () => [...gameBoard];

    const turnCounter = (player) => {
        if (player.marker === "X") {
            playerTurn = player2;
            console.log(`first one worked and player2 marker is ${player2.marker}`)
        } else {
            playerTurn = player1;
            console.log(`second one worked and player1 marker is ${player1.marker}`)
        }
    }

    
    function playTurn(userInput, player) {
        if (gameBoard[userInput] !== "") {
            console.log("square already used!Choose again");
        }
        else {   
        player.marker === 'X' ? gameBoard[userInput] = 'X' : gameBoard[userInput] = '0';
        console.log(gameBoard);
        rules(player);
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

    return {getGameBoard, playTurn, rules, displayController, turnCounter, getPlayerTurn};
}

const displayGameBoard = (gameBoard) => {

    const board = document.querySelector('.game-board');
    board.innerHTML = "";

    for (let i = 0; i < gameBoard.length; i++) {
        const div = document.createElement('div');
        div.classList.add('square')
        div.id = i
        div.textContent = gameBoard[i];
        board.appendChild(div);
    }
}



const form = document.querySelector('.player-names');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('im being run!');
    const p1 = createPlayer(document.getElementById('player1').value, 1);
    const p2 = createPlayer(document.getElementById('player2').value, 2);

    const goesFirst = Math.random() < 0.5 ? p1: p2; 

    console.log(p1.name);
    console.log(p2.name);
    GameController.startNewGame(p1, p2, goesFirst);

    const message = document.querySelector('.messages');
    message.textContent = `${goesFirst.name} goes first!`;

});

const GameController = (() => {
    let activeGame;

    const startNewGame = (p1, p2, playerTurn) => {
        activeGame = createGameBoard(p1, p2, playerTurn);
        displayGameBoard(activeGame.getGameBoard());
        return activeGame
    };

    const getActiveGame = () => activeGame;

    return {startNewGame, getActiveGame};
})();

const board = document.querySelector('.game-board');

    board.addEventListener('click', (e) => {

        if (e.target.classList.contains('square')) {
            const index = e.target.id;
            const activeGame = GameController.getActiveGame();
            const message = document.querySelector('.messages');
            if (activeGame.getPlayerTurn().name === "player 1") {
                message.textContent = "Enter both player names to play!"
            }
            else {
                let player = activeGame.getPlayerTurn();
                activeGame.playTurn(index, player);
                activeGame.turnCounter(player); 
                displayGameBoard(activeGame.getGameBoard());
                console.log(activeGame.getPlayerTurn());
            }
        }
            
    })


const p1Default = createPlayer("player 1" , 1);
const p2Default = createPlayer("Player 2", 2);

const setBoard = GameController.startNewGame(p1Default, p2Default, p1Default);
console.log(GameController.getActiveGame().getPlayerTurn().name)




// change to 'starting player' for argument in startNewGame 

