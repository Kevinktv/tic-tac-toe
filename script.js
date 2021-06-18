let Players = function(name, token, type){

    return {name, token, type}
}


let gameBoard = (function(){
    let player1 = Players('Player 1', 'X', 'human');
    let player2 = Players('Player 2', 'O', 'computer');
    let currentPlayer = player1;
    let otherPlayer = player2;
    let _board = ['', '', '', '', '', '', '', '', ''];
    let _domTiles = Array.from(document.querySelectorAll('.board-item'));
    let _winner = document.getElementById('winner');
    let _gameOver = false;
    
    const winCondition = [
        ['.', '.', '.', '', '', '', '', '', ''],
        ['', '', '', '.', '.', '.'],
        ['', '', '', '', '', '', '.', '.', '.'],
        ['.', '', '', '.', '', '', '.', '', ''],
        ['', '.', '', '', '.', '', '', '.', ''],
        ['', '', '.', '', '', '.', '', '', '.'],
        ['.', '', '', '', '.', '', '', '', '.'],
        ['', '', '.', '', '.', '', '.', '', '']
    ];

    // const player2wins = [
    //     [player2.token, player2.token, player2.token, '', '', '', '', '', ''],
    //     ['', '', '', player2.token, player2.token, player2.token],
    //     ['', '', '', '', '', '', player2.token, player2.token, player2.token],
    //     [player2.token, '', '', player2.token, '', '', player2.token, '', ''],
    //     ['', player2.token, '', '', player2.token, '', '', player2.token, ''],
    //     ['', '', player2.token, '', '', player2.token, '', '', player2.token],
    //     [player2.token, '', '', '', player2.token, '', '', '', player2.token],
    //     ['', '', player2.token, '', player2.token, '', player2.token, '', '']
    // ];

    let displayBoard = function(){
        for(let cell = 0; cell < 9; ++cell){
            _domTiles[cell].textContent = _board[cell];
        }
    }

    let initialize = function(p1, p2){
        _board = ['', '', '', '', '', '', '', '', ''];
        displayBoard();
        player1 = p1;
        player2 = p2;
        currentPlayer = player1;
        otherPlayer = player2;
        _winner.textContent = '';
        _gameOver = false;
        _domTiles.forEach(function(tile){tile.classList.remove('emphasize-tiles')});
        _domTiles.forEach(function(tile){tile.addEventListener('click', playRound)});
        if(player1.type == 'computer'){
            computerPlay(currentPlayer, otherPlayer);
        }
    }


    let checkWinner = function(currPlayer){
        let flag1 = 0;
        let winningTiles = [];
        for(let winPosn of winCondition){
            let flag = 0;
            for(let i = 0; i < 9; ++i){
                if(winPosn[i] === '.'){
                    if(_board[i] != currPlayer.token){
                        flag = 1;
                        winningTiles = [];
                        break;
                    }
                    winningTiles.push(i);
                }
            }
            if(flag == 0){
                _winner.textContent = `${currPlayer.name} has won the game!`;
                flag1 = 1;
                _gameOver = true;
                for(let tileno of winningTiles){
                    _domTiles[tileno].classList.add('emphasize-tiles')
                }
            }


        }

        let flag2 = 0;
        for(let tile of _board){
            if(tile == ''){
                flag2 = 1;
                break;
            }
        }
        if(flag2 == 0 && flag1 == 0){
            _winner.textContent = `The game has ended in a draw`;
            _gameOver = true;
        }
    }

    let playRound = function(){
        if(player2.type == 'human' && player1.type == 'human'){
            if(!this.textContent){
                if(currentPlayer == player1){

                    let index = _domTiles.indexOf(this);
                    _board[index] = player1.token;
                    this.textContent = player1.token;
                    checkWinner(currentPlayer);
                    currentPlayer = player2;
                }
                else{
                    let index = _domTiles.indexOf(this);
                    _board[index] = player2.token;
                    this.textContent = player2.token;
                    checkWinner(currentPlayer);
                    currentPlayer = player1;
                }
            }

            if(_gameOver){
                _domTiles.forEach(function(tile){tile.removeEventListener('click', playRound)});
            }
        }

        else{
            // if(currentPlayer == player1){
            //     if(!this.textContent){
            //         let index = _domTiles.indexOf(this);
            //         _board[index] = currentPlayer.token;
            //         this.textContent = currentPlayer.token;
            //         checkWinner(currentPlayer);
            //         currentPlayer = player2;
            //         if(!_gameOver){
            //             computerPlay();
            //         }
            //     }

            // }
            // else{
            //     computerPlay();
            // }
            if(!this.textContent){
                let index = _domTiles.indexOf(this);
                _board[index] = currentPlayer.token;
                this.textContent = currentPlayer.token;
                checkWinner(currentPlayer);
                let temp = currentPlayer;
                currentPlayer = otherPlayer;
                otherPlayer = temp;
                if(!_gameOver){
                    computerPlay(currentPlayer, otherPlayer);
                }
            


            }
            if(_gameOver){
                _domTiles.forEach(function(tile){tile.removeEventListener('click', playRound)});
            }
        }
    }

    
        
    let computerPlay = function(computerPlayer, humanPlayer){
        let choices = [];
        for(let i = 0; i < 9; ++i){
            if(_board[i] == ''){
                choices.push(i)
            }
        }

        let choice = choices[Math.floor(Math.random() * choices.length)];
        _board[choice] = computerPlayer.token;
        setTimeout(function(){_domTiles[choice].textContent = computerPlayer.token;}, 200);
        checkWinner(computerPlayer);
        otherPlayer = computerPlayer;
        currentPlayer = humanPlayer;
    
                
    }



    return {initialize}
})();




let displayController = (function(){

    let mainMenu = document.getElementById('main-menu');
    let game = document.getElementById('game');
    let vsPlayer = document.getElementById('vsplayer');
    let vsComputer = document.getElementById('vscomputer');
    let restart = document.getElementById('restart');
    let goBack = document.getElementById('go-back');
    let p1;
    let p2;
    let easy = document.getElementById('easy');
    let hard = document.getElementById('hard');
    let settings = document.getElementById('settings');
    let x  = document.getElementById('x');
    let o = document.getElementById('o');
    let back = document.getElementById('back');

    let vsPlayerControl = function(e){
        mainMenu.style.display = 'none';
        game.style.display = 'block';
        p1 = Players('Player 1', 'X', 'human');
        p2 = Players('Player 2', 'O', 'human');
        gameBoard.initialize(p1, p2);

    }

    let startComputerGame = function(e){
        settings.style.display = 'none';
        game.style.display = 'block';
        let difficulty = easy.classList.contains('emphasize-buttons')?'easy':'hard';
        console.log(difficulty);
        let token = x.classList.contains('emphasize-buttons')?'X':'O';
        if(token == 'X'){
            p1 = Players('Player 1', 'X', 'human');
            p2 = Players('Computer', 'O', 'computer');
        }
        else{
            p1 = Players('Computer', 'X', 'computer');
            p2 = Players('Player 1', 'O', 'human');
        }
        gameBoard.initialize(p1, p2);
    }

    let vsComputerControl = function(e){
        mainMenu.style.display = 'none';
        // game.style.display = 'block';
        // p1 = Players('Player 1', 'X', 'human');
        // p2 = Players('Player 2', 'O', 'computer');
        // gameBoard.initialize(p1, p2);
        settings.style.display = 'block';
        let start = document.getElementById('start-game');
        start.onclick = startComputerGame;

    }

    

    let restartGame = function(e){
        gameBoard.initialize(p1, p2);
    }

    let goBackToMenu = function(e){
        game.style.display = 'none';
        mainMenu.style.display = 'block';
    }

    vsPlayer.onclick = vsPlayerControl;
    vsComputer.onclick = vsComputerControl;
    restart.onclick = restartGame;
    goBack.onclick = goBackToMenu;
    easy.onclick = function(){
        easy.classList.add('emphasize-buttons');
        hard.classList.remove('emphasize-buttons');
    }
    hard.onclick = function(){
        hard.classList.add('emphasize-buttons');
        easy.classList.remove('emphasize-buttons');
    }
    x.onclick = function(){
        x.classList.add('emphasize-buttons');
        o.classList.remove('emphasize-buttons');
    }
    o.onclick = function(){
        o.classList.add('emphasize-buttons');
        x.classList.remove('emphasize-buttons');
    }
    back.onclick = function(){
        settings.style.display = 'none';
        mainMenu.style.display = 'block';
    }

})();