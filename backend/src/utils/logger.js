const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const currentLevel = process.env.LOG_LEVEL || 'info';

function formatMessage(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
}

export const logger = {
  error(message, meta = {}) {
    if (levels[currentLevel] >= levels.error) {
      console.error(formatMessage('error', message, meta));
    }
  },
  warn(message, meta = {}) {
    if (levels[currentLevel] >= levels.warn) {
      console.warn(formatMessage('warn', message, meta));
    }
  },
  info(message, meta = {}) {
    if (levels[currentLevel] >= levels.info) {
      console.log(formatMessage('info', message, meta));
    }
  },
  debug(message, meta = {}) {
    if (levels[currentLevel] >= levels.debug) {
      console.debug(formatMessage('debug', message, meta));
    }
  }
};
