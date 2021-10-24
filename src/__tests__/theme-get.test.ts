import { defineTest, defineInlineTest } from 'jscodeshift/src/testUtils';
import transform from '../theme-get';

jest.autoMockOff();

defineTest(__dirname, 'theme-get', null);

defineTest(__dirname, 'theme-get', null, 'typescript/theme-get', {
  parser: 'ts',
});

describe('theme-get', () => {
  defineInlineTest(
    transform,
    {},
    `
import { a, themeGet, b } from 'styled-system';
    `,
    `
import { a, b } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
    `
  );

  defineInlineTest(
    transform,
    {},
    `
import { themeGet, b } from 'styled-system';
    `,
    `
import { b } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
    `
  );

  defineInlineTest(
    transform,
    {},
    `
import { a, themeGet } from 'styled-system';
    `,
    `
import { a } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
    `
  );

  defineInlineTest(
    transform,
    {},
    `
import {
  color,
  text,
  position,
  themeGet,
  size,
  width,
  height,
  typography,
  layout
} from 'styled-system';
    `,
    `
import { color, text, position, size, width, height, typography, layout } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
    `
  );

  defineInlineTest(
    transform,
    { printOptions: { wrapColumn: '40', quote: 'double' } },
    `
import {
  color,
  text,
  position,
  themeGet,
  size,
  width,
  height,
  typography,
  layout
} from 'styled-system';
    `,
    `
import {
  color,
  text,
  position,
  size,
  width,
  height,
  typography,
  layout,
} from 'styled-system';

import { themeGet } from "@styled-system/theme-get";
    `,
    'Applies recast printOptions'
  );

  defineInlineTest(
    transform,
    {},
    `import { themeGet } from 'styled-system';`,
    `import { themeGet } from '@styled-system/theme-get';`,
    'Removes empty import line'
  );

  defineInlineTest(
    transform,
    {},
    `import { a, b, c } from 'styled-system';`,
    `import { a, b, c } from 'styled-system';`,
    'Should not transform styled-system module import if there is no themeGet in it'
  );

  defineInlineTest(
    transform,
    {},
    `import { themeGet } from 'not-styled-system';`,
    `import { themeGet } from 'not-styled-system';`,
    'Should not transform themeGet import if it is not from styled-system module'
  );

  defineInlineTest(
    transform,
    {},
    `
import { bar, foo as themeGet, baz } from 'styled-system';
    `,
    `
import { bar, baz } from 'styled-system';
import { foo as themeGet } from '@styled-system/theme-get';
    `,
    'Should transform alias import'
  );

  defineInlineTest(
    transform,
    {},
    `
import * as styledSystem from 'styled-system';
styledSystem.themeGet('color.text');
    `,
    `
import * as styledSystem from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
themeGet('color.text');
    `,
    'Should transform namespace import'
  );

  defineInlineTest(
    transform,
    {},
    `
import foo from 'foo'
import * as styledSystem from 'styled-system'
import { bar } from 'bar'

const foobar = foo()
styledSystem.themeGet('color.text')
bar.baz(foobar)
    `,
    `
import foo from 'foo'
import * as styledSystem from 'styled-system'
import { themeGet } from '@styled-system/theme-get';
import { bar } from 'bar'

const foobar = foo()
themeGet('color.text')
bar.baz(foobar)
    `,
    'Adds semicolon to updated code expressions'
  );

  defineInlineTest(
    transform,
    {},
    `
import foo from 'foo'
import {size, layout, themeGet} from 'styled-system'
import {bar} from 'bar'
    `,
    `
import foo from 'foo'
import { size, layout } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import {bar} from 'bar'
    `,
    'Adds semicolon and formattion to updated code expressions'
  );
});
