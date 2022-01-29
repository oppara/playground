# Docker で MySQL を動かす

```
% docker-compose up -d
% mysql -u root -p -h 127.0.0.1 testdb
```

## 「表示順という属性を別テーブルに分ける」を試す

[表示順という属性を別テーブルに分ける - そーだいなるらくがき帳](https://soudai.hatenablog.com/entry/2022/01/27/114257)

例えば isucon11 の予選で出てくる 状態の履歴から最新の状態が欲しい場合を試す。

```
% docker-compose exec mysqldb bash
root@mysqldb# mysql -u root -p testdb < /docker-entrypoint-initdb.d/isu.sql

mysql> INSERT INTO isu_condition (`jia_isu_uuid`, `timestamp`, `is_sitting`, `condition`, `message`) VALUES (UUID(), NOW(), CEIL(RAND() * 100), SUBSTRING(MD5(RAND()), 1, 10), SUBSTRING(MD5(RAND()), 1, 20));
mysql> SELECT * FROM latest_isu_condition_id ORDER BY id DESC;
```
