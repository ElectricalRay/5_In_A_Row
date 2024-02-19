//initializes and makes an array with a reference to all of the square spaces seen on the board
//fits the requirements for a collection type to be used as it is a JS array, which is very similar to a python list, which is recognized as a collection type
const squares = new Array();
document.querySelectorAll('.square').forEach(square => squares.push(square));

//creates a variable that determine the current player 
let turn = null;

//creates a null variable that will be used to store whether or not there is a winner yet, if there is who, or if its a draw
let winner = null;

//creates a null variable that will be used to determine if the computer should go first or the player in player vs computer mode
//also used to determine if comp mode should be activated or not
let compModeFirst = null;

//creates variables with references to all of the buttons for choosing X and O; what mode; and who goes first; and for restarting the game
const buttonX = document.getElementById('xButton');
const buttonO = document.getElementById('oButton');
const Players2 = document.getElementById('2pbutton');
const CompButton = document.getElementById('compButton');
const compFirstButton = document.getElementById('compFirstButton');
const playerFirstButton = document.getElementById('playerFirstButton');
const restartButton = document.getElementById('restart');

//when the X button is clicked, turn = X so in 2player X goes first and in comp mode player is X
//also if the compModeFirst variable has something, that means user picked to play the comp mode, so then computerGameStart function is run to play that mode
buttonX.onclick = function() {
    turn = 'X';
    document.getElementById('xButton').style.display = 'none';
    document.getElementById('oButton').style.display = 'none';
    document.getElementById('description').style.display = 'none';
    document.getElementById('altDescription').style.display = 'none'
    if(compModeFirst) {
        computerGameStart()
    }
}

//when the O button is clicked, turn = O so in 2player O goes first and in comp mode player is O
//also if the compModeFirst variable has something, that means user picked to play the comp mode, so then computerGameStart function is run to play that mode
buttonO.onclick = function() {
    turn = 'O';
    document.getElementById('xButton').style.display = 'none';
    document.getElementById('oButton').style.display = 'none';
    document.getElementById('description').style.display = 'none';
    document.getElementById('altDescription').style.display = 'none';
    if(compModeFirst) {
        computerGameStart()
    }
}

//if 2player mode chosen, then the playersGameStart function run to play that mode
Players2.onclick = function() {
    document.getElementById('2pbutton').style.display = 'none';
    document.getElementById('compButton').style.display = 'none';
    document.getElementById('description2').style.display = 'none';
    document.getElementById('xButton').style.display = 'inline-block';
    document.getElementById('oButton').style.display = 'inline-block';
    document.getElementById('description').style.display = 'block';
    playersGameStart();
}

//if comp mode chosen, then option for if player or comp goes first is shown
CompButton.onclick = function() {
    document.getElementById('2pbutton').style.display = 'none';
    document.getElementById('compButton').style.display = 'none';
    document.getElementById('description2').style.display = 'none';
    document.getElementById('compFirstButton').style.display = 'inline-block';
    document.getElementById('playerFirstButton').style.display = 'inline-block';
    document.getElementById('description3').style.display = 'block';
}

//if comp chosen to go first, compModeFirst variable assigned value computer which will run compMode with comp first when player chooses to be X or O
compFirstButton.onclick = function() {
    document.getElementById('compFirstButton').style.display = 'none';
    document.getElementById('playerFirstButton').style.display = 'none';
    document.getElementById('description3').style.display = 'none';
    document.getElementById('altDescription').style.display = 'block';
    document.getElementById('xButton').style.display = 'inline-block';
    document.getElementById('oButton').style.display = 'inline-block';
    compModeFirst = 'computer';
}

//if player chosen to go first, compModeFirst variable assigned value player which will run compMode with player first
playerFirstButton.onclick = function() {
    document.getElementById('compFirstButton').style.display = 'none';
    document.getElementById('playerFirstButton').style.display = 'none';
    document.getElementById('description3').style.display = 'none';
    document.getElementById('altDescription').style.display = 'block';
    document.getElementById('xButton').style.display = 'inline-block';
    document.getElementById('oButton').style.display = 'inline-block';
    compModeFirst = 'player';
}

//if restart button is clicked, then the game is reset and the board is cleared
//only appears once there is a winner or there is a draw
restartButton.onclick = function() {
    location.reload();
}

//stores every possible winning condition using the coordinates in each space's id
//also fits the requirements for a collection type as it is a JS object, which are very similar to Python dictionaries which are recognized as a collection type
const winningConditions = {
    cond1: ['0,4', '0,3', '0,2', '0,1', '0,0'],
    cond2: ['1,4', '1,3', '1,2', '1,1', '1,0'],
    cond3: [ '2,4', '2,3', '2,2', '2,1', '2,0'],
    cond4: ['3,4', '3,3', '3,2', '3,1', '3,0'],
    cond5: ['4,4', '4,3', '4,2', '4,1', '4,0'],
    cond6: ['0,4', '1,4', '2,4', '3,4', '4,4'],
    cond7: ['0,3', '1,3', '2,3', '3,3', '4,3'],
    cond8: ['0,2', '1,2', '2,2', '3,2', '4,2'],
    cond9: [ '0,1', '1,1', '2,1', '3,1', '4,1'],
    cond10: ['0,0', '1,0', '2,0', '3,0', '4,0'],
    cond11: ['0,4', '1,3', '2,2', '3,1', '4,0'],
    cond12: ['0,0', '1,1', '2,2', '3,3', '4,4']
};

//converts each coordinate in the winningConditions to a reference to the actual space
for(cond in winningConditions) {
    winningConditions[cond].forEach(square => {
        winningConditions[cond][winningConditions[cond].indexOf(square)] = document.getElementById(square);
    })
}

//creates a function that checks if a player won, or if its a draw
//fits the requirements for a function with at least one parameter which is 'turn', sequencing as a winner should be checked before a draw since a player can win with the whole board filled, selection since if statements are used to select whether or not the game has a winner yet, if it is a draw, or if the game is still going, and iterations as the all of  the squares need to be iterated through to check if they are all filled, and the conditions object's properties as well as the arrays in its properties need to be iterated through to check if there is a winner 
function checkResult(turn) {
    const resultAnnouncer = document.getElementById('resultAnnouncer');
    if(turn) {
        let result = null;
        //creates variable to which 1 is added for every space that has a child, meaning it has a 'X' or an 'O'. 
        let filled = 0;
        squares.forEach(square => {
            if(square.hasChildNodes()) {
                filled += 1;
            }
        })

        //checks if the spaces are filled according to the winning conditions and if they are all the same letter: 'X' or 'O'. If yes, then the game is over.
        for(cond in winningConditions) {
            if(winningConditions[cond].every(square => square.hasChildNodes() && square.classList.contains(turn))) {
                result = turn;
                resultAnnouncer.style.display = 'block';
                resultAnnouncer.innerHTML = `${result} wins`;
                restartButton.style.display = 'inline-block';
                return cond
            }
        }
        //checks if all the squares are filled after already checking if any are in winning positions, so if they are all filled then the result is a tie
        if(filled === 25) {
            result = 'draw';
            console.log(result)
            resultAnnouncer.style.display = 'block';
            resultAnnouncer.innerHTML = "It's a draw";
            restartButton.style.display = 'inline-block';
            winner = 'draw'
            return result
        }
    }
}

//creates function that will select random empty space, and put an 'X' or 'O' in that space based on what the var turn is
const selectRandom = () => {
    let openSpaces = [];
    squares.forEach(space => {
        if(!space.hasChildNodes()) {
            openSpaces.push(space);
        }
    })
    let chosen = null;
    while (!chosen) {
        let option = openSpaces[Math.floor(Math.random() * openSpaces.length)];
        if(!option.hasChildNodes()) {
            chosen = option
        }
    }
    chosen.innerHTML = turn;
    chosen.classList.add(turn);
}

//adds an event listener to each space to input the letter of whatever player's turn it is. Then it runs the checkResult function to see if there is a winner or draw, and if there is players can no longer make moves
const playersGameStart = () => {
    squares.forEach(square => {
        square.addEventListener('click', e => {
            if(turn && !winner && !e.target.innerHTML) {
                e.target.innerHTML = turn;
                e.target.classList.add(turn);
                if(checkResult(turn)) {
                    winner = turn;
                } else{
                    if(turn === 'X') {
                        turn = 'O';
                    } else {
                        turn = 'X';
                    }
                }
            }
        })
    })
}
//creates function that will activate player vs comp mode, where player can choose space, then comp chooses space and the var turn is changed again so player can choose space again
const computerGameStart = () => {
    //if player is chosen to go fist, then it adds event listener to each space so player can choose space, then it is checked and then comp chooses random space, which is then checked and turn changed again so player can choose space again
    if(compModeFirst && compModeFirst === 'player') {
        squares.forEach(square => {
            square.addEventListener('click', e => {
                if(turn && !winner && !e.target.innerHTML) {
                    e.target.innerHTML = turn;
                    e.target.classList.add(turn);
                    if(checkResult(turn)) {
                        winner = turn;
                    } else {
                        if(turn === 'X') {
                            turn = 'O';
                        } else {
                            turn = 'X';
                        }
                    }
                    if(!winner){
                        selectRandom();
                        if(checkResult(turn)) {
                            winner = turn;
                        } else if(turn === 'X') {
                            turn = 'O';
                        } else {
                            turn = 'X';
                        }
                    }
                }
            })
        })
        //if comp is chosen to go first, turn is changed so it is comp's symbol, then comp chooses random space and then event listener added to each space so player can choose space, then it is checked and then comp chooses random space, which is then checked and turn changed so player can choose space again
    } else if(compModeFirst && compModeFirst === 'computer'){
        if(turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X'
        }
        selectRandom();
        if(turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }
        squares.forEach(square => {
            square.addEventListener('click', e => {
                if(turn && !winner && !e.target.innerHTML) {
                    e.target.innerHTML = turn;
                    e.target.classList.add(turn);
                    if(checkResult(turn)) {
                        winner = turn;
                    } else {
                        if(turn === 'X') {
                            turn = 'O';
                        } else {
                            turn = 'X';
                        }
                    }
                    if(!winner){
                        selectRandom();
                        if(checkResult(turn)) {
                            winner = turn;
                        } else if(turn === 'X') {
                            turn = 'O';
                        } else {
                            turn = 'X';
                        }
                    }
                }
            })
        })
    }
}
