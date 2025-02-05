
class DiscordEmbedBuilder {
  constructor() {
    this.embed = {
      title: null,
      description: null,
      color: null,
      fields: [],
      author: null,
      footer: null,
      timestamp: null,
      thumbnail: null,
      image: null
    };
  }

  setTitle(title) {
    this.embed.title = title;
    return this;
  }

  setDescription(description) {
    this.embed.description = description;
    return this;
  }

  setColor(color) {
    this.embed.color = typeof color === 'string' ? parseInt(color.replace('#', ''), 16) : color;
    return this;
  }

  addField(name, value, inline = false) {
    this.embed.fields.push({ name, value, inline });
    return this;
  }

  setAuthor(name, iconURL, url) {
    this.embed.author = { name };
    if (iconURL) this.embed.author.icon_url = iconURL;
    if (url) this.embed.author.url = url;
    return this;
  }

  setFooter(text, iconURL) {
    this.embed.footer = { text };
    if (iconURL) this.embed.footer.icon_url = iconURL;
    return this;
  }

  setTimestamp(timestamp = new Date()) {
    this.embed.timestamp = timestamp.toISOString();
    return this;
  }

  setThumbnail(url) {
    this.embed.thumbnail = { url };
    return this;
  }

  setImage(url) {
    this.embed.image = { url };
    return this;
  }

  toJSON() {
    return this.embed;
  }
}

module.exports = DiscordEmbedBuilder;
