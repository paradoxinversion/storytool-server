module.exports = class NoUserError extends Error {
  constructor(username, ...args) {
    super(...args);
    this.message = `${username} is not a user.`;
    Error.captureStackTrace(this, NoUserError);
  }
};
