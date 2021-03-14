/*
    App Dinosaur Game
    By iMarcaos 
    Project Started: 05/03/2021
    Version: 0.2-03.21
*/

// 3ª Construção

// Canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.style.height = "";
canvas.style.width = "";
canvas.setAttribute('width', 600);
canvas.setAttribute('height', 350);  
/**/

// Variables
let score;
let scoreText;
let highscore;
let highscoreText;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};

let img;
let dImg; // dinossauro
let cImg; // cactus
let bImg; // background

// Preload  Images
function myPreload() {
    dImg =  myLoadImage('img/dino.png');
    cImg =  myLoadImage('img/cactus.png');
    bImg =  myLoadImage('img/background.png');
}

function myLoadImage(url) {
    var img = new Image();
    img.src = url;
    return img;
}
/**/

// Event Listeners
document.addEventListener('keydown', function (evt) {
    keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
    keys[evt.code] = false;
});

class Player {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = "#FF5858";

        this.dy = 0;
        this.jumpForce = 15;
        this.originalHeight = h;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    animate(img) {
        // Jump
        if (keys['Space'] || keys['KeyW']) {
            this.jump();
            console.log('jump');
        } else {
            this.jumpTimer = 0;
        }
    
        if (keys['ShiftLeft'] || keys['KeyS']) {
            this.h = this.originalHeight / 2;
        } else {
            this.h = this.originalHeight;
        }
    
        this.y += this.dy;
    
        // Gravity
        if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }
            
        // this.draw(); // geometric form
        this.image(img);
    }

    jump(){
        if (this.grounded && this.jumpTimer == 0) {
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
          } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer / 50);
          }
    }

    draw () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    }

    image(img) {
        ctx.beginPath();
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
        ctx.closePath();
    }
}

class Obstacle {
    constructor (x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    
        this.dx = -gameSpeed;
    }

    update () {
        this.x += this.dx;
        this.draw();
        this.dx = -gameSpeed;
    }
    
     draw () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    }
}

class Text {
    constructor (t, x, y, a, c, s) {
        this.t = t; // text
        this.x = x; // position x
        this.y = y; // position y
        this.a = a; // alignment
        this.c = c; // color
        this.s = s; // size
    }
  
    draw () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.font = this.s + "px sans-serif";
        ctx.textAlign = this.a;
        ctx.fillText(this.t, this.x, this.y);
        ctx.closePath();
    }
}

// Game Functions
function spawnObstacle () {
    let size = randomIntInRange(20, 70);
    let type = randomIntInRange(0, 1);
    let obstacle = new Obstacle(canvas.width + size, canvas.height - size, size, size, '#2484E4');
    //console.log(size);
  
    if (type == 1) {
      obstacle.y -= player.originalHeight - 10;
    }
    obstacles.push(obstacle);
}
//spawnObstacle();


function randomIntInRange (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function start () {

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;

    score = 0;
    highscore = 0;
    if (localStorage.getItem('highscore')) {
        highscore = localStorage.getItem('highscore');
    }

    player = new Player(25, canvas.height - 50, 50, 50);

    scoreText = new Text("Score: " + score, 25, 25, "left", "#212121", "20");
    highscoreText = new Text("Highscore: " + highscore, canvas.width - 25, 25, "right", "#212121", "20");
    
    requestAnimationFrame(update);

    // carrego as imagens do jogo
    myPreload();
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    spawnTimer--;
    if (spawnTimer <= 0) {
        spawnObstacle();
        console.log(obstacles);
        spawnTimer = initialSpawnTimer - gameSpeed * 8;
        
        if (spawnTimer < 60) {
          spawnTimer = 60;
        }
    }

    // Spawn Enemies
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];
        
        if (o.x + o.w < 0) {
            obstacles.splice(i, 1);
        }

        if (
            player.x < o.x + o.w &&
            player.x + player.w > o.x &&
            player.y < o.y + o.h &&
            player.y + player.h > o.y
        ) {
            obstacles = [];
            score = 0;
            spawnTimer = initialSpawnTimer;
            gameSpeed = 3;
            window.localStorage.setItem('highscore', highscore);
        }
        
        o.update();
  }

    player.animate(dImg);

    score++;
    scoreText.t = "Score: " + score;
    scoreText.draw();

    if (score > highscore) {
        highscore = score;
        highscoreText.t = "Highscore: " + highscore;
      }
      
      highscoreText.draw();

      gameSpeed += 0.003;
}

start();

// comparação da função requestAnimationFrame e setInterval
// info sobre requestAnimationFrame
// http://www.javascriptkit.com/javatutors/requestanimationframe.shtml

// var adiv = document.getElementById('mydiv')
// var leftpos = 0
// setInterval(function(){
//     leftpos += 5
//     adiv.style.left = leftpos + 'px' // move div by 5 pixels each time
// }, 50) // run code every 50 milliseconds

// var adiv = document.getElementById('mydiv')
// var leftpos = 0
// requestAnimationFrame(function(timestamp){
//     leftpos += 5
//     adiv.style.left = leftpos + 'px'
// })


// 2ª Construção

// document.addEventListener('DOMContentLoaded', () => {
//     const dino = document.querySelector('.dino');
//     const game = document.querySelector('.game');
//     const alert =  document.getElementById('alert');
//     let isJumping = false;
//     let gravity = 0.9;
//     let isGameOver = false;
//     console.log(dino);

//     function control(e) {
//         if (e.code == 'Space') {
//             if (!isJumping) {
//                 isJumping = true;
//                 jump();
//             }            
//         }
//     }
//     document.addEventListener('keypress', control);

//     let position = 0;
//     function jump() {
//         let count = 0;
//         let position = 0;
//         let timerId = setInterval(() => {

//             // move down
//             if (count === 15){
//                 clearInterval(timerId);
//                 console.log('down');
//                 let downTimeId = setInterval(() => {
//                     if (count === 0) {
//                         clearInterval(downTimeId);
//                         isJumping = false;
//                     }
//                     position -= 5; //velocity
//                     count --;
//                     position = position * gravity;
//                     dino.style.bottom = position + 'px';                    
//                 }, 20);
//             }

//             // move up
//             console.log('up');            
//             position += 30;
//             count ++;
//             position = position * gravity;
//             dino.style.bottom = position + 'px';
//             console.log(dino.style.bottom);
            
//         }, 20);
//     }

//     function generateObstacles() {
//         let randomTime = Math.random() * 4000;
//         let obstaclePosition = 1000;
//         const obstacle = document.createElement('div');
//         if (!isGameOver) obstacle.classList.add('obstacle');
//         game.appendChild(obstacle);
//         obstacle.style.left = obstaclePosition + 'px';

//         let timerId = setInterval(() => {
//             if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
//                 clearInterval(timerId);
//                 alert.innerHTML = 'Game Over';
//                 isGameOver = true;
//                 // Remove all children
//                 while (game.firstChild) {
//                     game.removeChild(game.lastChild)
//                 }
//             }
//             obstaclePosition -= 10;
//             obstacle.style.left = obstaclePosition + 'px';
//         }, 20);
//         if (!isGameOver) setTimeout(generateObstacles, randomTime);

//     }
//     generateObstacles();


// })

// 1ª Construção

// const dino = document.getElementById("dino");
// const cactus = document.getElementById("cactus");

// function jump() {
//     dino.classList.add("jump");
    
//      setTimeout(function() {
//         dino.classList.remove("jump");
//     }, 300);
// }

// let isAlive = setInterval(function() {
    
//     //console.log("check");
    
//     // get current dino Y position
//     let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
//     //console.log(dinoTop);

//     // get current cactus X position
//     let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
//     //console.log(cactusLeft);

//     // detect collision
//     /* Vamos checar a posição do dinossauro que é fixa no momento (HeightXWidhtXPosition-40X20X0) e comparar com a posição e altura do cactus */
//     if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
//         // collision

//         //console.log("collision");
//         alert("Game Over");

//     }

// }, 10);

// document.addEventListener("keydown", function (event){ jump(); });