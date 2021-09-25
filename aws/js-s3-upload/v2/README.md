# ブラウザから Amazon S3 への写真のアップロード

[SDK v2 版](https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html)


## 前準備

以下のファイルを用意しておく。  
src/js/env.js

```js:src/js/env.js
export const S3_BUCKET_NAME = 'アップロードするバケット名';
export const S3_REGION = 'バケットのリージョン';
export const IDENTITY_POOL_ID = 'Cognito ID プールの ID';
```

## 開発

```sh
% make
```
