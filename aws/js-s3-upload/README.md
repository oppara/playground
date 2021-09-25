# ブラウザから Amazon S3 への写真のアップロード

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


