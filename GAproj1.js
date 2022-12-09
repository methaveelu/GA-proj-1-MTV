
//initial player position
let player1 = {
    left: 30,
    top: 400
};

//missile array to be filled up when the space bar is tapped
let missiles = [];

//empty array to push in the coordinates of the enemy spawning location
let enemiesLocation = [];

//helps to randomized a range of the coordinates where enemy will be spawned
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let random_left = getRandomInt(1000, 1100);// this left px can stay fixed 
let random_top = getRandomInt(0, 600); // top px should vary, but this only random generate once

///////////////////////ENEMY SPAWN AND MOVE ENEMIES////////////////////////////

// function to help push the randomised location of enemy into an array.
function enemySpawn() {
    random_top = getRandomInt(0, 600); // top px varies every 1 sec due to interval
    enemiesLocation.push({left : random_left, top: random_top})
}
setInterval(enemySpawn, 1000)


// to ensure the enemy location is updated on the screen as it moves from left to right. 
// works in conjunction with the moveEnemies function. enemy will "appear and disappear" from left to right. 
function drawEnemies() {

    document.getElementById('enemies').innerHTML = "" //clears initial location of enemy to ensure enemy doesnt become a 'long train' fo enemies 
    
    //for loop runs through the enemies' location array, and creates an enemy 
    for(let i = 0 ; i < enemiesLocation.length ; i++ ) {

        document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemiesLocation[i].left}px; top:${enemiesLocation[i].top}px'></div>`;
    
    }

}

// moves the individual enemies from right to left across the screen
function moveEnemies() {
    for(let i = 0 ; i < enemiesLocation.length ; i++ ) {
        
        //as long as enemy location has a 'left' value 
        if(enemiesLocation[i].left > 0){
        enemiesLocation[i].left = enemiesLocation[i].left - 8;
        }
        //ensure enemies dont go out of frame, remove the enemy from the game once it has reach the extreme left of screen 
        else if (enemiesLocation[i].left <= 0){
        enemiesLocation.splice(i, 1)
        }
    }
}

/////////////move player 1////////////////////////////////////

document.addEventListener("keydown", function(e){
    //add keyboard event e.code to detect which button is pressed 
    //setting the limit to the movement.. via 'if' to ensure the player is not out of frame
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
    // callbk moveplayer1 function to update the coordinates of html element of player1
    moveplayer1();

})

function moveplayer1() {
    document.getElementById('player1').style.top = `${player1.top}px`;
    document.getElementById('player1').style.left = `${player1.left}px`;
}


///////////////////////MISSILES////////////////////////

//once space bar is tapped, a projectile location is pushed in to the missiles array
function drawMissiles() {
    document.getElementById('missiles').innerHTML = ""
    // clear the array for new projectile
    for(let i = 0 ; i < missiles.length ; i++ ) {
        document.getElementById('missiles').innerHTML += `<div class='missile1' style='left:${missiles[i].left}px; top:${missiles[i].top}px'></div>`;
        //add a new div tag to return the the projectile positioning  
    }

}

//similar to moveplayer1 function
function moveMissiles() {
    for(let i = 0 ; i < missiles.length ; i++ ) {
        
        if(missiles[i].left < 1200){
        missiles[i].left = missiles[i].left + 8 //plus 8 px to projectile position... at a specific interval. 
        }

        else if(missiles[i].left >= 1200){
        missiles.splice(i, 1) // stop missiles movement at 1200px 
        }
        
    }
}

//////////////////////bullet and enemy collision/////////////////

let bulletCollideCount = 10
function bulletCollision() {
  
 // nested loop will help to detect collision of bullets & enemies 
 // run through the coordinates of both enemy & missile locations.

    for (let enemy = 0; enemy < enemiesLocation.length; enemy ++) {
        for (let missile1 = 0; missile1 < missiles.length; missile1 ++) {
            if ( 
                missiles[missile1].left <= (enemiesLocation[enemy].left + 100) &&
                missiles[missile1].left >= enemiesLocation[enemy].left &&
                missiles[missile1].top <= (enemiesLocation[enemy].top + 99) &&
                (missiles[missile1].top + 80) >= enemiesLocation[enemy].top
            ) 
            {
                // enemy and projectile will disappear once the if statement holds true.
                enemiesLocation.splice(enemy, 1); 
                missiles.splice(missile1, 1);
                
                if(bulletCollideCount>0){
                    return bulletCollideCount--
                }
            } 
        }
    }
    activateBoss()
}

function activateBoss(){

    

}
// function bulletOnBoss() {
//     let collideCount = []
//     for(let i=0; i < 3; i++){


//             for (let enemy = 0; enemy < enemiesLocation.length; enemy ++) {
//                 for (let missile1 = 0; missile1 < missiles.length; missile1 ++) {
//                     if ( 
//                         missiles[missile1].left <= (enemiesLocation[enemy].left + 99) &&
//                         missiles[missile1].left >= enemiesLocation[enemy].left &&
//                         missiles[missile1].top <= (enemiesLocation[enemy].top + 150) &&
//                         missiles[missile1].top >= enemiesLocation[enemy].top
//                     ) 
//                     {
//                     collideCount.push('hit')
                    
//                     } 
//                 }
//             }
//     }
//     if (collideCount.length === 3){
//         enemiesLocation.splice(enemy, 1); 
//         missiles.splice(missile1, 1);
//     }
// }
// 
// when score hit 500.. stop enemy from spawning.. then spawn the boss



let enemyCollideCount = 8
function enemyPlayerCollision() {
    for (let enemy = 0; enemy < enemiesLocation.length; enemy ++) {
            if ( 
                player1.left <= (enemiesLocation[enemy].left + 150) &&
                (player1.left + 150) >= enemiesLocation[enemy].left  &&
                player1.top <= (enemiesLocation[enemy].top + 99)  &&
                (player1.top + 132) >= enemiesLocation[enemy].top 
                )
            {
                enemiesLocation.splice(enemy, 1);
               
                // document.getElementById('player1Health').innerHTML -= `<div class="heart"></div>`
               
                if(enemyCollideCount>0){
        
                    return enemyCollideCount--
                   
                }
            } 
    

    }
    gameOver()     
}


////////////////health bar///////////////
function gameOver() {
    if (enemyCollideCount==0) {
        document.getElementById("player1").style.display = "none";
          if (window.confirm("GAME OVER MONKEY KING! Try Again?")) {
            window.open("GAproj1.html");
          }   
    clearInterval(startgame)
    }
}

// 
//    
// sun wukoing dies afetr colliding with 8 enemies and disappears




function loopGame() {

    moveMissiles()
    drawMissiles()
    moveEnemies()
    drawEnemies()
    bulletCollision()
    
    enemyPlayerCollision()
    // bulletOnBoss()
    
}
let startgame = setInterval(loopGame, 50)   
// startgame() 

// do layering to ensure the health bar is above the player and monkey.
//health bar---- then activate boss....make enemy the projectile of the boss
//collision inconsistancy
// click ok for the alert to disappear..