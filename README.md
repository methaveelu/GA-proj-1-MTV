# GA Project 1: Monkey King Game

## Objective
The objective of this game project is to create an interative and playable game on the web browser through, HTML /CSS /JavaScript. In addition, **DOM manipulation** method will be used to add, remove and modify elements of the website.

## Overview
This is a simple "monkey king" theme 2D shooting game, whereby enemies will be randomly generated at different areas of the webpage, and for the player to survive he/she has o shoot them own or avoid contct with the enemies. In addition, the "Boss enemy" will be activated after the player has killed a certain number of enemies.

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
* 
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
