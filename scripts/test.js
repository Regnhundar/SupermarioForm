
// Waluigi


// Special: function (memoryContainer) {
//     console.log(`Shuffle!`);
//     // Pre-select all card elements for efficiency:
//     const cardElements = memoryContainer.querySelectorAll('.cardContainer');
  
//     if (!Array.isArray(oGameData.gameField)) {
//       console.error("oGameData.gameField is not an array!");
//       return;
//     }
    
//     // Filter out indices of excluded cards:
//     const excludedCardIndices = oGameData.gameField.map((card, index) => {
//       return card === null || card === `Waluigi` ? index : null;
//     }).filter(index => index !== null);
//     console.log(excludedCardIndices);
//     // Shuffle the indices of non-excluded cards:
//     for (let i = excludedCardIndices.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [excludedCardIndices[i], excludedCardIndices[j]] = [excludedCardIndices[j], excludedCardIndices[i]];
//     }
  
//     // Move non-excluded cards to their shuffled positions:
//     for (let i = 0; i < excludedCardIndices.length; i++) {
//       const currentCardIndex = excludedCardIndices[i];
//       const currentElement = cardElements[currentCardIndex];
  
//       // Skip excluded cards:
//       if (oGameData.gameField[currentCardIndex] === null) {
//         console.log(currentCardIndex)
//         console.log(oGameData.gameField[currentCardIndex]);
//         continue;
//       }
//       console.log(`Outside of if-statement`);
//       // Find the target element after which to insert:
//       const targetElement = cardElements[excludedCardIndices[currentCardIndex]];
//       console.log(`Above final if statement`);
//       // If the target element is different and not excluded, insert:
//       if (targetElement !== currentElement && (oGameData.gameField[excludedCardIndices[currentCardIndex]] !== null && oGameData.gameField[excludedCardIndices[currentCardIndex]] !== `Waluigi`)) {
//         console.log(`The shuffling?`);
//         memoryContainer.insertBefore(currentElement, targetElement);
//       } else {
//         // Optional log for debugging
//         console.log("Condition not met:", targetElement, currentElement, oGameData.gameField[excludedCardIndices[currentCardIndex]]);
//       }
//     }
//   }

