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

function dragDrop(e) { //the magic - put console logs 1 line below to test.
    e.stopPropagation()     //console.log('playerGo', playerGo)
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === 'white' ? 'black' : 'white' //console.log('opponentGo', opponentGo)
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if (correctGo) {
        // must check this first
        if (takenByOpponent && valid) {
        e.target.parentNode.append(draggedElement)
        e.target.remove()
        changePlayer()
        return
        }
        // then check this
        if (taken && !takenByOpponent) {
            infoDisplay.textContent = "you cannot go here!"
            setTimeout(() => infoDisplay.textContent = "", 3000)
            return
        }
        if (valid) {
            e.target.append(draggedElement)
            changePlayer()
            return
        }
    }
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const piece = draggedElement.id
    console.log('targetId', targetId)
    console.log('startId', startId)
    console.log('piece', piece)

    switch(piece) {
        case 'pawn' :
            const starterRow = [8,9,10,11,12,13,14,15]
            if (
                starterRow.includes(startId) && startId + width * 2 === targetId ||
                startId + width === targetId ||
                startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild
                ) {
                return true
            }
                break;
        case 'knight':
            if (
                startId
            )
                
    }
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