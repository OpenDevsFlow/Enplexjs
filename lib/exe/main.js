class Executor {
  static eval(code) {
    Executor.#validate(code);

    try {
      return eval(code);
    } catch (error) {
      throw new Error("Execution Error:" +  error);
    }
  }
  
  static fn(code) {
    Executor.#validate(code);

    try {
      return new Function(code);
    } catch (error) {
      throw new Error("Execution Error:" +  error);
    }
  }

  static #validate(code) {
    if (!code) {
      throw new Error("Executor Error: Code is required for execution.");
    }
  }
}

module.exports = Executor;