



function createPlayer(name, playerNumber) {

    const marker = playerNumber === 1 ? 'X' : '0';

    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;

    return {name, marker, getScore, giveScore,}
}

const displayController = ({player1, player2, message}) => {
    const score = document.querySelector(".score");
    const messageDisplay = document.querySelector(".messages")
    if (player1 && player2) {
        score.textContent = `${player1.name}: ${player1.getScore()}  ${player2.name}: ${player2.getScore()}` 
        console.log(`${player1.name}: ${player1.getScore()}  ${player2.name}: ${player2.getScore()}`)
    }

    messageDisplay.classList.remove('hidden');
    messageDisplay.textContent = message;
    setTimeout(() => {
        messageDisplay.classList.add('hidden');
    }, 2000);

    const clearDisplays = () => {
        score.textContent = "";
        messageDisplay.textContent = "";
    }

    return clearDisplays
}


function createGameBoard (player1, player2, playerTurn) {
    const gameBoard = [ "", "", "", "", "", "", "", "", ""];
    const getPlayerTurn = () => playerTurn;
    const getGameBoard = () => [...gameBoard];
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;
    
    const goesFirst = (p1, p2) => Math.random() < 0.5 ? p1: p2; 

    const setPlayerTurn = (player) => playerTurn = player;


    const turnCounter = (player) => {
        if (player.marker === "X") {
            playerTurn = player2;
            displayController({message: `${player2.name}'s go`})
        } else {
            playerTurn = player1;
            displayController({message: `${player1.name}'s go`})
        }
    }

    
    function playTurn(userInput, player) {
        if (gameBoard[userInput] !== "") {
            console.log("square already used!Choose again");
            return false;
        }
        else {   
        player.marker === 'X' ? gameBoard[userInput] = 'X' : gameBoard[userInput] = '0';
        console.log(gameBoard);
        return rules(player);
        }
    }

    const rules = (player) => {
        const board = gameBoard;
        let message = "";
        
        if ((board[0] === "X" && board[1] === "X" && board[2] === "X")
        ||  (board[3] === "X" && board[4] === "X" && board[5] === "X")
        ||  (board[6] === "X" && board[7] === "X" && board[8] === "X") 
        ||  (board[0] === "X" && board[3] === "X" && board[6] === "X") 
        ||  (board[1] === "X" && board[4] === "X" && board[7] === "X") 
        ||  (board[2] === "X" && board[5] === "X" && board[8] === "X") 
        ||  (board[0] === "X" && board[4] === "X" && board[8] === "X") 
        ||  (board[6] === "X" && board[4] === "X" && board[2] === "X")) {

            message = `Game Over! ${player.name} wins!`;
            if (player.marker === 'X') player.giveScore();
            displayController({player1: getPlayer1(), player2: getPlayer2(), message});
            GameController.startNewGame(player1, player2, player2);
            return true;  
        } 

        if ((board[0] === "0" && board[1] === "0" && board[2] === "0")
        ||  (board[3] === "0" && board[4] === "0" && board[5] === "0")
        ||  (board[6] === "0" && board[7] === "0" && board[8] === "0") 
        ||  (board[0] === "0" && board[3] === "0" && board[6] === "0") 
        ||  (board[1] === "0" && board[4] === "0" && board[7] === "0") 
        ||  (board[2] === "0" && board[5] === "0" && board[8] === "0") 
        ||  (board[0] === "0" && board[4] === "0" && board[8] === "0") 
        ||  (board[6] === "0" && board[4] === "0" && board[2] === "0")) {
           
            message = `Game Over! ${player.name} wins!`;
            if (player.marker === '0') player.giveScore();
            displayController({player1: getPlayer1(), player2: getPlayer2(), message});
            GameController.startNewGame(player1, player2, player1);
            return true;
        }
        return false;
    }

    return {getGameBoard, playTurn, rules, turnCounter, getPlayerTurn, getPlayer1, getPlayer2, goesFirst, setPlayerTurn};
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

    const newGame = GameController.startNewGame(p1, p2, p1);
    const goesFirst = newGame.goesFirst(p1, p2);
    newGame.setPlayerTurn(goesFirst);

    console.log(p1.name);
    console.log(p2.name);
    
    displayController({message: `${goesFirst.name} goes first!`});

});

const GameController = (() => {
    let activeGame;

    const p1Default = createPlayer("player 1" , 1);
    const p2Default = createPlayer("Player 2", 2);


    const startNewGame = (p1, p2, playerTurn) => {
        const player1 = p1 || p1Default;
        const player2 = p2 || p2Default;
        const turn = playerTurn || player1;
        activeGame = createGameBoard(player1, player2, turn);
        displayGameBoard(activeGame.getGameBoard());
        return activeGame
    };

    const getActiveGame = () => activeGame;

    startNewGame();

    return {startNewGame, getActiveGame};
})();


const gameBoardClickListener = (() => {

    const board = document.querySelector('.game-board');

    board.addEventListener('click', (e) => {

        if (e.target.classList.contains('square')) {
            const index = e.target.id;
            const activeGame = GameController.getActiveGame();
            const board = activeGame.getGameBoard();
            if (activeGame.getPlayerTurn().name === "player 1") {
                displayController({message: "Enter both player names to play!"});
            }
            if (board[index] !== "") {
                displayController({message: "Square already taken!"});
            } else {
                let player = activeGame.getPlayerTurn();
                const isGameOver = activeGame.playTurn(index, player);
                if (isGameOver) return;
                const isBoardFull = activeGame.getGameBoard();
                if (isBoardFull.every(square => square !== "")) {
                    activeGame.turnCounter(player);
                    const player1 = activeGame.getPlayer1();
                    const player2 = activeGame.getPlayer2();
                    player1.giveScore();
                    player2.giveScore();
                    player = activeGame.getPlayerTurn();
                    displayController({player1, player2, message: "Honourable draw! One point each"})
                    GameController.startNewGame(player1, player2, player);
                    return;
                }

                activeGame.turnCounter(player); 
                displayGameBoard(activeGame.getGameBoard());
                console.log(activeGame.getPlayerTurn());
            }
        }
            
    })
})();

const newGameClickListener = (() => {
    const button = document.querySelector('.new-game');
    const message = document.querySelector('.messages');
    const score = document.querySelector('.score')
    const inputs = document.querySelectorAll('input');
    button.addEventListener('click', () => {
        console.log("I'm working!");
        GameController.startNewGame();
        message.textContent = "";
        score.textContent = "";
        inputs.forEach(input => input.value = "");

    })
})();


console.log(GameController.getActiveGame().getPlayerTurn().name)





// change to 'starting player' for argument in startNewGame 

// look at player name flowing through to playTurn 