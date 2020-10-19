# terraform


## インストール

```sh
% brew install terraform
```

## エイリアス

面倒なので、エイリアスを設定しとく。

```zsh
command -v terraform /dev/null && alias tf="terraform"
```

## 補完

```zsh
if [[ -L "/usr/local/bin/terraform" ]]; then
  autoload -U +X bashcompinit && bashcompinit
  complete -o nospace -C /usr/local/bin/terraform terraform
fi
```

## lint

```sh
% brew install tflint
```

```sh
% tflint --deep --aws-region=ap-northeast-1
```

## [tfenv](https://github.com/tfutils/tfenv)

```sh
% anyenv install tfenv
% exec $SHELL -l 

% mkdir -p $(anyenv root)/plugins
% git clone https://github.com/rugamaga/anyenv-tfenv-init.git $(anyenv root)/plugins/anyenv-tf
```


## 参照

* [Terraform Tips - Qiita](https://qiita.com/str416yb/items/3f7d4cd0f63c3535ff48)
