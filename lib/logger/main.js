
class Logger {
  static levels = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3
  };

  static #level = Logger.levels.INFO;
  static #timestamps = true;

  static setLevel(level) {
    if (level in Logger.levels) {
      Logger.#level = Logger.levels[level];
    }
  }

  static toggleTimestamps(enable) {
    Logger.#timestamps = enable;
  }

  static #formatMessage(level, message) {
    const timestamp = Logger.#timestamps ? `[${new Date().toISOString()}] ` : '';
    return `${timestamp}[${level}] ${message}`;
  }

  static error(message) {
    if (Logger.#level >= Logger.levels.ERROR) {
      console.error(Logger.#formatMessage('ERROR', message));
    }
  }

  static warn(message) {
    if (Logger.#level >= Logger.levels.WARN) {
      console.warn(Logger.#formatMessage('WARN', message));
    }
  }

  static info(message) {
    if (Logger.#level >= Logger.levels.INFO) {
      console.info(Logger.#formatMessage('INFO', message));
    }
  }

  static debug(message) {
    if (Logger.#level >= Logger.levels.DEBUG) {
      console.debug(Logger.#formatMessage('DEBUG', message));
    }
  }
}

module.exports = Logger;
