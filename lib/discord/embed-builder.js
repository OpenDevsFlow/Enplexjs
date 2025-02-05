
const { EmbedBuilder } = require('discord.js');

class DiscordEmbedBuilder extends EmbedBuilder {
  constructor(data = {}) {
    super(data);
  }

  // Quick setup method
  quick(options = {}) {
    if (options.title) this.setTitle(options.title);
    if (options.description) this.setDescription(options.description);
    if (options.color) this.setColor(options.color);
    if (options.footer) this.setFooter({ text: options.footer });
    if (options.thumbnail) this.setThumbnail(options.thumbnail);
    if (options.image) this.setImage(options.image);
    if (options.author) this.setAuthor({ name: options.author });
    if (options.timestamp) this.setTimestamp();
    return this;
  }

  // Simplified field methods
  field(name, value, inline = false) {
    return this.addFields({ name, value, inline });
  }

  // Simplified color methods
  success() {
    return this.setColor('#00FF00');
  }

  error() {
    return this.setColor('#FF0000');
  }

  warning() {
    return this.setColor('#FFA500');
  }

  info() {
    return this.setColor('#0099FF');
  }

  // Override toJSON for compatibility
  toJSON() {
    return super.toJSON();
  }
}

module.exports = DiscordEmbedBuilder;
