<?php
declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

define('CREDENTIALS_PATH', $_ENV['AUTH_JSON_NAME']);
define('SPREADSHEET_ID',   $_ENV['SPREADSHEET_ID']);
define('SPREADSHEET_RANGE',   'シート1!A2');

$key = __DIR__ . '/' . CREDENTIALS_PATH;

$client = new Google\Client();
$client->setScopes([Google\Service\Sheets::SPREADSHEETS, Google\Service\Sheets::DRIVE]);
$client->setAuthConfig(__DIR__ . '/' . CREDENTIALS_PATH);

$sheet = new Google\Service\Sheets($client);
// https://github.com/googleapis/google-api-php-client-services/blob/master/src/Sheets/ValueRange.php
$valueRange = new Google\Service\Sheets\ValueRange();

// 1行分のデータを作成
$values = ['hoge', 'foo', date('Y/m/d H:i:s')];
$valueRange->setValues(['values' => $values]);

// 書き込み実行
// [ValueInputOption  |  Sheets API  |  Google Developers](https://developers.google.com/sheets/api/reference/rest/v4/ValueInputOption)
// https://github.com/googleapis/google-api-php-client-services/blob/master/src/Sheets.php#L187
$sheet->spreadsheets_values->append(SPREADSHEET_ID, SPREADSHEET_RANGE, $valueRange, ['valueInputOption' => 'USER_ENTERED']);
