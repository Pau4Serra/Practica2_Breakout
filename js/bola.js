class Bola {
    constructor(pala, puntPosicio, radi, vides) {
        this.radi = radi;
        this.posicio = puntPosicio;
        this.vx = Math.random() < 0.5 ? -1 : 1;
        this.vy = -1;
        this.color = "#fff";
        this.pala = pala;
        this.v = 2.5;    
        this.vides = vides;
    };

    setPala(pala) {
        this.pala = pala;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posicio.x, this.posicio.y, this.radi, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    mou(x,y){
        this.posicio.x += x;
        this.posicio.y += y;
    }
    update(arrayTotxos) {
        let puntActual = this.posicio;
        let puntSeguent = new Punt(this.posicio.x + this.vx / this.v, this.posicio.y + this.vy / this.v);
        let trajectoria = new Segment(puntActual, puntSeguent);
        let xoc = false;
    
        if (trajectoria.puntB.y - this.radi < 0) {
            this.posicio.y = this.radi;
            this.vy = -this.vy;
            xoc = true;
        }
        if (trajectoria.puntB.x - this.radi < 0) {
            this.posicio.x = this.radi;
            this.vx = -this.vx;
            xoc = true;
        }
        if (trajectoria.puntB.x + this.radi > joc.amplada) {
            this.posicio.x = joc.amplada - this.radi;
            this.vx = -this.vx;
            xoc = true;
        }
        if (trajectoria.puntB.y + this.radi > joc.alcada) {
            this.posicio.x = joc.amplada / 2;
            this.posicio.y = joc.alcada - 30;
            this.vx = Math.random() < 0.5 ? -1 : 1;
            this.vy = -1;
            this.v = 3;
            this.pala.velocitat = 1;

            joc.vides--;
            $('#vides').text('HP: ' + joc.vides);  // Actualizar la visualización de vidas

            if (joc.vides > 0) {
                window.restartCountdown();  // Reiniciar el contador
            } else {
                joc.stopTimer();
                let playerName = prompt("Game Over! Enter your name:");
                if (playerName) {
                    updateHighscores(playerName, joc.elapsedTime);
                }
                displayHighscores();
            }
            return;
        }
    
        let objInterseccioPala = this.interseccioSegmentRectangle(trajectoria, this.pala);
        if (objInterseccioPala != undefined) {
            switch (objInterseccioPala.vora) {
                case 'superior':
                    this.posicio.y = objInterseccioPala.pI.y - this.radi;
                    this.vy = -this.vy;
                    xoc = true;
                    break;
                case 'esquerra':
                    this.posicio.x = objInterseccioPala.pI.x - this.radi;
                    this.vx = -this.vx;
                    xoc = true;
                    break;
                case 'dreta':
                    this.posicio.x = objInterseccioPala.pI.x + this.radi;
                    this.vx = -this.vx;
                    xoc = true;
                    break;
            }
        }
    
        let collidedTotxos = [];
        for (let i = 0; i < arrayTotxos.length; i++) {
            let totxo = arrayTotxos[i];
            let objInterseccioTotxo = this.interseccioSegmentRectangle(trajectoria, totxo);
            if (objInterseccioTotxo != undefined) {
                collidedTotxos.push({ totxo, objInterseccioTotxo, index: i });
            }
        }
    
        if (collidedTotxos.length > 0) {
            collidedTotxos.sort(function(a, b) {
                let distA = Punt.distanciaDosPunts(puntActual, a.objInterseccioTotxo.pI);
                let distB = Punt.distanciaDosPunts(puntActual, b.objInterseccioTotxo.pI);
                if (distA < distB) {
                    return -1;
                }
                if (distA > distB) {
                    return 1;
                }
                return 0;
            });
    
            let firstCollision = collidedTotxos[0];
            switch (firstCollision.objInterseccioTotxo.vora) {
                case 'superior':
                    this.posicio.y = firstCollision.objInterseccioTotxo.pI.y - this.radi;
                    this.vy = -this.vy;
                    break;
                case 'inferior':
                    this.posicio.y = firstCollision.objInterseccioTotxo.pI.y + this.radi;
                    this.vy = -this.vy;
                    break;
                case 'esquerra':
                    this.posicio.x = firstCollision.objInterseccioTotxo.pI.x - this.radi;
                    this.vx = -this.vx;
                    break;
                case 'dreta':
                    this.posicio.x = firstCollision.objInterseccioTotxo.pI.x + this.radi;
                    this.vx = -this.vx;
                    break;
            }
    
            arrayTotxos.splice(firstCollision.index, 1);
            xoc = true;
        }
    
        if (!xoc) {
            this.posicio.x = trajectoria.puntB.x;
            this.posicio.y = trajectoria.puntB.y;
        }
    
        if (this.v >= 1) {
            this.v = this.v - 0.0002;
        }
    }

    interseccioSegmentRectangle(segment, rectangle){

       //1r REVISAR SI EXISTEIX UN PUNT D'INTERSECCIÓ EN UN DELS 4 SEGMENTS
       //SI EXISTEIX, QUIN ÉS AQUEST PUNT
       //si hi ha més d'un, el més ajustat
       let puntI;
       let distanciaI;
       let puntIMin;
       let distanciaIMin = Infinity;
       let voraI;

       //calcular punt d'intersecció amb les 4 vores del rectangle
       //necessitem coneixer els 4 segments del rectangle
       let puntSuperiorEsquerra = new Punt(rectangle.posicio.x - this.radi, rectangle.posicio.y - this.radi);
       let puntSuperiorDreta = new Punt(rectangle.posicio.x + rectangle.amplada + this.radi, rectangle.posicio.y - this.radi);
       let puntInferiorEsquerra = new Punt(rectangle.posicio.x - this.radi, rectangle.posicio.y + rectangle.alcada + this.radi);
       let puntInferiorDreta = new Punt(rectangle.posicio.x + rectangle.amplada + this.radi, rectangle.posicio.y + rectangle.alcada + this.radi);

       let segmentVoraSuperior = new Segment(puntSuperiorEsquerra, puntSuperiorDreta);
       let segmentVoraInferior = new Segment(puntInferiorEsquerra, puntInferiorDreta);
       let segmentVoraEsquerra = new Segment(puntSuperiorEsquerra, puntInferiorEsquerra);
       let segmentVoraDreta = new Segment(puntSuperiorDreta, puntInferiorDreta);
       //2n REVISAR SI EXISTEIX UN PUNT D'INTERSECCIÓ EN UN DELS 4 SEGMENTS
       //SI EXISTEIX, QUIN ÉS AQUEST PUNT
       //si hi ha més d'n, el més ajustat
    
       //vora superior
       puntI = segment.puntInterseccio(segmentVoraSuperior);
       if (puntI){
           //distancia entre dos punts, el punt inicial del segment i el punt d'intersecció
           distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
           if (distanciaI < distanciaIMin){
               distanciaIMin = distanciaI;
               puntIMin = puntI;
               voraI = "superior";
           }
       }
       //vora inferior
       puntI = segment.puntInterseccio(segmentVoraInferior);
       if(puntI) {
        distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
        if(distanciaI < distanciaIMin) {
            distanciaIMin = distanciaI;
            puntIMin = puntI;
            voraI = "inferior";
        }
       }
       //vora esquerra
       puntI = segment.puntInterseccio(segmentVoraEsquerra);
       if(puntI) {
        distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
        if(distanciaI < distanciaIMin) {
            distanciaIMin = distanciaI;
            puntIMin = puntI;
            voraI = "esquerra";
        }
       }
       //vora dreta
       puntI = segment.puntInterseccio(segmentVoraDreta);
       if(puntI) {
        distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
        if(distanciaI < distanciaIMin) {
            distanciaIMin = distanciaI;
            puntIMin = puntI;
            voraI = "dreta";
        }
       }
       //Retorna la vora on s'ha produït la col·lisió, i el punt (x,y)
       if(voraI){
           return {pI: puntIMin, vora: voraI};
       }
    }

    distancia = function(p1,p2){
        return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y));
    }
}