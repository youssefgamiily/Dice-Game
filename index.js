class Player {
  constructor(currScore, totScore) {
    this.currScore = currScore;
    this.totScore = totScore;
  }
}

let Player1 = new Player(0, 0);
let Player2 = new Player(0, 0);

let currScore = 0;
let round = 0;

/*Function generating a random number between 1 and 6 for dice rolls*/
const randNum = function () {
  const rand = Math.ceil(6 * Math.random()); // returns number between 1 and 6
  console.log(`rand in randNum() is ${rand}`);
  console.log(`dice returned ${rand}`);
  return rand;
};

const matchNumtoSrc = function (num) {
  let src;
  switch (num) {
    case 1:
      src = "./dice-1.png";
      break;
    case 2:
      src = "./dice-2.png";
      // command
      break;
    case 3:
      src = "./dice-3.png";
      // command
      break;
    case 4:
      src = "./dice-4.png";
      // command
      break;
    case 5:
      src = "./dice-5.png";
      // command
      break;
    case 6:
      src = "./dice-6.png";
      // command
      break;
  }
  return src;
};

const isEven = function (num) {
  console.log(`round num is ${num}`);
  if (num % 2 === 0) {
    console.log(`isEven returned true`);
    return true;
  } else return false;
};

const dispPalyerScore = function (player) {
  if (player === Player1) {
    document.getElementById("playerOnecurr").innerHTML = Player1.currScore;
    document.getElementById("Board1TotScore").innerHTML = Player1.totScore;
  } else if (player === Player2) {
    document.getElementById("playerTwoCurr").innerHTML = Player2.currScore;
    document.getElementById("Board2TotScore").innerHTML = Player2.totScore;
  }
};

const updatePlayerCurr = function (player, num) {
  player.currScore = num;
  console.log(`Player1.currScore is now ${Player1.currScore}`);
  dispPalyerScore(player);
};

const addToPlayerCurrScore = function (player, num) {
  player.currScore += num;
  console.log(`Player1.currScore is now ${Player1.currScore}`);
  dispPalyerScore(player);
};

const skipTurn = function (player) {
  // if player gets a 1, loses his turn and curr score =0 and round ++
  player.currScore = 0;
  updatePlayerCurr(player, player.currScore);
  round++;
};

const rollDice = function () {
  const rand = randNum(); // generates a random number 1 - 6
  const src = matchNumtoSrc(rand); // match the dice picture with link of one of the 6 dice faces pics
  document.querySelector("img.rollDice").src = src;
  if (isEven(round)) {
    if (rand === 1) {
      skipTurn(Player1);
      return;
    }
    console.log(`in an even round .. `);
    addToPlayerCurrScore(Player1, rand);
  } // if in an even round 0 , 2, 4, 6 it's player1's turn -> add curr score to total score.
  else if (!isEven(round)) {
    if (rand === 1) {
      skipTurn(Player2);
      return;
    }
    console.log(`in an odd round .. `);
    addToPlayerCurrScore(Player2, rand);
    console.log(`Player2.currScore is now ${Player2.currScore}`);
    dispPalyerScore(Player2);
  }
};

const holdDice = function () {
  if (isEven(round)) {
    // 0 2 4 6 -> player 1
    Player1.totScore += Player1.currScore; // add current score to total score
    document.getElementById("Board1TotScore").innerHTML = Player1.totScore;
    updatePlayerCurr(Player1, 0);
  } else if (!isEven(round)) {
    // 1 3 5 7 -> Player 2
    Player2.totScore += Player2.currScore;
    document.getElementById("Board2TotScore").innerHTML = Player2.totScore;
    updatePlayerCurr(Player2, 0);
  }

  round = round + 1;
};

//New Game button
const StartNewGame = function () {
  Player1 = new Player(0, 0);
  Player2 = new Player(0, 0);
  dispPalyerScore(Player1);
  dispPalyerScore(Player2);
};

window.onload = function () {
  // startGame () -> rollDice -> add dice to current for Player 1 -> Hold ? -> add currScore to totScore  /\  ->
  //                                                         Rolldice ?-> add dice to curr for Player 1 -> |

  let rollDiceButton = document.querySelector(".rollDiceBtn");
  if (rollDiceButton) rollDiceButton.addEventListener("click", rollDice);

  const holdDiceButton = document.querySelector(".holdDiceBtn");
  if (holdDiceButton) holdDiceButton.addEventListener("click", holdDice);

  const NewGameButton = document.querySelector(".newGameBtn");
  if (NewGameButton) NewGameButton.addEventListener("click", StartNewGame);
};
