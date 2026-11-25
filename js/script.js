/* =========================================================
   VARIÁVEIS GLOBAIS
   ========================================================= */

let musicas = [];
let musicaAtual = null;

/* =========================================================
   CARREGA AS MÚSICAS DO ARQUIVO JSON
   ========================================================= */

function carregarMusicas() {

    fetch("musicas.json")
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(dados) {
            musicas = dados;
            criarMenuMusicas();
        })
        .catch(function(erro) {
            console.error("Erro ao carregar as músicas:", erro);
        });
}

/* =========================================================
   CRIA A LISTA DE BOTÕES DE MÚSICAS NO MENU
   ========================================================= */

function criarMenuMusicas() {

    const lista = document.getElementById("lista-musicas");
    lista.innerHTML = "";

    musicas.forEach(function(musica, indice) {

        const botao = document.createElement("button");
        botao.className = "botao-menu botao-musica";
        botao.id = "btn-musica-" + indice;
        botao.textContent = "▶ " + musica.nome;

        botao.onclick = function() {
            selecionarMusica(indice, botao);
        };

        lista.appendChild(botao);
    });
}

/* =========================================================
   DESTAQUE VISUAL DE BOTÃO ATIVO
   ========================================================= */

function destacarBotaoAtivo(botaoAtivo) {
    const todosBotoes = document.querySelectorAll(".botao-menu");
    todosBotoes.forEach(function(btn) {
        btn.classList.remove("ativo");
    });

    if (botaoAtivo) {
        botaoAtivo.classList.add("ativo");
    }
}

/* =========================================================
   SELECIONA UMA MÚSICA E MOSTRA O PAINEL DE MÚSICA
   ========================================================= */

function selecionarMusica(indice, botaoElemento) {

    musicaAtual = musicas[indice];
    if (!musicaAtual) return;

    // Alterna os painéis principais: mostra músicas e esconde toques
    document.getElementById("painel-musica").style.display = "block";
    document.getElementById("painel-toques").style.display = "none";

    // Destaca o botão selecionado
    if (botaoElemento) {
        destacarBotaoAtivo(botaoElemento);
    } else {
        const btn = document.getElementById("btn-musica-" + indice);
        destacarBotaoAtivo(btn);
    }

    // Atualiza nome da música
    document.getElementById("nome-musica").textContent = musicaAtual.nome;

    // Atualiza autor e ano
    let informacaoAutor = musicaAtual.autor || "";
    if (musicaAtual.ano) {
        informacaoAutor += " • " + musicaAtual.ano;
    }
    document.getElementById("autor-musica").textContent = informacaoAutor;

    // Atualiza letra
    mostrarLetra(musicaAtual.letra || "");

    // Atualiza áudio
    const audio = document.getElementById("audio");
    audio.src = musicaAtual.audio || "";
    audio.currentTime = 0;

    // Reseta área das alas
    document.getElementById("nome-ala").textContent = "Selecione uma ala";
    document.getElementById("texto-ala").textContent = "Escolha uma das alas acima.";
}

/* =========================================================
   MOSTRA A LETRA DA MÚSICA (COM INSTRUÇÕES EM DESTAQUE)
   ========================================================= */

function mostrarLetra(letra) {

    const texto = document.getElementById("texto-letra");
    texto.innerHTML = "";

    const partes = letra.split(/(\{[^}]*\})/g);

    partes.forEach(function(parte) {
        if (parte.startsWith("{") && parte.endsWith("}")) {
            const instrucao = document.createElement("span");
            instrucao.className = "instrucao-letra";
            instrucao.textContent = parte;
            texto.appendChild(instrucao);
        } else {
            texto.appendChild(document.createTextNode(parte));
        }
    });
}

/* =========================================================
   MOSTRA A FORMA DE TOCAR DE UMA ALA
   ========================================================= */

function mostrarAla(ala) {

    if (musicaAtual == null) {
        alert("Primeiro selecione uma música na lista.");
        return;
    }

    const nomes = {
        xequere: "Xequerê",
        agogo: "Agogô",
        gongue: "Gonguê",
        caixa: "Caixa",
        alfaia: "Alfaia",
        canto: "Canto"
    };

    document.getElementById("nome-ala").textContent = nomes[ala] || ala;
    document.getElementById("texto-ala").textContent = 
        (musicaAtual.alas && musicaAtual.alas[ala]) ? musicaAtual.alas[ala] : "Sem instruções cadastradas.";
}

/* =========================================================
   EXIBE A SEÇÃO DE TOQUES DE UM INSTRUMENTO
   ========================================================= */

function mostrarToques(instrumento, botaoElemento) {

    // Se houver música tocando no player de áudio, pausa para não sobrepor o som
    const audio = document.getElementById("audio");
    if (audio) {
        audio.pause();
    }

    // Alterna os painéis principais: mostra toques e esconde música
    document.getElementById("painel-musica").style.display = "none";
    document.getElementById("painel-toques").style.display = "block";

    // Oculta todas as seções de instrumentos
    const secoes = document.querySelectorAll(".secao-instrumento");
    secoes.forEach(function(secao) {
        secao.style.display = "none";
    });

    // Mostra a seção do instrumento clicado
    const secaoAlvo = document.getElementById("toques-" + instrumento);
    if (secaoAlvo) {
        secaoAlvo.style.display = "block";
    }

    // Atualiza botão com destaque visual
    if (botaoElemento) {
        destacarBotaoAtivo(botaoElemento);
    } else {
        const btn = document.getElementById("btn-toque-" + instrumento);
        destacarBotaoAtivo(btn);
    }
}

/* =========================================================
   INICIALIZAÇÃO DA PÁGINA
   ========================================================= */

// Carrega as músicas do JSON
carregarMusicas();

// Inicia com a visualização dos Toques de Caixa (conforme solicitado para o início)
document.addEventListener("DOMContentLoaded", function() {
    mostrarToques("caixas");
});
