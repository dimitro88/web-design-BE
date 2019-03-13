const Logger = require("../LoggerService");

class ControllerInitterService extends Logger {
  constructor(Controller, app, addToSkip = []) {
    super();
    this.needSkip = ["constructor", "name", ...addToSkip];
    this.controller = new Controller();
    this.app = app;
    this.controllerMethods = null;
    this.initController(app);
  }

  setControllerMethods() {
    this.controllerMethods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this.controller)
    ).filter(field => this.needSkip.indexOf(field) === -1);
  }

  initController() {
    this.logBuild(this.controller.name);
    this.setControllerMethods();
    this.controllerMethods.forEach(name => {
      const route = this.controller[name]();
      if (name.indexOf("post") !== -1) {
        this.app.post(route.url, this.route(route.func, name));
      }
      if (name.indexOf("get") !== -1) {
        this.app.get(route.url, this.route(route.func, name));
      }
    });
  }

  route(method, name) {
    this.logInfo(`Method ${name} created`);
    return (...params) => {
      this.logInfo(`Method ${name} called`);
      return method(...params);
    };
  }
}

module.exports = ControllerInitterService;
