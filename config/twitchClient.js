const tmi = require('tmi.js');

function setupTwitchClient() {
  return new tmi.Client({
    options: { debug: true },
    connection: {
      reconnect: true,
      secure: true
    },
    identity: {
      username: process.env.TWITCH_USERNAME,
      password: process.env.TWITCH_OAUTH
    },
    channels: [process.env.TWITCH_CHANNEL]
  });
}

module.exports = { setupTwitchClient };
