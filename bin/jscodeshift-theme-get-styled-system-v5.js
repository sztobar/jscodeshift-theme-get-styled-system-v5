const path = require('path');

const cwd = process.cwd();
const transformPath = path.resolve(cwd, '../src/theme-get.ts');
process.argv.push(`-t=${transformPath}`);
import('jscodeshift/bin/jscodeshift');
