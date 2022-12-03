
//initial player position
let player1 = {
    left: 30,
    top: 400
};

//missile array to be filled up when the space bar is tapped
let missiles = [];

//pre-defined coordinates of the enemy spawning area
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
let random_left = getRandomInt(1000, 1100);// this left px can stay fixed 
let random_top = getRandomInt(0, 600); // top px should vary, but this only random generate once


function enemySpawn() {
    random_top = getRandomInt(0, 600); // top px varies every 1 sec
    enemiesLocation.push({left : random_left, top: random_top})
}
setInterval(enemySpawn, 1000)


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
        //ensure enemies dont go out of frame
        else if (enemiesLocation[i].left <= 0){
        enemiesLocation.splice(i, 1)
        }
    }
}


document.addEventListener("keydown", function(e){
    //add keyboard event e.code to detect which button is pressed 
    //setting the limit to the movement.. to ensure the player is not out of frame
    if (e.code === 'KeyW' && player1.top >= 0) {
        
        player1.top = player1.top - 20;
        // console.log("Up");
    }

    //setting the limit to the movement.. to ensure the player is not out of frame
    if (e.code === 'KeyS' && player1.top <= 575) {
        
        player1.top = player1.top + 20;
        // console.log("Down");
    }
    if (e.code === 'KeyA' && player1.left >= 0) {
        
        player1.left = player1.left - 20;
        // console.log("Left");
    }
    if (e.code === 'KeyD' && player1.left <= 1280) {
        
        player1.left = player1.left + 20;
        // console.log("Right");
    }
    if (e.code === 'Space') {
     
        //push the coordinates of the 1st projectile into missile array 
        missiles.push({   //missile suppose to start at where the hero is
            left: player1.left + 70,
            top: player1.top 
        });
       
    }
    moveplayer1();

})

function moveplayer1() {
    document.getElementById('player1').style.top = player1.top + 'px';
    document.getElementById('player1').style.left = player1.left + 'px';
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



function bulletCollision() {
    for (let enemy = 0; enemy < enemiesLocation.length; enemy ++) {
        for (let missile1 = 0; missile1 < missiles.length; missile1 ++) {
            if ( 
                missiles[missile1].left <= (enemiesLocation[enemy].left + 99)&&
                missiles[missile1].left >= enemiesLocation[enemy].left &&
                missiles[missile1].top <= (enemiesLocation[enemy].top + 150)  &&
                missiles[missile1].top >= enemiesLocation[enemy].top
            ) 
            {
                enemiesLocation.splice(enemy, 1); 
                missiles.splice(missile1, 1);
            } 
        }
    }
}

function enemyPlayerCollision() {
    for (let enemy = 0; enemy < enemiesLocation.length; enemy ++) {
            if ( 
                player1.left <= (enemiesLocation[enemy].left + 200 )&&
                player1.left >= enemiesLocation[enemy].left  &&
                player1.top <= (enemiesLocation[enemy].top + 150)  &&
                player1.top >= enemiesLocation[enemy].top
            ) 
            {
            document.getElementById("player1").style.display = "none";
            alert("GAME OVER SUN WU KONG!")
            } 
    }
    
}
setInterval(enemyPlayerCollision, 10)

function loopGame() {

    moveMissiles()
    drawMissiles()
    moveEnemies()
    drawEnemies()
    bulletCollision()
    
}
setInterval(loopGame, 50)    