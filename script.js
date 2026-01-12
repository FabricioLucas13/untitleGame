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

const objectsBar = 50

drawInGame.fillStyle = "black"
drawInGame.fillRect(0, canvas.height, canvas.width, objectsBar)

// Test bedroom
const mainBedroom = new Image()
mainBedroom.src = "Assets/main_bedroom.jpg"

mainBedroom.onload = () => {
    drawInGame.drawImage(mainBedroom, 0, 0, canvas.width, canvas.height-objectsBar)
}


// Main character: Petunia

//Sprite and coordenates for the sprites

const petuniaSheet = new Image();
petuniaSheet.src = "Assets/Petunia/petunia-move.png" 
const PETUNIA_FRAME_HEIGHT = 58  

const petuniaIdleFrame = {sourceX: 0, sourceWidth: 15}

const petuniaRunFrames = [
    { sourceX: 127, sourceWidth: 29 },  
    { sourceX: 158, sourceWidth: 20 },   
    { sourceX: 181, sourceWidth: 30 },   
    { sourceX: 215, sourceWidth: 24 },   
    { sourceX: 244, sourceWidth: 20 },   
    { sourceX: 267, sourceWidth: 29 },  
    { sourceX: 300, sourceWidth: 26 }   
]
const mainCharacter = {
    originalY: 425,
    positionX: 110,
    positionY: 425,
    width: 15,
    height: 100,
    targetX: 110,
    targetY: 425, 
    targetWidth: 60,
    targetHeight: 100,
    speed: 3, 
    needsToReturn: false,
    facingRight: true,
    currentAnim: 'idle',     
    frameIndex: 0,           
    frameTimer: 0,
    runTotalFrames: 7
}

function drawMainCharacter() {
    if (!petuniaSheet.complete) return;

    let frameData;
    if (mainCharacter.currentAnim === 'idle') {
        frameData = petuniaIdleFrame;
    } else { // 'run'
        frameData = petuniaRunFrames[mainCharacter.frameIndex];
    }

    const sourceX = frameData.sourceX;
    const sourceWidth = frameData.sourceWidth;
    const sourceY = 0;

    drawInGame.save();
    drawInGame.translate(mainCharacter.positionX + mainCharacter.width / 2, mainCharacter.positionY);

    if (!mainCharacter.facingRight) {
        drawInGame.scale(-1, 1);
    }

    drawInGame.drawImage(
        petuniaSheet,
        sourceX, sourceY, sourceWidth, PETUNIA_FRAME_HEIGHT,
        -mainCharacter.width / 2, 0,
        mainCharacter.width, mainCharacter.height
    );

    drawInGame.restore();
}



// Antagonist Dehivid 
const dehividSheet = new Image()
dehividSheet.src = "Assets/Dehivid/dehivid-move.png"

DEHIVID_FRAME_HEIGHT = 150

const dehividIdleFrame = {sourceX: 0, sourceWidth: 109}

const dehividRunFrames = [
    { sourceX: 118, sourceWidth: 133},  
    { sourceX: 265, sourceWidth: 109},   
    { sourceX: 393, sourceWidth: 138},   
    { sourceX: 550, sourceWidth: 109},
    { sourceX: 681, sourceWidth: 124},  
    { sourceX: 822, sourceWidth: 109},  
    { sourceX: 948, sourceWidth: 130},  
    { sourceX: 1090, sourceWidth: 109}   
]


const enemy = {
    positionX: 750,
    positionY: 385,
    width: 109,
    height: 150,
    speed: 1,
    facingRight: true,
    currentAnim: 'idle',     
    frameIndex: 0,           
    frameTimer: 0,
    runTotalFrames: 7
}

function drawAntagonist(){
    if (!dehividSheet.complete) return;

    let frameData;
    if (enemy.currentAnim === 'idle') {
        frameData = dehividIdleFrame;
    } else { // 'run'
        frameData = dehividRunFrames[enemy.frameIndex];
    }

    const sourceX = frameData.sourceX;
    const sourceWidth = frameData.sourceWidth;
    const sourceY = 0;

    drawInGame.save();
    drawInGame.translate(enemy.positionX + enemy.width / 2, enemy.positionY);

    if (!enemy.facingRight) {
        drawInGame.scale(-1, 1);
    }

    drawInGame.drawImage(
        dehividSheet,
        sourceX, sourceY, sourceWidth, DEHIVID_FRAME_HEIGHT,
        -mainCharacter.width / 2, 0,
        enemy.width, enemy.height
    );

    drawInGame.restore();
}

// ASSETS
// Door 
const door = {
    positionX: 190,
    positionY: 325, 
    width: 90,
    height: 120,
}

function drawDoor(){
    const doorSprite = new Image()
    doorSprite.src = "Assets/door.png"
    drawInGame.drawImage(
        doorSprite,
        door.positionX,
        door.positionY,
        door.width,
        door.height
    )
}

// Bed
const bed = {
    positionX: 340,
    positionY: 355, 
    width: 220,
    height: 150,
    targetX: 320
}

function drawBed(){
    const bedSprite = new Image()
    bedSprite.src = "Assets/bed.png"
    drawInGame.drawImage(
        bedSprite,
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
    width: 55,
    height: 120,
}

function drawClock(){
    const clockSprite = new Image()
    clockSprite.src = "Assets/clock.png"
    drawInGame.drawImage(
        clockSprite,
        clock.positionX,
        clock.positionY,
        clock.width,
        clock.height
    )
}

//Bottomb bar

let bottomText = ""

function drawBottomText(){
    drawInGame.fillStyle = "white"
    drawInGame.font = "16px Arial"
    drawInGame.fillText(bottomText, 20, canvas.height-20)
}

// Putting the scene together
function drawScene(){
    drawInGame.clearRect(0, 0, canvas.width, canvas.height)
    drawInGame.drawImage(mainBedroom, 0, 0, canvas.width, canvas.height)
    drawInGame.fillStyle = "black"
    drawInGame.fillRect(0, canvas.height - objectsBar, canvas.width, objectsBar)
    drawDoor()
    drawBed()
    drawClock()
    drawMainCharacter()
    drawAntagonist()
    drawBottomText()

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
                mainCharacter.facingRight = true
            } else {
                mainCharacter.positionY -= mainCharacter.speed
                mainCharacter.facingRight = false

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
    let arrivedAtClock = false
    arrivedAtClock = (
    mainCharacter.positionX === (clock.positionX + clock.width / 2 - mainCharacter.width / 2) &&
    mainCharacter.positionY === 450 - mainCharacter.height
    )
    if (arrivedAtClock && bottomText === "") {
        setTimeout(() => {
            bottomText = "me pregunto que hora es: 00:00"
        }, 500) 
        
    }
    
    let arrivedAtDoor = false
    arrivedAtDoor = (
    mainCharacter.positionX === (door.positionX + door.width / 2 - mainCharacter.width / 2) &&
    mainCharacter.positionY === 450 - mainCharacter.height
    ) 
    if (arrivedAtDoor && bottomText === "") {
        setTimeout(() => {
            bottomText = "Cerrada"
        }, 500) 
    }
    //animacion
    let isMoving = (mainCharacter.positionX !== mainCharacter.targetX || 
                    mainCharacter.positionY !== mainCharacter.targetY || 
                    mainCharacter.needsToReturn);

    if (isMoving) {
        mainCharacter.currentAnim = 'run';
        mainCharacter.frameTimer++;
        if (mainCharacter.frameTimer >= mainCharacter.runTotalFrames) {  //velocidad
            mainCharacter.frameTimer = 0;
            mainCharacter.frameIndex = (mainCharacter.frameIndex + 1) % mainCharacter.runTotalFrames;
        }

        
        if (mainCharacter.positionX < mainCharacter.targetX) {
            mainCharacter.facingRight = true;
        } else if (mainCharacter.positionX > mainCharacter.targetX) {
            mainCharacter.facingRight = false;
        }
    } else {
        mainCharacter.currentAnim = 'idle';
        mainCharacter.frameIndex = 0;
        mainCharacter.frameTimer = 0;
    }


    drawScene()
    requestAnimationFrame(mainCharacterMovement)
}



canvas.addEventListener('click', (event) => {
    bottomText = ""
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
        mainCharacter.targetY = 455 - mainCharacter.height
        mainCharacter.needsToReturn = true

    }else if(isClickOnClock(clickX, clickY)){
        const centerClockX = clock.positionX + clock.width / 2
        mainCharacter.targetX = centerClockX - mainCharacter.width / 2
        mainCharacter.targetY = 450 - mainCharacter.height
        mainCharacter.needsToReturn = true

    }else {
        mainCharacter.targetX = clickX
        mainCharacter.targetY = mainCharacter.originalY

        if (mainCharacter.positionY !== mainCharacter.originalY) {
        mainCharacter.needsToReturn = true
    }
    }
})



mainCharacterMovement()

// Antagonist movement
 
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

    //animacion
    let isMoving = (enemy.positionX !== enemy.targetX || 
                    enemy.positionY !== enemy.targetY
    )

    if (isMoving) {
        enemy.currentAnim = 'run';
        enemy.frameTimer++;
        if (enemy.frameTimer >= enemy.runTotalFrames) {  //velocidad
            enemy.frameTimer = 0;
            enemy.frameIndex = (enemy.frameIndex + 1) % enemy.runTotalFrames
        }

        
        if (enemy.positionX > mainCharacter.targetX) {
            enemy.facingRight = true
        } else if (enemy.positionX < mainCharacter.targetX) {
            enemy.facingRight = false
        }
    } else {
        enemy.currentAnim = 'idle'
        enemy.frameIndex = 0
        enemy.frameTimer = 0
    }

    drawScene()
    requestAnimationFrame(antagonistMovement)
}

antagonistMovement()


