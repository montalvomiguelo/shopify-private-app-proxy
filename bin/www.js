#!/usr/bin/env node
require('dotenv').config();
const http = require('http');
const chalk = require('chalk');
const { PORT = 3000 } = process.env;
const app = require('../app');

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT);

server.on('error', error => {
  console.log('😫', chalk.red(error));
});

server.on('listening', () => {
  console.log(`🚀 Now listening on port ${chalk.green(PORT)}`);
});
