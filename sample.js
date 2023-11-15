// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll('[data-id="square"]');
  const modal = document.querySelector('[data-id="modal"]');
  const modalText = document.querySelector('[data-id="modal-text"]');
  const modalBtn = document.querySelector('[data-id="modal-btn"]');
  const resetBtn = document.querySelector('[data-id="reset-btn"]');
  const newRoundBtn = document.querySelector('[data-id="new-round-btn"]');
  const p1Wins = document.querySelector('[data-id="p1-wins"]');
  const ties = document.querySelector('[data-id="ties"]');
  const p2Wins = document.querySelector('[data-id="p2-wins"]');

  const menuButton = document.querySelector('[data-id="menu-btn"]');
  const menuItems = document.querySelector('[data-id="menu-items"]');

  menuButton.addEventListener("click", () => {
    menuItems.classList.toggle("hidden");
  });

  let currentPlayer = 1;
  let moves = 0;
  let board = Array.from({ length: 9 }, () => null);

  //to change the dropdown icon
  const menuIcon = document.querySelector('[data-id="menu-icon"]'); // Get the icon element

  let isMenuVisible = false; // Track the menu visibility

  menuButton.addEventListener("click", () => {
    if (isMenuVisible) {
      // If the menu is visible, hide it and change the icon to "fa-chevron-down"
      menuItems.classList.add("hidden");
      menuIcon.classList.remove("fa-chevron-up");
      menuIcon.classList.add("fa-chevron-down");
    } else {
      // If the menu is hidden, show it and change the icon to "fa-chevron-up"
      menuItems.classList.remove("hidden");
      menuIcon.classList.remove("fa-chevron-down");
      menuIcon.classList.add("fa-chevron-up");
    }

    isMenuVisible = !isMenuVisible; // Toggle the menu visibility
  });

  //to reset the game
  resetBtn.addEventListener("click", () => {
    // Clear the squares
    squares.forEach((square) => {
      square.textContent = "";
      square.dataset.state = "empty";
    });

    // Reset the board array
    board = Array.from({ length: 9 }, () => null);

    // Continue the game with player 1's turn
    currentPlayer = 1;
    moves = 0;
    modal.classList.add("hidden");
  });
  //to make a new round
  newRoundBtn.addEventListener("click", () => {
    // Clear the squares
    squares.forEach((square) => {
      square.textContent = "";
      square.dataset.state = "empty";
    });

    // Reset the board array
    board = Array.from({ length: 9 }, () => null);

    // Reset scores and ties
    p1Wins.textContent = "0 Wins";
    ties.textContent = "0";
    p2Wins.textContent = "0 Wins";

    // Start a new round with player 1's turn
    currentPlayer = 1;
    moves = 0;
    modal.classList.add("hidden");
  });

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Function to check if a player has won
  function checkWin(player) {
    return winningCombinations.some((combination) => {
      return combination.every((index) => board[index] === player);
    });
  }

  // ... (previous code)

  // Function to make the computer's move
  function makeComputerMove() {
    if (currentPlayer === 2) {
      // Add your computer's move logic here
      // For example, you can randomly select an empty square and place "O" in it

      const emptySquares = board
        .map((value, index) => (value === null ? index : -1))
        .filter((index) => index !== -1);

      const randomIndex =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
      if (randomIndex !== undefined) {
        const square = squares[randomIndex];
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-o", "yellow");
        square.appendChild(icon);
        board[randomIndex] = 2;
        moves++;

        if (checkWin(currentPlayer)) {
          modalText.textContent = `Player ${currentPlayer} wins!`;
          modal.classList.remove("hidden");

          if (currentPlayer === 1) {
            p1Wins.textContent = parseInt(p1Wins.textContent) + 1 + " Wins";
          } else {
            p2Wins.textContent = parseInt(p2Wins.textContent) + 1 + " Wins";
          }
        } else if (moves === 9) {
          modalText.textContent = "It's a tie!";
          modal.classList.remove("hidden");
          ties.textContent = parseInt(ties.textContent) + 1;
        } else {
          currentPlayer = 1;
          setTurnContent(currentPlayer);
        }
      }
    }
  }

  // Function to handle a square click for player1
  function handleSquareClick(event) {
    const square = event.target;
    const index = parseInt(square.id) - 1;

    if (board[index] === null && currentPlayer === 1) {
      const icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-x", "turquoise");

      square.appendChild(icon);
      board[index] = 1;
      moves++;

      if (checkWin(currentPlayer)) {
        modalText.textContent = `Player ${currentPlayer} wins!`;
        modal.classList.remove("hidden");
        p1Wins.textContent = parseInt(p1Wins.textContent) + 1 + " Wins";
      } else if (moves === 9) {
        modalText.textContent = "It's a tie!";
        modal.classList.remove("hidden");
        ties.textContent = parseInt(ties.textContent) + 1;
      } else {
        currentPlayer = 2;
        setTurnContent(currentPlayer);
        setTimeout(() => {
          makeComputerMove();
        }, 1000); // Call the computer's move function
      }
    }
  }
  //to change contents of turn class
  const playerIcon = document.querySelector('[data-id="player-icon"]');
  const playerText = document.querySelector('[data-id="player-text"]');

  function setTurnContent(player) {
    if (player === 1) {
      playerIcon.classList.remove("fa-o", "yellow");
      playerIcon.classList.add("fa-x", "turquoise");
      playerText.textContent = "Player 1, you are Up !!";
      playerText.classList.remove("yellow");
    } else {
      playerIcon.classList.remove("fa-x", "turquoise");
      playerIcon.classList.add("fa-o", "yellow");
      playerText.textContent = "Player 2, you are Up !!";
      playerText.classList.add("yellow");
    }
  }

  // ... (remaining code)
  function resetGame() {
    squares.forEach((square) => {
      square.textContent = "";
    });

    board = Array.from({ length: 9 }, () => null);
    currentPlayer = 1;
    moves = 0;
    modal.classList.add("hidden");
  }
  // Add click event listeners to the squares
  squares.forEach((square) => {
    square.addEventListener("click", handleSquareClick);
  });

  // Add click event listeners to the modal button and reset button
  modalBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);
  newRoundBtn.addEventListener("click", resetGame);
});
