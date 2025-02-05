
const maintenanceStatus = {
  NextChat: true,
  DiscordWebHook: false,
  Rectify: false,
  Random: false,
  Search: true,
  Xio: false,
  Executor: false,
  Import: false,
  Collection: false,
  Logger: false,
  EventEmitter: false,
  Validator: false,
  Queue: false
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
