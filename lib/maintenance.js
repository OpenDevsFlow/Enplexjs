
const maintenanceStatus = {
  NextChat: false,
  DiscordWebHook: false,
  Rectify: false,
  Random: false,
  Search: false,
  Xio: false,
  Executor: false,
  Import: false,
  Collection: false,
  Logger: false,
  EventEmitter: false
};

class Maintenance {
  static isUnderMaintenance(moduleName) {
    return maintenanceStatus[moduleName] || false;
  }

  static setMaintenance(moduleName, status) {
    if (moduleName in maintenanceStatus) {
      maintenanceStatus[moduleName] = status;
    }
  }
}

module.exports = Maintenance;
