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

    for ( let i = 1; i <= squaresNum; i++){
        const square = createSquare(i, squaresPerRow);
        square.addEventListener('click', function(){
            this.classList.toggle('clicked');
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

// function createBombs(bombs, max) {
//     const bombList = [];
//     for (let i = 0; i < bombs; i++) {
//         bombList.push(randomUniqueInt(bombList, 1, max));
//     }
// }

// function randomUniqueInt(numsBlackList, minNum, maxNum) {
//     let check = false;
//     let randomInt;

//     while(!check) {
//         randomInt = Math.floor(Math.random())
//         if(!numsBlackList.includes(randomInt)) {
//             check = true;
//         }
//     }
//     return randomInt;
// }

