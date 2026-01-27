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

//Bottom bar y variables

const inventorySheet = new Image()
inventorySheet.src = "Assets/inventory.png"

INVENTORY_FRAME_HEIGHT = 30

const inventory = {
    startX: canvas.width - 270, 
    startY: canvas.height - objectsBar+10,
    spacing: 30,
    completeKey: false,
    removeText: false,
    items: [
        { name: "largeNeedle", sourceX: 6, sourceWidth: 10, hasItem: true },
        { name: "smallNeedle", sourceX: 20, sourceWidth: 10, hasItem: true },
        { name: "completeKey", sourceX: 34, sourceWidth: 16, hasItem: false },
        { name: "bottomBrokenKey", sourceX: 56, sourceWidth: 12, hasItem: false },
        { name: "topBrokenKey", sourceX: 73, sourceWidth: 16, hasItem: false },
        { name: "seeNoEvil", sourceX: 91, sourceWidth: 26, hasItem: true },
        { name: "hearNoEvil", sourceX: 124, sourceWidth: 26, hasItem: true },
        { name: "speakNoEvil", sourceX: 156, sourceWidth: 24, hasItem: true }
    ]
}

function drawInventory() {
    if (!inventorySheet.complete) {
        return;
    }

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
    })
}

function checkCompleteKey(){
    if (clockCloseUp.solution && monkeysCloseUp.solved){
        inventory.completeKey = true
        inventory.items.find(item => item.name === "completeKey").hasItem = true
        inventory.items.find(item => item.name === "bottomBrokenKey").hasItem = false
        inventory.items.find(item => item.name === "topBrokenKey").hasItem = false
    }
}



drawInGame.fillStyle = "black"
drawInGame.fillRect(0, canvas.height, canvas.width, objectsBar)

//text inside the black line
function drawBottomText(){
    drawInGame.fillStyle = "white"
    drawInGame.font = "16px Arial"

    let textToShow = ""
    if (clockCloseUp.bottomText) {
        textToShow = clockCloseUp.bottomText
    } else if (door.bottomText) {
        textToShow = door.bottomText
    }else if(monkeysCloseUp.bottomText)
        textToShow = monkeysCloseUp.bottomText

    drawInGame.fillText(textToShow, 20, canvas.height-20)
}

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
const petuniaHiddingSheet = new Image()
petuniaHiddingSheet.src = "Assets/Petunia/petunia-hidding-bed.png"
const PETUINA_HIDDING_FRAME_HEIGHT = 46

const petuniaBedHiddingFrames = [
    {sourceX: 0, sourceWidth: 14, sourceHeight: 45},
    {sourceX: 19, sourceWidth: 13, sourceHeight: 38},
    {sourceX: 36, sourceWidth: 15, sourceHeight: 31},
    {sourceX: 55, sourceWidth: 13, sourceHeight: 28},
    {sourceX: 72, sourceWidth: 14, sourceHeight: 25},
    {sourceX: 91, sourceWidth: 15, sourceHeight: 17},
    {sourceX: 109, sourceWidth: 18, sourceHeight: 14},
    {sourceX: 131, sourceWidth: 13, sourceHeight: 11},
    {sourceX: 149, sourceWidth: 7, sourceHeight: 8},
    {sourceX: 159, sourceWidth: 5, sourceHeight: 4}
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
    hiddenAnimation: false,
    isHidden: false,
    isOut: true,
    facingRight: true,
    currentAnim: 'idle',     
    frameIndex: 0,           
    frameTimer: 0,
    runTotalFrames: 7,
    hidingTotalFrames: 10
}

function drawMainCharacter() {

    if(mainCharacter.isHidden){
        return
    }

    if (!petuniaSheet.complete){
        return
    }

    let frameData
    if (mainCharacter.currentAnim === 'idle') {
        frameData = petuniaIdleFrame
    }
    if (mainCharacter.currentAnim === 'run') {
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
    if (!dehividSheet.complete){
        return
    }

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

// ASSETS
// Door 
const door = {
    positionX: 190,
    positionY: 325, 
    width: 90,
    height: 120,
    bottomText: ""
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
    bottomText: "",
    textShown: false,
    solution: false
}

const clockPuzzle = {
    stage: "Hora",
    selectedHour: null, 
    selectedMinutes: null,
    showHours: false, 
    showMinutes: false,
    hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    minutes: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
    boxWidth: 40,
    boxHeight: 20, 
    spacing: 10,
    startX: 20
}

function drawClockPuzzle() {

    if (!clockPuzzle.showHours && !clockPuzzle.showMinutes) {
        return;
    }

    if (clockPuzzle.showHours) {
        clockPuzzle.hours.forEach((hours, index) => {
            const posX = clockPuzzle.startX + index * (clockPuzzle.boxWidth + clockPuzzle.spacing)
            const posY = canvas.height - objectsBar + (objectsBar - clockPuzzle.boxHeight)/2

            drawInGame.fillStyle = "gray"
            drawInGame.fillRect(posX, posY, clockPuzzle.boxWidth, clockPuzzle.boxHeight)

            drawInGame.fillStyle = "white"
            drawInGame.font = "16px Arial"
            drawInGame.fillText(hours, posX + 12, posY + 13)
        })
    }

    if (clockPuzzle.showMinutes) {
        clockPuzzle.minutes.forEach((minutes, index) => {
            const posX = clockPuzzle.startX + index * (clockPuzzle.boxWidth + clockPuzzle.spacing)
            const posY = canvas.height - objectsBar + (objectsBar -clockPuzzle. boxHeight)/2

            drawInGame.fillStyle = "gray"
            drawInGame.fillRect(posX, posY, clockPuzzle.boxWidth, clockPuzzle.boxHeight)

            drawInGame.fillStyle = "white"
            drawInGame.font = "16px Arial"
            drawInGame.fillText(minutes, posX + 12, posY + 13)
        })
    }
}



function updateClockText() {
    if (clockCloseUp.minutes && !clockCloseUp.hour && !clockCloseUp.solution) {
        clockCloseUp.bottomText = "Le falta la aguja pequeña"
        inventory.items.find(item => item.name === "largeNeedle").hasItem = false
    }else if (clockCloseUp.hour && !clockCloseUp.minutes && !clockCloseUp.solution) {
        clockCloseUp.bottomText = "Le falta la aguja grande"
        inventory.items.find(item => item.name === "smallNeedle").hasItem = false 
    }else if (clockCloseUp.hour && clockCloseUp.minutes && !clockCloseUp.solution) {

        inventory.items.find(item => item.name === "largeNeedle").hasItem = false
        inventory.items.find(item => item.name === "smallNeedle").hasItem = false

        if (!clockCloseUp.textShown) {
            clockCloseUp.textShown = true
            clockCloseUp.bottomText = "Parece que hay algo dentro..."

            setTimeout(() => {
                clockCloseUp.bottomText = " "
                clockPuzzle.showHours = true
                clockPuzzle.showMinutes = false  
            }, 500)

        }
        
    }else if (clockCloseUp.hour && clockCloseUp.minutes && clockCloseUp.solution && !inventory.completeKey) {
        clockCloseUp.bottomText = "Un fragmento de llave"
        inventory.items.find(item => item.name === "bottomBrokenKey").hasItem = true
    }else if(inventory.completeKey && !inventory.removeText){
        clockCloseUp.bottomText = "Un fragmento de llave, encaja con el otro"
        setTimeout(()=>{
            inventory.removeText = true
        }, 500)
    }else if(inventory.completeKey && inventory.removeText){
        clockCloseUp.bottomText = "el compartimento secreto esta vacio"
    }else{
        clockCloseUp.bottomText = "Le faltan las agujas"
    }
}


function drawClockPopup() {
    if(!clockCloseUp.showClockCloseUp){
        return
    }

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
}

//Monkey's assets
const monkeysSheet = new Image()
monkeysSheet.src = "Assets/tres_monos.png"

const MONKEYS_FRAME_HEIGHT = 45

const monkeysPopupItems = {
    startX: 50,
    startY: 50,
    spacing: 70,
    items: [
        {name: "seeNoEvil",   sourceX: 0,   sourceWidth: 34, placed: false},
        {name: "hearNoEvil",  sourceX: 49,  sourceWidth: 37, placed: false},
        {name: "speakNoEvil", sourceX: 97,  sourceWidth: 33, placed: false}
    ]
}

const monkeysCloseUp = {
    showMonkeysCloseUp: false,            
    positionX: 300,
    positionY: 220,
    width: 260,
    height: 200,
    bottomText: "",         
    textShown: false,       
    solved: false,          
    seeMonkey: false,
    hearMonkey: false, 
    speakMonkey: false  
}

monkeysCloseUp.seeMonkey = monkeysPopupItems.items.find(item => item.name === "seeNoEvil").placed = true
monkeysCloseUp.hearMonkey = monkeysPopupItems.items.find(item => item.name === "hearNoEvil").placed = true
monkeysCloseUp.speakMonkey = monkeysPopupItems.items.find(item => item.name === "speakNoEvil").placed = true

const monkeysPuzzle = {
    stage: "Orden",
    selectedSwap: null,
    showSwapButtons: false,
    swaps: ["Izquierda", "Derecha"],
    boxWidth: 60,
    boxHeight: 30,
    spacing: 40,
    startX: 20
}

const correctMonkeyOrder = [
"speakNoEvil",
"seeNoEvil",
"hearNoEvil"
]

function drawMonkeysPuzzle() {
    if(!monkeysPuzzle.showSwapButtons){
        return
    }
        
    const buttonWidth = 80
    const buttonHeight = 30
    const centerX = canvas.width / 2
    const centerY = canvas.height - objectsBar + (objectsBar - buttonHeight) / 1.5

    drawInGame.fillStyle = "#FBC02D"
    drawInGame.fillRect(centerX - buttonWidth - 10, centerY, buttonWidth, buttonHeight)
    drawInGame.fillStyle = "#000000"
    drawInGame.fillText("Izquierda", centerX - buttonWidth - 10 + 10, centerY + 20)

    drawInGame.fillStyle = "#1976D2"
    drawInGame.fillRect(centerX + 10, centerY, buttonWidth, buttonHeight)
    drawInGame.fillStyle = "#000000"
    drawInGame.fillText("Derecha", centerX + 10 + 10, centerY + 20)
}


function updateMonkeysText() {
    const see = monkeysCloseUp.seeMonkey
    const hear = monkeysCloseUp.hearMonkey
    const speak = monkeysCloseUp.speakMonkey

    if (!see || !hear || !speak) {
        monkeysCloseUp.bottomText = "No veas el mal | No escuches al mal | No hables del mal"
        monkeysPuzzle.showSwapButtons = false

        let missing = []
        if (!see) missing.push("No veas el mal")
        if (!hear) missing.push("No escuches al mal")
        if (!speak) missing.push("No hables del mal")

        monkeysCloseUp.bottomText = "Falta colocar: " + missing.join(" y ")
        monkeysPuzzle.showSwapButtons = false

        if (see) inventory.items.find(item => item.name === "seeNoEvil").hasItem = false
        if (hear) inventory.items.find(item => item.name === "hearNoEvil").hasItem = false
        if (speak) inventory.items.find(item => item.name === "speakNoEvil").hasItem = false
    } 
    else if (see && hear && speak && monkeysCloseUp.solved && !inventory.completeKey) {  
        monkeysCloseUp.bottomText = "¡Se ha abierto un cajón! hay un fragmento de llave"
        monkeysPuzzle.showSwapButtons = false
        inventory.items.find(item => item.name === "topBrokenKey").hasItem = true  
    } 
    else if (see && hear && speak && !inventory.completeKey) {
        inventory.items.find(item => item.name === "seeNoEvil").hasItem = false
        inventory.items.find(item => item.name === "hearNoEvil").hasItem = false
        inventory.items.find(item => item.name === "speakNoEvil").hasItem = false
        
        if (!monkeysCloseUp.textShown) {
            monkeysCloseUp.bottomText = "¿Botones? ¿Qué harán?"
            monkeysCloseUp.textShown = true

            setTimeout(() => {
                monkeysCloseUp.bottomText = " "
                monkeysPuzzle.showSwapButtons = true
            }, 750)
        }
    }else if(inventory.completeKey && !inventory.removeText){
        monkeysCloseUp.bottomText = "Un fragmento de llave, encaja con el otro"
        setTimeout(()=>{
            inventory.removeText = true
        }, 500)
    }else if(inventory.completeKey && inventory.removeText){

        monkeysCloseUp.bottomText = "El cajon esta vacio"
    }else {
        monkeysCloseUp.bottomText = "No veas el mal | No escuches al mal | No hables del mal"
        monkeysPuzzle.showSwapButtons = false
    }
}


function drawMonkeysPopup() {
    if (!monkeysCloseUp.showMonkeysCloseUp) {
        return
    }

    drawInGame.fillStyle = "rgba(0, 0, 0, 0.7)"
    drawInGame.fillRect(monkeysCloseUp.positionX, monkeysCloseUp.positionY, monkeysCloseUp.width, monkeysCloseUp.height)

    const topRowY = monkeysCloseUp.positionY + 20 
    const leftMonkeyPositionX = monkeysCloseUp.positionX + 20
    const centerMonkeyPositionX = monkeysCloseUp.positionX + monkeysCloseUp.width / 2 - MONKEYS_FRAME_HEIGHT / 2
    const rightMonkeyPositionX = monkeysCloseUp.positionX + monkeysCloseUp.width - 65
    const monkeySize = 45
    
    if (monkeysCloseUp.seeMonkey) {
        drawInGame.drawImage(
            monkeysSheet,
            monkeysPopupItems.items[0].sourceX,
            0,
            monkeysPopupItems.items[0].sourceWidth,
            MONKEYS_FRAME_HEIGHT,
            leftMonkeyPositionX,
            topRowY,
            monkeySize,
            monkeySize
        )
    }

    if (monkeysCloseUp.hearMonkey) {
        drawInGame.drawImage(
            monkeysSheet,
            monkeysPopupItems.items[1].sourceX,
            0,
            monkeysPopupItems.items[1].sourceWidth,
            MONKEYS_FRAME_HEIGHT,
            centerMonkeyPositionX,
            topRowY,
            monkeySize,
            monkeySize
        )
    }

    if (monkeysCloseUp.speakMonkey) {
        drawInGame.drawImage(
            monkeysSheet,
            monkeysPopupItems.items[2].sourceX,
            0,
            monkeysPopupItems.items[2].sourceWidth,
            MONKEYS_FRAME_HEIGHT,
            rightMonkeyPositionX,
            topRowY,
            monkeySize,
            monkeySize
        )
    }

    const bottomRowY = topRowY + 160
    const circleRadius = 10

    const leftCircleX = leftMonkeyPositionX + monkeySize / 2
    const centerCircleX = centerMonkeyPositionX + monkeySize / 2
    const rightCircleX = rightMonkeyPositionX + monkeySize / 2

    const circleColors = ["blue", "pink", "red"]

    drawInGame.fillStyle = circleColors[0]
    drawInGame.beginPath()
    drawInGame.arc(leftCircleX, bottomRowY, circleRadius, 0, Math.PI * 2)
    drawInGame.fill()

    drawInGame.fillStyle = circleColors[1]
    drawInGame.beginPath()
    drawInGame.arc(centerCircleX, bottomRowY, circleRadius, 0, Math.PI * 2)
    drawInGame.fill()

    drawInGame.fillStyle = circleColors[2]
    drawInGame.beginPath()
    drawInGame.arc(rightCircleX, bottomRowY, circleRadius, 0, Math.PI * 2)
    drawInGame.fill()
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
    drawBedAnimation()
    drawAntagonist()
    drawBottomText()
    drawClockPopup()
    drawClockPuzzle()
    drawMonkeysPopup()  
    drawMonkeysPuzzle()
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

//phandlepop up clock

function handleClockPopupClick(clickX, clickY) {
    if (!clockCloseUp.showClockCloseUp) {        
        return false
    }        
    
    if (clickX >= 0 && clickX <= canvas.width &&
        clickY >= 0 && clickY <= canvas.height - objectsBar) {
        clockCloseUp.showClockCloseUp = false
        clockPuzzle.showHours = false
        clockPuzzle.showMinutes = false
        clockCloseUp.textShown = false
        return true
    }
    return false
}

function handleMonkeysPopupClick(clickX, clickY) {
    if (!monkeysCloseUp.showMonkeysCloseUp) {        
        return false
    }        
    
    if (clickX >= 0 && clickX <= canvas.width &&
        clickY >= 0 && clickY <= canvas.height - objectsBar) {
        monkeysCloseUp.showMonkeysCloseUp = false
        monkeysPuzzle.showSwapButtons = false 
        monkeysCloseUp.textShown = false  
        return true
    }
    return false
}

//handle clock puzzle

function handleClockPuzzleClick(clickX, clickY) {
    const posY = canvas.height - objectsBar + (objectsBar - clockPuzzle.boxHeight) / 2

    if (clockPuzzle.showHours) {
        clockPuzzle.hours.forEach((hour, index) => {
            const posX = clockPuzzle.startX + index * (clockPuzzle.boxWidth + clockPuzzle.spacing)
            if (
                clickX >= posX &&
                clickX <= posX + clockPuzzle.boxWidth &&
                clickY >= posY &&
                clickY <= posY + clockPuzzle.boxHeight
            ) {
                clockPuzzle.selectedHour = hour
                clockPuzzle.showHours = false
                clockPuzzle.showMinutes = true
                return
            }
        })
        return
    }

    if (clockPuzzle.showMinutes) {
        clockPuzzle.minutes.forEach((minute, index) => {
            const posX = clockPuzzle.startX + index * (clockPuzzle.boxWidth + clockPuzzle.spacing)
            if (
                clickX >= posX &&
                clickX <= posX + clockPuzzle.boxWidth &&
                clickY >= posY &&
                clickY <= posY + clockPuzzle.boxHeight
            ) {
                clockPuzzle.selectedMinutes = minute

                if (clockPuzzle.selectedHour === 1 && clockPuzzle.selectedMinutes === 35) {
                    clockPuzzle.showMinutes = false
                    clockCloseUp.solution = true
                    checkCompleteKey()
                } else {
                    clockPuzzle.showMinutes = false
                    clockCloseUp.bottomText = "No ha pasado nada"


                    setTimeout(() => {
                        clockCloseUp.showClockCloseUp = false
                        clockCloseUp.textShown = false
                        clockCloseUp.bottomText = " "
                        clockPuzzle.selectedHour = null
                        clockPuzzle.selectedMinutes = null
                        clockPuzzle.showHours = false
                        clockPuzzle.showMinutes = false
                    }, 1000)
                }
                return
            }
        })
    }
}

//monkey puzzle handler

function handleMonkeysPuzzleClick(clickX, clickY) {
    const buttonHeight = 30
    const centerX = canvas.width / 2
    const centerY = canvas.height - objectsBar + (objectsBar - buttonHeight) / 1.5

    if (monkeysPuzzle.showSwapButtons) {
        monkeysPuzzle.swaps.forEach((swap, index) => {
            const buttonWidth = 80
            const posX = centerX + (index === 0 ? -buttonWidth - 10 : 10) 

            if (clickX >= posX && clickX <= posX + buttonWidth &&
                clickY >= centerY && clickY <= centerY + buttonHeight) {
                monkeysPuzzle.selectedSwap = swap

                // swap
                if (swap === "Izquierda") {
                    const temp = monkeysPopupItems.items[0]
                    monkeysPopupItems.items[0] = monkeysPopupItems.items[1]
                    monkeysPopupItems.items[1] = temp
                } else if (swap === "Derecha") {
                    const temp = monkeysPopupItems.items[1]
                    monkeysPopupItems.items[1] = monkeysPopupItems.items[2]
                    monkeysPopupItems.items[2] = temp
                }

                if (monkeysPopupItems.items.map(item => item.name).join(',') === correctMonkeyOrder.join(',')) {
                    monkeysPuzzle.showSwapButtons = false
                    monkeysCloseUp.solved = true
                    checkCompleteKey()
                }

                return
            }
        })
    }
}

//Hidden under the bed animation

function drawBedAnimation() {
    if (!mainCharacter.hiddenAnimation) {
        return
    }

    if (!petuniaHiddingSheet.complete) return

    const frame = petuniaBedHiddingFrames[mainCharacter.hideFrameIndex]

    const hiddenX = mainCharacter.positionX
    const floor = mainCharacter.positionY + mainCharacter.height
    const hiddenY = floor - frame.sourceHeight

    drawInGame.drawImage(
        petuniaHiddingSheet,
        frame.sourceX, 0, frame.sourceWidth, frame.sourceHeight,
        hiddenX, hiddenY,
        frame.sourceWidth, frame.sourceHeight   
    )

    mainCharacter.hideFrameTimer++

    if (mainCharacter.hideFrameTimer >= 7) {
        mainCharacter.hideFrameTimer = 0

        if (!mainCharacter.isOut) {
            mainCharacter.hideFrameIndex++

            if (mainCharacter.hideFrameIndex >= petuniaBedHiddingFrames.length) {
                mainCharacter.hiddenAnimation = false
                mainCharacter.isHidden = true
                mainCharacter.isOut = false
                mainCharacter.hideFrameIndex = petuniaBedHiddingFrames.length - 1
            }
        }
        else {
            mainCharacter.hideFrameIndex--

            if (mainCharacter.hideFrameIndex <= 0) {
                mainCharacter.hiddenAnimation = false
                mainCharacter.isHidden = false
                mainCharacter.isOut = true
                mainCharacter.hideFrameIndex = 0
            }
        }
    }
}


// Petunia´s movement
function mainCharacterMovement() {

    if (mainCharacter.hiddenAnimation) {
        drawScene()
        requestAnimationFrame(mainCharacterMovement)
        return
    }

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
    if (arrivedAtClock && clockCloseUp.bottomText === "") {
        setTimeout(() => {
            clockCloseUp.showClockCloseUp = true
            updateClockText()

        }, 500) 
        
    }
    
    
    let arrivedAtDoor = (
        mainCharacter.positionX === (door.positionX + door.width / 2 - mainCharacter.width / 2) &&
        mainCharacter.positionY === 450 - mainCharacter.height
    ) 

    if (arrivedAtDoor /*&& door.bottomText === ""*/ && monkeysCloseUp.bottomText === "") {
        setTimeout(() => {
        // door.bottomText = "Cerrada"

            monkeysCloseUp.showMonkeysCloseUp = true
                updateMonkeysText()
        }, 500) 
    }

    let arrivedAtBed = (
        mainCharacter.positionX === bed.targetX &&
        mainCharacter.positionY === 455 - mainCharacter.height
    )

    if (arrivedAtBed && !mainCharacter.isHidden && !mainCharacter.hiddenAnimation) {
        mainCharacter.isHidden = true
        mainCharacter.hiddenAnimation = true
        mainCharacter.isOut = false
        mainCharacter.hideFrameIndex = 0
        mainCharacter.hideFrameTimer = 0
        mainCharacter.currentAnim = 'idle'
    }




    //animacion
    let isMoving = (mainCharacter.positionX !== mainCharacter.targetX || 
                    mainCharacter.positionY !== mainCharacter.targetY || 
                    mainCharacter.needsToReturn)

    if (isMoving) {
        mainCharacter.currentAnim = 'run'
        mainCharacter.frameTimer++
        if (mainCharacter.frameTimer >= mainCharacter.runTotalFrames) {  //speed
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
    door.bottomText = ""
    clockCloseUp.bottomText = ""
    monkeysCloseUp.bottomText = ""
    const rectCanvas = canvas.getBoundingClientRect()
    const clickX = event.clientX - rectCanvas.left
    const clickY = event.clientY - rectCanvas.top
    
    handleMonkeysPuzzleClick(clickX, clickY)
    handleClockPuzzleClick(clickX, clickY)

    if (clickY <= canvas.height - objectsBar){
    
        handleClockPopupClick(clickX, clickY)  
        handleMonkeysPopupClick(clickX, clickY)

        if (mainCharacter.isHidden && !isClickOnBed(clickX, clickY)) {
            mainCharacter.hiddenAnimation = true
            mainCharacter.isOut = true             
            mainCharacter.hideFrameIndex = petuniaBedHiddingFrames.length - 1
            mainCharacter.hideFrameTimer = 0
        }


        if(isClickOnDoor(clickX, clickY)){
            const centerDoorX = door.positionX + door.width / 2
            mainCharacter.targetX = centerDoorX - mainCharacter.width / 2
            mainCharacter.targetY = 450 - mainCharacter.height
            mainCharacter.needsToReturn = true

        }else if(isClickOnBed(clickX, clickY)){
            mainCharacter.targetX = bed.targetX
            mainCharacter.targetY = 455 - mainCharacter.height
            mainCharacter.needsToReturn = true
            if(mainCharacter.isHidden){
                return
            }
            

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
        if (enemy.frameTimer >= enemy.runTotalFrames) {  //speed
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