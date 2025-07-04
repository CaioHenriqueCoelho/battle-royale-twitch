const { broadcast } = require('../utils/broadcast');

let batalhaEmAndamento = false;
const guerreiros = [];
const mensagens = [];

const termos = [
  "quebrou uma garrafa na cabeça de",
  "soterrrou com uma avalanche de memes o(a)",
  "derrubou uma bigorna digna do Papaleguas em cima de",
  "lançou uma bola de fogo que torrou",
  "congelou completamente o(a)",
  "invocou um exército de patos furiosos contra",
  "fez o chão sumir embaixo de",
  "deu um tapa tão forte que evaporou",
  "desferiu um chute giratório digno de anime em",
  "deu uma rasteira cósmica em",
  "invocou um meteoro diretamente sobre",
  "prendeu em um labirinto infinito o(a)",
  "ativou um modo berserker e destruiu",
  "fez um combo de 99 hits em",
  "colocou uma armadilha de urso gigante e capturou",
  "lançou raios laser pelos olhos contra",
  "fez uma dança mortal que hipnotizou e eliminou",
  "chamou um golem de pedra para esmagar",
  "disparou uma rajada de vento cortante contra",
  "usou uma poção do caos e obliterou",
  "abriu um portal e jogou dentro o(a)",
  "puxou uma espada lendária e cravou em",
  "jogou uma bomba de glitter explosiva no rosto de",
  "trollou tanto que fez rage quit em",
  "fez um jutsu secreto que derrotou",
  "chamou o Chuck Norris pra lidar com",
  "invocou uma tempestade de raios sobre",
  "usou a força bruta de um ogro para esmagar",
  "deu uma mordida crítica de vampiro em",
  "esfregou um peixe podre na cara de",
  "acertou uma bola de boliche flamejante em",
  "conjurou mil abelhas furiosas contra",
  "cantou tão mal que explodiu os tímpanos de",
  "escondeu minas terrestres no caminho de",
  "empurrou num poço sem fundo o(a)",
  "lançou uma bomba de fumaça e apareceu atrás de",
  "usou um megafone até deixar surdo o(a)",
  "prendeu dentro de uma gelatina gigante o(a)",
  "conjurou um clone e atacou em sincronia",
  "liberou gás do riso até sufocar",
  "transformou em pedra com um olhar de Medusa",
  "inundou a arena e afogou",
  "disfarçou-se de árvore e pegou de surpresa",
  "caiu do céu montado em uma águia e atingiu",
  "usou um teclado gamer como arma para espancar",
  "gritou tão alto que fez a alma de sair do corpo de",
  "implantou um vírus digital e travou o sistema de",
  "invocou um tsunami de slime sobre",
  "chamou um exército de hamsters para devorar",
  "entrou em modo God e obliterou",
  "arremessou uma geladeira em cima de",
    "aniquilou completamente",
  "deixou sem vida o corpo de",
  "cravou sua lâmina na alma de",
  "decapitou brutalmente",
  "soterrrou vivo o(a)",
  "desintegrou com pura fúria",
  "executou friamente",
  "reduziu a pó os restos de",
  "transformou em lembrança o(a)",
  "mandou para o além sem cerimônia",
  "partiu em dois com um golpe só",
  "despedaçou os ossos de",
  "reduziu à sombra o(a)",
  "esfarelou sem piedade",
  "sacrificou ao Deus da Guerra",
  "fez sumir da existência",
  "retirou do jogo com precisão cirúrgica",
  "eliminou da competição com brutalidade",
  "estampou no muro a cabeça de",
  "queimou até as cinzas o(a)",
  "deu um fim trágico a",
  "pisoteou até não restar nada de",
  "sugou a alma de",
  "esmagou sem remorso",
  "trucidou com fúria bárbara",
  "arrancou o coração de",
  "expulsou da vida com um golpe só",
  "reduziu a pixels o(a)",
  "colocou no chão e garantiu a kill",
  "mandou direto para o lobby",
  "matou com estilo e deboche",
  "apagou a existência de",
  "tirou da partida com headshot",
  "deu o último golpe em",
  "encerrou a jornada de",
  "eliminou em câmera lenta",
  "derrotou com um ataque surpresa",
  "desapareceu com o corpo de",
  "encerrou com um golpe final épico",
  "riscou da lista o nome de",
  "deu um combo fatal em",
  "foi responsável pela queda de",
  "pintou o chão com o sangue de",
  "condenou à morte cruelmente",
  "não deu chance de respawn para",
  "foi o carrasco de",
  "deixou os restos mortais de",
  "acabou com o sonho de vitória de",
  "aplicou uma sentença de morte em",
  "levou à morte gloriosa"
];

function handleBattleCommand(nome) {
  if (batalhaEmAndamento || guerreiros.find(g => g.name === nome)) return;

  guerreiros.push({ name: nome });
  console.log(`[BATALHA] ${nome} entrou na guerra!`);
  broadcast({ tipo: 'atualizacao', guerreiros });
}

function simularBatalha() {
  if (guerreiros.length < 2) {
    mensagens.push("⚠️ Não há guerreiros suficientes para iniciar a batalha.");
    broadcast(getBattleState());
    return;
  }

  let vivos = [...guerreiros];

  const interval = setInterval(() => {
    if (vivos.length <= 1) {
      const vencedor = vivos[0];
      mensagens.push(
        vencedor
          ? `🏆 ${vencedor.name} venceu a batalha!`
          : `⚠️ Ninguém sobreviveu!`
      );
      broadcast(getBattleState());
      clearInterval(interval);
      return;
    }

    const [i1, i2] = getTwoDifferentIndexes(vivos.length);
    const assassino = vivos[i1];
    const vitima = vivos[i2];
    const acao = termos[Math.floor(Math.random() * termos.length)];

    const evento = `💥 ${assassino.name} ${acao} ${vitima.name}`;
    mensagens.push(evento);
    broadcast({ tipo: 'evento', texto: evento });

    vivos.splice(i2, 1); // remove vítima
  }, 2000);
}

function getTwoDifferentIndexes(length) {
  const i1 = Math.floor(Math.random() * length);
  let i2;
  do {
    i2 = Math.floor(Math.random() * length);
  } while (i1 === i2);
  return [i1, i2];
}

function resetBattle() {
  batalhaEmAndamento = false;
  guerreiros.length = 0;
  mensagens.length = 0;
  broadcast(getBattleState());
}

function startBattle() {
  if (!batalhaEmAndamento) {
    batalhaEmAndamento = true;
    mensagens.push("🔥 A batalha começou!");
    broadcast(getBattleState());
    simularBatalha();
  }
}

function getBattleState() {
  return { tipo: 'atualizacao', guerreiros, mensagens };
}

module.exports = {
  handleBattleCommand,
  resetBattle,
  startBattle,
  getBattleState
};
