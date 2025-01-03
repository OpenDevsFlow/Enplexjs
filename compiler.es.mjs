async function load() {
  const DiscordWebHook = (await import("./lib/discordwh/main.js")).default;

  const NextChat = (await import("./lib/nextchat/main.js")).default;

  const Rectify = (await import("./lib/rectify/main.js")).default;

  const Random = (await import("./lib/random/main.js")).default;

  const Search = (await import("./lib/search/main.js")).default;
  
  const Xio = (await import("./lib/xio/main.js")).default;

  const Executor = (await import("./lib/exe/main.js")).default;

  const Import = (await import("./lib/import/main.js")).default;

  const Collection = (await import("./lib/collection/main.js")).default;

  return {
    DiscordWebHook: DiscordWebHook,
    NextChat: NextChat,
    Rectify: Rectify,
    Random: Random,
    Search: Search,
    Xio: Xio,
    Executor: Executor,
    Import: Import,
    Collection: Collection,
  };
}

export default await load();