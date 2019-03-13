class LoggerService {
  logInfo(data) {
    console.info("[INFO]", ...data);
  }

  log(data) {
    console.info("[LOG]", ...data);
  }

  logWarn(data) {
    console.warn("[WARN]", ...data);
  }

  logError(data) {
    console.error("[ERROR]", ...data);
  }

  logBuild(data) {
    console.info("[BUILD]", ...data);
  }
}

module.exports = LoggerService;
