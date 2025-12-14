<?php

require_once __DIR__ . "/vendor/autoload.php";

use Carbon\Carbon;

Carbon::setLocale('ja');

header('Content-Type: application/json; charset=utf-8');

$data = [
    'status' => 'success',
    'message' => 'データ取得に成功しました',
    'date' => Carbon::now()->isoFormat('YYYY/MM/DD(ddd) HH:mm:ss'),
    'items' => [
        ['id' => 1, 'name' => '商品A'],
        ['id' => 2, 'name' => '商品B']
    ]
];

// 配列をJSON文字列に変換して出力
echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>
