# How to use

```sh
npx jscodeshift-theme-get-styled-system-v5 src/*
```

Or if you have `jscodeshift` package installed (either locally or globally) you can pass `theme-get` as a transformer:
```sh
npm i jscodeshift-theme-get-styled-system-v5 --no-save
npx jscodeshift -t node_modules/jscodeshift-theme-get-styled-system-v5/src/theme-get.ts src/*
```

You can pass [recast]() options using `--printOptions` and passing a JSON, but it's stil best idea to pass the result through code formatter like [prettier]().
```sh
npx jscodeshift-theme-get-styled-system-v5 src/* --printOptions={"wrapColumn":40,"quote":"double"}
```

You can also pass jsodeshift [options](https://github.com/facebook/jscodeshift/tree/0.13.0#usage-cli)
```sh
npx jscodeshift-theme-get-styled-system-v5 src/* --dry --print
```