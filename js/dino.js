class Dino {
    constructor() {
        this.r = 50; // reuso do valor
        this.x = this.r; // localização x
        this.y = height - this.r; // localização y - altura
        this.vy = 0; // velocidade Jump;
        this.gravity = 2;
    }

    jump() {
        console.log('salta dino');
        this.vy = -25;
    }

    move() {
        console.log('move dino');
        this.y += this.vy;
        console.log(this.y);
        this.vy += this.gravity;
        //this.y = constrain(this.y, 0, height - this.r); // Limitar o valor de y entre 0 e altura - menos tamanho objeto
    }

    show() {
        //myRect(this.x, this.y, this.r, this.r);
        console.log(this.y);
        myImage(dImg, this.x, this.y, this.r, this.r);
    }
}