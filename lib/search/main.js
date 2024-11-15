/**
 * @class search
 * @description Class to interact with Search API.
 */

class search {
  /**
   * Searches YouTube for videos based on a query.
   * @param {string} query - The search query.
   * @throws {Error} - If query is missing.
   * @returns {Promise<any>} - The API response.
   * @example
   * ```javascript
   * const search = require('enplex.js').search;
   *
   * search.yt('Enplexjs')
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   * ```
   */
  static async yt(query) {
    if (!query) {
      throw new Error("Youtube Search Error: query is required");
    }
    return await Resp(search.API_TYPES.YOUTUBE, query);
  }

  /**
   * Searches Spotify for content based on a query.
   * @param {string} query - The search query.
   * @throws {Error} - If query is missing.
   * @returns {Promise<any>} - The API response.
   * @example
   * ```javascript
   * const search = require('enplex.js').search;
   *
   * search.sp('Enplexjs')
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   * ```
   */
  static async sp(query) {
    if (!query) {
      throw new Error("Spotify Search Error: query is required");
    }
    return await Resp(search.API_TYPES.SPOTIFY, query);
  }

  /**
   * Searches GitHub for repositories based on a query.
   * @param {string} query - The search query.
   * @throws {Error} - If query is missing.
   * @returns {Promise<any>} - The API response.
   * @example
   * ```javascript
   * const search = require('enplex.js').search;
   *
   * search.github('Enplexjs')
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   * ```
   */
  static async github(query) {
    if (!query) {
      throw new Error("Github Search Error: query is required");
    }
    return await Resp(search.API_TYPES.GITHUB, query);
  }

  /**
   * Fetches a random cat fact.
   * @returns {Promise<any>} - The API response.
   * @example
   * ```javascript
   * const search = require('enplex.js').search;
   *
   * search.catfact()
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   * ```
   */
  static async catfact() {
    return await Resp(search.API_TYPES.CAT_FACT);
  }

  /**
   * Fetches a random dog fact.
   * @returns {Promise<any>} - The API response.
   * @example
   * ```javascript
   * const search = require('enplex.js').search;
   *
   * search.dogfact()
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   * ```
   */
  static async dogfact() {
    return await Resp(search.API_TYPES.DOG_FACT);
  }

  /**
   * Fetches a random quote.
   * @returns {Promise<any>} - The API response.
   * @example
   * ```javascript
   * const search = require('enplex.js').search;
   *
   * search.quote()
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   * ```
   */
  static async quote() {
    return await Resp(search.API_TYPES.QUOTE);
  }

  /**
   * Fetches a random joke.
   * @returns {Promise<any>} - The API response.
   * @example
   * ```javascript
   * const search = require('enplex.js').search;
   *
   * search.joke()
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   * ```
   */
  static async joke() {
    return await Resp(search.API_TYPES.JOKE);
  }

  /**
   * Fetches a random waifu image.
   * @returns {Promise<any>} - The API response.
   * @example
   * ```javascript
   * const search = require('enplex.js').search;
   *
   * search.waifu()
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   * ```
   */
  static async waifu() {
    return await Resp(search.API_TYPES.WAIFU);
  }

  /**
   * API types for different search services.
   * @readonly
   * @enum {string}
   */
  static API_TYPES = {
    YOUTUBE: "yt",
    SPOTIFY: "sp",
    GITHUB: "github",
    CAT_FACT: "catfact",
    DOG_FACT: "dogfact",
    QUOTE: "quote",
    JOKE: "joke",
    WAIFU: "waifu",
  };
}

module.exports = search;
