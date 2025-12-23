const canvas = document.getElementById('game-screen');
 
const antagonist = canvas.getContext('2d')

let enemy = {
positionX: 750,
positionY: 425,
width: 80,
height: 100,
color: '#FF0000',
targetX: 100,
targetY: 425,
speed: 0.09
}


antagonist.fillStyle = enemy.color; 
antagonist.fillRect(
    enemy.positionX,
    enemy.positionY, 
    enemy.width, 
    enemy.height
);

