let campoInput = document.querySelectorAll('.campoInput');
let placar_p1 = document.getElementById('placar_p1');
let placar_p2 = document.getElementById('placar_p2');
let doisPlayers = document.getElementById('doisPlayers');

const combVitoria = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

class JogoDaVelha {

    player1;
    player2;
    machine;
    classeP1;
    classeP2;
    qtdVitoriasP1;
    qtdVitoriasP2;
    combinacoesVitoria;

    constructor(combVitoria){
        this.machine = false;
        this.player1 = 0;
        this.player2 = 0;
        this.qtdVitoriasP1 = 0;
        this.qtdVitoriasP2 = 0;
        this.combinacoesVitoria = combVitoria;
    }

    addValor(IndexDiv){

        if(this.player1 == this.player2){
            campoInput[IndexDiv].style.color ='rgb(130, 198, 238)';
            campoInput[IndexDiv].textContent = "X";
            this.player1 +=1;
        }else{
            campoInput[IndexDiv].style.color = '#ff00e5';
            campoInput[IndexDiv].textContent = "O";
            this.player2 +=1;
        }

        this.verificaVitoria();
        this.clear();

    }
    verificaVitoria(){
        this.combinacoesVitoria.forEach((el,i,arr) => {
            
            let verificaCondicao = el.every((el) => {
                return campoInput[el].textContent != ""
            })
            if(verificaCondicao){
                let v = campoInput[el[0]].textContent == campoInput[el[1]].textContent && campoInput[el[0]].textContent == campoInput[el[2]].textContent;
                if(v){
                    this.addPlacar(campoInput[el[0]].textContent)
                    this.reset()
                }
            }
        })
    }

    clear(){
        let verifica = Array.from(campoInput).every(el => {
            return el.textContent != ""
        })

        if(verifica){
            this.reset()
        }
    }

    reset(){
        this.player1 = 0;
        this.player2 = 0;
        this.machine = false;
        doisPlayers.textContent = 'Modo Multiplayers';

        campoInput.forEach(el => {
            el.textContent = ''
        })

    }

    addPlacar(vencedor){
        if(vencedor == "X"){
            this.qtdVitoriasP1 +=1;
            placar_p1.textContent = this.qtdVitoriasP1;
        }else if(vencedor == "O"){
            this.qtdVitoriasP2 +=1;
            placar_p2.textContent = this.qtdVitoriasP2;
        }
    }

    playWithMachine(){
        let newArr = Array.from(campoInput);
        let numAle = Math.floor(Math.random()*newArr.length)
            
        if(campoInput[numAle].textContent == ""){
            game.addValor(numAle)
        }else{
        game.playWithMachine()
        }     
    }
}


let game = new JogoDaVelha(combVitoria);


campoInput.forEach((el, i, _arr) => {
    el.addEventListener('click', (e) => {
        game.addValor(i)
        if(game.machine){
            setTimeout(game.playWithMachine, 1500);   
        }
    })
})


doisPlayers.addEventListener('click', (e) => {
    game.machine = !game.machine

    let showName = (game.machine)? doisPlayers.textContent = 'Modo Máquina' : doisPlayers.textContent = 'Modo Multiplayers'
