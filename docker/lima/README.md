# [Lima](https://github.com/lima-vm/lima) で Docker を動かす

[macOSでもWSLみたいなLinux環境を手に入れる - Qiita](https://qiita.com/chibiegg/items/eede37345f7058ce604d)


## Lima のインストール

```
% brew install lima
```

## ゲスト VM の作成と起動

Docker 関連がセットアップされたファイルを指定する。

```
% curl -o default.yaml https://raw.githubusercontent.com/chibiegg/lima-config/master/docker.yaml
% limactl start default.yaml
```

起動しているインスタンスを確認する。
```
% limctl list
```

インスタンス内で、bash を起動する。
```
% limactl shell default bash

or

% lima bash
```

## ゲスト VM のシャットダウン

```
% limactl stop
```

## ゲスト VM の削除

```
% limactl delete default
```


## macOS の docker コマンドで動かす

ssh の設定を追加する。
```
% cat << EOS >> ~/.ssh/config
Host limadocker
  HostName localhost
  NoHostAuthenticationForLocalhost yes
  Port 60006
EOS
```

とりあえず環境変数を設定する。
```
% export DOCKER_HOST=ssh://limadocker:60006
```

起動するもエラーになる。
```
% docker run -it -d -p 8080:80 nginx:latest
docker: error during connect: Post "http://docker.example.com/v1.24/containers/create": command [ssh -p 60006 -- limadocker docker system dial-stdio] has exited with exit status 255, please make sure the URL is valid, and Docker 18.09 or later is installed on the remote host: stderr=ssh_askpass: exec(/usr/X11R6/bin/ssh-askpass): No such file or directory
oppara@localhost: Permission denied (publickey).
.
See 'docker run --help'.
```

`NoHostAuthenticationForLocalhost` が効いてない模様なので1回ログインしておく。
```
% ssh -l oppara -p 60006 localhost 
```

再度立ち上げる。
```
% docker run -it -d -p 8080:80 nginx:latest
% open http://localhost:8080

% lima docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                                   NAMES
c955a688a348   nginx:latest   "/docker-entrypoint.…"   59 seconds ago   Up 56 seconds   0.0.0.0:8080->80/tcp, :::8080->80/tcp   gifted_fermat
```

### docker-compose で動かしてみる

既存のコンテナを削除してから起動してみる。

```
% lima docker rm -f コンテナID
% docker-compose up -d
```

## misc

もろもろ`~/.lima`にインストールされる模様。
```
% ls -1 ~/.lima/default
basedisk
cidata.iso
diffdisk
ga.sock
ha.pid
ha.stderr.log
ha.stdout.log
lima.yaml
qemu.pid
qmp.sock
serial.log
serial.sock
ssh.sock

% du -sh ~/.lima/default
1.4G    /Users/oppara/.lima/default
```
