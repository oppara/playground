# ブラウザから Amazon S3 への写真のアップロード

[SDK v3 版](https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/s3-example-photo-album.html)



## 前準備

以下のファイルを用意しておく。  
src/js/env.js

```js:src/js/env.js
export const S3_BUCKET_NAME = 'アップロードするバケット名';
export const S3_REGION = 'バケットのリージョン';
export const IDENTITY_POOL_ID = 'Cognito ID プールの ID';
```

## モジュールのインストール

```
% npm install @aws-sdk/client-cognito-identity @aws-sdk/client-s3 @aws-sdk/credential-provider-cognito-identity
```

## Parcelでasync/awaitを使うと

「regeneratorRuntime is not defined」エラーが出るので package.json に以下を追加する。

```
  "browserslist": [
    "since 2017-06"
  ]
```


## 開発

```sh
% make
```
