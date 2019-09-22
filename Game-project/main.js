"use strict";
var $ = function (foo) {
    return document.getElementById(foo);    // save keystrokes
}


const main = function () {

    CheckSaveStates();

    function roll() { // Roll function
        let out = Math.random();
        out = Math.floor(out * 6 + 1);
        return out;
    }

    for (let dice = 1; dice < 6; dice++) {

        let currentDie = "die" + dice;  // Combining the word die and with the amount of dice we have
        let saveCurrentDie = $(currentDie).getAttribute("data-save");

        if (saveCurrentDie === "1") {
            console.log("dice " + dice + " is marked as saved.");
        } else {
            $(currentDie).innerHTML = roll();
        }
    }
}

const CheckSaveStates = function () {  // Save die function
    for (let DiceNumber = 1; DiceNumber < 6; DiceNumber++) {
        let savedDiceName = "saveD" + DiceNumber;
        let currentDieChecked = "die" + DiceNumber;  // Combining the word die and with the amount of dice we have

        if ($(savedDiceName).checked) {
            $(currentDieChecked).setAttribute("data-save", "1");   // Will store the check value to not roll next roll
        } else {
            $(currentDieChecked).setAttribute("data-save", "0");
        }
    }
}


let init = function () {
    $('btnRoll').addEventListener('click', main);
}

window.addEventListener('load', init);