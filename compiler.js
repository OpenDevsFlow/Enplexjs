
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
  Logger: "./lib/logger/main.js"
};

function loadModule(name, path) {
  try {
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

// Validate required modules are loaded
const requiredModules = ['NextChat', 'Rectify', 'Xio'];
const missingModules = requiredModules.filter(module => !loadedModules[module]);

if (missingModules.length > 0) {
  throw new Error(`Critical modules missing: ${missingModules.join(', ')}`);
}

module.exports = loadedModules;
