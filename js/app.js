/*
* APLICACIÓ
*/

var myCanvas;
var ctx;

$(document).ready(function() {
    myCanvas = document.getElementById("joc");
    ctx = myCanvas.getContext("2d");


function beginGame() {
    let backgrounds = ["../images/fons1.jpg", "../images/fons2.jpg", "../images/fons3.jpg"];
    $("body").css({
        "background": backgrounds[Math.floor(Math.random() * 3)],
    })

    $('#menu').show();
    $('#principal').hide();
    
    countdown();  // Iniciar la cuenta regresiva
};

function countdown() {
    let counter = 3;
    let countdownInterval = setInterval(() => {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.font = "32px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 2;

        ctx.fillText(counter > 0 ? counter : "GO!", myCanvas.width / 2, myCanvas.height / 2);

        if (counter === 0) {
            clearInterval(countdownInterval);
            setTimeout(() => {
                joc.inicialitza();
                animacio();  // Iniciar la animación después de la cuenta regresiva
            }, 1000);  // Esperar un segundo antes de iniciar el juego
        }
        counter--;
    }, 1000);  // Actualiza cada segundo
}


function showHPDecrement() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.font = "32px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.textAlign = "center";
    ctx.fillText("-1HP", myCanvas.width / 2, myCanvas.height / 2);

    setTimeout(() => {
        countdown(() => {
            joc.inicialitza();
            animacio();
        });
    }, 1000);  // Mostrar "-1HP" por 1 segundo antes de iniciar el countdown
}

function restartCountdown() {
    countdown();  // Reiniciar la cuenta regresiva
}

 function animacio() {
    joc.update();
    requestAnimationFrame(animacio);
} 

joc.onBolaCaida = showHPDecrement;

});

let selectedDifficulty = 'easy';

function difficultySelected(difficulty) {
    console.log(difficulty);
    selectedDifficulty = difficulty;
}

function startGame() {
    console.log("entra a startGame()");
    var level = selectedDifficulty;
    $('#menu').hide();
    $('#principal').show();
    joc = new Joc(myCanvas, ctx, level);
    beginGame();
}

window.startGame = startGame;

/*$(document).ready(function() {
    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas, ctx);
    joc.inicialitza();
    animacio();
});

function animacio() {
    joc.update();
    requestAnimationFrame(animacio);
} */

function difficulty (difficulty, event) {
    var buttonDifficulty = document.querySelectorAll(".difficulty");    
    selectedDifficulty 
    dificultatBotons.forEach(btn => btn.classList.remove("seleccionat"));
    event.tardifficultyist.add("seleccionat");

    seleccio(dificultat);
}

function checkButtons() {
    var menu = document.getElementById("menu");
    var joc = document.getElementById("joc");

    var difficultySelected = document.querySelector(".dificultat.seleccionat");

    if (difficultySelected) {
        joc.style.display = "block";
        menu.style.display = "none";
        return true;
    } else {
        $('#error_difficulty').css('display', 'block');
    }
}



