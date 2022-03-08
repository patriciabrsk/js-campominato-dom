/**
 * 
 * L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, 
 * in cui ogni cella contiene un numero tra quelli compresi in un range:
    
    con difficoltà 1 => tra 1 e 100
    con difficoltà 2 => tra 1 e 81
    con difficoltà 3 => tra 1 e 49
    
    Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
    Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
    Ad esempio:  di cosa ho bisogno per generare i numeri?
    Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
    Le validazioni e i controlli possiamo farli anche in un secondo momento.
 * 
 */

const grid = document.getElementById('grid');
const playBtn = document.getElementById('play');

// Event listener for the play button click
playBtn.addEventListener('click', function () {
    createNewGrid();
    printToDom('points', '');
});

/**
 * This function is called when a new grid is created, according to the current level selected
 */
function createNewGrid() {
    grid.innerHTML = ''; 

    let isGameOver = false;
    const gameSelection = document.querySelector('.form-select').value;

    let squaresPerRow;
    let squaresNum;

    let points = 0;

    switch (gameSelection) {
        case "easy":
        default:
            squaresNum = 100;
            break;
        case "medium":
            squaresNum = 81;
            break;
        case "hard":
            squaresNum = 49;
            break;
    }

    squaresPerRow = Math.sqrt(squaresNum);

    // Create random bombs list
    const bombs = createBombsList(16, squaresNum);
    console.log(bombs);

    for ( let i = 1; i <= squaresNum; i++){
        const square = createSquare(i, squaresPerRow);

        square.addEventListener('click', function(event){

            if(!isGameOver) {
                if (!bombs.includes(i)) {
                    this.classList.add('clicked');
                    points++;
                    printToDom('points', `Your score is: ${points}`);
                } else {
                    this.classList.add('clicked-bomb');
                    printToDom('points', `&#10060; Try again! Your score is: ${points}`);
                    lookForBombs('grid', bombs, 'clicked-bomb');
                    isGameOver = true;
                }
            }
        });
        grid.appendChild(square);
    }
}

/**
 * Function creates each single square element to the DOM
 * @param {*} max - Max number of square elements to print
 * @param {*} squaresPerRow - Number of squares per row
 * @returns 
 */
function createSquare(max, squaresPerRow) {
    let square = document.createElement('div');
    square.classList.add(
        'grid-square', 
        'd-flex', 
        'justify-content-center',
        'align-items-center');

        square.style.width = `calc(100% / ${squaresPerRow})`
        square.style.height = square.style.width;

        square.innerHTML = max;

        return square;
}

/**
 * Function is called to create a new bomb list in the grid
 * @param {*} bombs - Number of bombs to generate in the grid
 * @param {*} nSquares - Number of squares in the grid
 * @returns 
 */
function createBombsList(bombs, nSquares) {
    const bombsList = [];
    for (let i = 0; i < bombs; i++) {
        bombsList.push(randomUniqueInt(bombsList, 1, nSquares));
    }
    return bombsList;
}

/**
 * This function is used to generate new random unique integers 
 * in the grid each time it is called and collect them into a list
 * @param {*} numsBlackList - An array list of unique random integers
 * @param {*} minNum - A maximum number of random integers
 * @param {*} maxNum - A minimum number of random integers
 * @returns 
 */
function randomUniqueInt(numsBlackList, minNum, maxNum) {
    let check = false;
    let randomInt;

    while(!check) {
        randomInt = Math.floor(Math.random() * ((maxNum * 1) - minNum) * minNum);
        if(!numsBlackList.includes(randomInt)) {
            check = true;
        }
    }
    return randomInt;
}

// Print to DOM element (selected by Id) and replacing it with a new string each time
/**
 * Function that prints out a string to the respective DOM element, selected by Id.
 * @param {*} elementId - DOM element to select from DOM by id
 * @param {*} str - String to print to DOM element
 */
function printToDom(elementId, str) {
    document.getElementById(elementId).innerHTML = str; 
}

function lookForBombs(parentElementId, bombList, bombClass) {
    const squares = document.getElementById(parentElementId).children;
    for (let i= 0 ; i < bombList.length ; i++ ){
        if ( bombList.includes(parseInt(squares[i].firstChild.innerHTML)) ){
            squares[bombList[i]].classList.add(bombClass);
        }
    }
}