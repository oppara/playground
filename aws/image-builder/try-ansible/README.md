# EC2 Image Builder で Ansible を使う

## playbook を S3 にアップロードする

```
$ make sync-playbook
```

## component.yml を S3 にアップロードする

```
$ make upload-component
```

## CloudFormation Stack のデプロイ

```
$ rain deploy imagebuilder.cf.yml --params BucketName=try-imagebuilder-with-ansible,AmiName=amzn2
```

## 参考サイト

- [aws-samples/amazon-ec2-image-builder-samples](https://github.com/aws-samples/amazon-ec2-image-builder-samples/tree/master/Components/Linux/ansible-playbook-execution-amazon-linux-2)
- [EC2 Image Builder で Ansible playbook を実行してみた | DevelopersIO](https://dev.classmethod.jp/articles/ec2-image-builder-ansible-playbook/)
- [EC2 Image Builder で Rolesディレクトリを使用してる Ansible Playbook を実行するにはどうしたらいいですか？ | DevelopersIO](https://dev.classmethod.jp/articles/tsnote-c2-image-builder-ansible-playbook-001/)
- [EC2 Image BuilderはS3にログ出力しよう | DevelopersIO](https://dev.classmethod.jp/articles/ec2-image-builder-s3-log/)
- [\[小ネタ\]EC2 Image BuilderのCloudWatch Logsへの出力を無効化する | DevelopersIO](https://dev.classmethod.jp/articles/ec2-image-builder-cloudwatch-logs-invalidation/)
- [EC2 Image Builder + Ansible + AWS CLI を用いたゴールデンAMIの更新/反映自動化の検討 | by Daichi Harada | Eureka Engineering | Medium](https://medium.com/eureka-engineering/ec2-image-builder-ansible-awscli-%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E3%82%B4%E3%83%BC%E3%83%AB%E3%83%87%E3%83%B3ami%E3%81%AE%E6%9B%B4%E6%96%B0-%E5%8F%8D%E6%98%A0%E8%87%AA%E5%8B%95%E5%8C%96%E3%81%AE%E6%A4%9C%E8%A8%8E-9940ebb07a68)
- [\[アップデート\] EC2 Image Builder のリソースを CloudFormation で作成できるようになりました！ | DevelopersIO](https://dev.classmethod.jp/articles/ec2-image-builder-now-includes-support-for-aws-cloudformation/)
- [ImageBuilder resource type reference - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/AWS_ImageBuilder.html)



