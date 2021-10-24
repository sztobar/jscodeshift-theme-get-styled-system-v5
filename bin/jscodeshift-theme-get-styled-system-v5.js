#!/usr/bin/env node

const transformPath = require.resolve('../dist/theme-get.js');

process.argv.push(`-t=${transformPath}`);

require('jscodeshift/bin/jscodeshift.js');
