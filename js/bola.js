class Bola {
    constructor(puntPosicio, radi) {
        this.radi = radi;
        this.posicio = puntPosicio;
        this.vx = 1;
        this.vy = -1;
        this.color = "#fff";
      
    };

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
    update(){

        let puntActual = this.posicio;
        let puntSeguent= new Punt(this.posicio.x + this.vx,
                            this.posicio.y + this.vy);
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
        if(trajectoria.puntB.y + this.radi > joc.alcada){
            exces = (trajectoria.puntB.y + this.radi - joc.alcada)/this.vy;
            this.posicio.x = trajectoria.puntB.x - exces*this.vx;
            this.posicio.y = joc.alcada - this.radi;
            xoc = true;
            this.vy = -this.vy;

            //alert("Has perdut");
        }
        //Xoc amb la pala

        //Xoc amb els totxos del mur
        //Utilitzem el mètode INTERSECCIOSEGMENTRECTANGLE
        

        if (!xoc){
            this.posicio.x = trajectoria.puntB.x;
            this.posicio.y = trajectoria.puntB.y;
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
       //vora superior
       let segmentVoraSuperior = new  Segment(rectangle.posicio,
           new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y));
       //vora inferior
      
       //vora esquerra
      
       //vora dreta
      

       //2n REVISAR SI EXISTEIX UN PUNT D'INTERSECCIÓ EN UN DELS 4 SEGMENTS
       //SI EXISTEIX, QUIN ÉS AQUEST PUNT
       //si hi ha més d'n, el més ajustat
    
       //vora superior
       puntI = segment.puntInterseccio(segmentVoraSuperior);
       if (puntI){
           //distancia entre dos punts, el punt inicial del segment i el punt d'intersecció
           distanciaI = Punt.distanciaDosPunts(segment.puntA,puntI);
           if (distanciaI < distanciaIMin){
               distanciaIMin = distanciaI;
               puntIMin = puntI;
               voraI = "superior";
           }
       }
       //vora inferior
       
       //vora esquerra
      
       //vora dreta
       
       //Retorna la vora on s'ha produït la col·lisió, i el punt (x,y)
       if(voraI){
           return {pI: puntIMin, vora: voraI};
       }
    }

    distancia = function(p1,p2){
        return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y));
    }
}

