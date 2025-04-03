module.exports = {
  "/api": {
    target:
      process.env["services__pwaapi__http__0"],
    secure: "true",
    logLevel: 'debug'
  }
};
