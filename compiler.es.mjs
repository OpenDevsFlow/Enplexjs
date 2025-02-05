
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
  EventEmitter: "./lib/events/main.js"
};

async function loadModule(name, path) {
  try {
    const module = await import(path);
    return module.default;
  } catch (error) {
    console.error(`Failed to load module ${name}: ${error.message}`);
    return null;
  }
}

async function load() {
  const loadedModules = {};
  
  for (const [name, path] of Object.entries(modules)) {
    const module = await loadModule(name, path);
    if (module) {
      loadedModules[name] = module;
    }
  }

  return loadedModules;
}

export default await load();
