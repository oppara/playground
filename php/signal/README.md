# PHP でシグナルを扱う

シグナルを送信して、安全にプログラムを終了させたい。

## バックグラウンドで実行

```
$ nohup php batch.php > nohup.out.log 2> nohup.err.log &
[1] 53852
```
SIGTERM

```
$ kill 53852
or
$ kill -SIGTERM 53852
```

SIGQUIT

```
$ kill -SIGQUIT 53852
```

SIGHUP

```
$ kill -SIGHUP 53852
```

## フォアグラウンドで実行

```
$ php batch.php

Ctrl+C 実行
```

## シグナル受信時のだいたいのデフォルト動作(一部) 

- SIGHUP -> プログラム終了 
- SIGINT -> プログラム終了 
- SIGTERM -> プログラム終了 
- SIGKILL -> プログラム終了 
- SIGPIPE -> プログラム終了 
- SIGUSR1 -> プログラム終了 
- SIGUSR2 -> プログラム終了 
- SIGWINCH -> プログラム終了 
- SIGALRM -> プログラム終了 
- SIGCHILD -> 無視 
- SIGSEGV -> コアダンプして終了 
- SIGFPE -> コアダンプして終了

## 参考

- [PHP シグナル送信による安全なバッチプログラムの停止(pcntl_signal) - Symfoware](https://symfoware.blog.fc2.com/blog-entry-2238.html)
- [PHPとシグナル、その裏側](https://www.slideshare.net/do_aki/20171008-signal-onphp)
- [PHP のシグナルハンドラのいろいろ - ngyukiの日記](https://ngyuki.hatenablog.com/entry/2013/01/17/003812)
- [Man page of SIGNAL](http://linuxjm.osdn.jp/html/LDP_man-pages/man7/signal.7.html)
