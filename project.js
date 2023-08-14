/* eslint-disable no-restricted-syntax */
// 1. Deposit some money

// 2. Determine number of lines to bet

// 3. Collect a bet amount

// 4. Spin the slot machine

// 5. Print slot machine output in a human-readable format

// 6. Check if the user won

// 7. Give the user their winnings

// 8. Play again

const prompt = require('prompt-sync')();

// GLOBAL VARIABLES
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
  $: 2,
  '#': 4,
  '%': 6,
  '?': 8,
};

const SYMBOL_VALUES = {
  $: 5,
  '#': 4,
  '%': 3,
  '?': 2,
};

// 1. Deposit some money

const getDepositAmount = () => {
  while (true) {
    const depositInput = prompt('Input your deposit amount: ');
    const numberDepositAmount = parseFloat(depositInput);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log('Invalid deposit amount. Try again.');
    } else {
      return numberDepositAmount;
    }
  }
};

// 2. Determine number of lines to bet
const getNumberOfLines = () => {
  while (true) {
    const linesInput = prompt('Input the number of lines to bet on (1-3: ');
    const numberOfLines = parseFloat(linesInput);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log('Invalid input provided for number of lines. Try again!');
    } else {
      return numberOfLines;
    }
  }
};

// 3. Get Bet Amount
const getBetAmount = (balanceamount, lines) => {
  while (true) {
    const betInput = prompt('Input your bet amount per line: ');
    const betAmount = parseFloat(betInput);

    if (
      isNaN(betAmount) ||
      betAmount <= 0 ||
      betAmount > balanceamount / lines
    ) {
      console.log('Invalid bet amount. Try again!');
    } else {
      return betAmount;
    }
  }
};

// 4. Spin the slot machine

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i += 1) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i += 1) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j += 1) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

// 5. Print slot machine output
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i += 1) {
    rows.push([]);
    for (let j = 0; j < COLS; j += 1) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = '';
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i !== row.length - 1) {
        rowString += ' | ';
      }
    }
    console.log(rowString);
  }
};

// 6. Check if the user won

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row += 1) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol !== symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

// 7. Give user any winnings and adjust balance

const game = () => {
  let balance = getDepositAmount();
  while (true) {
    console.log(`Your current balance is $${balance}`);
    const numberOfLines = getNumberOfLines();
    const betAmount = getBetAmount(balance, numberOfLines);
    balance -= betAmount * numberOfLines;
    const generatedReels = spin();
    const rows = transpose(generatedReels);
    printRows(rows);
    const winnings = getWinnings(rows, betAmount, numberOfLines);
    balance += winnings;
    console.log(`You won, $${winnings}`);

    if (balance <= 0) {
      console.log('You ran out of money!');
      break;
    }

    // 8. Play Again
    const playAgain = prompt('Do you want to play again (y/n)?');

    if (playAgain !== 'y') break;
  }
};

game();
