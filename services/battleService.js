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
  "deu um tapa tão forte que evaporou"
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
