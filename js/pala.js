class Pala {
    constructor(puntPosicio, amplada, alcada){      
        this.amplada = amplada;
        this.alcada = alcada;
        this.posicio = puntPosicio;   
        this.velocitat = 1;
        this.vx = 0;           // Initialize vx to 0
        this.color = "#D30"; 
    }

    update() {
        this.mou(); // Call the movement method in the update method
        if(this.velocitat <= 2) {
            this.velocitat = this.velocitat + 0.0001;
        }
    }
   
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posicio.x, this.posicio.y, this.amplada, this.alcada);
        ctx.restore();
    }
    
    mou() {
        if(this.posicio.x + this.vx > 0 && this.posicio.x + this.vx < joc.amplada - this.amplada) {
            this.posicio.x += this.vx; // Update position with vx
        }
    }
}

var key = {
    LEFT: { code: 37, pressed: false },
    RIGHT: { code: 39, pressed: false }
};

$(document).on("keydown", function(e){
    if (e.which === key.LEFT.code) {
        //console.log("Left arrow key pressed");
        key.LEFT.pressed = true;
        key.RIGHT.pressed = false;
        joc.pala.vx = -joc.pala.velocitat; // Update vx to move left
    } else if (e.which === key.RIGHT.code) {
        //console.log("Right arrow key pressed");
        key.RIGHT.pressed = true;
        key.LEFT.pressed = false;
        joc.pala.vx = joc.pala.velocitat; // Update vx to move right
    }
    console.log(joc.pala.vx);
});

$(document).on("keyup", function(e){
    if (e.which === key.LEFT.code && key.LEFT.pressed) {
        //console.log("Left arrow key released");
        key.LEFT.pressed = false;
        if (key.RIGHT.pressed) {
            joc.pala.vx = joc.pala.velocitat;
        } else {
            joc.pala.vx = 0;
        }    } else if (e.which === key.RIGHT.code && key.RIGHT.pressed) {
        //console.log("Right arrow key released");
        key.RIGHT.pressed = false;
        if (key.LEFT.pressed) {
            joc.pala.vx = -joc.pala.velocitat;
        } else {
            joc.pala.vx = 0;
        }    }
});

