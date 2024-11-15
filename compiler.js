/**
 * Exports essential modules for various functionalities.
 *
 * @module
 */
module.exports = {
  /**
   * The NextChat module for interacting with AI chat and image models.
   *
   * @module nextchat
   * @see module:nextchat
   * @type {nextchat}
   */
  nextchat: require("./lib/nextchat/main"),

  /**
   * The Discord Webhook module for sending messages to Discord.
   *
   * @module discordwh
   * @see module:discordwh
   * @type {discordwh}
   */
  discordwh: require("./lib/discordwh/main"),

  /**
   * The Rectify module for building web servers.
   *
   * @module rectify
   * @see module:rectify
   * @type {rectify}
   */
  rectify: require("./lib/rectify/main"),

  /**
   * The Search module for various search functionalities.
   *
   * @module search
   * @see module:search
   * @type {search}
   */
  search: require("./lib/search/main"),

  /**
   * The Xio module for making HTTP requests.
   *
   * @module xio
   * @see module:xio
   * @type {xio}
   */
  xio: require("./lib/xio/main"),

  /**
   * The Exe module for executing codes.
   *
   * @module exe
   * @see module:exe
   * @type {exe}
   */
  exe: require("./lib/exe/main"),
};
