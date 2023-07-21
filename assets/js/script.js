let jogarNovamente = true
let tentativas = 6
let listaDin = []
let palavraCategoria
let palavraSorteada
let palavras = []
let jogoAutomatico = true

carregaListaAutomatica()

criarPalavra()
function criarPalavra() {
    const indexPalavra = parseInt(Math.random() * palavras.length)

    palavraSorteada = palavras[indexPalavra].nome;
    palavraCategoria = palavras[indexPalavra].categoria;

}

montarPalavra()
function montarPalavra() {
    const categoria = document.getElementById("categoria")
    categoria.innerHTML = palavraCategoria;

    const palavraTela = document.getElementById("palavra-secreta")
    palavraTela.innerHTML = " ";

    for (i = 0; i < palavraSorteada.length; i++) {
        if (listaDin[i] == undefined) {
            if(palavraSorteada[i] === " "){
                listaDin[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDin[i] + "</div>"
            }
            else{
                listaDin[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDin[i] + "</div>"
            } 
        }
        else {
            if(palavraSorteada[i] === " "){
                listaDin[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDin[i] + "</div>"
            }
            else {
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDin[i] + "</div>"
            }      
        }
    }
}

function letraEscolhida(letra) {
    document.getElementById("tecla-" + letra).disabled = true
    if (tentativas > 0) {
        mudarStyleLetra("tecla-" + letra, false);
        comparaListas(letra);
        montarPalavra();

    }
}

function mudarStyleLetra(tecla, condicao) {
    if(condicao == false){
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }


}

function comparaListas(letra) {
    const pos = palavraSorteada.indexOf(letra)
    if (pos < 0) {
        tentativas--
        carregaImagem();
        if (tentativas == 0){
            abreModal("FIM DE JOGO!", "VOCÊ PERDEU! A PALAVRA SECRETA ERA: <strong>" + palavraSorteada + "<strong>");
            botaoReiniciar()
        }
        
    }
    else {
        mudarStyleLetra("tecla-" + letra, true);
        for (i = 0; i < palavraSorteada.length; i++) {
            if (palavraSorteada[i] == letra) {
                listaDin[i] = letra;
            }
        }
    }

    let vitoria = true;
    for (i = 0; i < palavraSorteada.length; i++) {
        if (palavraSorteada[i] != listaDin[i])
            vitoria = false;
    }

    if (vitoria == true) {
        abreModal("PARABÉNS!", `VOCÊ GANHOU!`);
        tentativas = 0;
        botaoReiniciar()
    }

}

async function botaoReiniciar() {
    while(jogarNovamente == true){
        document.getElementById("btn-res").style.backgroundColor = 'red';
        document.getElementById("btn-res").style.scale = 1.3
        await atraso(500)
        document.getElementById("btn-res").style.backgroundColor = 'yellow';
        document.getElementById("btn-res").style.scale = 1.3
        await atraso(500)
        
    }

}

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))
}

function carregaImagem() {
    switch (tentativas) {
        case 5:
            document.getElementById("img").style.background = "url('./assets/img/f02.png')";
            break;
        case 4:
            document.getElementById("img").style.background = "url('./assets/img/f03.png')";
            break;
        case 3:
            document.getElementById("img").style.background = "url('./assets/img/f04.png')";
            break;
        case 2:
            document.getElementById("img").style.background = "url('./assets/img/f05.png')";
            break;
        case 1:
            document.getElementById("img").style.background = "url('./assets/img/f06.png')";
            break;
        case 0:
            document.getElementById("img").style.background = "url('./assets/img/f07.png')";
            break;
            default:
                document.getElementById("img").style.background = "url('./assets/img/f01.png')";
            break;
    }
}

function abreModal( titulo, mensagem) {
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;
    $("#myModal").modal({
        show: true
    })
}

let btnres = document.querySelector("#btn-res")
btnres.addEventListener("click", function(){
location.reload();
})

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = []
        jogoAutomatico = false

        document.getElementById("abreModalAddPalavra").style.display = "block"
        document.getElementById("status").innerHTML = "Modo Manual"

    } else{// ativa o modo automatico
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true

        document.getElementById("abreModalAddPalavra").style.display = "none"
        document.getElementById("status").innerHTML = "Modo Automático"
    }
}

const modal = document.getElementById("modal-alerta")

const btnAbreModal = document.getElementById("abreModalAddPalavra")
btnAbreModal.onclick = function(){
    modal.style.display = "block"
}

const btnFechaModal = document.getElementById("fechaModal")
btnFechaModal.onclick = function(){
    modal.style.display = "none"
    document.getElementById("addPalavra").value = ""
    document.getElementById("addCategoria").value = ""
}

window.onclick = function(){
    if (event.target == modal){ 
        modal.style.display = "none"
        document.getElementById("addPalavra").value = ""
        document.getElementById("addCategoria").value = ""
    }
    
}

function carregaListaAutomatica(){
    palavras = [
        {
            nome: "SINGAPURA",
            categoria: "PAÍSES"
        },
        {
            nome: "MEXICO",
            categoria: "PAÍSES"
        },
        {
            nome: "PORTUGAL",
            categoria: "PAÍSES"
        },
        {
            nome: "CHILE",
            categoria: "PAÍSES"
        },
        {
            nome: "INDONÉSIA",
            categoria: "PAÍSES"
        },
        {
            nome: "EGITO",
            categoria: "PAÍSES"
        },
        {
            nome: "TURQUIA",
            categoria: "PAÍSES"
        },
        {
            nome: "BRASIL",
            categoria: "PAÍSES"
        },
        {
            nome: "CHINA",
            categoria: "PAÍSES"
        },
        {
            nome: "CUBA",
            categoria: "PAÍSES"
        },
        {
            nome: "NAVIO",
            categoria: "TRANSPORTE"
        },
        {
            nome: "AVIAO",
            categoria: "TRANSPORTE"
        },
        {
            nome: "CARRO",
            categoria: "TRANSPORTE"
        },
        {
            nome: "BICICLETA",
            categoria: "TRANSPORTE"
        },
        {
            nome: "PATINETE",
            categoria: "TRANSPORTE"
        },
        {
            nome: "LANCHA",
            categoria: "TRANSPORTE"
        },
        {
            nome: "MOTO",
            categoria: "TRANSPORTE"
        },
        {
            nome: "ONIBUS",
            categoria: "TRANSPORTE"
        },
        {
            nome: "TREM",
            categoria: "TRANSPORTE"
        },
        {
            nome: "METRO",
            categoria: "TRANSPORTE"
        },
        {
            nome: "BONE",
            categoria: "VESTIMENTAS"
        },
        {
            nome: "MOLETOM",
            categoria: "VESTIMENTAS"
        },
        {
            nome: "CAMISA",
            categoria: "VESTIMENTAS"
        },
        {
            nome: "BOTA",
            categoria: "VESTIMENTAS"
        },
        {
            nome: "VESTIDO",
            categoria: "VESTIMENTAS"
        },
        {
            nome: "MEIA",
            categoria: "VESTIMENTAS"
        },
        {
            nome: "CHAPEU",
            categoria: "VESTIMENTAS"
        },
        {
            nome: "BERMUDA",
            categoria: "VESTIMENTAS"
        },
        {
            nome: "TENIS",
            categoria: "VESTIMENTAS"
        },
        {
            nome: "SAPATO",
            categoria: "VESTIMENTAS"
        },
        {
            nome: "JAVASCRIPT",
            categoria: "LINGUAGEM DE PROGRAMAÇÃO"
        },
        {
            nome: "PYTHON",
            categoria: "LINGUAGEM DE PROGRAMAÇÃO"
        },
        {
            nome: "JAVA",
            categoria: "LINGUAGEM DE PROGRAMAÇÃO"
        },
        {
            nome: "BANCO DE DADOS",
            categoria: "LINGUAGEM DE PROGRAMAÇÃO"
        },
        {
            nome: "SWIFT",
            categoria: "LINGUAGEM DE PROGRAMAÇÃO"
        },
        {
            nome: "RUBY",
            categoria: "LINGUAGEM DE PROGRAMAÇÃO"
        },
        {
            nome: "GOOGLE",
            categoria: "SITES"
        },
        {
            nome: "LINKEDIN",
            categoria: "SITES"
        },
        {
            nome: "TWITTER",
            categoria: "SITES"
        },
        {
            nome: "YOUTUBE",
            categoria: "SITES"
        },
        {
            nome: "INSTAGRAM",
            categoria: "SITES"
        },
        {
            nome: "OPERA",
            categoria: "SITES"
        },
        {
            nome: "BRAVE",
            categoria: "SITES"
        },
        {
            nome: "FACEBOOK",
            categoria: "SITES"
        },
        {
            nome: "TWICH",
            categoria: "SITES"
        },
        {
            nome: "TIGRE",
            categoria: "ANIMAIS"
        },
        {
            nome: "ELEFANTE",
            categoria: "ANIMAIS"
        },
        {
            nome: "URSO",
            categoria: "ANIMAIS"
        },
        {
            nome: "GOLFINHO",
            categoria: "ANIMAIS"
        },
        {
            nome: "GIRAFA",
            categoria: "ANIMAIS"
        },
        {
            nome: "CROCODILO",
            categoria: "ANIMAIS"
        },
        {
            nome: "GUEPARDO",
            categoria: "ANIMAIS"
        },
        {
            nome: "BALEIA",
            categoria: "ANIMAIS"
        },
        {
            nome: "LEOPARDO",
            categoria: "ANIMAIS"
        },
        {
            nome: "GORILA",
            categoria: "ANIMAIS"
        },
        {
            nome: "STRANGER THINGS",
            categoria: "FILMES E SERIES"
        },
        {
            nome: "BREAKING BAD",
            categoria: "FILMES E SERIES"
        },
        {
            nome: "GREYS ANATOMY",
            categoria: "FILMES E SERIES"
        },
        {
            nome: "SMALLVILLE",
            categoria: "FILMES E SERIES"
        },
        {
            nome: "VINGADORES",
            categoria: "FILMES E SERIES"
        },
        {
            nome: "TITANIC",
            categoria: "FILMES E SERIES"
        },
        {
            nome: "FROZEN",
            categoria: "FILMES E SERIES"
        },
        {
            nome: "JURASSIC PARK",
            categoria: "FILMES E SERIES"
        },
        {
            nome: "RAMBO",
            categoria: "FILMES E SERIES"
        },
        {
            nome: "PEAKY BLINDERS",
            categoria: "FILMES E SERIES"
        },
        {
            nome: "BATMAN",
            categoria: "HEROIS"
        },
        {
            nome: "SUPERMAN",
            categoria: "HEROIS"
        },
        {
            nome: "MULHER MARAVILHA",
            categoria: "HEROIS"
        },
        {
            nome: "FLASH",
            categoria: "HEROIS"
        },
        {
            nome: "HOMEM DE FERRO",
            categoria: "HEROIS"
        },
        {
            nome: "HOMEM ARANHA",
            categoria: "HEROIS"
        },
        {
            nome: "CAPITAO AMERICA",
            categoria: "HEROIS"
        },
        {
            nome: "THOR",
            categoria: "HEROIS"
        },
        {
            nome: "DEADPOOL",
            categoria: "HEROIS"
        },
        {
            nome: "HULK",
            categoria: "HEROIS"
        },
    
    ]
}

function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase()
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase()

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO!", " Palavra ou categoria inválidos")
        return
    }
    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra)
    sortear()
  
    document.getElementById("addPalavra").value = ""
    document.getElementById("addCategoria").value = ""


}

function isNullOrWhiteSpace(input){
    return !input || !input.trim()
}

function sortear(){
    if (jogoAutomatico == true) {
        location.reload()
    }else{
        if (palavras.length > 0) {
            listaDin = []
            criarPalavra()
            montarPalavra()
            tentativas = 6
        }
    }
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDin=[];
            criarPalavra();
            montarPalavra();
            resetaTeclas();
            tentativas = 6;
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}

