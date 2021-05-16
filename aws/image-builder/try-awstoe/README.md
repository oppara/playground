# try-awstoe

* [Develop AWSTOE components locally - EC2 Image Builder](https://docs.aws.amazon.com/ja_jp/imagebuilder/latest/userguide/image-builder-component-manager-local.html)
* [\[アップデート\] EC2 Image Builder の components をローカルでテストするツールがリリースされました | DevelopersIO](https://dev.classmethod.jp/articles/ec2-image-builder-components-can-now-be-developed-locally/)

## Usage

Build AWSTOE Docker image

```
% make build
```

Validate AWSTOE components

```
% make validate TARGET=/path/to/target.yaml
```

Execute AWSTOE components

```
% make run TARGET=/path/to/target.yaml
```

