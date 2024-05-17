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
        this.mur = new Mur(2, []); //Canviar valor quan tinguem menú, fer que l'array sigui global (?)

        this.startTime = null;
        this.elapsedTime = 0;
        this.timerInterval = null;

        this.vides = 3; // Número de vidas al inicio
        
    }

    draw(){
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.mur.draw(this.ctx);
        this.mostrarVidas(); // Llamada para mostrar las vidas
    }

     // Restar una vida cuando la bola toque el suelo
     /*restarVida() {
        this.vides--;
        if (this.vides <= 0) {
            popupPerdre(); // Mostrar pantalla de pérdida si se quedan sin vidas
        }
    } */

    // Mostrar las vidas en algún lugar visible
    mostrarVidas() {
        $('#vides').text('Vidas: ' + this.vides);
    }

    clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
    }

    inicialitza(){
        this.mur.defineixNivells();
        this.mur.generaMur();
        this.pala.mou();
        this.startTime = Date.now(); // Inicializar el tiempo de inicio
        this.startTimer(); // Iniciar el temporizador
    }

    update(){
        this.bola.update(this.mur.arrayTotxos);
        this.pala.update();

        /*if (this.bola.posicio.y + this.bola.radi >= this.alcada) {
            this.restarVida(); // Restar una vida si la bola toca el suelo
            this.bola.posicio.y = this.alcada - this.bola.radi; // Colocar la bola en la parte superior del suelo
        } */

        this.draw();
        
    }
    startTimer() {
        const joc = this;
        this.timerInterval = setInterval(function () {
            joc.update();
        }, 1000 / 60); // Llamar a update aproximadamente 60 veces por segundo
    }

    updateTimer() {
        this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(this.elapsedTime / 60);
        const seconds = this.elapsedTime % 60;
        $('#timer').text('Time: ' + this.pad(minutes) + ':' + this.pad(seconds));
    }

    pad(number) {
        return number < 10 ? '0' + number : number;
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    /* startVidasCounter() {
        // Iniciar contador de vidas
        this.mostrarVidas(); // Mostrar las vidas al iniciar el contador
    } */

}


//cuando esten los totxo se implementa

function popupPerdre() {
    $('.carta').off("click");
    var popup = $('<div class="popup"></div>');
    popup.html(`
        <div class="popup-content">
            <h2>You lost!</h2>
            <p>No clicks remaining.</p>
            <button id="returnMenu">Return to menu</button>
        </div>
    `);

    $('body').append(popup);

    $('#returnMenu').on('click', function() {
        location.reload();
    });
}

function popupVictoria() {
    $('.carta').off("click");
    var popup = $('<div class="popupVictoria"></div>');
    popup.html(`
        <div class="popup-content">
            <h2>You win!</h2>
            <p>Congratulations!</p>
            <button id="returnMenu2">Return to menu</button>
        </div>
    `);

    $('body').append(popup);

    $('#returnMenu2').on('click', function() {
        location.reload();
    });
}