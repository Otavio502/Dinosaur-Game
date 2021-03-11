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

//optei por utilizar minha função preload ao invés do P5
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
        this.canvas.style.background=bkg;
        //this.canvas.style.background='url(img/background.png)';
        this.canvas.style.backgroundPosition='center bottom';
        this.canvas.style.backgroundRepeat='no-repeat';
        //this.canvas.style.backgroundSize='cover';
    }

    rectangle(x1, y1, w1, h1) {
        this.ctx.fillRect(x1, y1, w1, h1);  
    }

    image(img, x2, y2, w2, h2) {        
        this.ctx.drawImage(img, x2, y2, w2, h2);
    }     

}


function setup() {
    // inicializo as variáveis width e height
    width = 600;
    height = 350;
    
    canvas = new Canvas();

    // carrego as imagens do jogo
    myPreload();

    // inicializo a criação do canvas
    canvas.createCanvas(width, height);
    canvas.background('#A6A6A6');

    // inicializo o Dino
    dinoDraw();
}

function myRect(x1, y1, w1, h1) {
    canvas.rectangle(x1, y1, w1, h1);   
}

function myImage(img, x1, y1, w1, h1) {
    //verifica se a imagem foi carregada antes de executar a função
    img.onload = function() {
        canvas.image(img, x1, y1, w1, h1);
    }
}

function dinoDraw() {
    dino = new Dino();

    dino.show();
    dino.move();
}


window.addEventListener('keypress', function(evento) {

    // if (evento.code == "Space") {
    //     console.log('barra espaço');
    // }

    if (evento.defaultPrevented) {
        return; // Não fazer nada se o evento estiver iniciado
    }

    switch(evento.code) {
        case "Space":
        case "ArrowUp":
          // Aciona o salto do Dino
          dino.jump();
          dinoDraw();
          break;
        case "KeyA":
        case "ArrowLeft":
          // volta para esquerda
          // função aqui
          break;
        case "KeyD":
        case "ArrowRight":
          // avança para a direita
          // função aqui
          break;
      }

      dino.show();
    
      // retirar o evento se ele for tratado duas vezes
      evento.preventDefault();
    
    }, true);
    

setup();