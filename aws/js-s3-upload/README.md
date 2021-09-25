# ブラウザから Amazon S3 への写真のアップロード

SDK [V2](https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/welcome.html) と [V3](https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/welcome.html) で作り比べてみる。

## SDK V2 と V3 の違い

[Parcel](https://ja.parceljs.org/) を使用してビルドすると、v3 の js のファイルサイズが 1MB 超えてしまった 😓

| version | file           | size |
|---------|----------------|------|
| v2      | main.js        | 2.1K |
| v2      | aws-sdk.min.js | 354K |
| v3      | main.js        | 1.1M |

v3 でモジュール化されたが、モジュール自体のサイスが大きいのかも。。  
v3 で使用したモジュールは以下。
- @aws-sdk/client-cognito-identity 
- @aws-sdk/credential-provider-cognito-identity
- @aws-sdk/client-s3 

v2 を使う場合、[Build your own AWS SDK for JavaScript](https://sdk.amazonaws.com/builder/js/) を利用して必要なライブラリを選択できるので、ファイルサイズを抑えることができる。  
v2 で使用したライブラリは以下。
- AWS.CognitoIdentity
- AWS.S3

## AWS 側での準備

1. S3 バケットの作成
2. Amazon Cognito ID プールの作成
3. IAM ロールのポリシー設定
4. S3 の CORS 設定


### 1. バケットの作成

「パブリックアクセスをすべて ブロック」で作成

### 2. Amazon Cognito ID プールの作成

1. [ID プールの管理] をクリック
2. [新しい ID プールの作成] を選択
3. [ID プール名] に ID プールの名前を入力
4. 「認証されていない ID に対してアクセスを有効にする」をチェック
5. [プールの作成] をクリック
6. 「詳細を表示」し、IAM ロール名を確認、または変更して、「許可」をクリック
7. ID プールの ID を控えておく

### 3. IAM ロールのポリシー設定

認証されていないユーザー用に Cognito によって作成された IAM ロールに、以下のポリシーを設定する。

```json
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Action": [
            "s3:DeleteObject",
            "s3:GetObject",
            "s3:ListBucket",
            "s3:PutObject",
            "s3:PutObjectAcl"
         ],
         "Resource": [
            "arn:aws:s3:::バケット名",
            "arn:aws:s3:::バケット名/*"
         ]
      }
   ]
}
```

### 4. S3 の CORS 設定

作成したバケットに以下の CORS 設定をする。

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "HEAD",
            "GET",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag"
        ]
    }
]
```
