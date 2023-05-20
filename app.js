const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard() { //handles initial layout of gameboard
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', true) //check if first child exists
        square.setAttribute('square-id', i)
        const row = Math.floor( (63 - i) / 8) + 1 //math replaces this--> square.classList.add('beige')
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")
        }
        if (i <= 15) {
            square.firstChild.firstChild.classList.add('black') //changes top row to black
        }
        if (i >= 48) {
            square.firstChild.firstChild.classList.add('white') //changes top row to white
        }
        gameBoard.append(square)
    })
}
createBoard()

const allSquares = document.querySelectorAll(".square")

allSquares.forEach(square => { //handles the movement, check the css to understand
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop) //the magic happens here
})

let startPositionId
let draggedElement

function dragStart (e) { //target derived from console log events
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement= e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) { //the magic
     e.stopPropagation()
    const taken = e.target.classList.contains('piece')

    //  e.target.parentNode.append(draggedElement)
    //  e.target.remove()
    // e.target.append(draggedElement)
    changePlayer()    
}

function changePlayer() { //handles turn order under board (flip squareIDs)
    if(playerGo === "black") {
        reverseIds()
        playerGo = "white"
        playerDisplay.textContent = 'white'
    } else {
        revertIds()
        playerGo = "black"
        playerDisplay.textContent = 'black'
    }
}

function reverseIds() { //reverses board square-IDs for turn handling
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) =>
        square.setAttribute('square-id', (width * width -1) - i)) //cool way to do reverse
}

function revertIds() { //sets IDs back to white after black
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) =>
        square.setAttribute('square-id', i))
}