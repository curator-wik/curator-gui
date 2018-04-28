// Karma configuration
// Generated on Mon Apr 09 2018 16:43:10 GMT-0500 (CDT)

module.exports = function (config) {
    // Example set of browsers to run on Sauce Labs
    // Check out https://saucelabs.com/platforms for all browser/platform combos
    var customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 7',
            version: '35'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '30'
        },
        sl_ie_11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
        },
        sl_android: {
            base: 'SauceLabs',
            browserName: 'Browser',
            platform: 'Android',
            version: '4.4',
            deviceName: 'Samsung Galaxy S3 Emulator',
            deviceOrientation: 'portrait'
        }
    }

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'client',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../build/assets/js/!(app).js',
            'assets/js/*.js',
            '../bower_components/angular-mocks/angular-mocks.js',
            // '../test/angular-mocks/angular-mocks.js',
            '../test/Spec/**/*Spec.js'
        ],

        // list of files / patterns to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        sauceLabs: {
            testName: 'Web App Unit Tests',
            startConnect: true
        },

        customLaunchers: process.env.TRAVIS ? customLaunchers : null,
        browsers: process.env.TRAVIS ? Object.keys(customLaunchers) : ['Chrome'],
        reporters: ['dots', 'saucelabs'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: Boolean(process.env.TRAVIS),

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })

    if (process.env.TRAVIS) {
        var buildLabel = 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';

        // Karma (with socket.io 1.x) buffers by 50 and 50 tests can take a long time on IEs;-)
        config.browserNoActivityTimeout = 120000;

        config.sauceLabs.build = buildLabel;
        config.sauceLabs.startConnect = false;
        config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
        config.sauceLabs.recordScreenshots = true;

        // Debug logging into a file, that we print out at the end of the build.
        config.loggers.push({
            type: 'file',
            filename: process.env.LOGS_DIR + '/karma.log'
        });

        if (process.env.BROWSER_PROVIDER === 'saucelabs' || !process.env.BROWSER_PROVIDER) {
            // Allocating a browser can take pretty long (eg. if we are out of capacity and need to wait
            // for another build to finish) and so the `captureTimeout` typically kills
            // an in-queue-pending request, which makes no sense.
            config.captureTimeout = 0;
        }
    }
}