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
//hasta aqui borrar luego
const objectsBar = 55

//Bottomb bar y variables

let bottomText = ""


function drawBottomText(){
    drawInGame.fillStyle = "white"
    drawInGame.font = "16px Arial"
    drawInGame.fillText(bottomText, 20, canvas.height-20)
}

const inventorySheet = new Image()
inventorySheet.src = "Assets/inventory.png"

INVENTORY_FRAME_HEIGHT = 30

const inventory = {
    startX: canvas.width - 270, 
    startY: canvas.height - objectsBar+10,
    spacing: 30,
    items: [
        { name: "largeNeedle", sourceX: 6, sourceWidth: 10, hasItem: true },
        { name: "smallNeedle", sourceX: 20, sourceWidth: 10, hasItem: false },
        { name: "key", sourceX: 34, sourceWidth: 16, hasItem: false },
        { name: "bottomBrokenKey", sourceX: 56, sourceWidth: 12, hasItem: false },
        { name: "topBrokenKey", sourceX: 73, sourceWidth: 16, hasItem: false },
        { name: "seeNoEvil", sourceX: 91, sourceWidth: 26, hasItem: false },
        { name: "hearNoEvil", sourceX: 124, sourceWidth: 26, hasItem: false },
        { name: "speakNoEvil", sourceX: 156, sourceWidth: 24, hasItem: false }
    ]
}

function drawInventory() {
    if (inventorySheet.complete){

        inventory.items.forEach((item, index) => {
            if (item.hasItem){
                drawInGame.drawImage(
                    inventorySheet,
                    item.sourceX, 0, item.sourceWidth, INVENTORY_FRAME_HEIGHT,
                    inventory.startX + index * inventory.spacing,
                    inventory.startY,
                    item.sourceWidth,
                    INVENTORY_FRAME_HEIGHT
                )
            }
            return
        })
        
    }
}


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

const petuniaSheet = new Image()
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
    runTotalFrames: 7,
    inputBlock: false
}

function drawMainCharacter() {
        if (petuniaSheet.complete){

        let frameData
        if (mainCharacter.currentAnim === 'idle') {
            frameData = petuniaIdleFrame
        } else { // 'run'
            frameData = petuniaRunFrames[mainCharacter.frameIndex]
        }

        const sourceX = frameData.sourceX
        const sourceWidth = frameData.sourceWidth
        const sourceY = 0

        drawInGame.save()
        drawInGame.translate(mainCharacter.positionX + mainCharacter.width / 2, mainCharacter.positionY)

        if (!mainCharacter.facingRight) {
            drawInGame.scale(-1, 1)
        }

        drawInGame.drawImage(
            petuniaSheet,
            sourceX, sourceY, sourceWidth, PETUNIA_FRAME_HEIGHT,
            -mainCharacter.width / 2, 0,
            mainCharacter.width, mainCharacter.height
        )

        drawInGame.restore()
    }
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
    facingLeft: true,
    currentAnim: 'idle',     
    frameIndex: 0,           
    frameTimer: 0,
    runTotalFrames: 7
}

function drawAntagonist(){
    if (dehividSheet.complete){

        let frameData
        if (enemy.currentAnim === 'idle') {
            frameData = dehividIdleFrame
        } else { // 'run'
            frameData = dehividRunFrames[enemy.frameIndex]
        }

        const sourceX = frameData.sourceX
        const sourceWidth = frameData.sourceWidth
        const sourceY = 0

        drawInGame.save()
        drawInGame.translate(enemy.positionX + enemy.width / 2, enemy.positionY)

        if (!enemy.facingLeft) {
            drawInGame.scale(-1, 1)
        }

        drawInGame.drawImage(
            dehividSheet,
            sourceX, sourceY, sourceWidth, DEHIVID_FRAME_HEIGHT,
            -mainCharacter.width / 2, 0,
            enemy.width, enemy.height
        )

        drawInGame.restore()
    }
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

const clockCloseLook ={
    empty: new Image(),
    minutes: new Image(),
    hour: new Image(),
    both: new Image(),
    solution: new Image()
}

clockCloseLook.empty.src = "Assets/clock-puzzle/close-clock.jpg"          
clockCloseLook.minutes.src = "Assets/clock-puzzle/close-minutes.jpg"      
clockCloseLook.hour.src = "Assets/clock-puzzle/close-hour.jpg"            
clockCloseLook.both.src = "Assets/clock-puzzle/close-clock-niddle.jpg"
clockCloseLook.solution.src = "Assets/clock-puzzle/close-clock-solution.jpg"    


function drawClock(){
    const clockSprite = new Image()
    clockSprite.src = "Assets/clock-puzzle/clock.png"
    drawInGame.drawImage(
        clockSprite,
        clock.positionX,
        clock.positionY,
        clock.width,
        clock.height
    )
}

const clockCloseUp={
    showClockCloseUp: false, 
    positionX: 350,
    positionY: 230,
    width: 190,
    height:190, 
    minutes: true,
    hour: true,
    puzzleShown: false,
    bottomText: "",
    textShown: false,
    solution: false
}

const clockPuzzle = {
    stage: "Hora",
    selectedHour: null, 
    selectedmiutes: null,
    showHours: false, 
    showMinutes: false
}

function drawClockPuzzle() {
    const boxWidth = 40
    const boxHeight = 20
    const spacing = 10
    const startX = 20
    const hours = [1,2,3,4,5,6,7,8,9,10,11,12]

    if (clockPuzzle.showHours) {
        hours.forEach((hora, index) => {
            const posX = startX + index * (boxWidth + spacing)
            const posY = canvas.height - objectsBar + (objectsBar - boxHeight)/2

            drawInGame.fillStyle = "gray"
            drawInGame.fillRect(posX, posY, boxWidth, boxHeight)

            drawInGame.fillStyle = "white"
            drawInGame.font = "16px Arial"
            drawInGame.fillText(hora, posX + 12, posY + 13)
        })
    }

    // Dibujar cajas de minutos si toca
    if (clockPuzzle.showMinutes) {
        // Por ahora puedes usar el mismo bloque, luego ajustamos posición/valores de minutos
    }
}



function updateClockText() {
    if (clockCloseUp.minutes && !clockCloseUp.hour && !clockCloseUp.solution) {
        bottomText = "Le falta la aguja pequeña"
        inventory.items.find(item => item.name === "largeNeedle").hasItem = false
    }else if (clockCloseUp.hour && !clockCloseUp.minutes && !clockCloseUp.solution) {
        bottomText = "Le falta la aguja grande"
        inventory.items.find(item => item.name === "smallNeedle").hasItem = false 
    }else if (clockCloseUp.hour && clockCloseUp.minutes && !clockCloseUp.solution) {

        inventory.items.find(item => item.name === "largeNeedle").hasItem = false
        inventory.items.find(item => item.name === "smallNeedle").hasItem = false

        if (!clockCloseUp.textShown) {
            clockCloseUp.textShown = true
            bottomText = "Parece que hay algo dentro..."

            setTimeout(() => {
                bottomText = ""
            }, 500)
        }

        if (clockCloseUp.puzzleShown && clockCloseUp.textShown) {
            clockCloseUp.textShown = false
            clockCloseUp.puzzleShown = true
            clockPuzzle.showHours = true
            drawClockPuzzle()
        }
    }else if (clockCloseUp.solution) {
        bottomText = "Un fragmento de llave"
        clockCloseUp.minutes = false
        clockCloseUp.hour = false 
    } else {
        bottomText = "Le faltan las agujas"
    }
}


function drawClockPopup() {
    if(clockCloseUp.showClockCloseUp){

        drawInGame.fillStyle = "rgba(0,0,0,0.7)"
        drawInGame.fillRect(clockCloseUp.positionX, clockCloseUp.positionY, clockCloseUp.width, clockCloseUp.height)

            const clockSize = 160
            const clockCloseX = clockCloseUp.positionX + (clockCloseUp.width-clockSize)/2
            const clockCloseY = clockCloseUp.positionY + (clockCloseUp.height-clockSize)/2

        if(clockCloseUp.minutes && !clockCloseUp.hour){
            drawInGame.drawImage(
                clockCloseLook.minutes,
                clockCloseX,
                clockCloseY, 
                clockSize,
                clockSize
            )
        }else if(clockCloseUp.hour && !clockCloseUp.minutes){
            drawInGame.drawImage(
                clockCloseLook.hour,
                clockCloseX,
                clockCloseY, 
                clockSize,
                clockSize
            )
        }else if(clockCloseUp.solution){
            drawInGame.drawImage(
                clockCloseLook.solution,
                clockCloseX,
                clockCloseY, 
                clockSize,
                clockSize
            )
        }else if(clockCloseUp.hour && clockCloseUp.minutes){
            drawInGame.drawImage(
                clockCloseLook.both,
                clockCloseX,
                clockCloseY, 
                clockSize,
                clockSize
            )
        }else{
            drawInGame.drawImage(
                clockCloseLook.empty,
                clockCloseX,
                clockCloseY, 
                clockSize,
                clockSize
            )
        }
        
        return
    }
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
    drawClockPopup()
    drawClockPuzzle()
    drawInventory()

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

function handleClockPopupClick(clickX, clickY) {

    if (clockCloseUp.showClockCloseUp){ 
        mainCharacter.inputBlock = true
        if (clickX < clockCloseUp.positionX || clickX > clockCloseUp.positionX + clockCloseUp.width ||
            clickY < clockCloseUp.positionY || clickY > clockCloseUp.positionY + clockCloseUp.height) {
            clockCloseUp.showClockCloseUp = false
            clockPuzzle.showHours = false
            return true
        }
    }

    return false
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
            bottomText = "Le faltan las manejillas..."
            clockCloseUp.showClockCloseUp = true
            updateClockText()

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
                    mainCharacter.needsToReturn)

    if (isMoving) {
        mainCharacter.currentAnim = 'run'
        mainCharacter.frameTimer++
        if (mainCharacter.frameTimer >= mainCharacter.runTotalFrames) {  //velocidad
            mainCharacter.frameTimer = 0
            mainCharacter.frameIndex = (mainCharacter.frameIndex + 1) % mainCharacter.runTotalFrames
        }

        
        if (mainCharacter.positionX < mainCharacter.targetX) {
            mainCharacter.facingRight = true
        } else if (mainCharacter.positionX > mainCharacter.targetX) {
            mainCharacter.facingRight = false
        }
    } else {
        mainCharacter.currentAnim = 'idle'
        mainCharacter.frameIndex = 0
        mainCharacter.frameTimer = 0
    }


    drawScene()
    requestAnimationFrame(mainCharacterMovement)
}



canvas.addEventListener('click', (event) => {
    bottomText = ""
    const rectCanvas = canvas.getBoundingClientRect()
    const clickX = event.clientX - rectCanvas.left
    const clickY = event.clientY - rectCanvas.top
    if (clickY <= canvas.height - objectsBar){
    
        handleClockPopupClick(clickX, clickY)

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
    }
})



mainCharacterMovement()

// Antagonist movement
 
/*function antagonistMovement(){
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
        enemy.currentAnim = 'run'
        enemy.frameTimer++
        if (enemy.frameTimer >= enemy.runTotalFrames) {  //velocidad
            enemy.frameTimer = 0
            enemy.frameIndex = (enemy.frameIndex + 1) % enemy.runTotalFrames
        }

        
        if (enemy.positionX > mainCharacter.positionX) {
            enemy.facingLeft = true
        } else if (enemy.positionX < mainCharacter.positionX) {
            enemy.facingLeft = false
        }
    } else {
        enemy.currentAnim = 'idle'
        enemy.frameIndex = 0
        enemy.frameTimer = 0
    }

    drawScene()
    requestAnimationFrame(antagonistMovement)
}

antagonistMovement()*/


