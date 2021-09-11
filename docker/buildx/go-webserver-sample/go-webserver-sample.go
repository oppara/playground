package main

import (
    "fmt"
    "net/http"
    "os"
    "runtime"
)

func handler(w http.ResponseWriter, r *http.Request) {
    hostname, _ := os.Hostname()
    fmt.Fprintf(w, "<h1>Welcome Golang-WebServer!</h1>")
    fmt.Fprintf(w, "<h2>Hostname: %s</h2>", hostname)
    fmt.Fprintf(w, "<h2>OS: %s</h2>", runtime.GOOS)
    fmt.Fprintf(w, "<h2>Architecture: %s</h2>", runtime.GOARCH)
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
