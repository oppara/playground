package main

import (
	"fmt"

	"github.com/oppara/playground/golang/hello-world/subpkg"
)

func main() {
	fmt.Println(subpkg.Hello())
	fmt.Println(subpkg.Golang())
	fmt.Println(Goodbye())
}
