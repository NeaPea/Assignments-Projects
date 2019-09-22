"use strict";
var $ = function (foo) {
    return document.getElementById(foo);    // save keystrokes
}


const main = function () {

    CheckSaveStates(); // When calling the roll function, we will first check if we have saved any dices.

    function roll() { // Roll function
        let out = Math.random();
        out = Math.floor(out * 6 + 1);
        return out;
    }

    for (let dice = 1; dice < 6; dice++) { // We create the loop so we can apply the roll function to all 5 dice.
        let currentDie = "die" + dice;  // Combining the string "die" with the amount of dice we have, instead of having to create several variables "die1, die2, die3 ..."
        let saveCurrentDie = $(currentDie).getAttribute("data-save");
        let checkTxt = "checkConfirm" + dice;

        if (saveCurrentDie === "1") { // This will save the dice and not roll if checked.
            $(checkTxt).innerHTML = "You have saved this die"; // ASK NIELS FOR ADVICE
        } else {
            $(currentDie).innerHTML = roll();
        }
    }
}

const CheckSaveStates = function () {  // Save dice function
    for (let DiceNumber = 1; DiceNumber < 6; DiceNumber++) { // We create this loop to iterate through all the dice to apply the value "1" = checked.
        let savedDiceName = "saveD" + DiceNumber;
        let currentDieChecked = "die" + DiceNumber;  // Combining the word die and with the amount of dice we have

        if ($(savedDiceName).checked) {
            $(currentDieChecked).setAttribute("data-save", "1");   // This adds the value "1" to the data-save class and mark it as Checked for our script
        } else {
            $(currentDieChecked).setAttribute("data-save", "0");
        }
    }
}


let init = function () {
    $('btnRoll').addEventListener('click', main);
}

window.addEventListener('load', init);