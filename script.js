const canvas = document.getElementById('game-screen')
const drawInGame = canvas.getContext('2d') 
//a borrar luego
let mouseX = 0
let mouseY = 0

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = Math.floor(event.clientX - rect.left)
    mouseY = Math.floor(event.clientY - rect.top)
})

function drawMouseCoordinates() {
    drawInGame.fillStyle = 'white'
    drawInGame.font = '14px Arial'
    drawInGame.fillText(`X: ${mouseX}  Y: ${mouseY}`, 10, 20)
}

// Test bedroom
const mainBedroom = new Image()
mainBedroom.src = "Assets/main_bedroom.jpg"

mainBedroom.onload = () => {
    drawInGame.drawImage(mainBedroom, 0, 0, canvas.width, canvas.height)
}

// Main character: Petunia
const mainCharacter = {
    originalY: 425,
    positionX: 110,
    positionY: 425,
    width: 60,
    height: 100,
    color: '#00FF00',
    targetX: 110,
    targetY: 425, 
    targetWidth: 60,
    targetHeight: 100,
    speed: 3, 
    needsToReturn: false
}

function drawMainCharacter(){
    drawInGame.fillStyle = mainCharacter.color
    drawInGame.fillRect(
        mainCharacter.positionX, 
        mainCharacter.positionY, 
        mainCharacter.width, 
        mainCharacter.height
    )
}

// Antagonist Dehivid 
const enemy = {
    positionX: 750,
    positionY: 425,
    width: 80,
    height: 100,
    color: '#FF0000',
    speed: 1.74
}

function drawAntagonist(){
    drawInGame.fillStyle = enemy.color
    drawInGame.fillRect(
        enemy.positionX, 
        enemy.positionY, 
        enemy.width, 
        enemy.height
    )
}

// ASSETS
// Door 
const door = {
    positionX: 190,
    positionY: 325, 
    width: 90,
    height: 120,
    color: '#0000FF'
}

function drawDoor(){
    drawInGame.fillStyle = door.color
    drawInGame.fillRect(
        door.positionX,
        door.positionY,
        door.width,
        door.height
    )
}

// Bed
const bed = {
    positionX: 340,
    positionY: 365, 
    width: 220,
    height: 80,
    color: '#0000FA',
    targetX: 275
}

function drawBed(){
    drawInGame.fillStyle = bed.color
    drawInGame.fillRect(
        bed.positionX,
        bed.positionY,
        bed.width,
        bed.height
    )
}

// Clock
const clock = {
    positionX: 625,
    positionY: 325, 
    width: 60,
    height: 120,
    color: '#0000F8'
}

function drawClock(){
    drawInGame.fillStyle = clock.color
    drawInGame.fillRect(
        clock.positionX,
        clock.positionY,
        clock.width,
        clock.height
    )
}

// Putting the scene together
function drawScene(){
    drawInGame.clearRect(0, 0, canvas.width, canvas.height)
    drawInGame.drawImage(mainBedroom, 0, 0, canvas.width, canvas.height)
    drawDoor()
    drawBed()
    drawClock()
    drawMainCharacter()
    drawAntagonist()
    drawMouseCoordinates() //a borrar luego
}

//Events

function isClickOnDoor(clickX, clickY){
    return (
        clickX >= door.positionX &&
        clickX <= door.positionX + door.width &&
        clickY >= door.positionY &&
        clickY <= door.positionY + door.height
        
    )
}

function isClickOnBed(clickX, clickY){
    return (
        clickX >= bed.positionX &&
        clickX <= bed.positionX + bed.width &&
        clickY >= bed.positionY &&
        clickY <= bed.positionY + bed.height
    )
}
function isClickOnClock(clickX, clickY){
    return (
        clickX >= clock.positionX &&
        clickX <= clock.positionX + clock.width &&
        clickY >= clock.positionY &&
        clickY <= clock.positionY + clock.height
    )
}

// Petunia´s movement
function mainCharacterMovement() {

    if(mainCharacter.needsToReturn){
        const destinyY = mainCharacter.originalY - mainCharacter.positionY
        const distanceY = Math.abs(destinyY)
        if(distanceY <= mainCharacter.speed){
            mainCharacter.positionY = mainCharacter.originalY
            mainCharacter.needsToReturn = false 
        } else {
            if(destinyY > 0){
                mainCharacter.positionY += mainCharacter.speed
            } else {
                mainCharacter.positionY -= mainCharacter.speed
            }
        }
    } else {
        const destinyX = mainCharacter.targetX - mainCharacter.positionX
        const distanceX = Math.abs(destinyX)
        if(distanceX <= mainCharacter.speed){
            mainCharacter.positionX = mainCharacter.targetX
        } else {
            if(destinyX > 0){
                mainCharacter.positionX += mainCharacter.speed
            } else {
                mainCharacter.positionX -= mainCharacter.speed
            }
        }

        if(mainCharacter.targetY !== undefined && mainCharacter.positionX === mainCharacter.targetX){
            const destinyY2 = mainCharacter.targetY - mainCharacter.positionY
            const distanceY2 = Math.abs(destinyY2)
            if(distanceY2 <= mainCharacter.speed){
                mainCharacter.positionY = mainCharacter.targetY
            } else {
                if(destinyY2 > 0){
                    mainCharacter.positionY += mainCharacter.speed
                } else {
                    mainCharacter.positionY -= mainCharacter.speed
                }
            }
        }
    }


    drawScene()
    requestAnimationFrame(mainCharacterMovement)
}



canvas.addEventListener('click', (event) => {
    const rectCanvas = canvas.getBoundingClientRect()
    const clickX = event.clientX - rectCanvas.left
    const clickY = event.clientY - rectCanvas.top

    if(isClickOnDoor(clickX, clickY)){
        const centerDoorX = door.positionX + door.width / 2
        mainCharacter.targetX = centerDoorX - mainCharacter.width / 2
        mainCharacter.targetY = 450 - mainCharacter.height
        mainCharacter.needsToReturn = true

    }else if(isClickOnBed(clickX, clickY)){
        mainCharacter.targetX = bed.targetX
        mainCharacter.targetY = 450 - mainCharacter.height
        mainCharacter.needsToReturn = true

    }else if(isClickOnClock(clickX, clickY)){
        const centerClockX = clock.positionX + clock.width / 2
        mainCharacter.targetX = centerClockX - mainCharacter.width / 2
        mainCharacter.targetY = 450 - mainCharacter.height
        mainCharacter.needsToReturn = true

    }else {
        mainCharacter.targetX = clickX
        mainCharacter.targetY = mainCharacter.originalY
    }
})



mainCharacterMovement()

// Antagonist movement
/* 
function antagonistMovement(){
    const destinyX = mainCharacter.positionX - enemy.positionX
    const distance = Math.abs(destinyX)
    if(distance <= 0){
        enemy.positionX = mainCharacter.positionX
    }
    else{
        if (destinyX > 0){
            enemy.positionX += enemy.speed
        }else{
            enemy.positionX -= enemy.speed
        }
    }
    drawScene()
    requestAnimationFrame(antagonistMovement)
}

antagonistMovement()
*/

