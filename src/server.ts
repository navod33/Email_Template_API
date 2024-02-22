import dotenv from 'dotenv';
const express = require('express');
const errorHandler = require('./middleware/error-handler');
const requestLogger = require('./middleware/request-logger');
const responseHandler = require('./middleware/response-handler');

import companyRoutes from './Routes/Company';
import eventRoutes from './Routes/Event';
import templateRoutes from './Routes/Template';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env' });
}

import { app } from './app';
import MongoConnection from './mongo-connection';
import { logger } from './logger';

// Apply middleware
app.use(requestLogger);
app.use(responseHandler);
app.use(errorHandler);

const mongoConnection = new MongoConnection(process.env.MONGO_URL);

if (process.env.MONGO_URL == null) {
  logger.log({
    level: 'error',
    message: 'MONGO_URL not specified in environment'
  });
  process.exit(1); 
} else {
  mongoConnection.connect(() => {
    app.listen(app.get('port'), (): void => {
      console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
        `🌏 Express server started at http://localhost:${app.get('port')}   `);
    });
  });
}

// routes
app.use('/api', companyRoutes);
app.use('/api', eventRoutes);
app.use('/api', templateRoutes);


// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('Gracefully shutting down');
  mongoConnection.close(err => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err
      });
    }
    process.exit(0);
  });
});
