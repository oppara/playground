
[DockerコンテナのThe PID 1 Problemとその解決策(NodeJS編) | Casual Developers Note](https://casualdevelopers.com/tech-tips/how-to-fix-the-pid-1-problem-for-dockerized-nodejs-app/)

```
$ npm init -y
$ npm i express
```

ビルドして実行
```
$ docker build -t dockerized-app .
$ docker run -p 3000:3000 dockerized-app

$ docker ps

$ docker top コンテナID
$ docker stop コンテナID

$ docker ps -a
```
