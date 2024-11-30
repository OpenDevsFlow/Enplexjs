class Embed {
  constructor(options = {}) {
    this.title = options.title || undefined;
    this.author = options.author || undefined;
    this.description = options.description || undefined;
    this.color = options.color || "#000000";
    this.fields = options.fields ? options.fields.slice() : undefined;
    this.timestamp = new Date();
    this.footer = options.footer || undefined;
    this.thumbnail = options.thumbnail || undefined;
    this.image = options.image || undefined;
  }
}

module.exports = Embed;