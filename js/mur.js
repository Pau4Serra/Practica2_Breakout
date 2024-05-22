/*
* CLASSE MUR
*/

class Mur {
    constructor(dificultat, arrayTotxos) {
        this.dificultat = dificultat;
        this.arrayTotxos = arrayTotxos;
    }

    generaMur(){
        var margin = 15;
        var x = 5;
        var y = 15;
        var totxoTemp;
        for(var i = 0; i < this.nivells[this.dificultat].totxos.length; i++) {
            for(var j = 0; j < this.nivells[this.dificultat].totxos[i].length; j++) {
                if(this.nivells[this.dificultat].totxos[i].charAt(j) === 'a') {
                    totxoTemp = new Totxo(new Punt(x + margin, y), 25, 10, this.nivells[this.dificultat].color);
                    this.arrayTotxos.push(totxoTemp);
                }
                x = x + 15 + margin;
            }
            y = y + margin;
            x = 5;
        }
        //console.log(this.arrayTotxos);
        //console.log(y);
    }
    draw(ctx){
       this.arrayTotxos.forEach(element => {
        element.draw(ctx);
       });
    }
     
    defineixNivells(){
        this.nivells=[
            {
                color: "#FF75ED", // rosa
                totxos:[
                    "aaaaaaaaa",
                    "aaaaaaaaa",
                    "aaaaaaaaa",
                    "aaaaaaaaa",
                ]
            },
            {
                color: "#DFFA4B", // groc
                totxos:[
                    " aaaaaaa ",
                    "   aaa   ",
                    "  aaaaa ",
                    " aaaaaaa ",
                    "   aaa   ",
                ]
            },
            {
                color: "#28F7AD", // verd
                totxos:[
                    " aaaaaaa",
                    "aa a a aa",
                    "a a a a a",
                    "aa a a aa",
                    " aaaaaaa ",
                ]
            },
        ];
    }
};