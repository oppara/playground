# LocalStackを使ったDynamoDBテストを並列で行う方法

以下のブログの内容を写経してみる。

[\[Node.js\]\[Jest\]LocalStackを使ったDynamoDBテストを並列で行う方法 | DevelopersIO](https://dev.classmethod.jp/articles/localstack-dynamodb-concurrency/)



## Typescript で jest を動かす環境を作成

```
% npm i -D typescript @types/node ts-node
% npm i -D jest @types/jest esbuild-jest esbuild
```

[JestでTypeScriptを高速化する | miyauci.me](https://miyauchi.dev/ja/posts/speeding-up-jest/)

- jest.config.ts のトランスパイルに ts-node を要求するため、jest.config.ts より、jest.config.js の方が早い

と書きつつ、package.json に設定を書く。

```json:package.json
  "jest": {
    "moduleFileExtensions": [
      "ts",
      "js"
    ],
    "transform": {
      "^.+\\.tsx?$": "esbuild-jest"
    }
  }
```


## 必要なモジュールをインストール

ブログの内容を実行するためのモジュールをインストールする。

```
% npm i @aws-sdk/lib-dynamodb uuid
```

## 引数のパース

引数で実行回数を指定できるようにしたかったので、引数をパースするモジュールをインストールする。

```
% npm i commander
% npm i -D @types/commander
```

Typescript で試してみる。

```typescript:try-commander.ts
import { Command  } from 'commander';
const program = new Command();
program.parse(process.argv);
console.log(program.args);
```

import 文を ts-node で実行するのは面倒みたい。  
[ts-nodeでESModulesのファイルを実行する](https://zenn.dev/tak_iwamoto/articles/862527e69f544e)

```
% node --loader ts-node/esm try-commander.ts foo bar
```

ブログのテスト作成用のスクリプトを引数で実行回数を指定できるように修正。
```diff
-import fs from 'fs'
+const fs = require('fs');

-const times = 1 // テストの数を指定
-const fileName = `./dynamodb-repeat-${times}.test.ts`
+const { createCommand } = require('commander');
+const program = createCommand();
+
+program.parse(process.argv);
+
+const times = program.args.length === 0 ? 1 : program.args[0]; // テストの数を指定
+const fileName = `./dynamodb-repeat-${times}.test.ts`;
```

## テストの実行


テストファイルの作成
```
% node create_test.js
% node create_test.js 100
% node create_test.js 101
% node create_test.js 102
```

テスト実行（並列実行出来ないのでテストが落ちる）

```
% npx jest
ry)
Test Suites: 3 failed, 1 passed, 4 total
Tests:       225 failed, 79 passed, 304 total
Snapshots:   0 total
Time:        41.735 s
Ran all test suites.
```


並列ではなく、1つずつ実行する。
```
% npx jest --runInBand
```

並列実行できるテストコードを実行していみる。

```
% npx jest
 PASS  ./dynamodb-repeat-100.test.ts (49.332 s)
 PASS  ./dynamodb-repeat-102.test.ts (54.023 s)
 PASS  ./dynamodb-repeat-1.test.ts
 PASS  ./dynamodb-repeat-101.test.ts (54.259 s)

Test Suites: 4 passed, 4 total
Tests:       304 passed, 304 total
Snapshots:   0 total
Time:        54.979 s
Ran all test suites.
```
