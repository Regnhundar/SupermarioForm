function memoryGame () {
    let gameBoard = document.querySelector(`#contentContainer`);
    gameBoard.innerHTML = ``
    document.querySelector(`.back-button`).classList.remove(`d-none`);
    document.querySelector(`.memory-button`).classList.add(`d-none`);
    let containerRef = document.querySelector(`#contentContainer`);
    containerRef.classList.remove(`content-container`);
    containerRef.classList.add(`memory-container`)
    

    for (let i = 0; i<2; i++){
    
        renderCards()
    }
}


let oGameData = {};



function initGlobalObject () {
    oGameData.playerTurn = 0;

    oGameData.seconds = 5;

    oGameData.gameField = [
        '', '', '', '', '', 
        '', '', '', '', '',
        '', '', '', '', '',
        '', '', '', '', ''
    ];
    console.log(oGameData);
}

