/**
 * Asynchronously loads and exports essential modules for various functionalities.
 *
 * @async
 * @returns {Promise<{
 *   discordwh: discordwh,
 *   nextchat: nextchat,
 *   rectify: rectify,
 *   search: search,
 *   xio: xio
 * }>} A Promise resolving to an object containing the loaded modules.
 */
async function load() {
  /**
   * Imports the Discord Webhook module for sending messages to Discord.
   *
   * @type {discordwh}
   */
  const discordwh = (await import("./lib/discordwh/main.js")).default;

  /**
   * Imports the NextChat module for interacting with AI chat and image models.
   *
   * @type {nextchat}
   */
  const nextchat = (await import("./lib/nextchat/main.js")).default;

  /**
   * Imports the Rectify module for building web servers.
   *
   * @type {rectify}
   */
  const rectify = (await import("./lib/rectify/main.js")).default;

  /**
   * Imports the Search module for various search functionalities.
   *
   * @type {search}
   */
  const search = (await import("./lib/search/main.js")).default;

  /**
   * Imports the Xio module for making HTTP requests.
   *
   * @type {xio}
   */
  const xio = (await import("./lib/xio/main.js")).default;

  return {
    discordwh: discordwh,
    nextchat: nextchat,
    rectify: rectify,
    search: search,
    xio: xio
  };
}

/**
 * Exports the asynchronously loaded modules.
 *
 * @type {{
 *   discordwh: discordwh,
 *   nextchat: nextchat,
 *   rectify: rectify,
 *   search: search,
 *   xio: xio
 * }}
 */
export default await load();