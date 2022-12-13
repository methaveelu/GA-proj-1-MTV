# GA Project 1: Monkey King Game

## Objective
The objective of this game project is to create an interative and playable game on the web browser through, HTML /CSS /JavaScript. In addition, **DOM manipulation** method will be used to add, remove and modify elements of the website.

## Overview
This is a simple "monkey king" theme 2D shooting game, whereby enemies will be randomly generated at different areas of the webpage, and for the player to survive he/she has to shoot them own or avoid contct with the enemies. In addition, the "Boss enemy" will be activated after the player has killed a certain number of enemies.

## Program Structure

### initialisation
* pre-define the player positioning in JS, such that other functions within the code can access the value to perform their respective tasks.
* missile array to be filled up when the space bar is tapped
* empty array to push in the coordinates of the enemy spawning location

```javascript
let player1 = {
    left: 30,
    top: 300
};

let missiles = [];

let enemiesLocation = [];
```
### Random Location Generator
* Prior to spawning the enemy, a random generator function is required such that the enemy doesnt only appear in 1 row.
* preset the 'Top' & 'Left' properties of the enemy to ensure it stays within the range of the background image
* Push the randomize 'Top' & 'Left' values into the empty 'enemiesLocation' array.

```javascript
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
} 

let random_left = getRandomInt(1000, 1100);
let random_top = getRandomInt(0, 600); 

function enemySpawn() {
    random_top = getRandomInt(0, 600); 
    enemiesLocation.push({left : random_left, top: random_top})
}
setInterval(enemySpawn, 1000)
```
### Enemy Spawn & Movement
* A function called 'drawEnemies' which consist of a for loop will extract the randomize enemy location values and input them to a new 'enemy' div tag, such that the enemy can be visualized at the respective locations. This function will keep running unless the player has died. 

* After each iteration completed by the for loop, the initial location of enemy will be cleared to ensure the enemy doesnt spawn in a 'string' manner

```javascript
function drawEnemies() {

   document.getElementById('enemies').innerHTML = "" 
    
   for(let i = 0 ; i < enemiesLocation.length ; i++ ) {

        document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemiesLocation[i].left}px; top:${enemiesLocation[i].top}px'></div>`;
    
    }

}
```

* Another function called 'moveEnemies' will access the enemy location array and ammend the enemy's left property as long as the value is more than zero. 

* else if statement as shown will remove the enemy from the webpage once its left properties has hit the extreme left of the page. The array method splice is used to facilitate this removal.

```javascript
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
```
### Move player 
* The addEventListener() method is required to detect which key on the keyboard is pressed. Thereafter the function will process the movement of the player if one of the assigned keys are pressed. 
* For the purpose of this game, 'W' moves the player upwards, 'A' moves the player to the left, 'S' moves the player downwards and 'D' moves the player to the right. 
* 

```javascript
document.addEventListener("keydown", function(e){
    
    if (e.code === 'KeyW' && player1.top >= 0) {
        
        player1.top = player1.top - 20;
        // console.log("Up");
    }

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

        missiles.push({   
            left: player1.left + 70,
            top: player1.top 
        });
        
    }
    moveplayer1();
})

function moveplayer1() {
    document.getElementById('player1').style.top = `${player1.top}px`;
    document.getElementById('player1').style.left = `${player1.left}px`;
}

```
