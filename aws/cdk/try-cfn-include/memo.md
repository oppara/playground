# CloudFormation-Include CDK

[CloudFormation テンプレートから AWS Cloud Development Kit への移行 | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/migrating-cloudformation-templates-to-the-aws-cloud-development-kit/)

CloudFormation で作成したバケットを CDK 管理下に移行させる。


## バケットの作成

以下のテンプレートでテスト用のバケットを作成する。


```yaml:my-bucket.cfn.yaml
Resources:
  MyBucket:
    Type: AWS::S3::backet
```

rain deploy my-bucket.cfn.yaml try-cfn-include

## CDK アプリケーションの作成

```
$ mkdir try-cfn-include && cd $_
$ cdk init -l typescript
```

cloudformation-include モジュールの追加

```
$ npm i @aws-cdk/cloudformation-include
```

eslint 関連のモジュールを追加

```
$ npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin  eslint-plugin-jest
```

prettier 関連のモジュールを追加
```
$ npm i -D eslint prettier eslint-config-prettier
```

スクリプト作成


CDK 用のスタックを作成

```
$ cdk diff
Stack TryCfnIncludeStack
Conditions
[+] Condition CDKMetadata/Condition CDKMetadataAvailable: {"Fn::Or":[{"Fn::Or":[{"Fn::Equals":[{"Ref":"AWS::Region"},"af-south-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-east-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-northeast-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-northeast-2"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-south-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-southeast-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ap-southeast-2"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"ca-central-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"cn-north-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"cn-northwest-1"]}]},{"Fn::Or":[{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-central-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-north-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-south-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-west-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-west-2"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"eu-west-3"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"me-south-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"sa-east-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"us-east-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"us-east-2"]}]},{"Fn::Or":[{"Fn::Equals":[{"Ref":"AWS::Region"},"us-west-1"]},{"Fn::Equals":[{"Ref":"AWS::Region"},"us-west-2"]}]}]}

Resources
[+] AWS::S3::Bucket Template/MyBucket MyBucket
```

```
$ cdk deploy
```

```
$ cdk diff
Stack TryCfnIncludeStack
There were no differences
```

パブリックアクセスをブロックさせる


```
$ cdk diff
Stack TryCfnIncludeStack
Resources
[~] AWS::S3::Bucket Template/MyBucket MyBucket
 └─ [+] PublicAccessBlockConfiguration
     └─ {"BlockPublicAcls":true}
```

後始末

```
cdk destroy
```
