
const modules = {
  NextChat: "./lib/nextchat/main.js",
  DiscordWebHook: "./lib/discordwh/main.js",
  Rectify: "./lib/rectify/main.js",
  Random: "./lib/random/main.js",
  Search: "./lib/search/main.js",
  Xio: "./lib/xio/main.js",
  Executor: "./lib/exe/main.js",
  Import: "./lib/import/main.js",
  Collection: "./lib/collection/main.js",
  Logger: "./lib/logger/main.js",
  EventEmitter: "./lib/events/main.js",
  Validator: "./lib/validator/main.js",
  Queue: "./lib/queue/main.js",
  DiscordEmbedBuilder: "./lib/discord/embed-builder.js"
};

const Maintenance = require('./lib/maintenance.js');

function loadModule(name, path) {
  try {
    if (Maintenance.isUnderMaintenance(name)) {
      console.warn(`⚠️ Warning: Module ${name} is currently under maintenance`);
      return null;
    }
    return require(path);
  } catch (error) {
    console.error(`Failed to load module ${name}: ${error.message}`);
    return null;
  }
}

const loadedModules = Object.entries(modules).reduce((acc, [name, path]) => {
  const module = loadModule(name, path);
  if (module) {
    acc[name] = module;
  }
  return acc;
}, {});

module.exports = loadedModules;
