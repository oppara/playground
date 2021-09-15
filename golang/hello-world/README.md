# hello-world

[Go言語の開発環境セットアップとサンプルプロジェクト作成 | DevelopersIO](https://dev.classmethod.jp/articles/go-setup-and-sample/)

Go Modules を使ってプロジェクトを作成する。
```
% go mod init github.com/oppara/go-hello-world
```

外部パッケージをダウンロードする。
```
% go get rsc.io/quote/v3
```

実行する。
```
% go run *.go
```

ビルドする。
```
% go build
```

フォーマットを実行。
```
% go fmt ./...
```

静的解析を実行。
```
% go vet main.go
```

`gofmt/go fmt`の上位互換のツールを使う。
```
% go install golang.org/x/tools/cmd/goimports@latest 
```
実行する。
```
% goimports -w main.go
```

`staticcheck`lint ツールを使う。
```
% go install honnef.co/go/tools/cmd/staticcheck@latest
```

ファイル指定、ディレクトリ指定、階層指定ができる。
```
% staticcheck main.go
% staticcheck .
% staticcheck ./...
```

