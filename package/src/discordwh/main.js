/**
 * @class DiscordWH
 * @description Class to send Webhook messages to Discord.
 */
class DiscordWH {
  /**
   * @constructor
   * @param {Object} options - Configuration options for the webhook.
   * @property {string} options.username - Username for the webhook message.
   * @property {string} options.avatar - Avatar URL for the webhook message.
   * @property {string} options.id - Webhook ID.
   * @property {string} options.token - Webhook token.
   */
  constructor(options = {}) {
    this.username = options.username;
    this.avatar = options.avatar;
    this.id = options.id;
    this.token = options.token;
    this.api = `https://discord.com/api/webhooks/${this.id}/${this.token}`;
  }

  /**
   * @private
   * @async
   * @param {Object} data - Payload to send to the Discord webhook.
   * @throws {Error} - If the request fails with a non-OK status code.
   */
  async #send(data) {
    const response = await fetch(this.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`DiscordWH Error: Status: ${response.status}`);
    }

    return;
  }

  /**
   * @static
   * @async
   * @param {Object} options - Options for building an Embed object.
   * @property {string} options.title - Title of the embed.
   * @property {Object} options.author - Author information for the embed.
   * @property {string} options.description - Description of the embed.
   * @property {string} options.color - Color of the embed (hex code). (default: "#000000")
   * @property {Array<Object>} options.fields - Array of embed field objects.
   * @property {Date} options.timestamp - Timestamp for the embed. (default: new Date())
   * @property {Object} options.footer - Footer information for the embed.
   * @property {Object} options.thumbnail - Thumbnail image for the embed.
   * @property {Object} options.image - Image for the embed.
   * @returns {Object} - Built Embed object.
   */
  static async EmbedBuilder(options = {}) {
    return {
      title: options.title || undefined,
      author: options.author || undefined,
      description: options.description || undefined,
      color: options.color || "#000000",
      fields: options.fields ? options.fields.slice() : undefined, // Defensive copy for fields
      timestamp: new Date(),
      footer: options.footer || undefined,
      thumbnail: options.thumbnail || undefined,
      image: options.image || undefined,
    };
  }

  /**
   * @static
   * @async
   * @param {File} file - File object to be uploaded.
   * @returns {FormData} - FormData object containing the file data.
   */
  static async FileBuilder(file) {
    const data = new FormData();
    data.append('files[]', file);
    return data;
  }

  /**
   * @async
   * @param {string} content - Text content for the webhook message. (default: "")
   * @param {Array<Object>} embeds - Array of Embed objects to include in the message. (default: [])
   * @param {Array<File>} files - Array of File objects to upload with the message. (default: [])
   * @throws {Error} - If the request fails with a non-OK status code.
   */
  async send(content = "", embeds = [], files = []) {
    const payload = { content };
    if (embeds.length) payload.embeds = embeds.slice(); // Defensive copy for embeds
    if (files.length) {
      const formData = await Promise.all(files.map(this.FileBuilder));
      payload.payload_json = JSON.stringify({ ...payload }); // Separate JSON for multipart form
      return await fetch(this.api, {
        method: "POST",
        body: formData,
      });
    } else {
      return await this.#send(payload);
    }
  }
}

module.exports = DiscordWH;