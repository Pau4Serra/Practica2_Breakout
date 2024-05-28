/*
* CLASSE JOC
*/
class Joc{
    constructor(canvas, ctx, dificultat) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
        this.dificultat = dificultat;
       
        this.pala = new Pala(new Punt((this.canvas.width-60)/2,this.canvas.height-15),60,4);
        this.bola = new Bola(this.pala, new Punt(this.canvas.width/2,this.canvas.height/2 + 100), 3, 4);
        this.bola.setPala(this.pala);
        this.mur = new Mur(dificultat, []); //Canviar valor quan tinguem menú, fer que l'array sigui global (?)

        this.startTime = null;
        this.elapsedTime = 0;
        this.timerInterval = null;

        this.vides = 3;  // Inicializar vidas aquí
        $('#vides').text('HP: ' + this.vides); // Actualizar la visualización de vidas al inicializar

        this.onBolaCaida = null;  // Función a ejecutar cuando la bola caiga

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
        this.pala.mou();
        setTimeout(() => {
            this.temps();
        }, 3000);
        this.vides = 4;  // Asegurarse de que las vidas se inicialicen al comienzo del juego
        $('#vides').text('HP: ' + this.vides);  // Actualizar la visualización de vidas
    }

    update(){
        this.bola.update(this.mur.arrayTotxos);
        this.pala.update();
        this.draw();
        
        if (this.mur.arrayTotxos.length === 0) {
            this.stopTimer(); // Detener el temporizador
            popupVictoria(); // Llamar a la función de victoria
        }
    }
    
    startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        var interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.text(minutes + ":" + seconds);
            timer--;
    
            if (timer < 0) {
                clearInterval(interval);
                //popupTime();
                //playGameOver();
            }
        }, 1000);
    }
    
    temps() {
        var fiveMinutes = 300,
            display = jQuery('#time');
        this.startTimer(fiveMinutes, display);
    };

    pad(number) {
        return number < 10 ? '0' + number : number;
    }
    stopTimer() {
        clearInterval(this.timerInterval);
    }
}
