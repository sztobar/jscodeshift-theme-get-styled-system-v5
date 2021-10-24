#!/usr/bin/env node
const path = require('path');

const transformPath = require.resolve('../dist/theme-get.js');
process.argv.push(`-t=${transformPath}`);
import('jscodeshift/bin/jscodeshift.js');
