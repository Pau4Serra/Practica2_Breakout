/*
* APLICACIÓ
*/

/* $(document).ready(function() {
    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas, ctx);
    countdown();  // Iniciar la cuenta regresiva

    function countdown() {
        let counter = 3;
        let countdownInterval = setInterval(() => {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            ctx.font = "48px Arial";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText(counter > 0 ? counter : "GO", myCanvas.width / 2, myCanvas.height / 2);

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
});

function animacio() {
    joc.update();
    requestAnimationFrame(animacio);    
}
*/

$(document).ready(function() {
    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas, ctx);
    joc.inicialitza();
    animacio();
});

function animacio() {
    joc.update();
    requestAnimationFrame(animacio);
}



