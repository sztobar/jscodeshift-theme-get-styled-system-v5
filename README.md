# jscodeshift-theme-get-styled-system-v5

`jscodeshift-theme-get-styled-system-v5` is a [jscodeshift][] transform for migrating `theme-get` utility function when upgrading [styled-system][] library to version [v5.0.0](https://styled-system.com/guides/migrating#removed)

## Install

Get jscodeshift-theme-get-styled-system-v5 from [npm][]:

```
$ npm install -g jscodeshift-theme-get-styled-system-v5
```

# How to use

```sh
npx jscodeshift-theme-get-styled-system-v5 src/**/*.js
```

`jscodeshift-theme-get-styled-system-v5` [bin](./bin/jscodeshift-theme-get-styled-system-v5.js) is calling internally [jscodeshift][] and simply setting [theme-get](`./src/theme-get.ts`) as a tranformer. To see how to use [jscodeshift][] cli, you can enter:

```sh
npx jscodeshift-theme-get-styled-system-v5 -h
```

If you have [jscodeshift][] package installed (either locally or globally) you can pass [theme-get](`./src/theme-get.ts`) as a transformer, after installing it:
```sh
npm i jscodeshift-theme-get-styled-system-v5 --no-save # dont modify package.json
npx jscodeshift -t node_modules/jscodeshift-theme-get-styled-system-v5/src/theme-get.ts src/**/*.js # -t is a path for transformer
```

You can pass [recast](https://github.com/benjamn/recast/blob/master/lib/options.ts) options using `--printOptions` and passing a JSON. Note: it's stil best idea to pass the jscodeshift result through code formatter like [prettier][].
```sh
npx jscodeshift-theme-get-styled-system-v5 src/**/*.js --printOptions={"wrapColumn":40,"quote":"double"}
```

You can pass jsodeshift [options](https://github.com/facebook/jscodeshift/tree/0.13.0#usage-cli) as well
```sh
npx jscodeshift-theme-get-styled-system-v5 --dry --parser=tsx src/**/*.{ts,tsx}
```

To migrate huge codebases quickly, you can try to use a dedicated search-tool (like [ripgrep][]) and pass matching files:
```sh
rg 'themeGet' src/**/*.js -l | xargs jscodeshift-theme-get-styled-system-v5
```

[npm]: https://www.npmjs.com
[recast]: https://github.com/benjamn/recast
[jscodeshift]: https://github.com/facebook/jscodeshift
[styled-system]: https://github.com/styled-system/styled-system
[prettier]: https://github.com/prettier/prettier
[ripgrep]: https://github.com/BurntSushi/ripgrep
