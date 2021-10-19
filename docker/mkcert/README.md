# mkcert を使用して https なローカルサーバの立ち上げ 

戦略

- php-apache のイメージは、デフォルトで SSL が無効になっているので有効にする。
- x86, ARM の切替等面倒なので、イメージ内に mkcert をインストールせずホスト側にインストールする。
- ホスト側で作成した証明書をマウントして Apache から読み込めるようにする。

## 前準備

[mkcert Installation](https://github.com/FiloSottile/mkcert#installation) を参考に、mkcert をインストールしておく。

## 初回起動時


local CA を作成する。
```
% make mkcert-install
```

証明書を作成する。

```
% make mkcert-create
```

イメージの作成。

```
% make build
```

## 起動

```
% make up
```

`https://localhost/`にアクセス。

