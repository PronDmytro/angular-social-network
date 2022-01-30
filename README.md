# angular-social-network

## Prerequisites:
- terminal: git bash / wsl2
- installed [nvm](https://github.com/nvm-sh/nvm) ([for windows](https://github.com/coreybutler/nvm-windows))
- docker

## Install:
```
./nvm-use.sh #for linux just nvm use
npm i yarn -g
yarn install
yarn prepare:husky
yarn copy:example-env
```
## Start
```
yarn run docker:test-db:start

yarn run start:client

yarn run start:server
```

## Build production and start
```
yarn run build:prod:with-env
yarn run server:built
```



## Husky hooks
###pre-commit
Is running like a ``yarn run lint:fix`` only for changed files.

###commit-msg
Common types according to commitlint-config-conventional (based on the [Angular convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)) can be:
- build
- chore
- ci
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

Correct commit naming style:
```
chore: run tests on travis ci
```
```
fix(server): send cors headers
```
```
feat(blog): add comment section
```
