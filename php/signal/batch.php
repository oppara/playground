<?php
declare(strict_types=1);

$terminate = false;
$log = 'batch.log';

// 非同期シグナルを有効化
pcntl_async_signals(true);

pcntl_signal(SIGQUIT, function ($sig) use (&$terminate, $log): void {
    file_put_contents($log, '[SIGQUIT! ' . $sig . ']', FILE_APPEND);
    $terminate = true;
});

pcntl_signal(SIGHUP, function ($sig) use (&$terminate, $log): void {
    file_put_contents($log, '[SIGHUP! ' . $sig . ']', FILE_APPEND);
    $terminate = true;
});

pcntl_signal(SIGTERM, function ($sig) use (&$terminate, $log): void {
    file_put_contents($log, '[SIGTERM! ' . $sig . ']', FILE_APPEND);
    $terminate = true;
});

pcntl_signal(SIGINT, function ($sig) use (&$terminate, $log): void {
    file_put_contents($log, '[SIGINT! ' . $sig . ']', FILE_APPEND);
    $terminate = true;
});


// SIGUSR1 を無視
pcntl_signal(SIGUSR1, SIG_IGN);

while (true) {
    file_put_contents($log, 'start,', FILE_APPEND);
    sleep(1);
    file_put_contents($log, 'contents_get,', FILE_APPEND);
    sleep(1);
    file_put_contents($log, 'parse,', FILE_APPEND);
    sleep(1);
    file_put_contents($log, 'end' . PHP_EOL, FILE_APPEND);
    sleep(1);

    if ($terminate) {
        file_put_contents($log, 'terminate' . PHP_EOL, FILE_APPEND);
        break;
    }
}
