'use strict';

window.addEventListener(`load`,initPage)

function initPage() {
    document.querySelector(`#registerForm`).classList.add(`d-none`);
    document.querySelector(`#registerForm button`).addEventListener(`click`, validateRegistration);

    let backButtonRef = document.createElement(`button`);
    backButtonRef.textContent = `Tillbaka`;
    backButtonRef.addEventListener(`click`, () => {
        document.querySelector(`#contentContainer`).innerHTML = ``;
        initContent(1);
    });
    backButtonRef.classList.add(`back-button`, `d-none`);
    document.querySelector(`.form-container`).prepend(backButtonRef);

    let memoryButtonRef = document.createElement(`button`);
    memoryButtonRef.textContent = `Memory`;
    memoryButtonRef.addEventListener(`click`, memoryGame);
    memoryButtonRef.classList.add(`memory-button`, `d-none`);
    document.querySelector(`.form-container`).appendChild(memoryButtonRef);

    let logoutButtonRef = document.createElement(`button`);
    logoutButtonRef.textContent = `Logga ut`;
    logoutButtonRef.addEventListener(`click`, logOut);
    logoutButtonRef.classList.add(`logout-button`, `d-none`);
    document.querySelector(`.form-container`).appendChild(logoutButtonRef);

    // Gör en forEach loop på alla knappar i #loginForm. Beroende på knappens textContent läggs en av lyssnarna på knappen.
    document.querySelectorAll(`#loginForm button`).forEach(addClick =>{
        
        if (addClick.textContent === `Logga in`) {
            addClick.addEventListener(`click`, validateLogin);
        }
        else if (addClick.textContent === `Registrera`){
            addClick.addEventListener(`click`, () => {
                event.preventDefault();
                document.querySelector(`#registerForm`).classList.remove(`d-none`);
                document.querySelector(`#loginForm`).classList.add(`d-none`);
            });

        }
    })
    initContent()
}


function validateLogin(regName, regPassInput) {

    event.preventDefault();
    let logInName = document.querySelector(`#username`);
    let userObject = users.filter(object => object.username === logInName.value); // Filter-funktionen tar ut objektet vars användarnamn matchar variabeln logInName
    let checkedName = users.some(user => user.username === logInName.value); // returnerar true/false ifall arrayen har ett username som är variabeln logInName
    
    let userRegObject = users.filter(object => object.username === regName);
    let checkedRegName = users.some(user => user.username === regName);
    
try {   // Kan skippa att skriva: "=== true" och bara skriva: "if (checkedName || checkedRegName)" då "some" metoden returnerar true/false. 
        // Vill man kolla efter false så !checkedName. 
    if (checkedName === true || checkedRegName === true) {

        let passwordInput = document.querySelector(`#password`);

        // Då passwordInput och regPassInput ligger i olika formulär kommer ett formulär alltid vara tomt så man måste göra en check annars error.
        // Om regPassInput är tomt så är det undefined.
        if (passwordInput.value !== `` || passwordInput.value  === `` && regPassInput === undefined) {

            // Kollar lösenordet på plats 0 i arrayen userObject för att se ifall det matchar variabeln passwordInput
            if (passwordInput.value === userObject[0].password) {
            initContent();
            }
            else {
                throw {
                    nodeRef : passwordInput,
                    msg : `Fel lösenord!`
                }
            }
        }
        else if (regPassInput !== undefined){
            if (regPassInput === userRegObject[0].password) {
                initContent();
            }
        }
    }
    else {
        throw {
            nodeRef : logInName,
            msg : `Det finns ingen användare med namnet: ${logInName.value}!`
        }
    }
} catch (error) {
    console.log(error);   
    document.querySelector(`#errorMsg`).textContent = error.msg;
    error.nodeRef.focus();

}}

function validateRegistration() {
    event.preventDefault();
    
    let logInName = document.querySelector(`#uName`);
    let checkedName = users.some(user => user.username === logInName.value);
    let suggestedPassword = document.querySelector(`#pWord`)
    let suggestedPasswordAgain = document.querySelector(`#pWordAgain`)

    try {
        if (checkedName === true) {
            throw {
        nodeRef : logInName, 
        msg : `Tyvärr användarnamnet existerar redan. Prova ${logInName.value}123!`
            }
        }
        else if (logInName.value.length < 6) {
            throw {
                nodeRef : logInName, 
                msg : `${logInName.value} har för få tecken. Du måste ange minst 6st tecken.`
            }
        }
        else {
            if (suggestedPassword.value.length < 8) {
                throw {
                    nodeRef : suggestedPassword, 
                    msg : `Du har valt ett för kort lösenord!`
                }
            }
            else if (suggestedPassword.value !== suggestedPasswordAgain.value) {
                throw {
                    nodeRef : suggestedPasswordAgain, 
                    msg : `Dina lösenord matchar inte!`
                }
            }
            else {
                let accountInfo = { username: logInName.value, password: suggestedPassword.value };
                users.push(accountInfo);
                validateLogin(logInName.value, suggestedPassword.value); // Tas emot i validateLogin som (regName, regPassInput).        
            }
        }
        }
    catch (error) {
        document.querySelector(`#errorMsg`).textContent = error.msg;
        error.nodeRef.focus();
        error.nodeRef.value = ``
        }
}

function initContent() {
    console.log(`initContent()`);
    let errorMsg = document.querySelector(`#errorMsg`);
    errorMsg.textContent = ``;
    errorMsg.classList.add(`d-none`);
    document.querySelector(`#contentContainer`).classList.add(`content-container`);
    document.querySelector(`#contentContainer`).classList.remove(`memory-container`);
    document.querySelector(`#loginForm`).classList.add(`d-none`);
    document.querySelector(`#registerForm`).classList.add(`d-none`);
    document.querySelector(`.memory-button`).classList.remove(`d-none`);
    document.querySelector(`.logout-button`).classList.remove(`d-none`);
    document.querySelector(`.back-button`).classList.add(`d-none`);

    renderCards (`bigCard`, characters)
}

function renderCards (cardSize, whatArray) {

    let mainContainerRef = document.querySelector(`#contentContainer`);

    for (let i = 0; i < whatArray.length; i++){

        let cardContainerRef = document.createElement(`figure`);
        cardContainerRef.classList.add(`card`);
        cardContainerRef.id = `card${[i]}`;

        if (cardSize === `smallCard`){

            mainContainerRef.appendChild(cardContainerRef);
            cardContainerRef.classList.add(`d-some`)

            cardContainerRef.addEventListener(`click`, () => {
                let cardNumber = i;
                executeMove(cardNumber)
            });
        }
        else {
            mainContainerRef.appendChild(cardContainerRef);
        }
        


        let imgRef = document.createElement(`img`);
        imgRef.classList.add(`card-photo`);
        imgRef.src = whatArray[i].Image;
        imgRef.alt = `Bild på ${whatArray[i].Name}`
        // Fungerar på samma vis som css :hover men vi baserar bakgrundsfärgen på färgen som står i objektet under Color.
        cardContainerRef.addEventListener('mouseenter', function () {
            cardContainerRef.style.boxShadow = `2px 2px 20px ${whatArray[i].Color}`;
          });
        // Värdet sätts när musen pekar på kortet och stannar kvar efter musen lämnar om man inte rensar det med ny eventlistener.
          cardContainerRef.addEventListener('mouseleave', function () {
            cardContainerRef.style.boxShadow = ``;
          });
          
        cardContainerRef.appendChild(imgRef);
        
        let captionRef = document.createElement(`figcaption`);
        if(cardSize === `bigCard`) {
            captionRef.classList.add(`caption-container-big`);
        }
        else if (cardSize === `smallCard`) {
            captionRef.classList.add(`caption-container-small`);
        }
        cardContainerRef.appendChild(captionRef);

        let cardName = document.createElement(`h3`);
        cardName.classList.add(`card-header`);
        // Sätter en textskugga på kortets header och sätter den till den färg som är i objektet under Color.
        cardName.style.textShadow = `2px 1px 0px ${whatArray[i].Color}`;
        captionRef.appendChild(cardName);
        cardName.textContent = whatArray[i].Name;

        if(cardSize === `bigCard`) {
            let cardAge = document.createElement(`p`);
            cardAge.classList.add(`card-age`);
            captionRef.appendChild(cardAge);
            cardAge.textContent = `${whatArray[i].Age} years old`;
        }

        let cardOccupation = document.createElement(`p`);
        cardOccupation.classList.add(`card-occupation`);
        captionRef.appendChild(cardOccupation);
        cardOccupation.textContent = whatArray[i].Occupation;

        if(cardSize === `bigCard`) {
            let cardDescription = document.createElement(`p`);
            cardDescription.classList.add(`card-description`);
            captionRef.appendChild(cardDescription);
            cardDescription.textContent = whatArray[i].Description;
        }
    }
}

function logOut() {
    document.querySelector(`#errorMsg`).classList.remove(`d-none`);
    document.querySelector(`#contentContainer`).innerHTML = ``
    // Om man bara lägger till klassen d-none för att dölja logout-knappen vi skapat så skapar vi en ny varje gång vi loggar in och ut.
    document.querySelector(`.logout-button`).classList.add(`d-none`);
    document.querySelector(`.memory-button`).classList.add(`d-none`);
    document.querySelector(`.back-button`).classList.add(`d-none`);
    document.querySelector(`#loginForm`).classList.remove(`d-none`);
    // Då querySelectorAll returnerar en node vilket är ungefär som en array så behöver vi loopa igenom varje input i .form-container
    // för att rensa vad de har som value. Dvs användarnamn och password.
    document.querySelectorAll('.form-container input').forEach(input => {
        input.value = '';
      });

}