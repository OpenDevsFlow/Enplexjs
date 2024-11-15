/**
 * @class exe
 * @description Class to evaluate expressions.
 * @example
 * ```javascript
 * const exe = require("enplex.js").exe;
 * const code = `console.log("hello from Enplex.js")`;
 *
 * exe.run(code);
 * ```
 */
class exe {
  /**
   * @static
   * @param {string} c - Code to run.
   * @throw {Error} - If code is missing.
   * @returns {Promise<any>} - Result of the code.
   */
  static run(c) {
    if (!code) {
      throw new Error("Exe Error: Code is required for execution.");
    }
    return new Function(c)();
  }
}

module.exports = exe;
