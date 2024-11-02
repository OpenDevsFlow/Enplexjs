/**
 * Exports the modules.
 *
 * @module
 */
module.exports = {
  /**
   * The NextChat module for interacting with the ai chat and image models.
   * @module nextchat
   * @see module:nextchat
   * @type {Object}
   */
  nextchat: require('./src/nextchat/main'),

  /**
   * The Discord Webhook module for sending messages to Discord.
   * @module discordwh
   * @see module:discordwh
   * @type {Object}
   */
  discordwh: require('./src/discordwh/main'),

  /**
   * The Rectify module for building web servers.
   * @module rectify
   * @see module:rectify
   * @type {Object}
   */
  rectify: require('./src/rectify/main'),

  /**
   * The Search module for various search functionalities.
   * @module search
   * @see module:search
   * @type {Object}
   */
  search: require('./src/search/main'),

  /**
   * The Xio module for making HTTP requests.
   * @module xio
   * @see module:xio
   * @type {Object}
   */
  xio: require('./src/xio/main'),
};