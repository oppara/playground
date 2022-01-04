package main

import  (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    router := gin.Default()
    router.LoadHTMLGlob("templates/*.html")

    data := "Hello Golang/Gin!!"

    router.GET("/", func(ctx *gin.Context) {
        ctx.HTML(http.StatusOK, "index.html", gin.H{
            "data": data,
        })
    })
    router.Run()
}
