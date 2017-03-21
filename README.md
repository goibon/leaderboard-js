# leaderboard-js
A simple express-based app for storing and retrieving entries in a leaderboard.

## Prerequisites
Requires [MongoDB](https://www.mongodb.com/) (Available through Homebrew: `brew install mongodb`).

## Usage
Make sure that you have a [MongoDB daemon](https://docs.mongodb.com/manual/reference/program/mongod/) running, which can be started with `mongod`.

```sh
# optionally set environment variables PORT and MONGODB_PATH eg.
# export PORT=3000
npm start
```
#### Supported environment variables
`PORT`: The port that the server will listen to.
Defaults to `3000`

`MONGODB_PATH`: The path to the mongodb daemon that the server will attempt to connect to.
Defaults to `mongodb://localhost:27017/leaderboard`.

### `GET : /`
Sending a `GET` request to the root will retrieve all entries from the database, sort them by score in descending order, and serve an HTML page displaying the *rank*, *name* and *score* of each entry.

The page is declared as a [Pug](https://pugjs.org/) template at `/views/index.pug` and includes [Jquery](https://jquery.com/), [Tether](http://tether.io/) and [Bootstrap 4](https://v4-alpha.getbootstrap.com/). For styling it includes a CSS file which is built from the [Sass](http://sass-lang.com/) file at `sass/main.scss` using [node-sass-middleware](https://github.com/sass/node-sass-middleware).

### `GET : /scores`
Retrieves all entries from the database and returns them as an array in the order that MongoDB returned them.

### `POST : /scores`
Expects a body containing an object with the following properties:

```js
{
  "name": string (defaults to "Anonymous"),
  "score": number (required),
  "timestamp": date (defaults to the time at which the request was processed.)
}
```
If the object was successfully stored it returns the MongoDB `_id` of the newly stored document.

## License

MIT License

Copyright (c) 2017 Kasper Lind Sørensen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
