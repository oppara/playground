FROM golang:latest AS builder
WORKDIR /tmp
COPY ./go-webserver-sample.go /tmp
RUN CGO_ENABLED=0 go build -a -installsuffix cgo go-webserver-sample.go

FROM alpine:latest
COPY --from=builder /tmp/go-webserver-sample /bin/
CMD ["/bin/go-webserver-sample"]
