# terraform を使用して VPC を作成

[WDP116_AWS_CodeDeploy/VPC.tf at master · wdpress/WDP116_AWS_CodeDeploy](https://github.com/wdpress/WDP116_AWS_CodeDeploy/blob/master/terraform/chapter2/step1/VPC.tf)

## 手順


### 初期化

```sh
% terraform init
```

### 内容確認

```sh
% terraform plan
```

### 実行

aws-vault を使ってスイッチロール先にアプライ。

```sh
% aws-vault exec oppara-dev -- terraform apply
```

### リソースの削除

```sh
% aws-vault exec oppara-dev -- terraform destroy
```
