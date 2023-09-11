const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// INTIALIZE GAME
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.textContent = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box-${index}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.textContent = `Current Player - ${currentPlayer}`;

}
initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});
function handleClick(i){
    if(gameGrid[i] === ""){
        boxes[i].textContent = currentPlayer;
        gameGrid[i] = currentPlayer;
        boxes[i].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X")
        currentPlayer = "O";
    else if(currentPlayer === "O")
        currentPlayer = "X";
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

newGameBtn.addEventListener("click", initGame);

function checkGameOver(){
    let ans = "";
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && gameGrid[position[1]] === gameGrid[position[2]]) {
            // CHECH IF WINNER IS "X"
            if(gameGrid[position[0]] === "X")
                ans = "X";
            else
                ans = "O";

            // DISABLE POINTER EVENTS
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // NOW WE KNOW THE WINNER
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }     
    });

    if(ans !== ""){
        gameInfo.textContent = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }

    // CHECKING TIE CONDITION
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    // IF BOARD IF FILLED THEN GAME TIED
    if(fillCount === 9){
        gameInfo.textContent = "GAME TIED";
        newGameBtn.classList.add("active");
    }
}