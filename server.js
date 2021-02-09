require('./config/main');
const http = require('http');
const app = require('./app/app');
const logger = require('./logs/logger');
const errorHandler = require('./utils/errorHandler');
const normalizePort = require('./utils/normalizePort');

const port = normalizePort(process.env.HTTP_PORT);

app.set('port', port);

const server = http.createServer(app);

server.on('error', errorHandler);

server.on('listening', () => {
  const address = server.address();
  const bind =
        typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  logger.info('Bdd_Connect Listening on ' + bind);
});

server.listen(port);
