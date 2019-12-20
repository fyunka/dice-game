/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// var scores, roundScore, activePlayer, dice;
var scores, roundScore, activePlayer, gamePlaying;

init();

// scores = [0, 0];
// roundScore = 0;
// activePlayer = 0;

// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// TODO: 1. DOM access and manipulation

//? Setter (as we SET a value)
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//? Getter (as we GET a value)
// to read the content of the element ID
// var x = document.querySelector('#score-0').textContent;
// console.log(x);

// document.getElementById('score-0').textContent = '0';
// document.getElementById('score-1').textContent = '0';
// document.getElementById('current-0').textContent = '0';
// document.getElementById('current-1').textContent = '0';

// document.querySelector('.dice').style.display = 'none';

// TODO: 2. Event and event handling: rolling the dice (button)
// function btn() {
//   // Do smth here
// }
// btn();

// document.querySelector('.btn-roll').addEventListener('click', btn);

// here we use an anonymous function so that it won't be used anywhere else
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    // console.log(dice);
    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // TODO: 3. Updating scores and changing the Active Player
    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      // Add score
      roundScore += dice; //! equals to roundScore = roundScore = dice
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }

    //     // 1. Random number
    //   var dice = Math.floor(Math.random() * 6) + 1;
    //   console.log(dice);
    //   // 2. Display the result
    //   var diceDOM = document.querySelector('.dice');
    //   diceDOM.style.display = 'block';
    //   diceDOM.src = 'dice-' + dice + '.png';

    //   // TODO: 3. Updating scores and changing the Active Player
    //   // 3. Update the round score IF the rolled number was NOT a 1
    //   if (dice !== 1) {
    //     // Add score
    //     roundScore += dice; //! equals to roundScore = roundScore = dice
    //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //   } else {
    //     // Next player
    //     nextPlayer();
    // // method #1 using ternary operator, its much cleaner
    // activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    // // method #2 using IF ELSE statement
    // // if (activePlayer === 0) {
    // //   activePlayer = 1;
    // // } else {
    // //   activePlayer = 0;
    // // }

    // // to set roundScore back to zero
    // roundScore = 0;

    // document.getElementById('current-0').textContent = '0';
    // document.getElementById('current-1').textContent = '0';

    // document.querySelector('.player-0-panel').classList.toggle('active');
    // document.querySelector('.player-1-panel').classList.toggle('active');

    // // document.querySelector('.player-0-panel').classList.remove('active');
    // // document.querySelector('.player-1-panel').classList.add('active');

    // document.querySelector('.dice').style.display = 'none';
  }
});

// TODO: 4. Implementing our "Hold" function and the DRY principle
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore; //! equals to scores[activePlayer] = scores[activePlayer] + roundScore;

    // 2. Update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    // 3. Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      // 4. Nex player
      nextPlayer();
    }
  }

  //     // 1. Add CURRENT score to GLOBAL score
  //   scores[activePlayer] += roundScore; //! equals to scores[activePlayer] = scores[activePlayer] + roundScore;

  //   // 2. Update the UI
  //   document.querySelector('#score-' + activePlayer).textContent =
  //     scores[activePlayer];

  //   // 3. Check if player won the game
  //   if (scores[activePlayer] >= 20) {
  //     document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
  //     document.querySelector('.dice').style.display = 'none';
  //     document
  //       .querySelector('.player-' + activePlayer + '-panel')
  //       .classList.add('winner');
  //     document
  //       .querySelector('.player-' + activePlayer + '-panel')
  //       .classList.remove('active');
  //     gamePlaying = false;
  //   } else {
  //     // 4. Nex player
  //     nextPlayer();
  //   }
});

function nextPlayer() {
  // Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // to set roundScore back to zero
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
}

// TODO: 5. Creating a Game Initialization Function

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

// TODO: 6. Finishing Touches: state variables
// check out the above gamePlaying state variable
