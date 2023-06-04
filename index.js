const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // UI per empty krna hai boxes to
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    boxes[index].style.userSelect = "all";

    // one more thing missing - wining color we have to set empty
    // box.classList.remove("win");
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;

    // clicked box ko none pointer && user select none
    // ponter event none means all the on point click event is disable
    boxes[index].style.pointerEvents = "none";
    boxes[index].style.userSelect = "none";

    // swap turn on
    swapTurn();
    // check koi jeet to nahi gya
    checkGameOver();
  }
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  // UI Update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  // TODO
  //   newGameBtn.classList.add("active");

  let answer = "";
  winningPositions.forEach((position) => {
    // all 3 boxes shold be non-empty and exactly same in value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // check the winner is X
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      // disable pointer event
      // after winner find out then next pointer event = stop
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // now we know X/O is winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // it means we have winner
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  // let's check there is no winner there is tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }

    if (fillCount == 9) {
      gameInfo.innerText = `Game Tied!`;
      newGameBtn.classList.add("active");
    }
  });
}

newGameBtn.addEventListener("click", initGame);
