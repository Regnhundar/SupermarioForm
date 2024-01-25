'use strict';

window.addEventListener(`load`,initPage)


function initPage() {
    document.querySelectorAll(`#registerForm, #contentContainer`).forEach(hide => hide.classList.add(`d-none`));
    document.querySelector(`#registerForm button`).addEventListener(`click`, validateRegistration);

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
}

function validateLogin(regName, regPassInput) {

    event.preventDefault();
    let logInName = document.querySelector(`#username`).value;
    let userObject = users.filter(object => object.username === logInName); // Filter-funktionen tar ut objektet vars användarnamn matchar variabeln logInName
    let checkedName = users.some(user => user.username === logInName); // returnerar true/false ifall arrayen har ett username som är variabeln logInName
    
    let userRegObject = users.filter(object => object.username === regName);
    let checkedRegName = users.some(user => user.username === regName);
    
try {   // Kan skriva enbart if (checkedName || checkedRegName) då "some" metoden returnerar true/false. Vill man kolla efter false så !checkedName
    if (checkedName === true || checkedRegName === true){
        
        let passwordInput = document.querySelector(`#password`).value;

        // Då passwordInput och regPassInput ligger i olika formulär kommer en alltid vara tom så man måste göra en check annars error.
        if (passwordInput !== ``) {
            // Kollar lösenordet på plats 0 i arrayen userObject för att se ifall det matchar variabeln passwordInput
            if (passwordInput === userObject[0].password) {
            initContent();
            }
            else {
                document.querySelector(`#errorMsg`).textContent = `Fel lösenord!`;
            }
        }
        else if (regPassInput !== ``){
            if (regPassInput === userRegObject[0].password) {
                initContent();
            }
            else {
                document.querySelector(`#errorMsg`).textContent = `Fel lösenord!`;
            }
        }
    }
    else {
        document.querySelector(`#errorMsg`).textContent = `Det finns ingen användare med namnet: ${logInName}!`
    }
} catch (error) {
    console.log(error);   
}}

function validateRegistration() {
    event.preventDefault();
    let logInName = document.querySelector(`#uName`).value
    let checkedName = users.some(user => user.username === logInName);
    let suggestedPassword = document.querySelector(`#pWord`).value
    let suggestedPasswordAgain = document.querySelector(`#pWordAgain`).value

    try {
        if (checkedName === true) {
        document.querySelector(`#errorMsg`).textContent = `Tyvärr användarnamnet existerar redan. Prova ${logInName}123!`
        }
        else if (logInName.length < 6) {
        document.querySelector(`#errorMsg`).textContent = `${logInName} har för få tecken. Du måste ange minst 6st tecken.`
        }
        else {
            if (suggestedPassword.length < 8) {
                document.querySelector(`#errorMsg`).textContent = `Du har valt ett för kort lösenord!`
            }
            else if (suggestedPassword !== suggestedPasswordAgain) {
                document.querySelector(`#errorMsg`).textContent = `Dina lösenord matchar inte!`

            }
            else {
                let accountInfo = { username: logInName, password: suggestedPassword };
                users.push(accountInfo);
                validateLogin(logInName, suggestedPassword); // Tas emot i validateLogin som (regName, regPassInput).        
            }
            }
        }
    catch (error) {
        console.log(error);
        }
}

function initContent() {
    console.log(`initContent()`);

    document.querySelector(`#loginForm`).classList.add(`d-none`);
    document.querySelector(`#registerForm`).classList.add(`d-none`);
    document.querySelector(`#contentContainer`).classList.remove(`d-none`);
    document.querySelector(`#errorMsg`).textContent = ``;

    let logOutRef = document.createElement(`button`)
    logOutRef.textContent = `Logga ut`;
    logOutRef.addEventListener(`click`, logOut);
    logOutRef.classList.add(`logout-button`);
    document.querySelector(`.form-container`).appendChild(logOutRef);

    let mainContainerRef = document.querySelector(`#contentContainer`);

    for (let i = 0; i < characters.length; i++){

        let cardContainerRef = document.createElement(`figure`);
        cardContainerRef.classList.add(`card`);
        mainContainerRef.appendChild(cardContainerRef);

        let imgRef = document.createElement(`img`);
        imgRef.classList.add(`card-photo`);
        imgRef.src = characters[i].Image;
        imgRef.alt = `Bild på ${characters[i].Name}`
        cardContainerRef.appendChild(imgRef);
        
        let captionRef = document.createElement(`figcaption`);
        captionRef.classList.add(`caption-container`);
        cardContainerRef.appendChild(captionRef);

        let cardName = document.createElement(`h3`);
        cardName.classList.add(`card-header`);
        captionRef.appendChild(cardName);
        cardName.textContent = characters[i].Name;

        let cardAge = document.createElement(`p`);
        cardAge.classList.add(`card-age`);
        captionRef.appendChild(cardAge);
        cardAge.textContent = `Age: ${characters[i].Age}`;

        let cardOccupation = document.createElement(`p`);
        cardOccupation.classList.add(`card-occupation`);
        captionRef.appendChild(cardOccupation);
        cardOccupation.textContent = `Occupation: ${characters[i].Occupation}`;

        let cardDescription = document.createElement(`p`);
        cardDescription.classList.add(`card-description`);
        captionRef.appendChild(cardDescription);
        cardDescription.textContent = characters[i].Description;
}
}

function logOut() {
    document.querySelector(`#contentContainer`).innerHTML = ``
    // Om man bara lägger till klassen d-none för att dölja logout-knappen vi skapat så skapar vi en ny varje gång vi loggar in och ut.
    document.querySelector(`.logout-button`).remove();
    document.querySelector(`#loginForm`).classList.remove(`d-none`);
    // Då querySelectorAll returnerar en nonde vilket är ungefär som en array så behöver vi loopa igenom varje input i .form-container
    // för att rensa vad de har som value. Dvs användarnamn och password.
    document.querySelectorAll('.form-container input').forEach(input => {
        input.value = '';
      });

}