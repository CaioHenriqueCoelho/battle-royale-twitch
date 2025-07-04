# Batalha ao Vivo

Projeto Node.js para uma batalha interativa em tempo real entre guerreiros no Twitch, com painel web e WebSocket.

---

## 🖥️ Visão geral

Este sistema conecta um bot Twitch que detecta comandos de entrada na batalha (`!BATALHA`), e um painel web que mostra guerreiros, eventos e permite iniciar/resetar a batalha com atualizações em tempo real via WebSocket.

---

## ⚙️ Funcionalidades

- Autenticação básica no painel  
- Inscrição de guerreiros via chat do Twitch  
- Simulação automática da batalha com eventos aleatórios  
- Atualização em tempo real pelo WebSocket  
- Controle da batalha pelo painel (iniciar/resetar)

---

## 📝 Como usar

1. Configure as variáveis de ambiente no arquivo `.env`:
2. Instale dependências e rode o servidor:  
```bash
npm install
npm start```

