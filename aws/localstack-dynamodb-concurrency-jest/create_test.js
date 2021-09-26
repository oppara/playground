const fs = require('fs');

const { createCommand } = require('commander');
const program = createCommand();

program.parse(process.argv);

const times = program.args.length === 0 ? 1 : program.args[0]; // テストの数を指定
const fileName = `./dynamodb-repeat-${times}.test.ts`;

const baseCode = `
  import {
    CreateTableCommand,
    DeleteTableCommand,
    DynamoDBClient,
    ListTablesCommand,
    ScanCommand,
  } from '@aws-sdk/client-dynamodb'
  import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
  import { v4 as uuidV4 } from 'uuid'
`;

fs.writeFileSync(fileName, baseCode);

const appendCode = `
  describe('DynamoDBテスト', () => {
    const region = 'ap-northeast-1'
    // const tableName = 'users'
    const tableName = \`users-\${uuidV4()}\`
    const ddbClient = new DynamoDBClient({
      region,
      endpoint: 'http://localhost:4566', // LocalStackに接続
      credentials: {
        accessKeyId: 'DUMMY', // LocalStackなので任意の値でOK
        secretAccessKey: 'DUMMY', // LocalStackなので任意の値でOK
      },
    })
    const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)

    beforeEach(async () => {
      const { TableNames = [] } = await ddbClient.send(new ListTablesCommand({}))

      // テーブルの存在確認する
      if (TableNames.includes(tableName)) {
        // 存在する場合は削除（データクリアのため）
        await ddbClient.send(
          new DeleteTableCommand({
            TableName: tableName,
          })
        )
      }

      // テーブルを作成
      await ddbClient.send(
        new CreateTableCommand({
          TableName: tableName,
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        })
      )
    })

    it('ユーザを1件作成して取得する', async () => {
      // uuidをハッシュキーとしてデータ作成
      await ddbDocClient.send(
        new PutCommand({
          TableName: tableName,
          Item: {
            id: uuidV4(),
          },
        })
      )

      // Scanでデータを取得
      const { Items: items = [] } = await ddbDocClient.send(
        new ScanCommand({
          TableName: tableName,
        })
      )

      // データを1件取得できること
      expect(items.length).toBe(1)
    })
  })
`;

for (let i = 0; i < times; i++) {
  fs.appendFileSync(fileName, appendCode);
}
