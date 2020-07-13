# try parcel

- [Parcel](https://parceljs.org/)
- [🖥 CLI](https://parceljs.org/cli.html)
- [現代開発者のためのCSS基礎技術 - Qiita](https://qiita.com/arowM/items/e1af320e2755461649a0#postcss)

## install

```
npm init
npm install --save-dev parcel-bundler
```

## starts up development server

```
npx parcel src/index.html
```

## build

```
npx parcel build --no-source-maps src/index.html
```

## npm script

```json
{
  ...
  "scripts": {
    "build": "rimraf dist && parcel build --no-source-maps src/index.html",
    "start": "parcel src/index.html"
  },
  ...
}
```
