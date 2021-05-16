FROM amazonlinux:2

LABEL maintainer="oppara@oppara.tv"

RUN curl -O https://awstoe-ap-northeast-1.s3.ap-northeast-1.amazonaws.com/latest/linux/386/awstoe \
&& chmod +x awstoe \
&& mv awstoe /usr/bin/.

ENV WORKDIR /data
WORKDIR /data

# ENTRYPOINT ["awstoe"]
# CMD ["--version"]
