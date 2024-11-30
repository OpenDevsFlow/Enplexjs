const Embed = require("./embed.js");

class DiscordWebhook {
  constructor(options) {
    this.username = options.username;
    this.avatar = options.avatar;
    this.id = options.id;
    this.token = options.token;
    this.apiUrl = `https://discord.com/api/webhooks/${this.id}/${this.token}`;
  }

  async send(payload) {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`DiscordWH Error: Status: ${response.status}`);
    }

    return response;
  }

  static async createEmbed(options = {}) {
    return new Embed(options);
  }

  static async createFile(file) {
    const formData = new FormData();
    formData.append("files[]", file);
    return formData;
  }
}

module.exports = DiscordWebhook;