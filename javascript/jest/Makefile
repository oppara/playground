all: test

test:
	npx jest --no-colors --json --outputFile=logs/log.json --noStackTrace
	# npx jest --no-colors --json --outputFile=logs/log.json 2>logs/output
	# npx jest  --no-cache --color=false --testTimeout=10000

update:
	npx jest --silent --no-colors --json --outputFile=logs/log.json --noStackTrace --updateSnapshot

.PHONY: test update
