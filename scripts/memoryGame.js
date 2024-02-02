function memoryGame () {
    // Initierar det globala objektet som håller informationen om spelet.
    initGlobalObject ();
    // Skapar en variabel för spelbrädet och tömmer sedan brädet på sitt innehåll.
    // Tar bort klassen för content-container och sätter istället klassen memory-container för att byta styling i css.
    let gameBoard = document.querySelector(`#contentContainer`);
    
    gameBoard.innerHTML = ``
    gameBoard.classList.remove(`content-container`);
    gameBoard.classList.add(`memory-container`)

    // Visar tillbakaknappen och döljer knappen för memory.
    document.querySelector(`.back-button`).classList.remove(`d-none`);
    document.querySelector(`.memory-button`).classList.add(`d-none`);
    // Duplicerar arrayen characters genom map() metoden som returnerar varje element och sedan sparas i en ny array (charactersCopy).
    let charactersCopy = characters.map(character => (character));
    // Skapar en ny array, combinedCharacters, som är resultatet av att vi konkatenerar (sätter ihop) characters och charactersCopy.
    let combinedCharacters = characters.concat(charactersCopy);
    // Nu har vi två av varje objekt och kan alltså para ihop objekten i ett memoryspel. Vi skapar en tom array som ska hålla en slumpad ordning
    // av memorykorten.
    
    let memoryArray = [];
    // För att blanda loopar vi igenom vår konkatenerade array. Så länge den innehåller ett kort fortsätter loopen.
    // Försökte först med en for loop men då varje varv förminskar combinedCharacters.length med 1 så behövde jag bestämma
    // exakt hur många varv som skulle loopas vilket inte blir skalbart.
     while(combinedCharacters.length > 0) {

         let randomNumber = Math.floor(Math.random() * combinedCharacters.length);
         // Lägger ett random kort ur combinedCharacters på sista index position i memoryArray.
         memoryArray.push(combinedCharacters[randomNumber])
         // Det kort som ligger på [randomNumber] i combinedCharacters arrayen tas bort. På så vis räknas loopen ned och säkerställer
         // att varje kort enbart placeras i memoryArray en gång. Andra siffran är hur många som ska bort och första siffran är vilken position vi börjar ta från.
         combinedCharacters.splice(randomNumber, 1);
     }
     // Vi skapar spelplanen genom att pusha namnen på objekten till oGameData.gameField i den ordning de förekommer i memoryArray.
     for (let i = 0; i < memoryArray.length; i++) {
        oGameData.gameField.push(memoryArray[i].Name)
     }

 
        renderCards(`smallCard`, memoryArray)
    
}


let oGameData = {};



function initGlobalObject () {

    oGameData.playerMove = 1; // Vilket kort man ska visa.

    oGameData.playerTurn = 0; // Hur många drag man gjort.

    oGameData.turnSeconds = 15; // Hur lång tid man har på sig att göra ett drag.

    oGameData.totalSeconds = 0; // Summerar hur många sekunder man tagit totalt.

    oGameData.playerScore = 0; // Baseras på playerTurn och totalSeconds?

    oGameData.gameField = [];

    oGameData.cardCompare = [];

}


function executeMove (whichCard) {

    let clickedCard = document.querySelector(`#card${whichCard}`);
    if (oGameData.playerMove === 1 && oGameData.gameField[whichCard] !== undefined && oGameData.cardCompare.length === 0) {

        oGameData.cardCompare.push(whichCard);
        clickedCard.classList.add(`d-none`);
        clickedCard.nextElementSibling.classList.remove(`d-none`)
        console.log(`Första kortet = ${oGameData.gameField[oGameData.cardCompare[0]]}`);
        oGameData.playerMove = 2;
        
    }

    else if (oGameData.playerMove === 2 && oGameData.gameField[whichCard] !== undefined && oGameData.cardCompare.length === 1) {

        if (!oGameData.cardCompare.includes(whichCard)) {

            clickedCard.classList.add(`d-none`);
            clickedCard.nextElementSibling.classList.remove(`d-none`)
            oGameData.cardCompare.push(whichCard);
        
            if (oGameData.gameField[oGameData.cardCompare[0]] === oGameData.gameField[oGameData.cardCompare[1]]) {
                console.log(`Andra kortet = ${oGameData.gameField[oGameData.cardCompare[1]]}`);
                console.log(`Du har hittat ett par!`);
                oGameData.playerMove = 1;
                delete oGameData.gameField[oGameData.cardCompare[0]];
                delete oGameData.gameField[oGameData.cardCompare[1]];
                console.log(oGameData.gameField);
                oGameData.cardCompare = [];
                oGameData.playerTurn++;
            }
            else {
                console.log(`Andra kortet = ${oGameData.gameField[oGameData.cardCompare[1]]}`);
                console.log(`Otur försök igen!`);
                oGameData.playerMove = 1;
                setTimeout(() => {
                    document.querySelector(`#card${oGameData.cardCompare[0]}`).classList.remove(`d-none`);
                    document.querySelector(`#card${oGameData.cardCompare[0]}`).nextElementSibling.classList.add(`d-none`)
                    document.querySelector(`#card${oGameData.cardCompare[1]}`).classList.remove(`d-none`);
                    document.querySelector(`#card${oGameData.cardCompare[1]}`).nextElementSibling.classList.add(`d-none`)
                    oGameData.cardCompare = [];
                }, 1500);

                oGameData.playerTurn++
            }
            gameDone();
        }


    }

}

function gameDone () { 
    let isGameOver = oGameData.gameField.every(indexPosition => indexPosition === '');
    if (isGameOver) {
        let gamOver = document.querySelector(`.memory-container`);
        gamOver.innerHTML = ``
        let gameOverText = document.createElement(`h2`);
        gameOverText.textContent = `Du vann. Kul för dig.`
        gamOver.appendChild(gameOverText);
        setTimeout(() => {
            memoryGame();
        }, 3000);



    }
}


