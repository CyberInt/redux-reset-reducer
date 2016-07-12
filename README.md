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

#### If you need ES6 module
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
reset(
  options: {
    actionCheck: String | String[] | (state: any, action: Object) => boolean,
    initialState: ?any | (state: any, action: Object) => any
  }
): (reducer) => reducer
```

Creates a higher-order reducer which resets state of base reducer.

If `initialState` is provided, then state will be reseted to it, otherwise base reducer will be
invoked with `undefined` as current state, so it will reset state to its defaults
(base reducer must return initial state when passed state is `undefined`).
`initialState` can be function, in such a case it will be invoked in order to generate state,
based on current state and action.

If `actionCheck` is action type or array of action types, then state will be reseted
when action with one of the provided types occurs. If `actionCheck` is function, then state
will be reseted when this function returns truthy value, based on current state and action.

## Comparison with other libraries.
There are at least two similar projects: [redux-reset](https://github.com/abhiaiyer91/redux-reset)
by Abhi Aiyer and [redux-recycle](https://github.com/omnidan/redux-recycle) by Daniel Bugl.
Both of these projects are good, but provide less flexible and extensive API than redux-reset-state,
therefore suppert less amount of usecases, so choose what you need :)
