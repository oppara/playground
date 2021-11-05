# PHP でスプレッドシートにデータを追加

## Google Sheet APIを有効にする

1. [Google Cloud Platform](https://console.cloud.google.com/?hl=JA) から新たにプロジェクトを作成する。
2. 作成したプロジェクトの「API とサービス」->「ライブラリ」へ移動する。
3. 「Google Sheets API」を検索し、API を有効にする。

## 認証情報の作成

1. 作成したプロジェクトの「API とサービス」->「認証情報」へ移動して 「認証情報を作成」から「サービスアカウント」を選択する。
2. 「サービスアカウントの詳細」を入力し、「作成」をクリック、そのまま「完了」クリック。
3. 表示されているメールアドレスを控えておく。
4. 作成したアカウントの編集（鉛筆マーク）をクリックして、詳細へ移動。
5. 「キー」タブ -> 「鍵を追加」から「新しい鍵を作成」をクリックして鍵を作成し、キーのタイプを json にしてダウンロードしておく。  
この json ファイルはバージョン管理下に置かない。

## スプレッドシートを共有

1. 書き込むスプレッドシートを作成し、サービスアカウントの一覧に表示されていたメアドと共有しておく。
2. 作成したスプレッドシートの ID を控えておく。

## Google APIs Client Library for PHP をインストール

```
$ composer require google/apiclient
```

## 参考サイト

- [google-api-php-client-services/Sheets.php at master · googleapis/google-api-php-client-services](https://github.com/googleapis/google-api-php-client-services/blob/master/src/Sheets.php)
- [googleapis/google-api-php-client: A PHP client library for accessing Google APIs](https://github.com/googleapis/google-api-php-client)
- [PHP Quickstart  |  Sheets API  |  Google Developers](https://developers.google.com/sheets/api/quickstart/php)
- [Google Sheets API  |  Google Developers](https://developers.google.com/sheets/api/reference/rest)

