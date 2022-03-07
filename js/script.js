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
playBtn.addEventListener('click', function () {
    createNewGrid();
});

function createNewGrid() {
    grid.innerHTML = ''; 

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

        square.addEventListener('click', function(){
            if (!bombs.includes(i)) {
                this.classList.add('clicked');
                points++;
                printToDom('points', `Your score is: ${points}`);
            } else {
                this.classList.add('clicked-bomb');
                printToDom('points', `&#10060; Try again! Your score is: ${points}`);
            }
        });
        grid.appendChild(square);
    }

}

function createSquare(max, squaresPerRow) {
    let square = document.createElement('div');
    square.classList.add(
        'grid-square', 
        'd-flex', 
        'justify-content-center',
        'align-items-center');

        square.style.width = `calc(100% / ${squaresPerRow})`
        square.style.height = square.style.width;

        square.innerHTML = `<span>${max}</span>`;

        return square;
}

function createBombsList(bombs, nSquares) {
    const bombsList = [];
    for (let i = 0; i < bombs; i++) {
        bombsList.push(randomUniqueInt(bombsList, 1, nSquares));
    }
    return bombsList;
}

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
function printToDom(elementId, str) {
    document.getElementById(elementId).innerHTML = str; 
}

