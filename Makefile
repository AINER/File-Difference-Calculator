install:
	npm ci
	npm link

test:
	npm test

test-coverage:
	npx jest --coverage

lint:
	npx eslint .