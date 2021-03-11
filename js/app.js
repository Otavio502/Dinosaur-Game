/*
    App Dinosaur Game
    By iMarcaos 
    Project Started: 05/03/2021
    Version: 0.1-03.21
*/
/* Arquivo Código antigo */

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

function jump() {
    dino.classList.add("jump");
    
     setTimeout(function() {
        dino.classList.remove("jump");
    }, 300);
}

let isAlive = setInterval(function() {
    
    //console.log("check");
    
    // get current dino Y position
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    //console.log(dinoTop);

    // get current cactus X position
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    //console.log(cactusLeft);

    // detect collision
    /* Vamos checar a posição do dinossauro que é fixa no momento (HeightXWidhtXPosition-40X20X0) e comparar com a posição e altura do cactus */
    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        // collision

        //console.log("collision");
        alert("Game Over");

    }

}, 10);

document.addEventListener("keydown", function (event){ jump(); });