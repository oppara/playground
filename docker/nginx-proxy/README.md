# [nginx-proxy](https://hub.docker.com/r/jwilder/nginx-proxy) を使用して複数コンテナを立ち上げる

Docker のプロジェクトを複数同時に立ち上げたい。かつ、FQDN でアクセスしたい。

こんなイメージ

```
http://blog.example.local -> /home/work/blog/docker-compose.yaml
http://api.example.local -> /home/work/api/docker-compose.yaml
http://foo.example.local -> /home/work/foo/docker-compose.yaml
```

## 手順

http://hoge.example.local でアクセスする場合。

### 1. `nginx-proxy` を立ち上げておく

```
% git clone git@example.com:oppara/docker-nginx-proxy.git
% cd docker-nginx-proxy
% make up
```

### 2. docker-compose.yaml を書く

- `VIRTUAL_HOST` を設定する。
- `networks` で `nginx-proxy` を指定する。

docker-compose.yaml 設定例

```yaml:docker-compose.yaml
version: "3"

services:
  hoge:
    image: php:8.0-apache
    container_name: hoge
    expose:
      - 80
    restart: always
    environment:
      # `VIRTUAL_HOST` を設定する。
      VIRTUAL_HOST: hoge.example.local
    volumes:
      - ./htdocs:/var/www/html

# `networks` で `nginx-proxy` を指定する。
networks:
  default:
    name: nginx-proxy
```

### 2. hosts を設定する

docker-compose.yaml の `VIRTUAL_HOST` を設定した FQDN を `hosts` に設定する。

```
127.0.0.1 localhost hoge.example.local
```

### 3. コンテナを立ち上げる

```
% docker-compose up -d
```

### 4. ブラウザでアクセスする

```
% open http://hoge.example.local
```

## 参考サイト

- [Host Multiple Websites On One VPS With Docker And Nginx](https://blog.ssdnodes.com/blog/host-multiple-websites-docker-nginx/)
- [jwilder/nginx-proxy - Docker Image | Docker Hub](https://hub.docker.com/r/jwilder/nginx-proxy)
