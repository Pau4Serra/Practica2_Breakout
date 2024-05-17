class Bola {
    constructor(pala, puntPosicio, radi) {
        this.radi = radi;
        this.posicio = puntPosicio;
        this.vx = Math.random() < 0.5 ? -1 : 1;
        this.vy = -1;
        this.color = "#fff";
        this.pala = pala;
        this.v = 3;    
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
    update(arrayTotxos){
        
        let puntActual = this.posicio;
        let puntSeguent= new Punt(this.posicio.x + this.vx/this.v, this.posicio.y + this.vy/this.v);
        let trajectoria= new Segment(puntActual, puntSeguent);
        let exces;
        let xoc = false;
        
        //console.log(this.posicio.x);
        //console.log(this.posicio.y);
     
        //Xoc lateral superior
        if(trajectoria.puntB.y - this.radi < 0){
            exces = (trajectoria.puntB.y - this.radi)/this.vy;
            this.posicio.x = trajectoria.puntB.x - exces*this.vx;
            this.posicio.y = this.radi;
            xoc = true;
            this.vy = -this.vy;
        }
        //Xoc lateral esquerra
        if(trajectoria.puntB.x - this.radi < 0){
            exces = (trajectoria.puntB.x - this.radi)/this.vx;
            this.posicio.x = this.radi;
            this.posicio.y = trajectoria.puntB.y - exces*this.vy;
            xoc = true;
            this.vx = -this.vx;
        }
        //Xoc lateral dret
        if(trajectoria.puntB.x + this.radi > joc.amplada){
            exces = (trajectoria.puntB.x + this.radi - joc.amplada)/this.vx;
            this.posicio.x = joc.amplada - this.radi;
            this.posicio.y = trajectoria.puntB.y - exces*this.vy;
            xoc = true;
            this.vx = -this.vx;
        }
        //Xoc lateral inferior
        if (trajectoria.puntB.y + this.radi > joc.alcada) {
            // Reset the ball's position and velocity
            this.posicio.x = joc.amplada / 2;
            this.posicio.y = joc.alcada - 30;
            this.vx = Math.random() < 0.5 ? -1 : 1;  // Reset velocity x to its initial value
            this.vy = -1; // Reset velocity y to its initial value
            this.v = 3;
            this.pala.velocitat = 1;
            xoc = true;
        }
        //Xoc amb la pala
        var objInterseccioPala = this.interseccioSegmentRectangle(trajectoria, this.pala);

        if (objInterseccioPala != undefined) {
            switch (objInterseccioPala.vora) {
                case 'superior':
                    this.posicio.x = objInterseccioPala.pI.x;
                    this.posicio.y = objInterseccioPala.pI.y;
                    xoc = true;
                    this.vy = -this.vy;

                    //Per modificar l'angle de la bola al rebotar segons el moviment de la pala

                    /*  if(this.pala.vx > 0) {
                        if(this.vx < 0) {
                            this.vx *= -this.vx;
                        } else {
                            this.vx *= this.vx;
                        }
                    }

                    if(this.pala.vx < 0) {
                        if(this.vx > 0) {
                            this.vx *= -this.vx;
                        } else {
                            this.vy *= this.vx;
                        }
                    } */
                    
                    break;
                case 'inferior':
                    break;
                case 'esquerra':
                    this.posicio.x = objInterseccioPala.pI.x - this.radi;
                    this.posicio.y = objInterseccioPala.pI.y;
                    xoc = true;
                    this.vx = -this.vx;
                    break;
                case 'dreta':
                    this.posicio.x = objInterseccioPala.pI.x + this.radi;
                    this.posicio.y = objInterseccioPala.pI.y;
                    xoc = true;
                    this.vx = -this.vx;
                    break;
            }
        }

        //Xoc amb els totxos del mur
        for (let i = 0; i < arrayTotxos.length; i++) {
            let totxo = arrayTotxos[i];
            var objInterseccioTotxo = this.interseccioSegmentRectangle(trajectoria, totxo);
            
            if (objInterseccioTotxo != undefined) {
                switch (objInterseccioTotxo.vora) {
                    case 'superior':
                        this.posicio.x = objInterseccioTotxo.pI.x;
                        this.posicio.y = objInterseccioTotxo.pI.y - this.radi;
                        xoc = true;
                        this.vy = -this.vy;
                        break;
                    case 'inferior':
                        this.posicio.x = objInterseccioTotxo.pI.x;
                        this.posicio.y = objInterseccioTotxo.pI.y + this.radi;
                        xoc = true;
                        this.vy = -this.vy;
                        break;
                    case 'esquerra':
                        this.posicio.x = objInterseccioTotxo.pI.x - this.radi;
                        this.posicio.y = objInterseccioTotxo.pI.y;
                        xoc = true;
                        this.vx = -this.vx;
                        break;
                    case 'dreta':
                        this.posicio.x = objInterseccioTotxo.pI.x + this.radi;
                        this.posicio.y = objInterseccioTotxo.pI.y;
                        xoc = true;
                        this.vx = -this.vx;
                        break;
                }
                arrayTotxos.splice(i, 1);
                i--;
            }
        }
        

        if (!xoc){
            this.posicio.x = trajectoria.puntB.x;
            this.posicio.y = trajectoria.puntB.y;
        }   
        
        if(this.v >= 1) {
            this.v = this.v - 0.0002;
            //console.log(this.v);
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

