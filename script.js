const canvas = document.getElementById('game-screen')
const drawInGame = canvas.getContext('2d') 

// Test bedroom
const mainBedroom = new Image()
mainBedroom.src = "Assets/main_bedroom.jpg"

mainBedroom.onload = () => {
    drawInGame.drawImage(mainBedroom, 0, 0, canvas.width, canvas.height)
}

// Main character: Petunia
const mainCharacter = {
    positionX: 110,
    positionY: 425,
    width: 60,
    height: 100,
    color: '#00FF00',
    targetX: 110,
    targetY: 425, 
    targetWidth: 60,
    targetHeight: 100,
    speed: 3
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
    color: '#0000FA'
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
}

// Petnia´s movement
function mainCharacterMovement(){
    if(mainCharacter.targetY !== 425){
        const destinyX = mainCharacter.targetX - mainCharacter.positionX
        if(Math.abs(destinyX) > mainCharacter.speed){
            mainCharacter.positionX += mainCharacter.speed * Math.sign(destinyX)
        } else {
            mainCharacter.positionX = mainCharacter.targetX
        }

        if(mainCharacter.positionX === mainCharacter.targetX){
            const destinyY = mainCharacter.targetY - mainCharacter.positionY
            if(Math.abs(destinyY) > mainCharacter.speed){
                mainCharacter.positionY += mainCharacter.speed * Math.sign(destinyY)
            } else {
                mainCharacter.positionY = mainCharacter.targetY
            }

            const deltaWidth = mainCharacter.targetWidth - mainCharacter.width
            mainCharacter.width += Math.abs(deltaWidth) < 0.5 ? deltaWidth : 0.5 * Math.sign(deltaWidth)

            const deltaHeight = mainCharacter.targetHeight - mainCharacter.height
            mainCharacter.height += Math.abs(deltaHeight) < 0.5 ? deltaHeight : 0.5 * Math.sign(deltaHeight)
        }

    } else {
        const destinyX = mainCharacter.targetX - mainCharacter.positionX
        if(Math.abs(destinyX) > mainCharacter.speed){
            mainCharacter.positionX += mainCharacter.speed * Math.sign(destinyX)
        } else {
            mainCharacter.positionX = mainCharacter.targetX
        }
    }

    drawScene()
    requestAnimationFrame(mainCharacterMovement)
}

canvas.addEventListener('click', (event) => {
    const rectCanvas = canvas.getBoundingClientRect()
    const clickX = event.clientX - rectCanvas.left
    const clickY = event.clientY - rectCanvas.top

    if (
        clickX >= door.positionX &&
        clickX <= door.positionX + door.width &&
        clickY >= door.positionY &&
        clickY <= door.positionY + door.height
    ) {
        mainCharacter.targetX = door.positionX + (door.width / 2) - (mainCharacter.width / 2)
        mainCharacter.targetY = door.positionY + door.height - mainCharacter.height
        mainCharacter.targetWidth = 60 * 0.85
        mainCharacter.targetHeight = 100 * 0.85
    } else {
        mainCharacter.targetX = clickX
        mainCharacter.targetY = 425
        mainCharacter.targetWidth = 60
        mainCharacter.targetHeight = 100
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
