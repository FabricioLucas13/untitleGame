const canvas = document.getElementById('game-screen');
 
const protagonist = canvas.getContext('2d')

let mainCharacter = {
positionX: 40,
positionY: 425,
width: 80,
height: 100,
color: '#00FF00',
targetX: 420,
targetY: 425,
speed: 10
}

function drawMainCharacter(){
    protagonist.fillStyle = mainCharacter.color; 
    protagonist.fillRect(mainCharacter.positionX, mainCharacter.positionY, mainCharacter.width, mainCharacter.height);
}

drawMainCharacter()

function mainCharacterMovement(){
    const destinyX = mainCharacter.targetX - mainCharacter.positionX
    const destinyY = mainCharacter.targetY - mainCharacter.positionY
    if (Math.abs(destinyX) > 1 || Math.abs(destinyY) > 1) {
        mainCharacter.positionX += destinyX * 0.1
        mainCharacter.positionY += destinyY * 0.1
    } else {
        mainCharacter.positionX = mainCharacter.targetX
        mainCharacter.positionY = mainCharacter.targetY
    }

    protagonist.clearRect(0, 0, canvas.width, canvas.height);
    drawMainCharacter();

    requestAnimationFrame(mainCharacterMovement);

}

canvas.addEventListener('click', (event) => {
    const rectCanvas = canvas.getBoundingClientRect();
    mainCharacter.targetX = event.clientX - rectCanvas.left;
    mainCharacter.targetY = event.clientY - rectCanvas.top;
});

mainCharacterMovement();