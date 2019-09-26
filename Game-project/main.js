//#region Important stuff
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
//#endregion

// Global variables
let timesRolled = 0; // The allowed amount of times a player has initially rolled
let allowedRolls = 3; // Max rolls per round/player - three
let currentPlayer = 1; // Var to be used for player turns 
  

// Save dice function
const CheckSaveStates = function () {
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

// Get active player 
const getActivePlayer = function () {
    if ($('p1').style.backgroundColor == "green") {
        return "player1";
    } else {
        return "player2";
    }
}

// Keep track of turns, set color of current player, and countdown the rolls left.
const isRollAllowed = function () {
    if (timesRolled < (allowedRolls - 1)) {
        timesRolled += 1;
    } else {
        if (getActivePlayer() == "player1"){
            activePlayer(2);
            console.log('player 2 turn');
        }  else {
            activePlayer(1);
            console.log('player 1 turn');
        }
    }
}

// Function to visualize whose turn it is.
const activePlayer = function (player) {
    if (player === 1) {
        $('p1').style.backgroundColor = "green";
        $('p2').style.backgroundColor = "red";
    } else {
        $('p1').style.backgroundColor = "red";
        $('p2').style.backgroundColor = "green";
    }
    timesRolled = 0;
}

// Roll function
function roll() {
    let out = Math.random();
    out = Math.floor(out * 6 + 1);
    return out;
}


const rollCallBtn = function () {
    isRollAllowed();
    CheckSaveStates();

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

const startGameBtn = function () {
    if ($('playerOneName').value.length > 0 && $('playerTwoName').value.length > 0) {
        $('p1').innerHTML = $('playerOneName').value;
        $('p2').innerHTML = $('playerTwoName').value;
    } else {
        confirm('Please enter both names of players.');
    }
}

/*  SAVE FOR  LATER
const saveScoreboard = function() {     // This function creates the cookie
    let inP = $('playerOneName').value;
    let date = $('dat').value;


    if (inP.length < 2 || date.length < 2) {  // IF name and date input is not filled, alert user
        alert('enter a valid name and date')
    } else {
        createCookie(inP + date , 42, 0.006); // inP= "username" date = "date" 42 = "potential score", 0.006 = 10 min. 
        console.log(document.cookie);
    }
}*/

// Functions outside btn's


let init = function () {
    $('btnRoll').addEventListener('click', rollCallBtn);
    $('btnStart').addEventListener('click', startGameBtn);
    activePlayer(1);
}

window.addEventListener('load', init);