# Simple Express + React + Webpack Template

This is a simple express.js + react.js (+ SASS) + webpack template.

## How to...

### Install requirements?

```
yarn
```

### Start a development server?

```
yarn watch
```

Then visit `http://localhost:3000` to see the homepage. It'll autoreload the server and rebuild assets when you change stuff (you'll still need to refresh the page to see changes though).

### Build frontend files?

```
yarn build
```

It'll put frontend assets into `./build/prod/frontend`

Ideally, this is then served by a webserver like nginx.

## Other Notes

- This contains no "tests" or test files, as it is just a simple starter pack (mostly for my own purposes).
- TODO: Dockerize this thing.
