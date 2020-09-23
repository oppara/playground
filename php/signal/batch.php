<?php
declare(strict_types=1);

class Batch
{
    private $terminate = false;

    private $log = 'batch.log';

    public function __construct()
    {
        // 非同期シグナルを有効化
        pcntl_async_signals(true);

        pcntl_signal(SIGTERM, [$this, 'handler']);
        pcntl_signal(SIGINT, [$this, 'handler']);
        pcntl_signal(SIGHUP, [$this, 'handler']);
        pcntl_signal(SIGQUIT, [$this, 'handler']);
        pcntl_signal(SIGUSR2, [$this, 'handler']);

        // SIGUSR1 は無視
        pcntl_signal(SIGUSR1, SIG_IGN);
    }

    public function execute(): void
    {
        while (true) {
            $this->log('start,');
            sleep(1);
            $this->log('contents_get,');
            sleep(1);
            $this->log('parse,');
            sleep(1);
            $this->log('end' . PHP_EOL);
            sleep(1);

            if ($this->terminate) {
                $this->log('terminate' . PHP_EOL);
                break;
            }
        }
    }

    private function handler($signo): void
    {
        switch ($signo) {
            case SIGTERM:
                $this->log('[SIGTERM]');
                $this->terminate = true;
                break;
            case SIGINT:
                $this->log('[SIGINT]');
                $this->terminate = true;
                break;
            case SIGQUIT:
                $this->log('[SIGQUIT]');
                $this->terminate = true;
                break;
            case SIGHUP:
                $this->log('[SIGHUP]');
                $this->terminate = true;
                break;
            default:
                $this->log('[' . $signo . ']');
                $this->terminate = true;
                break;
        }
    }

    private function log($log): void
    {
        file_put_contents($this->log, $log, FILE_APPEND);
    }
}

(new Batch())->execute();
