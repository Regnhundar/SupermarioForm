'use strict';

window.addEventListener(`load`,() => {
    initPage();

})

function initPage() {
    
    document.querySelector(`#registerForm`).classList.add(`d-none`);
    document.querySelector(`#registerForm button`).addEventListener(`click`, validateRegistration);

    let backButtonRef = document.createElement(`button`);
    backButtonRef.textContent = `Tillbaka`;
    backButtonRef.addEventListener(`click`, () => {
        document.querySelector(`#contentContainer`).innerHTML = ``;
        initContent();
    });

    backButtonRef.classList.add(`back-button`, `d-none`);
    document.querySelector(`#jumbotron`).appendChild(backButtonRef);

    let jumbotron = document.querySelector(`#jumbotron`);
    jumbotron.classList.add(`jumbotron`);

    let memoryButtonRef = document.createElement(`button`);
    memoryButtonRef.textContent = `Memory`;
    memoryButtonRef.addEventListener(`click`, memoryGame);
    memoryButtonRef.classList.add(`memory-button`, `d-none`);
    jumbotron.appendChild(memoryButtonRef);

    let logoutButtonRef = document.createElement(`button`);
    logoutButtonRef.textContent = `Logga ut`;
    logoutButtonRef.addEventListener(`click`, logOut);
    logoutButtonRef.classList.add(`logout-button`, `d-none`);
    jumbotron.appendChild(logoutButtonRef);

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




function validateLogin(event) {
   
try {  
    event.preventDefault();
    let users = getUsers();
    let logInName = document.querySelector(`#username`);
    let userObject = users.find(object => object.username === logInName.value); // Find-metoden tar ut objektet vars användarnamn matchar variabeln logInName
    let checkedName = users.some(user => user.username === logInName.value); // returnerar true/false ifall arrayen har ett username som är variabeln logInName

    
    if (checkedName === true) {

        let passwordInput = document.querySelector(`#password`);

        if (passwordInput.value !== userObject.password) {

            throw {
                nodeRef : passwordInput,
                msg : `Fel lösenord!`
            }
        }
    }
    else {
        throw {
            nodeRef : logInName,
            msg : `Det finns ingen användare med namnet: ${logInName.value}!`
        }
    }
    setUser(userObject.id);
    initContent();


} catch (error) {
    console.log(error);   
    document.querySelector(`#errorMsg`).textContent = error.msg;
    error.nodeRef.focus();

}}



function validateRegistration(event) {


    try {    
        
    event.preventDefault();
    let users = getUsers();
    let logInName = document.querySelector(`#uName`);
    let checkedName = users.some(user => user.username === logInName.value);
    let suggestedPassword = document.querySelector(`#pWord`);
    let suggestedPasswordAgain = document.querySelector(`#pWordAgain`);
    

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
                addUser(logInName.value, suggestedPassword.value);
                initContent();
            }
        }
        }
    catch (error) {
        document.querySelector(`#errorMsg`).textContent = error.msg;
        error.nodeRef.focus();
        error.nodeRef.value = ``
        }
}

function getUsers() {

    try {
        const usersString = localStorage.getItem(`users`) || JSON.stringify([]);

        let users = JSON.parse(usersString);
        return users;
        
    } catch (error) {
        console.log(error);
        return [];
    }

}

function setUser(userId) {
    localStorage.setItem(`currentUser`, userId);
}

function addUser(userName, userPassword) {

    try {
        let users = getUsers();

        let userId = 1;

        if(users.length > 0) {
            userId = users[users.length - 1].id + 1;
        }
    let newUser = {
        id : userId,
        username : userName,
        password : userPassword,
        highscore : 0
    }

    users.push(newUser);

    localStorage.setItem(`users`, JSON.stringify(users));

    } catch (error) {
        console.log(error);
    }
}

function initContent() {
    // Då querySelectorAll returnerar en node vilket är ungefär som en array så behöver vi loopa igenom varje input i .form-container
    // för att rensa vad de har som value. Dvs användarnamn och password.
    document.querySelectorAll('.form-container input').forEach(input => {
        input.value = '';
      });
    let errorMsg = document.querySelector(`#errorMsg`);
    errorMsg.textContent = ``;
    errorMsg.classList.add(`d-none`);
    let pointsCounter = document.querySelector(`.point-counter`)
    if (pointsCounter) {
        pointsCounter.remove();
    }
    let jumbotron = document.querySelector(`#jumbotron`);
    jumbotron.classList.remove(`d-none`);

    
    
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
        

        if (cardSize === `smallCard`){

            let backOfCardRef = document.createElement(`figure`);
            backOfCardRef.classList.add(`back-of-card`);
            mainContainerRef.appendChild(backOfCardRef);
            backOfCardRef.id = `card${[i]}`;

            cardContainerRef.classList.add(`d-none`, `small-card`);            


            backOfCardRef.addEventListener(`click`, () => {
                let cardNumber = i;
                executeMove(cardNumber)
            });
        }
        mainContainerRef.appendChild(cardContainerRef);
        
        let imgRef = document.createElement(`img`);
        imgRef.classList.add(`card-photo`);
        imgRef.src = whatArray[i].Image;
        imgRef.alt = `Bild på ${whatArray[i].Name}`
        if (cardSize === `smallCard`) {
            imgRef.classList.add(`card-photo-small`);
        }
        else if (cardSize === `bigCard`) {
            imgRef.classList.add(`card-photo-big`);
        }
        
        
        let captionRef = document.createElement(`figcaption`);
        if(cardSize === `bigCard`) {
            cardContainerRef.classList.add(`big`);
        // Fungerar på samma vis som css :hover men vi baserar bakgrundsfärgen på färgen som står i objektet under Color.
        cardContainerRef.addEventListener('mouseenter', function () {
            cardContainerRef.style.boxShadow = `2px 2px 20px ${whatArray[i].Color}`;
          });
        // Värdet sätts när musen pekar på kortet och stannar kvar efter musen lämnar om man inte rensar det med ny eventlistener.
          cardContainerRef.addEventListener('mouseleave', function () {
            cardContainerRef.style.boxShadow = ``;
          });
            captionRef.classList.add(`caption-container-big`);
        }
        else if (cardSize === `smallCard`) {
            cardContainerRef.style.boxShadow = `0px 0px 20px ${whatArray[i].Color}`;
            captionRef.classList.add(`caption-container-small`);
        }
        cardContainerRef.appendChild(imgRef);
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
    let errorMsg = document.querySelector(`#errorMsg`);
    errorMsg.classList.remove(`d-none`);
    errorMsg.textContent = ``;
    document.querySelector(`#contentContainer`).innerHTML = ``
    let pointCounter = document.querySelector(`.point-counter`);
    if(pointCounter) {
        pointCounter.remove();
    }

    document.querySelector(`.logout-button`).classList.add(`d-none`);
    document.querySelector(`.memory-button`).classList.add(`d-none`);
    document.querySelector(`.back-button`).classList.add(`d-none`);
    document.querySelector(`#loginForm`).classList.remove(`d-none`);

}