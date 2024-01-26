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
     console.log(...oGameData.gameField);
 
        renderCards(`smallCard`, memoryArray)
    
}


let oGameData = {};



function initGlobalObject () {

    oGameData.playerTurn = 0;

    oGameData.seconds = 15;

    oGameData.playerScore = 0;
    
    oGameData.gameField = [];

}

function executeMove (event) {
    console.log(event.target);
}

