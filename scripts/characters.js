let characters = [
    {
        Name : 'Mario',
        Age : '43',
        Occupation : 'Plumber',
        Image : 'https://upload.wikimedia.org/wikipedia/en/a/a9/MarioNSMBUDeluxe.png',
        Description : 'Mario, the legendary plumber in red, is the beloved hero of the Mushroom Kingdom. Renowned for his bravery and iconic mustache, he embarks on epic adventures, facing challenges to rescue Princess Peach from the villainous Bowser.',
        Color: `#ed0d11`,
        Special: function () {
            // Om peach inte är matchad så får peach korten klassen peach (för CSS styling. Just nu växer korten något)
            let peachFinder = oGameData.gameField.find(array => array === `Peach`);
                if (peachFinder) {
                    let peachPositions = [];
                     for (let i = 0; i < oGameData.gameField.length; i++){
                         if (oGameData.gameField[i] === `Peach`) {
                             peachPositions.push(i);
                         }
                     }
                     document.querySelector(`#card${peachPositions[0]}`).classList.add(`peach`)
                     document.querySelector(`#card${peachPositions[1]}`).classList.add(`peach`)
                }}
    },
    {
        Name : 'Luigi',
        Age : '39',
        Occupation : 'Plumber', 
        Image : 'https://upload.wikimedia.org/wikipedia/en/7/73/Luigi_NSMBUDX.png',
        Description : `Luigi, Mario's green-clad brother, is the endearing and often comical sidekick. Despite his timid nature, Luigi showcases remarkable courage on his own adventures, bringing a unique blend of humor and bravery to the Mushroom Kingdom.`,
        Color: `#3baa43`,
        Special: function () { console.log(`Du hittade ${characters[1].Name}!`);}
    },
    {
        Name : 'Peach',
        Age : '28',
        Occupation : 'Princess',
        Image : 'https://upload.wikimedia.org/wikipedia/en/1/16/Princess_Peach_Stock_Art.png',
        Description : `Princess Peach, the regal ruler of the Mushroom Kingdom, radiates kindness and grace. Often the damsel in distress, she remains a symbol of resilience, awaiting rescue from Mario while actively participating in the kingdom's affairs.`,
        Color: `#ff8bb2`,
        Special: function () { console.log(`Du hittade ${characters[2].Name}!`);}
    },
    {
        Name : 'Yoshi',
        Age : '24',
        Occupation : 'Dinosaur',
        Image : 'https://upload.wikimedia.org/wikipedia/en/d/db/Yoshi_%28Nintendo_character%29.png',
        Description : `Yoshi, the friendly dinosaur companion to Mario, is known for his loyalty and unique abilities. With a colorful appearance and an appetite for almost anything, Yoshi adds charm and utility to the Mushroom Kingdom's ensemble.`,
        Color: `#3baa43`,
        Special: function () { 
            // Om du matchar Yoshi så äter han upp ett par. (Dvs han matchar 2 kort åt dig.)
            let cardToEat = ``;
            let yoshiEats = false;

            for (let i = 0; i < oGameData.gameField.length; i++) {
                if (oGameData.gameField[i] !== `Yoshi` && oGameData.gameField[i] !== `Birdo` && oGameData.gameField[i] !== null){
                    cardToEat = oGameData.gameField[i];
                    yoshiEats = true;
                    break;
                }
            }
            if (yoshiEats === true) {
                let eatThis = [];

                for (let i = 0; i < oGameData.gameField.length; i++){
                    if (oGameData.gameField[i] === cardToEat) {
                        eatThis.push(i);
                    }
                }

                let firstCard = document.querySelector(`#card${eatThis[0]}`);
                firstCard.classList.add(`d-none`);
                firstCard.nextElementSibling.style.boxShadow  = ``;
                firstCard.nextElementSibling.classList.remove(`d-none`);
                firstCard.nextElementSibling.classList.add(`matched`);


                let secondCard = document.querySelector(`#card${eatThis[1]}`);
                secondCard.classList.add(`d-none`);
                secondCard.nextElementSibling.style.boxShadow  = ``;
                secondCard.nextElementSibling.classList.remove(`d-none`);
                setTimeout(() => {
                    secondCard.nextElementSibling.classList.add(`matched`);
                },50);
                oGameData.gameField[eatThis[0]] = null;
                oGameData.gameField[eatThis[1]] = null;
                yoshiEats = false;
            }
            console.log(`Yoshi ate ${cardToEat}`);
        }
    },
    {
        Name : 'Bowser',
        Age : '55',
        Occupation : 'King of Koopas',
        Image : 'https://upload.wikimedia.org/wikipedia/en/9/92/Bowser_Stock_Art_2021.png',
        Description : `Bowser, the menacing King of Koopas, serves as Mario's perpetual adversary. With a fiery breath and a desire for conquest, he kidnaps Princess Peach in his quest to dominate the Mushroom Kingdom, providing a formidable challenge for Mario.`,
        Color: `#fec162`,
        Special: function () { console.log(`Du hittade ${characters[4].Name}!`);}
    }, 
    {
        Name : 'Toad',
        Age : '24',
        Occupation : 'Mushroom Retainer',
        Image : 'https://upload.wikimedia.org/wikipedia/en/d/d1/Toad_3D_Land.png',
        Description : `Toad, the cheerful and mushroom-headed inhabitant of the Mushroom Kingdom, is a loyal friend to Mario and company. With unwavering support, Toad contributes to the vibrant and diverse cast of characters in the Mario universe.`,
        Color: `#ed0d11`,
        Special: function () { console.log(`Du hittade ${characters[5].Name}!`);}
    },
    {
        Name : 'Wario',
        Age : '45',
        Occupation : 'Treasure Hunter',
        Image : 'https://upload.wikimedia.org/wikipedia/en/8/81/Wario.png',
        Description : 'Wario, an anti-hero, a greedy and mischievous character known for his insatiable desire for wealth. With a distinctive yellow-and-purple attire, he often finds himself in comical and adventurous situations, providing a unique and entertaining counterpart to Mario.',
        Color: `#ffe539`,
        Special: function () { console.log(`Du hittade ${characters[6].Name}!`);}
    },    
    {
        Name : 'Birdo',
        Age : '30',
        Occupation : 'Egg-Throwing Dino',
        Image : 'https://upload.wikimedia.org/wikipedia/en/f/f9/Birdo-MP9.png',
        Description : 'Birdo is a pink, dinosaur-like creature with a bow and a large, round mouth that can shoot eggs. Initially introduced as an enemy in Super Mario Bros. 2, Birdo has since become a recurring character and sometimes an ally to Mario and friends.',
        Color: `#f553b5`,
        Special: function () { console.log(`Du hittade ${characters[7].Name}!`);}
    },
    {
        Name : 'Waluigi',
        Age : '40',
        Occupation : 'Mischief Maker',
        Image : 'https://upload.wikimedia.org/wikipedia/en/4/46/Waluigi.png',
        Description : 'Will shuffle the board once matched.',
        Color: `rgb(146 88 228)`,
        Special: function () {

            let cardsToMove = []; 
            let originalPositions = []; 
        
            for (let i = 0; i < oGameData.gameField.length; i++) {
                if (oGameData.gameField[i] !== null) {
                    cardsToMove.push(i)
                }
            }
    

            for (let k = 0; k < cardsToMove.length; k++) {
                    originalPositions.push(cardsToMove[k]+1);
            }
           
        
            for (let j = 0; j < cardsToMove.length; j++) {
        
                let cardToMove = document.querySelector(`#cardContainer${cardsToMove[j]}`);
                let cardToMovePlusOne = document.querySelector(`#cardContainer${originalPositions[j]}`);
                let randomCardIndex = Math.floor(Math.random()*cardsToMove.length);
                let randomCard = document.querySelector(`#cardContainer${cardsToMove[randomCardIndex]}`);
                let memoryContainer = document.querySelector(`#contentContainer`);
                                // Exempel:   flytta 0   släpp före 7
                memoryContainer.insertBefore(cardToMove, randomCard);
                                // Exempel:   flytta 7   släpp före 1
                memoryContainer.insertBefore(randomCard, cardToMovePlusOne);
            }
            const container = document.querySelector('#contentContainer'); // Replace with your container ID
            const numbers = [];

            for (const card of container.querySelectorAll('.cardContainer')) {
                 const match = card.id.match(/\d+/); // Extract the number using regular expression
                 if (match) {
                 numbers.push(parseInt(match[0])); // Convert the string to integer
                 }
            }
            let newGameField = [];
            for (let g = 0; g<oGameData.memoryArray.length; g++){
                if (!oGameData.gameField.includes(oGameData.memoryArray[numbers[g]].Name)){
                    newGameField.push(null)
                } else{
                    newGameField.push(oGameData.memoryArray[numbers[g]].Name);
                }

            }
            // oGameData.gameField = newGameField;
        }


    }
    ,    
    {
        Name : 'Daisy',
        Age : '23',
        Occupation : 'Princess',
        Image : 'https://mario.wiki.gallery/images/1/15/SMBW_Daisy.png',
        Description : 'Will let you see border colors for a short time after matched.',
        Color: `#fedb37`,
        Special: function () { console.log(`Du hittade ${characters[9].Name}!`);}
    },
    // {
    //     Name : 'Thwomp',
    //     Age : '999',
    //     Occupation : 'Trap',
    //     Image : '/assets/thwomp.webp',
    //     Description : 'Will not move until matching Thwomp is found.',
    //     Color: `#77827f`
    // },
    // {
    //     Name : 'Shyguy',
    //     Age : '??',
    //     Occupation : 'Minion',
    //     Image : 'https://mario.wiki.gallery/images/b/b2/MPS_Shy_Guy_Artwork.png',
    //     Description : 'Will hide shortly after being shown.',
    //     Color: `#f32a2a`
    // }

    
];

// let abilityToRun = characters.find(card => card.Name === `Waluigi`);
// abilityToRun.Special();