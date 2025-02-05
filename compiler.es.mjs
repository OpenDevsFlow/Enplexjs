
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

  // Validate required modules
  const requiredModules = ['NextChat', 'Rectify', 'Xio'];
  const missingModules = requiredModules.filter(module => !loadedModules[module]);

  if (missingModules.length > 0) {
    throw new Error(`Critical modules missing: ${missingModules.join(', ')}`);
  }

  return loadedModules;
}

export default await load();
