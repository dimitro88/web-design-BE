module.exports = class ForbiddenError extends Error {
  constructor(message = null) {
    super(message);
    console.log("created forbidden error");
    this.status = "403";
    this.code = "Forbidden error";
  }
};
