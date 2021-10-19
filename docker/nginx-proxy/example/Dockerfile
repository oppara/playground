FROM php:8.0-apache

RUN apt-get update \
    && apt-get install -y libonig-dev libzip-dev unzip \
    && docker-php-ext-install mbstring zip

RUN apt-get install -y msmtp msmtp-mta vim
COPY ./conf/msmtprc /etc/msmtprc
RUN chown www-data:www-data /etc/msmtprc && chmod 600 /etc/msmtprc
