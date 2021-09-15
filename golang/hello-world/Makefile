
format:
	@find . -print | grep --regex '.*\.go' | xargs goimports -w -local "github.com/hoge/hello-world"

verify:
	@staticcheck ./... && go vet ./...
