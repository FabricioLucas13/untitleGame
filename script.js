const canvas = document.getElementById('game-screen')
const drawInGame = canvas.getContext('2d') 

//test bedroom

const mainBedroom = new Image()
mainBedroom.src = "Assets/main_bedroom.jpg"

mainBedroom.onload = () => {
    drawInGame.drawImage(mainBedroom, 0, 0, canvas.width, canvas.height)
}

//Main character: Petuenia
const mainCharacter = {
    positionX: 40,
    positionY: 425,
    width: 80,
    height: 100,
    color: '#00FF00',
    targetX: 40,
    targetY: 425,
    speed: 0.012
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

drawMainCharacter()

function mainCharacterMovement(){
    const destinyX = mainCharacter.targetX - mainCharacter.positionX
    const destinyY = mainCharacter.targetY - mainCharacter.positionY
    if (Math.abs(destinyX) > 1 || Math.abs(destinyY) > 1) {
        mainCharacter.positionX += destinyX * mainCharacter.speed
        mainCharacter.positionY += destinyY * mainCharacter.speed
    } else {
        mainCharacter.positionX = mainCharacter.targetX
        mainCharacter.positionY = mainCharacter.targetY
    }

    drawInGame.clearRect(0, 0, canvas.width, canvas.height)
    drawInGame.drawImage(mainBedroom, 0, 0, canvas.width, canvas.height)  // Fondo aquí
    drawMainCharacter()

    requestAnimationFrame(mainCharacterMovement)
}

canvas.addEventListener('click', (event) => {
    const rectCanvas = canvas.getBoundingClientRect()
    mainCharacter.targetX = event.clientX - rectCanvas.left
    mainCharacter.targetY = event.clientY - rectCanvas.top
})

mainCharacterMovement()

//Antagonist Dehivid 
const enemy = {
    positionX: 750,
    positionY: 425,
    width: 80,
    height: 100,
    color: '#FF0000',
    speed: 0.009
}

function drawAntagonist(){
    drawInGame.fillStyle = enemy.color
    drawInGame.fillRect(enemy.positionX, enemy.positionY, enemy.width, enemy.height)
}

drawAntagonist()

function antagonistMovement(){
    const destinyX = mainCharacter.positionX - enemy.positionX
    const destinyY = mainCharacter.positionY - enemy.positionY
    if (Math.abs(destinyX) > 1 || Math.abs(destinyY) > 1) {
        enemy.positionX += destinyX * enemy.speed
        enemy.positionY += destinyY * enemy.speed
    }

    drawInGame.clearRect(0, 0, canvas.width, canvas.height)
    drawInGame.drawImage(mainBedroom, 0, 0, canvas.width, canvas.height)
    drawMainCharacter()
    drawAntagonist()

    requestAnimationFrame(antagonistMovement)
}

antagonistMovement()
