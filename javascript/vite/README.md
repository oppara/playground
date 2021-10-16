# try vite

[Getting Started | Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

[viteでhttpsなlocalhostを起動する | DevelopersIO](https://dev.classmethod.jp/articles/vite-https-localhost/)


## サンプルプロジェクトを作成

```
% npm init vite@latest my-vue-app -- --template vue-ts
Need to install the following packages:
  create-vite@latest
Ok to proceed? (y) y

Scaffolding project in /path/to/my-vue-app...

Done. Now run:

  cd my-vue-app
  npm install
  npm run dev
```

## mkcertで証明書を発行

[mkcert](https://github.com/FiloSottile/mkcert) をインストールする。

```
% brew install mkcert
```

local CA を作成する。

```
% mkcert -install
Created a new local CA 💥
Sudo password:
The local CA is now installed in the system trust store! ⚡️
Warning: "certutil" is not available, so the CA can't be automatically installed in Firefox! ⚠️
Install "certutil" with "brew install nss" and re-run "mkcert -install" 👈 
```
上記のエラーが出たので、 nss を Homebrew でインストールする。

```
% brew install nss
```

再度 local CA を作成する。
```
% mkcert -install
The local CA is already installed in the system trust store! 👍
The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊
```

証明書を作成する。
```
% mkcert localhost

Created a new certificate valid for the following names 📜
 - "localhost"

The certificate is at "./localhost.pem" and the key at "./localhost-key.pem" ✅

It will expire on 16 January 2024 🗓
```

## vite.config.tsを編集

```diff
--- a/javascript/vite/my-vue-app/vite.config.ts
+++ b/javascript/vite/my-vue-app/vite.config.ts
@@ -1,7 +1,14 @@
 import { defineConfig } from 'vite'
 import vue from '@vitejs/plugin-vue'
+import fs from 'fs'

 // https://vitejs.dev/config/
 export default defineConfig({
-  plugins: [vue()]
+  plugins: [vue()],
+  server: {
+   https: {
+     key: fs.readFileSync('./localhost-key.pem'),
+     cert: fs.readFileSync('./localhost.pem'),
+   }
+ },
 })
```

## ローカルサーバを起動

```
% npm run dev
```

`https://localhost:3000/` にブラウザでアクセスする。
