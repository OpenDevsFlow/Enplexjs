
const { EmbedBuilder } = require('discord.js');

class DiscordEmbedBuilder extends EmbedBuilder {
  constructor(data = {}) {
    super(data);
  }

  // Override methods to maintain backward compatibility
  toJSON() {
    return super.toJSON();
  }
}

module.exports = DiscordEmbedBuilder;
