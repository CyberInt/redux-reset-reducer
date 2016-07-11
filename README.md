# redux-reset-reducer
Higher-order Redux reducer which resets state to original reducer's initial state

## Usage

### Install via NPM

```
npm install redux-reset-reducer --save
```

### Import

```javascript
import reset from 'redux-reset-reducer'; 
// or
var reset = require('redux-reset-reducer');
```

Or import ES2015 modules
```javascript
import reset from 'redux-reset-reducer/es6';
```
Use this if you are using [rollup.js](http://rollupjs.org/) or
[webpack 2](http://webpack.github.io/docs/changelog.html#2-1-x-beta), or any
ES2015 modules-compatible bundler which can eliminate unused library code with
[tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html).

It is recommended to import the library from `redux-reset-reducer/es6` instead of
`redux-reset-reducer/src` because the source code depends on experimental presets from
babel (stage 1-3) and may be incompatible with your bundler or settings.

### Other environments

Use the Universal Module Definition (UMD)

- [reset.js](dist/reset.js)
- [reset.min.js](dist/reset.min.js) (minified)

## API

```js
reset(...actionTypes: String[]): (reducer) => reducer
```

Creates a higher-order reducer which resets state of base reducer to its initial state
when actions with passed types occurs. Keep in mind that base reducer should return initial
state when passed state is `undefined`.
