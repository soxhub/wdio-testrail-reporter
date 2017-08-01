let TestRailScript = require("../lib/test-rail-script");

(new TestRailScript(process.argv.slice(2))).generateCases();

