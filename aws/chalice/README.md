# Chalice

[Documentation — AWS Chalice](https://aws.github.io/chalice/index.html)

## インストール

```
% pip3 install chalice
```

## プロジェクト作成

```
% chalice new-project hello-world 
```

## デプロイ


```
% cd hello-world
% aws-vault exec oppara-dev -- chalice deploy
Creating deployment package.
Creating IAM role: hello-world-dev
Creating lambda function: hello-world-dev
Creating Rest API
Resources deployed:
  - Lambda ARN: arn:aws:lambda:ap-northeast-1:xxxxxxxxxxxx:function:hello-world-dev
  - Rest API URL: https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/api/
```

## API にアクセス

エンドポイントの確認。

```
% aws-vault exec oppara-dev -- chalice url
https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/api/
```
API にアクセスする。
```
% curl https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/api/
{"hello":"world"}
```

## 後片付け

```
% aws-vault exec oppara-dev -- chalice delete
```
