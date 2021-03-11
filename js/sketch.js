/*
    App Dinosaur Game
    By iMarcaos 
    Project Started: 05/03/2021
    Version: 0.2-03.21
*/

let dino;
let dImg; // dinossauro
let cImg; // cactus
let bImg; // background

function preload() {
    dImg =  loadImage('img/dino.png');
    cImg =  loadImage('img/cactus.png');
    bImg =  loadImage('img/background.png');
}

function loadImage(url) {
    var img = new Image();
    img.src = url;
    return img;
}

class Canvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
    }

    createCanvas(w, h) {

        this.canvas.style.height = "";
        this.canvas.style.width = "";
        this.canvas.setAttribute('width', w);
        this.canvas.setAttribute('height', h);                    
    }

    background(bkg) {
        // estudar como mudar a imagem do do objecto com javascript
        this.canvas.style.background=bkg;
        //this.canvas.style.background='url(img/background.png)';
    }

    rectangle(x1, y1, w1, h1) {
        this.ctx.fillRect(x1, y1, w1, h1);  
    }

    image(img, x2, y2, w2, h2) {        
        this.ctx.drawImage(img, x2, y2, w2, h2);
    }

}

function setup() {
    width = 600;
    height = 350;


    dino = new Dino();
    canvas = new Canvas();

    preload();

    canvas.createCanvas(width, height);
    canvas.background('#A6A6A6');
    //canvas.background(bImg);
    console.log(bImg);

    dino.show();
}

function rect(x1, y1, w1, h1) {
    canvas.rectangle(x1, y1, w1, h1);   
}

function image(img, x1, y1, w1, h1) {
    //verifica se a imagem foi carregada antes de executar a função
    img.onload = function() {
        canvas.image(img, x1, y1, w1, h1);
    }
}

function keyPressed() {
    if (key == " ") {
        dino.jump();
    }
}

// function draw() {
    
//     background(220);
//     // background(bImg);
//     dino.show();
//     dino.move();

// }



setup();