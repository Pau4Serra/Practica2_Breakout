/*
* CLASSE JOC
*/

class Joc{
    constructor(canvas,ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
       
        this.bola = new Bola(new Punt(this.canvas.width/2,this.canvas.height/2),3);
        this.pala = new Pala(new Punt((this.canvas.width-60)/2,this.canvas.height-15),60,4);
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
function dificultat (dificultat, event) {
    var dificultatBotons = document.querySelectorAll(".dificultat")
    //console.log(dificultatBotons);
    dificultatBotons.forEach(btn => btn.classList.remove("seleccionat"));
    event.target.classList.add("seleccionat");

    seleccio(dificultat);
}

function checkButtons() {
    
    var menu = document.getElementById("menu");
    var joc = document.getElementById("joc");

    var dificultat = document.querySelector(".dificultat.seleccionat");
    var buttonPlay = document.querySelector("#play");

    if (dificultat && buttonPlay) {
        joc.style.display = "block";
        joc1.style.display = "block";
        menu.style.display = "none";
        return true;

    }

}

function comencarJoc () {

    if(checkButtons()) {
        clearCanvas();
        draw();
        inicialitza();
        update();
        temps();
    } else {
        //console.log("Botons no seleccionats");
    }
}


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);
        timer--
        if (timer < 0) {
            console.log(timer)
            clearInterval(interval); // Detiene el intervalo para que no siga ejecutándose
            mostrarPopupTiempoAgotado(); // Muestra el popup cuando el tiempo se agota
        }
    }, 1000);
}

function mostrarPopupTiempoAgotado() {
    var popup = $('<div id="popupTiempoAgotado" class="popup"></div>');
    popup.append('<div class="contenido-popup">');
    popup.find('.contenido-popup').append('<h2>Te has quedado sin tiempo, inténtalo de nuevo.</h2>');
    popup.find('.contenido-popup').append('<button id="botonReintentar">Reintentar</button>');

    $('body').append(popup)

    $('#botonReintentar').on("click", function() {
        $('#popupTiempoAgotado').remove(); // Elimina el popup
        $('#menu').show(); // Muestra el menú
        $('#joc').hide(); // Oculta el juego
    });
}


function temps() {
    var fiveMinutes = 300 * 1000,
        display = $('#time');
    startTimer(fiveMinutes, display);
};

