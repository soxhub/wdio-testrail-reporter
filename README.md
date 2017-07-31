#Testrail Reporter for Webdriver.io

Pushes test results into Testrail system.
Fork from [mocha testrail reporter](https://www.npmjs.com/package/mocha-testrail-reporter)

## Installation

```shell
$ npm install wdio-testrail-reporter --save-dev
```

## Usage
Ensure that your testrail installation API is enabled and generate your API keys. See http://docs.gurock.com/

Add reporter to wdio.conf.js:

```Javascript
let WdioTestRailReporter = require('./packages/wdio-testrail-reporter/lib/wdio-testrail-reporter');
WdioTestRailReporter.reporterName = 'Test rail reporter';

...

    reporters: ['spec', WdioTestRailReporter],
    testRailsOptions: {
      domain: "yourdomain.testrail.net",
      username: "username",
      password: "password",
      projectId: 1,
      suiteId: 1
    }
```


Mark your mocha test names with ID of Testrail test cases. Ensure that your case ids are well distinct from test descriptions.
 
```Javascript
it("C123 C124 Authenticate with invalid user", . . .
it("Authenticate a valid user C321", . . .
```

Only passed or failed tests will be published. Skipped or pending tests will not be published resulting in a "Pending" status in testrail test run.

## Options

**domain**: *string* domain name of your Testrail instance (e.g. for a hosted instance instance.testrail.net)

**username**: *string* user under which the test run will be created (e.g. jenkins or ci)

**password**: *string* password or API token for user

**projectId**: *number* projet number with which the tests are associated

**suiteId**: *number* suite number with which the tests are associated

**assignedToId**: *number* (optional) user id which will be assigned failed tests

## References
- https://www.npmjs.com/package/mocha-testrail-reporter
- http://webdriver.io/guide/reporters/customreporter.html
- http://docs.gurock.com/testrail-api2/start