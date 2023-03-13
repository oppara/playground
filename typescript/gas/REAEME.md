# TypeScript + GAS

## パッケージののインストール

```
% npm install @google/clasp -g
% npm init -y
% npm install -D typescript @types/google-apps-script 
% npm install -D eslint @typescript-eslint/parser eslint-config-google eslint-plugin-googleappsscript 
% npx tsc --init

```

## Google アカウント認証

```
% clasp login --no-localhost
```

## 作成


```
% mkdir src
% clasp create --type standalone --title try-typescript-gas --rootDir src
```

`.clasp.json` が src ディレクトリ内に出来てしまうので移動して修正する。

```
% mv src/.clasp.json .
```

```diff
-{"scriptId":"1rU-1kr4l7VoFPjTBfBgoB1-7nI4Xw3hur0Cm3YrD_7T4V5gOlbFHFd1g","rootDir":"src"}
+{"scriptId":"1rU-1kr4l7VoFPjTBfBgoB1-7nI4Xw3hur0Cm3YrD_7T4V5gOlbFHFd1g","rootDir":"./src"}
```


`src/appsscript.json` の timeZone を変更する。

```diff
-  "timeZone": "America/New_York",
+  "timeZone": "Asia/Tokyo",
   "dependencies": {
   },
   "exceptionLogging": "STACKDRIVER",
```


push

```
% clasp push
```

ブラウザで確認。
```
% clasp open
```
