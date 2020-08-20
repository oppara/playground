# ビジュアルリグレッションテスト

Jest と Puppeteer を使用したビジュアルリグレッションテスト。

## インストール

```
% npm init -y
% npm install jest puppeteer jest-puppeteer jest-image-snapshot commander
% npm install -D eslint eslint-plugin-jest
```

## 実行

```
% make
```

## テスト用のスクリーンショットの更新

```
% make update
```

- [Jest CLI オプション · Jest](https://doc.ebichu.cc/jest/docs/ja/cli.html)
- [Jest CLI Options · Jest](https://jestjs.io/docs/ja/cli#--init)
- [JestとPuppeteerでお手軽(Visual)レグレッションテスト - Qiita](https://qiita.com/kiida/items/fae689b8a58c30c5e337)

    https://github.com/xfumihiro/jest-puppeteer-example/blob/master/setup.js


id名のディレクトリ内で実行することで、id を取得できるようにする
```
mkdir 39
cd 39
npx jest --no-colors --json --outputFile=log.json --noStackTrace --projects ../test  

```

sites
id, name, urls, memo, created, updated, deleted

histories
created, site_id, log, error

実行ボタンをクリック
クリック時の日時を保存し、ログファイル名に使用する e.g log_20201015_1433.json
サイトに紐ずくページをファイルに書き出す
バックグラウンドで jest 実行
ログファイルが作成されていたら実行完了
エラーファイルがあれば、エラー
実行中は、実行ボタンは disabled

確認ボタンをクリック
対象のログファイルから、差分のあるページのurlと差分画像を表示する
対象のログファイルをDBに保存して、ログファイル自体は削除する


更新ボタンをクリック
クリック時の日時を保存し、ログファイル名に使用する e.g update_20201015_1433.json
バックグラウンドで jest 実行
更新ログファイルが作成されていたら実行完了
エラーファイルがあれば、エラー
更新中は、更新ボタンは disabled

pages に id とかいらんかも

サイト名、最終実行日時、結果（OK, diff有り、更新済み）、「編集」「実行」
実行ボタンはコンファームつける

[FlyPie/composer.json at master · WyriHaximus/FlyPie](https://github.com/WyriHaximus/FlyPie/blob/master/composer.json)

