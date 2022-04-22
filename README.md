# Ahk check README file images

Checks `README.md` file for image references and verifies that each file exist. Fails the action in case of any image file missing.

## Sample action

```yml
on: [push]

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 1
      - name: Publish results
        uses: akosdudas/ahk-action-check-readme-images@v1
```

## Development

Requirements:

- NodeJS
- Yarn

Development process:

1. `yarn install`
1. code
1. `yarn run build`
1. push
