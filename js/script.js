/* =========================================================
   MÚSICAS
   ========================================================= */

let musicas = [];


/* =========================================================
   MÚSICA ATUAL
   ========================================================= */

let musicaAtual = null;



/* =========================================================
   CARREGA AS MÚSICAS
   ========================================================= */

function carregarMusicas() {


    fetch("musicas.php")


        .then(function(resposta) {

            return resposta.json();

        })


        .then(function(dados) {

            musicas = dados;

            criarMenuMusicas();

        })


        .catch(function(erro) {

            console.error(
                "Erro ao carregar as músicas:",
                erro
            );

        });

}



/* =========================================================
   CRIA A LISTA DE MÚSICAS
   ========================================================= */

function criarMenuMusicas() {


    const lista =
        document.getElementById("lista-musicas");


    lista.innerHTML = "";


    musicas.forEach(function(musica, indice) {


        const botao =
            document.createElement("button");


        botao.className =
            "botao-musica";


        botao.textContent =
            "▶ " + musica.nome;


        botao.onclick = function() {

            selecionarMusica(indice);

        };


        lista.appendChild(botao);


    });

}



/* =========================================================
   SELECIONA UMA MÚSICA
   ========================================================= */

function selecionarMusica(indice) {


    musicaAtual =
        musicas[indice];


    /* =====================================================
       NOME
       ===================================================== */

    document.getElementById(
        "nome-musica"
    ).textContent =
        musicaAtual.nome;



    /* =====================================================
       AUTOR E ANO
       ===================================================== */

    let informacaoAutor =
        musicaAtual.autor || "";


    if (musicaAtual.ano) {

        informacaoAutor +=
            " • " + musicaAtual.ano;

    }


    document.getElementById(
        "autor-musica"
    ).textContent =
        informacaoAutor;



    /* =====================================================
       LETRA
       ===================================================== */
	/*
    document.getElementById(
        "texto-letra"
    ).textContent =
        musicaAtual.letra || "";
	*/

	mostrarLetra(musicaAtual.letra || "");


    /* =====================================================
       ÁUDIO
       ===================================================== */

    const audio =
        document.getElementById("audio");


    audio.src =
        musicaAtual.audio;


    /*
       Volta o player para o início
       quando uma nova música é selecionada.
    */

    audio.currentTime = 0;



    /* =====================================================
       ÁREA DAS ALAS
       ===================================================== */

    document.getElementById(
        "nome-ala"
    ).textContent =
        "Selecione uma ala";


    document.getElementById(
        "texto-ala"
    ).textContent =
        "Escolha uma das alas acima.";

}

/* =========================================================
   MOSTRA A LETRA DA MÚSICA
   ========================================================= */

function mostrarLetra(letra) {

    const texto =
        document.getElementById("texto-letra");


    const partes =
        letra.split(/(\{[^}]*\})/g);


    texto.innerHTML = "";


    partes.forEach(function(parte) {


        if (
            parte.startsWith("{") &&
            parte.endsWith("}")
        ) {


            const instrucao =
                document.createElement("span");


            instrucao.className =
                "instrucao-letra";


            instrucao.textContent =
                parte;


            texto.appendChild(
                instrucao
            );


        } else {


            texto.appendChild(
                document.createTextNode(parte)
            );


        }

    });

}

/* =========================================================
   MOSTRA A FORMA DE TOCAR
   ========================================================= */

function mostrarAla(ala) {


    if (musicaAtual == null) {


        alert(
            "Primeiro selecione uma música."
        );


        return;

    }



    /* =====================================================
       NOMES DAS ALAS
       ===================================================== */

    const nomes = {


        xequere:
            "Xequêrê",


        agogo:
            "Agogô",


        gongue:
            "Gonguê",


        caixa:
            "Caixa",


        alfaia:
            "Alfaia",


        canto:
            "Canto"

    };



    /* =====================================================
       NOME DA ALA
       ===================================================== */

    document.getElementById(
        "nome-ala"
    ).textContent =
        nomes[ala];



    /* =====================================================
       EXPLICAÇÃO DA ALA
       ===================================================== */

    document.getElementById(
        "texto-ala"
    ).textContent =
        musicaAtual.alas[ala] || "";

}



/* =========================================================
   INICIA A PÁGINA
   ========================================================= */

carregarMusicas();
