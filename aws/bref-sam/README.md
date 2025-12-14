# Bref を SAM でデプロイ

- bref のインストール
 
```shell
composer require bref/bref
```

- bref のランタイムは以下から選択する
  - [Bref runtime versions](https://runtimes.bref.sh/?region=ap-northeast-1)

- Makefile を作成する必要がある
- Amazon Linux 2023 には、まだ未対応
- S3 バケットは決め打ちしておいた方が良さげ

## 手順

### デプロイ

```shell
sam build
sam deploy
```

### 削除

```shell
sam delete
```
