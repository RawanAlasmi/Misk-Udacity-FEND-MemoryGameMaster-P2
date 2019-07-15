

/*
 *  a list that holds all of your cards
 */

const symbols = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const ourCards = [...symbols, ...symbols]; // this will spread the values of the symbols array twice and save them into the ourCards array

/* 
 *
 * Global Variables 
 * 
 */

// First Click Indicator (this variable needed in the gameStarted function)
let isFirstClick = true;

// create cards board
const createCards = document.querySelector(".deck");

// Moves
const countMoves = document.querySelector(".moves");
let moves = 0;

// Rating
const starsContainer = document.querySelector(".stars").childNodes;
const starsForRate = document.querySelector('.stars');
const star = `<li><i class="fa fa-star"></i></li>`;

// Restart
const restartBtn = document.querySelector(".restart");

// Timer
let seconds = 0;
let minutes = 0;
let hours = 0;

const timer = document.querySelector(".timer");

const hourTimer = document.querySelector(".hour");
const minuteTimer = document.querySelector(".minute");
const secondsTimer = document.querySelector(".seconds");

let timeCounter;
let timerOn = false;

// Restart
const restart = document.querySelector(".restart");

// Modal
const modal = document.querySelector('.modal');
const timeModal = document.querySelector('.time-modal');
const ratingModal = document.querySelector('.rating-modal');
const movesModal = document.querySelector('.moves-modal');
const btnModal = document.querySelector('.btn-modal');

/* 
 *
 * Cards array
 * 
 */

let openedCards = [];
let matchedCards = [];



/* 
 *
 * gameStarted that run the game for the player
 * 
 */


function gameStarted() {

    let shuffleIcons = shuffle(ourCards);
    for (let i = 0; i < ourCards.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${ourCards[i]}"></i>`;
        createCards.appendChild(card);

        // Add Click Event to each Card
        card.addEventListener("click", function () {

            // to make sure that the clicked card is a card & 
            // not an opened/matched card
            if (!card.classList.contains("open", "show", "match")) {

            if(isFirstClick) {
                // Start our timer
                startTimer();
                // Change our First Click indicator's value
                isFirstClick = false;
            }
        

            const currentCard = this;
            const previousCard = openedCards[0];

            // When we have an existing opened card
            if (openedCards.length === 1) {

                card.classList.add("open", "show", "disable");
                openedCards.push(this);

                // function for comparing our 2 opened cards!
                compareCards(currentCard, previousCard);

            } else {
                // When we don't have any opened cards
                currentCard.classList.add("open", "show", "disable");
                openedCards.push(this);
            }
          }
        });
    } // end for loop
} // end gameStarted function



/* 
 *
 * compareCards that Compare the 2 cards
 * 
 */
function compareCards(currentCard, previousCard) {


    if (currentCard.innerHTML === previousCard.innerHTML) {

        // if Matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        // push both cards to the matchedCards array
        matchedCards.push(currentCard, previousCard);
        // remove cards from openedCards array
        openedCards = [];

        // Check if the game is over!
        gameIsOver();

    } else {

        // Wait 500ms to display the 2 cards then, hide it!
        setTimeout(function () {
            currentCard.classList.remove("open", "show");
            previousCard.classList.remove("open", "show");

        }, 500);

        openedCards = [];

    }

    // Add New Move
    movesCounter();
} // end compareCards function



/* 
 *
 * gameIsOver that check if the game is over!
 * 
 */
function gameIsOver() {
    if (matchedCards.length === ourCards.length) {
        // to add the stats to the modal
        timeModal.innerText = timer.innerText;
        ratingModal.innerHTML = starsForRate.innerHTML;
        movesModal.innerHTML = countMoves.innerHTML.slice(0, 3);
        // stop the timer and show the modal
        clearInterval(timeCounter);
        modal.style.display = 'block';
    }
} // end gameIsOver function



/* 
 *
 * movesCounter that add new move to the counter
 * 
 */
function movesCounter() {

    moves++;
    if (moves === 1) {
        countMoves.innerHTML = `1  Move`;
    } else {
        countMoves.innerHTML = `${moves}  Moves`;
    }

    // Set the rating
    ratingPlayerMoves();
} // end movesCounter function



/* 
 *
 * ratingPlayerMoves that rate the player depending on his moves
 * 
 */
function ratingPlayerMoves() {

    // if the moves number is between 12 and 19
    if (moves === 12) {
        // change the color of the third star to grey
        starsContainer[5].classList.add('grey');
        // if the moves number is 20 or more 
    } else if (moves === 20) {
        // change the color of the second star to grey
        starsContainer[3].classList.add('grey');
    }
} // end ratingPlayerMoves function






/* 
 *
 * fix that fix timer by adding zero if the number is less than ten
 * 
 */ 
function fix(x, y) {

    // to fix timer by adding zero if the 
    // number is less than ten 
    if (x < 10) {
        return (y.innerHTML = ` 0${x}`);
    } else {
        return (y.innerHTML = ` ${x}`);
    }
} // end fix function

/* 
 *
 * startTimer that turn the timer on
 * 
 */ 
function startTimer() {
    // to start the timer to avoid delay
    if (seconds == 0) {
        seconds++;
    }

    timeCounter = setInterval(function () {

        hourTimer.innerHTML = `${hours}`;
        minuteTimer.innerHTML = ` ${minutes} `;
        secondsTimer.innerHTML = ` ${seconds} `;
        // fix each part of the timer
        fix(seconds, secondsTimer);
        fix(minutes, minuteTimer);
        fix(hours, hourTimer);

        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        } else if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
} // end startTimer function




/* 
 *
 * restartBtn is an event listener for restart button
 * 
 */ 
restartBtn.addEventListener("click", function () {
    // Delete ALL cards
    createCards.innerHTML = "";

    // Call `gameStarted` to create new cards
    gameStarted();

    // Reset the game
    reset();

});



/* 
 *
 * reset function that reset all game variables
 * 
 */ 
function reset() {

    // Empty the `matchedCards` array
    matchedCards = [];

    // Reset `moves`
    moves = 0;
    countMoves.innerHTML = `0 Moves`;

    // Reset `rating`
    starsContainer.innerHTML = star + star + star;

    //  Reset the `timer`
    timerOn = false;

    // to stop the timer
    clearInterval(timeCounter);

    // reset the timer to zero
    seconds = 0;
    minutes = 0;
    hours = 0;
    secondsTimer.innerText = "00";
    minuteTimer.innerText = " 00";
    hourTimer.innerText = "00";
    // reset the color of the stars
    starsContainer[5].classList.remove('grey');
    starsContainer[3].classList.remove('grey');
}


/* 
 *
 * restart is an event listener to restart the game when 
 * the player click on the restart icon
 * 
 */ 
restart.addEventListener("click", reset);



/* 
 *
 * btnModal is an event listener to create a custom modal 
 * that shows how much time the user consumed, how many 
 * stars he got and a button to allow him to click on it to play again.
 * 
 */ 
btnModal.addEventListener('click', function () {
    // to close the modal and restart the game
    modal.style.display = 'none';
    reset();
    timerOn = false;
})

// Start the game for the first time!
gameStarted();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
