/*
* CLASSE MUR
*/

class Mur {
    constructor(numeroTotxos, dificultat) {
        this.numeroTotxos = numeroTotxos;
        this.dificultat = dificultat;
    }

    generaMur(){
       for(var i = 0; i < this.numeroTotxos; i++) {
            this.totxo = new Totxo();
       }
    }
    draw(ctx){
       
    }
     
    defineixNivells(){
        this.nivells=[
            {
                color: "#4CF", // blue cel
                totxos:[
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                ]
            },
            {
                color: "#8D1", // verd
                totxos:[
                    "aaaaaaaaaaaa",
                    "     aa     ",
                    "   aaaaaa   ",
                    "   aaaaaa   ",
                    "     aa     ",
                ]
            },
            {
                color: "#D30", // vermell
                totxos:[
                    "aaaaaaaaaaaa",
                    "a          a",
                    " a        a ",
                    "aa        aa",
                    "  aaaaaaaa  ",
                ]
            }
        ];
    }

};