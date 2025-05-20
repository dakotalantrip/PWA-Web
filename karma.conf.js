module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    client: {
      jasmine: {},
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/pwa-web'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: process.env.CI ? ['ChromeHeadless'] : ['Chrome'],
    singleRun: false,   // Angular CLI will flip this on via --watch=false
    autoWatch: true,     // Angular CLI will handle turning this off
    restartOnFileChange: true,
    files: [
      { pattern: './src/**/*.spec.ts', watched: true } // Ensure test files are included
    ]
  });
};