const canvas = document.getElementById('game-screen')
const drawInGame = canvas.getContext('2d') 

//test bedroom

const mainBedroom = new Image()
mainBedroom.src = "Assets/main_bedroom.jpg"

mainBedroom.onload = () => {
    drawInGame.drawImage(mainBedroom, 0, 0, canvas.width, canvas.height)
}

//Main character: Petunia
const mainCharacter = {
    positionX: 110,
    positionY: 425,
    width: 60,
    height: 100,
    color: '#00FF00',
    targetX: 110,
    speed: 5
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


//Antagonist Dehivid 
const enemy = {
    positionX: 750,
    positionY: 425,
    width: 80,
    height: 100,
    color: '#FF0000',
    speed: 3
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
//ASSETS
//Door 

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

//Bed

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

//Clock

const clock = {
    positionX: 625,
    positionY: 325, 
    width: 60,
    height: 120,
    color: '#0000F8'
}

function drawClock(){
    drawInGame.fillStyle = bed.color
    drawInGame.fillRect(
        clock.positionX,
        clock.positionY,
        clock.width,
        clock.height
    )
}

//Putting the scene together

function drawScene(){
    drawInGame.clearRect(0, 0, canvas.width, canvas.height)
    drawInGame.drawImage(mainBedroom, 0, 0, canvas.width, canvas.height)
    drawDoor()
    drawBed()
    drawClock()
    drawMainCharacter()
    drawAntagonist()
}

//Definition Petnuia´s movement

function mainCharacterMovement(){
    const destinyX = mainCharacter.targetX - mainCharacter.positionX
    const distance = Math.abs(destinyX)
    if (distance <= mainCharacter.speed) {
        mainCharacter.positionX = mainCharacter.targetX
    } else {
        if(destinyX > 0){
            mainCharacter.positionX += mainCharacter.speed
        }else{
            mainCharacter.positionX -= mainCharacter.speed
        }
    }

    drawScene()

    requestAnimationFrame(mainCharacterMovement)
}

canvas.addEventListener('click', (event) => {
    const rectCanvas = canvas.getBoundingClientRect()
    mainCharacter.targetX = event.clientX - rectCanvas.left
})

mainCharacterMovement()

//Defination of Dehivid's movement

function antagonistMovement(){
    const destinyX = mainCharacter.positionX - enemy.positionX
    const distance = Math.abs(destinyX)
    if(distance <= 0){
        enemy.positionX = mainCharacter.positionX
    }
    else{
        if (destinyX > 0){
            enemy.positionX +=  enemy.speed
        }else{
            enemy.positionX -=  enemy.speed
        }
}

    drawScene()

    requestAnimationFrame(antagonistMovement)
}

antagonistMovement()


