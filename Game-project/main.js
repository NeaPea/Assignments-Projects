"use strict";
var $ = function (foo) {
    return document.getElementById(foo);    // save keystrokes
}

// Create, read and erease cookies 
function createCookie(name, value, days) {
    let expires;
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}



const main = function () {

    const CheckSaveStates = function () {  // Save dice function
        for (let DiceNumber = 1; DiceNumber < 6; DiceNumber++) { // We create this loop to iterate through all the dice to apply the value "1" = checked.
            let savedDiceName = "saveD" + DiceNumber;
            let currentDieChecked = "die" + DiceNumber;
            let checkTxt = "checkTxt" + DiceNumber;

            if ($(savedDiceName).checked) {
                $(currentDieChecked).setAttribute("data-save", "1");   // This adds the value "1" to the data-save class and mark it as Checked for our script
                $(checkTxt).innerHTML = "This die was saved";
            } else {
                $(currentDieChecked).setAttribute("data-save", "0");
                $(checkTxt).innerHTML = "Save die?";
            }
        }

       
    }

    const timesRolled = function () {
        //        for (let timesRolled = 0; timesRolled < countRoll; timesRolled++) {;
                    countRoll -= 1;
                    if (countRoll > 0) {
                        console.log('Reroll dice?');
                    } else {
                        alert('warning you clicked 3 times!');
                    }
                    return countRoll;
                }
        //    }
        
    if (!timesRolled()) {
        //write what is gonna happen when amount of roll has been roll
    //}
    CheckSaveStates(); // When calling the roll function, we will first check if we have saved any dices.


    function roll() { // Roll function
        let out = Math.random();
        out = Math.floor(out * 6 + 1);
        return out;
    }

    for (let dice = 1; dice < 6; dice++) { // We create the loop so we can apply the roll function to all 5 dice.
        let currentDie = "die" + dice;  // Combining the string "die" with the amount of dice we have, instead of having to create several variables "die1, die2, die3 ..."
        let saveCurrentDie = $(currentDie).getAttribute("data-save");

        if (saveCurrentDie === "1") { // This will stop the roll of your selected die
            console.log("you saved die nr: " + dice);
        } else {
            $(currentDie).innerHTML = roll();
        }
    }


}
}

let init = function () {
    $('btnRoll').addEventListener('click', main);

}
let countRoll;
window.addEventListener('load', init);