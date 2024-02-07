function memoryGame () {

    // Initierar det globala objektet som håller informationen om spelet.
    initGlobalObject ();
    // Skapar en variabel för spelbrädet och tömmer sedan brädet på sitt innehåll.
    // Tar bort klassen för content-container och sätter istället klassen memory-container för att byta styling i css.

    let gameBoard = document.querySelector(`#contentContainer`);
    let jumbotron = document.querySelector(`#jumbotron`);

    let backButton = document.querySelector(`.back-button`);
    backButton.classList.remove(`d-none`);

    let pointCounter = document.createElement(`h2`);
    pointCounter.classList.add(`point-counter`);
    pointCounter.textContent = oGameData.cardFlipsLeft;
    // fungerar som en pseudo-insertAfter();
    jumbotron.insertBefore(pointCounter, backButton.nextSibling);

    let logoutButton = document.querySelector(`.logout-button`);
    logoutButton.classList.remove(`d-none`);

    gameBoard.innerHTML = ``;
    gameBoard.classList.remove(`content-container`);
    gameBoard.classList.add(`memory-container`);

    // Visar tillbakaknappen och döljer knappen för memory.
    
    document.querySelector(`.memory-button`).classList.add(`d-none`);


    // Duplicerar arrayen characters genom map() metoden som returnerar varje element och sedan sparas i en ny array (charactersCopy).
    let charactersCopy = characters.map(character => (character));
    // Skapar en ny array, combinedCharacters, som är resultatet av att vi konkatenerar (sätter ihop) characters och charactersCopy.
    let combinedCharacters = characters.concat(charactersCopy);
    // Nu har vi två av varje objekt och kan alltså para ihop objekten i ett memoryspel. Vi skapar en tom array som ska hålla en slumpad ordning
    // av memorykorten.
    
    // För att blanda loopar vi igenom vår konkatenerade array. Så länge den innehåller ett kort fortsätter loopen.
    // Försökte först med en for loop men då varje varv förminskar combinedCharacters.length med 1 så behövde jag bestämma
    // exakt hur många varv som skulle loopas vilket inte blir skalbart.
     while (combinedCharacters.length > 0) {

         let randomNumber = Math.floor(Math.random() * combinedCharacters.length);
         // Lägger ett random kort ur combinedCharacters på sista index position i memoryArray.
         oGameData.memoryArray.push(combinedCharacters[randomNumber]);
         // Det kort som ligger på [randomNumber] i combinedCharacters arrayen tas bort. På så vis räknas loopen ned och säkerställer
         // att varje kort enbart placeras i memoryArray en gång. Andra siffran är hur många som ska bort och första siffran är vilken position vi börjar ta från.
         combinedCharacters.splice(randomNumber, 1);
     }
     // Vi skapar spelplanen genom att pusha namnen på objekten till oGameData.gameField i den ordning de förekommer i memoryArray.
     for (let i = 0; i < oGameData.memoryArray.length; i++) {
        oGameData.gameField.push(oGameData.memoryArray[i].Name);
     }

        renderCards(`smallCard`, oGameData.memoryArray);
    
}

let oGameData = {};

function initGlobalObject () {

    oGameData.memoryArray = [];

    oGameData.playerMove = 1; // Vilket kort man ska visa.

    oGameData.cardFlipsLeft = 100; // Hur många drag man har kvar.

    oGameData.gameField = [];

    oGameData.cardCompare = [];
}

// whichCard är en siffra. Används för att hämta innehåll på index-position i andra arrayer. Se eventlyssnaren som anropar executeMove.
function executeMove (whichCard) {
console.log(oGameData.gameField);
    let clickedCard = document.querySelector(`#card${whichCard}`);
    let cardFlipCounter = document.querySelector(`.point-counter`);
    
    if (oGameData.playerMove === 1 && oGameData.gameField[whichCard] !== undefined && oGameData.cardCompare.length === 0) {

        oGameData.cardCompare.push(whichCard);
        clickedCard.classList.add(`d-none`);
        clickedCard.nextElementSibling.classList.remove(`d-none`);

        console.log(`Första kortet = ${oGameData.gameField[oGameData.cardCompare[0]]}`);
        

        oGameData.playerMove = 2;
        oGameData.cardFlipsLeft--;
        cardFlipCounter.textContent = oGameData.cardFlipsLeft;
   
    }

    else if (oGameData.playerMove === 2 && oGameData.gameField[whichCard] !== undefined && oGameData.cardCompare.length === 1) {

        if (!oGameData.cardCompare.includes(whichCard)) {

            clickedCard.classList.add(`d-none`);
            clickedCard.nextElementSibling.classList.remove(`d-none`);
            
            oGameData.cardCompare.push(whichCard);
        
            if (oGameData.gameField[oGameData.cardCompare[0]] === oGameData.gameField[oGameData.cardCompare[1]]) {
                console.log(`Andra kortet = ${oGameData.gameField[oGameData.cardCompare[1]]}`);
                console.log(`Du har hittat ett par!`);
                let abilityToRun = characters.find(card => card.Name === oGameData.gameField[oGameData.cardCompare[0]])
                abilityToRun.Special();
                oGameData.cardFlipsLeft--;
                cardFlipCounter.textContent = oGameData.cardFlipsLeft;
                oGameData.playerMove = 1;
                delete oGameData.gameField[oGameData.cardCompare[0]];
                delete oGameData.gameField[oGameData.cardCompare[1]];

                let matchedOne = document.querySelector(`#card${[oGameData.cardCompare[0]]}`).nextElementSibling;
                matchedOne.classList.add(`matched`);
                matchedOne.style.boxShadow  = ``;
                
                let matchedTwo = document.querySelector(`#card${[oGameData.cardCompare[1]]}`).nextElementSibling;
                matchedTwo.style.boxShadow = ``;
                // Utan timout får inte båda korten transition som står i css.
                setTimeout(() => {
                    matchedTwo.classList.add(`matched`)
                },50);
                oGameData.cardCompare = [];
                
            }
            else {
                console.log(`Andra kortet = ${oGameData.gameField[oGameData.cardCompare[1]]}`);
                console.log(`Otur försök igen!`);
                oGameData.cardFlipsLeft--;
                cardFlipCounter.textContent = oGameData.cardFlipsLeft;
                oGameData.playerMove = 1;

                
                setTimeout(() => {
                    document.querySelector(`#card${oGameData.cardCompare[0]}`).classList.remove(`d-none`);
                    document.querySelector(`#card${oGameData.cardCompare[0]}`).nextElementSibling.classList.add(`d-none`)
                    document.querySelector(`#card${oGameData.cardCompare[1]}`).classList.remove(`d-none`);
                    document.querySelector(`#card${oGameData.cardCompare[1]}`).nextElementSibling.classList.add(`d-none`)
                    oGameData.cardCompare = [];
                }, 1500);
            }
            gameDone();
        }
    }
}

function checkHighScore () {

    try {
        // `currentUser` kommer från funktion som anropas vid login `setUser()`
        let currentUserId = localStorage.getItem(`currentUser`);
        // Ifall ingen är inloggad.
        if(!currentUserId) {
            return null;
        }
        let users = getUsers();
        // Hittar objektet som har samma id som currentUserId och gör om det till en integer(siffra) innan jämförelse.
        let currentUser = users.find(user => user.id === parseInt(currentUserId));
        // Om en användare hittas kollar vi om highscore är lägre än antal drag som är kvar.
        if (currentUser.highscore < oGameData.cardFlipsLeft){
            currentUser.highscore = oGameData.cardFlipsLeft;
            console.log(`New highscore = ${currentUser.highscore}`);
            // Måste skriva raden nedan annars sparas inte nya poängen i objektet.
            localStorage.setItem('users', JSON.stringify(users));
        }
    } catch(error){
    console.log(error);
    return null;
      }
}

function gameDone () { 

    let isGameOver = oGameData.gameField.every(indexPosition => indexPosition === '');

    if (isGameOver || oGameData.cardFlipsLeft === 0) {
        let gamOver = document.querySelector(`.memory-container`);
        gamOver.innerHTML = ``;
        document.querySelector(`.point-counter`).remove();
        let gameOverText = document.createElement(`h2`);
        if (isGameOver){
        checkHighScore ();
        gameOverText.textContent = `Grattis du vann med ${oGameData.cardFlipsLeft} drag kvar!`;
        }
        else if (oGameData.cardFlipsLeft === 0){
            gameOverText.textContent = `GAME OVER!`;
        }
        gamOver.appendChild(gameOverText);
        setTimeout(() => {
            memoryGame();
        }, 3000);
    }
}


