// 1. div.background 1200x1000
// 2. div.player1 50x50
// 3. move left / right (bonus: move up/down)  (bonus: move player1 with mouse)
// 4. fire 17x47
// 5. game loop
// 6. div.enemy
// 7. enemy objects / enemy movement
// 8. collision detection

let player1 = {
    left: 30,
    top: 400
};

let missiles = [];

let enemiesLocation = [
    { left: 1000, top: 0 },
    { left: 1000, top: 100 },
    { left: 1000, top: 200 },
    { left: 1000, top: 300 },
    { left: 1000, top: 400 },
    { left: 1000, top: 500 },
    { left: 1000, top: 600 },
   
    { left: 1100, top: 600 },
    { left: 1100, top: 500 }, 
    { left: 1100, top: 400 },
    { left: 1100, top: 300 },
    { left: 1100, top: 200 },
    { left: 1100, top: 100 },
    { left: 1100, top: 0 }
   
];

document.onkeydown = function(e) {
    //setting the limit to the movement.. to ensure the player is not out of frame
    if (e.code === 'KeyW' && player1.top >= 0) {
        // Left
        player1.top = player1.top - 20;
        console.log("Up");
    }
    

    //setting the limit to the movement.. to ensure the player is not out of frame
    if (e.code === 'KeyS' && player1.top <= 575) {
        // Left
        player1.top = player1.top + 20;
        console.log("Down");
    }
   
    if (e.code === 'Space') {
     
        //push the coordinates of the 1st projectile into missile array 
        missiles.push({   //missile suppose to start at where the hero is
            left: player1.left + 70,
            top: player1.top 
        });
        console.log(missiles)
        drawMissiles()
        moveMissiles();
    }
    movePlayer1();
}

function movePlayer1() {
    document.getElementById('player1').style.top = player1.top + 'px';
    document.getElementById('player1').style.top = player1.top - 'px';
}

function drawMissiles() {
    document.getElementById('missiles').innerHTML = ""
    // clear the array for new projectile
    for(let i = 0 ; i < missiles.length ; i++ ) {
        document.getElementById('missiles').innerHTML += `<div class='missile1' style='left:${missiles[i].left}px; top:${missiles[i].top}px'></div>`;
        //add a new div tag to return the very 1st projectile positioning  
    }

}

function moveMissiles() {
    for(let i = 0 ; i < missiles.length ; i++ ) {
        if(missiles[i].left < 1200){
        missiles[i].left = missiles[i].left + 8
        }
        else if(missiles[i].left >= 1200){
        missiles.splice(i, 1)
        }
    }
}



function drawEnemies() {

    document.getElementById('enemies').innerHTML = ""
    for(let i = 0 ; i < enemiesLocation.length ; i++ ) {
        
        document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemiesLocation[i].left}px; top:${enemiesLocation[i].top}px'></div>`;
        
    }
}



function moveEnemies() {
    for(let i = 0 ; i < enemiesLocation.length ; i++ ) {
        if(enemiesLocation[i].left > 0){
        enemiesLocation[i].left = enemiesLocation[i].left - 8;
        }
        else if (enemiesLocation[i].left <= 0){
        enemiesLocation.splice(i, 1)
    
        }
  
    }
}



function collisionDetection() {
    for (let enemy = 0; enemy < enemiesLocation.length; enemy ++) {
        for (let missile1 = 0; missile1 < missiles.length; missile1 ++) {
            if ( 
                missiles[missile1].left >= enemiesLocation[enemy].left  &&
                missiles[missile1].left <= (enemiesLocation[enemy].left + 99)  &&
                missiles[missile1].top <= (enemiesLocation[enemy].top + 99)  &&
                missiles[missile1].top >= enemiesLocation[enemy].top
            ) 
            {
                enemiesLocation.splice(enemy, 1);
                missiles.splice(missile1, 1);
            }
        }
    }
}


function loopOnce() {
    setTimeout(loopOnce, 50) //setInterval seems to accelerate the projectile... nested loop
//     
    moveMissiles()
    drawMissiles()
    moveEnemies()
    drawEnemies()
    collisionDetection()
    
}
loopOnce()