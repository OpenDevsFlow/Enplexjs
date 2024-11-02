/**
 * @class Search
 * @description Class to interact with Search API.
 */

class Search {
  /**
   * Searches YouTube for videos based on a query.
   * @param {string} query - The search query.
   * @throws {Error} - If query is missing.
   * @returns {Promise<any>} - The API response.
   */
  static async yt(query) {
    if (!query) {
      throw new Error('Youtube Search Error: query is required');
    }
    return await Resp(Search.API_TYPES.YOUTUBE, query);
  }

  /**
   * Searches Spotify for content based on a query.
   * @param {string} query - The search query.
   * @throws {Error} - If query is missing.
   * @returns {Promise<any>} - The API response.
   */
  static async sp(query) {
    if (!query) {
      throw new Error('Spotify Search Error: query is required');
    }
    return await Resp(Search.API_TYPES.SPOTIFY, query);
  }

  /**
   * Searches GitHub for repositories based on a query.
   * @param {string} query - The search query.
   * @throws {Error} - If query is missing.
   * @returns {Promise<any>} - The API response.
   */
  static async github(query) {
    if (!query) {
      throw new Error('Github Search Error: query is required');
    }
    return await Resp(Search.API_TYPES.GITHUB, query);
  }

  /**
   * Fetches a random cat fact.
   * @returns {Promise<any>} - The API response.
   */
  static async catfact() {
    return await Resp(Search.API_TYPES.CAT_FACT);
  }

  /**
   * Fetches a random dog fact.
   * @returns {Promise<any>} - The API response.
   */
  static async dogfact() {
    return await Resp(Search.API_TYPES.DOG_FACT);
  }

  /**
   * Fetches a random quote.
   * @returns {Promise<any>} - The API response.
   */
  static async quote() {
    return await Resp(Search.API_TYPES.QUOTE);
  }

  /**
   * Fetches a random joke.
   * @returns {Promise<any>} - The API response.
   */
  static async joke() {
    return await Resp(Search.API_TYPES.JOKE);
  }

  /**
   * Fetches a random waifu image.
   * @returns {Promise<any>} - The API response.
   */
  static async waifu() {
    return await Resp(Search.API_TYPES.WAIFU);
  }

  /**
   * API types for different search services.
   * @readonly
   * @enum {string}
   */
  static API_TYPES = {
    YOUTUBE: 'yt',
    SPOTIFY: 'sp',
    GITHUB: 'github',
    CAT_FACT: 'catfact',
    DOG_FACT: 'dogfact',
    QUOTE: 'quote',
    JOKE: 'joke',
    WAIFU: 'waifu',
  };
}

module.exports = Search;