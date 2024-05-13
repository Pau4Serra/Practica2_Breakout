/*
* CLASSE JOC
*/

class Joc{
    constructor(canvas,ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
       
        this.pala = new Pala(new Punt((this.canvas.width-60)/2,this.canvas.height-15),60,4);
        this.bola = new Bola(this.pala, new Punt(this.canvas.width/2,this.canvas.height/2),3);
        this.bola.setPala(this.pala);
        this.mur = new Mur(1, []); //Canviar valor quan tinguem menú, fer que l'array sigui global (?)

        this.key = {
            LEFT:{code:37, pressed:false},
            RIGHT:{code:39, pressed:false}
        };
    }

    draw(){
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.mur.draw(this.ctx);
    }

    clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
    }

    inicialitza(){
        this.mur.defineixNivells();
        this.mur.generaMur();
        const joc = this;
        $(document).on("keydown", function(e){
            if (e.which === joc.key.LEFT.code) {
                console.log("Left arrow key pressed");
                joc.pala.mou(-5, 0);
            } else if (e.which === joc.key.RIGHT.code) {
                console.log("Right arrow key pressed");
                joc.pala.mou(5, 0);
            }
        });
        $(document).on("keyup", function(e){
            // Handle keyup event if needed
        });

    }

    update(){
        this.bola.update();
        this.pala.update();
        this.draw();       
    }
}