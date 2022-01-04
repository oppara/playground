# gin hello world

[gin](https://github.com/gin-gonic/gin) を試す

## 手順

go module の初期化

```
% go mod init github.com/oppara/playground/golang/gin-hello-world
```

gin の取得

```
% go get github.com/gin-gonic/gin
```

実行

```
% go run ./example.go
```

アクセス
```
% curl http://localhost:8080
```

## 環境

```
% sw_vers
ProductName:    macOS
ProductVersion: 11.6.2
BuildVersion:   20G314

% go version
go version go1.17.5 darwin/amd64
```

