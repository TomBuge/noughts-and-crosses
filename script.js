



function createPlayer(name, playerNumber) {

    const marker = playerNumber === 1 ? 'X' : '0';

    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;

    return {name, marker, getScore, giveScore,}
}

const screenController = (() => {

    const score = document.querySelector(".score");
    const messageDisplay = document.querySelector(".messages");
    const boardDiv = document.querySelector('.game-board');

    

    const displayScore = (player1, player2) => {
        score.textContent = `${player1.name}: ${player1.getScore()}  ${player2.name}: ${player2.getScore()}` 
        console.log(`${player1.name}: ${player1.getScore()}  ${player2.name}: ${player2.getScore()}`)
    };


    const displayMessage = (message) => {

        messageDisplay.classList.remove('hidden');
        messageDisplay.textContent = message;
        setTimeout(() => {
            messageDisplay.classList.add('hidden');
        }, 2000);
    };


    const clearDisplays = () => {
        score.textContent = "";
        messageDisplay.textContent = "";
    }

        
    

    const renderGameBoard = (gameBoard) => {
     
        boardDiv.innerHTML = "";

        for (let i = 0; i < gameBoard.length; i++) {
            const div = document.createElement('div');
            div.classList.add('square')
            div.id = i
            div.textContent = gameBoard[i];
            boardDiv.appendChild(div);
        }
    }

    return {renderGameBoard, displayScore, clearDisplays, displayMessage};

})();


function createGameBoard (player1, player2, player) {
    const gameBoard = [ "", "", "", "", "", "", "", "", ""];
    const getGameBoard = () => [...gameBoard];
    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;
    const players = [player1, player2];
    let isGameOver = false;
    let currentPlayerIndex = 0;
    
    const getIsGameOver = () => isGameOver; 

    const endGame = () => {
        isGameOver = true; 
    }

    const goesFirst = (p1, p2) => Math.random() < 0.5 ? p1: p2; 

    const setActivePlayer = (player) => {
        currentPlayerIndex = players.indexOf(player);
    }


    const switchTurn = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const getActivePlayer = () => players[currentPlayerIndex];

    
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

    const WIN_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6] 
    ]

    const checkWin = (board, marker) => {
        return WIN_COMBINATIONS.some(combination => {  
            return combination.every(index => board[index] === marker);
        });
    };

    const rules = (player) => {
        const board = gameBoard;
        const marker = player.marker; 
        
        if (checkWin(board, marker)) {
            return "win";
        }
        if (board.every(square => square !== "")) {
            return "draw";
        }
        return "active"; 
    } 


    return {
        getGameBoard, 
        playTurn,  
        getPlayer1, 
        getPlayer2, 
        goesFirst, 
        getActivePlayer, 
        setActivePlayer,  
        switchTurn,
        getIsGameOver,
        endGame,
    };
}





const GameController = (() => {

    let activeGame;
    const p1Default = createPlayer("player 1" , 1);
    const p2Default = createPlayer("Player 2", 2);
    let isStarted = false;


    const startNewGame = (p1, p2, playerTurn) => {
        const player1 = p1 || p1Default;
        const player2 = p2 || p2Default;
        const turn = playerTurn || player1;
        activeGame = createGameBoard(player1, player2, turn);
        screenController.renderGameBoard(activeGame.getGameBoard());
        isStarted = true; 
        return activeGame
    };

    const getActiveGame = () => activeGame;
    startNewGame();

    const handleBoardClick = (e) => {

            if (e.target.classList.contains('square')) {
                const index = e.target.id;
                const board = activeGame.getGameBoard();
                const activePlayer = activeGame.getActivePlayer();
                const isGameOver = activeGame.getIsGameOver();
                

                if (isGameOver) {
                    screenController.displayMessage("Game finished! Press new game for next round");
                    return;
                }

                if (!isStarted) {
                    screenController.displayMessage("Enter both player names to play!");
                    return;
                }

                if (board[index] !== "") {
                    screenController.displayMessage("Square already taken!");

                } else {

                    const playerMove = activeGame.playTurn(index, activePlayer);
                    screenController.renderGameBoard(activeGame.getGameBoard());
                    const player1 = activeGame.getPlayer1();
                    const player2 = activeGame.getPlayer2();

                    if (playerMove === "win") {
                        activePlayer.giveScore();
                        activeGame.endGame();
                        screenController.displayScore(player1, player2);
                        screenController.displayMessage(`Game Over! ${activePlayer.name} wins!`);
                        activeGame.switchTurn();
                        return;
                        }  
                        
                    
                    if (playerMove === "draw") {
                        player1.giveScore();
                        player2.giveScore();
                        activeGame.endGame();
                        screenController.displayScore(player1, player2);
                        screenController.displayMessage(`Honourable draw! One point apiece!`);
                        return;
                    }
                    
                    else {
                        activeGame.switchTurn();
                        const nextPlayer = activeGame.getActivePlayer();
                        screenController.displayMessage(`${nextPlayer.name}'s (${nextPlayer.marker}) go`);
                    }    
                }
            }        
        };

    const handleNewGameClick = () => {
            console.log("I'm working!");
            const player1 = activeGame.getPlayer1();
            const player2 = activeGame.getPlayer2();
            const turn = activeGame.getActivePlayer();
            startNewGame(player1, player2, turn);
            screenController.displayMessage(`${turn.name} (${turn.marker}) goes first!`);                       
        };

    const handleFormClick = (e) => {
            e.preventDefault();
            console.log('im being run!');
            const p1 = createPlayer(document.getElementById('player1').value, 1);
            const p2 = createPlayer(document.getElementById('player2').value, 2);

            const newGame = startNewGame(p1, p2, p1);
            const goesFirst = newGame.goesFirst(p1, p2);
            newGame.setActivePlayer(goesFirst);

            console.log(p1.name);
            console.log(p2.name);
            
            screenController.displayMessage(`${goesFirst.name} goes first!`);
        };
    

    const init = () => {

        const board = document.querySelector('.game-board');
        board.addEventListener('click', handleBoardClick)
        
       
        const button = document.querySelector('.new-game');
        button.addEventListener('click', handleNewGameClick);
     

        const form = document.querySelector('.player-names');
        form.addEventListener('submit', handleFormClick);
    };

    init();

    return {startNewGame, getActiveGame};
})();





console.log(GameController.getActiveGame().getActivePlayer().name)





// change to 'starting player' for argument in startNewGame 

// look at player name flowing through to playTurn 

    //   displayController({
    //             player1: getPlayer1(), 
    //             player2: getPlayer2(), 
    //             message: `Game Over! ${player.name} wins!`
    //         });