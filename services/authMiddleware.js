const USERNAME = process.env.AUTH_USERNAME;
const PASSWORD = process.env.AUTH_PASSWORD;

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.set('WWW-Authenticate', 'Basic realm="Área restrita"');
    return res.status(401).send('Autenticação necessária');
  }

  const [, encoded] = auth.split(' ');
  const decoded = Buffer.from(encoded, 'base64').toString();
  const [user, pass] = decoded.split(':');

  if (user === USERNAME && pass === PASSWORD) {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="Área restrita"');
  return res.status(401).send('Credenciais inválidas');
}

module.exports = { authMiddleware };
