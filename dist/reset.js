(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["reset"] = factory();
	else
		root["reset"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.actionTypes = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _reduxReuse = __webpack_require__(1);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * These are private action types reserved by redux-reset-reduser.
	 *
	 * From Redux:
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var actionTypes = exports.actionTypes = {
	  RESET: '@@reduxReuse/RESET'
	};

	var generateInitialState = function generateInitialState(initialState, state, action, reducer) {
	  if (initialState === undefined) {
	    return reducer(undefined, { type: actionTypes.RESET });
	  }

	  return typeof initialState === 'function' ? initialState(state, action) : initialState;
	};

	var withPredicate = function withPredicate(predicate, initialState) {
	  return function (reducer) {
	    return function (state, action) {
	      if (predicate(state, action)) {
	        return generateInitialState(initialState, state, action, reducer);
	      }

	      return reducer(state, action);
	    };
	  };
	};

	/**
	 * Creates a reducer wrapper which resets the state to original reducer's initial state
	 * for the given action type(s) or when predicate evaluates to truthy value.
	 * If initialState also provided, then state is reseted to this value instead of
	 * initial state of original reducer.
	 * @param {object} options
	 * @param {(string|string[]|function)} [options.actionCheck] - Can be either list of action types,
	 *   for which state should be reseted, or function, which accept state and action objects as
	 *   arguments and if evaluates to truthy value, then state will be reseted.
	 * @param {*} [options.initialState] - value, which will override original reducer's
	 *   initial state. If function provided, then this function will be used to generate
	 *   state, based on current state and action object.
	 * @returns {function} a function of signature (reducer) => newReducer
	 */
	var reset = function reset(_ref) {
	  var actionCheck = _ref.actionCheck;
	  var initialState = _ref.initialState;
	  return function () {
	    var reducer = arguments.length <= 0 || arguments[0] === undefined ? _reduxReuse.nullReducer : arguments[0];

	    if (!actionCheck) {
	      return reducer;
	    }

	    if (typeof actionCheck === 'function') {
	      return withPredicate(actionCheck, initialState)(reducer);
	    }

	    var actionTypes = Array.isArray(actionCheck) ? actionCheck : [actionCheck];

	    var newHandlers = actionTypes.reduce(function (handlers, actionType) {
	      return _extends({}, handlers, _defineProperty({}, actionType, function (state, action) {
	        return generateInitialState(initialState, state, action, reducer);
	      }));
	    }, {});

	    return (0, _reduxReuse.extendReducer)(reducer, newHandlers);
	  };
	};

	exports.default = reset;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extendReducer = __webpack_require__(2);

	Object.defineProperty(exports, 'extendReducer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_extendReducer).default;
	  }
	});

	var _initialReducer = __webpack_require__(3);

	Object.defineProperty(exports, 'initialReducer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_initialReducer).default;
	  }
	});

	var _nullReducer = __webpack_require__(4);

	Object.defineProperty(exports, 'nullReducer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_nullReducer).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Extends an existing reducer with additional action type handlers
	 * @param {object} handlers - object, where keys are action types
	 *   to be handled and values is a reducer function with signature:
	 *     (state, action) => newState
	 * @returns {function} a function of signature (reducer) => newReducer
	 */
	var _extendReducer = function _extendReducer(handlers) {
	  return function (reducer) {
	    return function (state, action) {
	      var stateForReducer = handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;

	      return reducer(stateForReducer, action);
	    };
	  };
	};

	var extendReducer = function extendReducer() {
	  if (arguments.length === 1) {
	    return _extendReducer(arguments.length <= 0 ? undefined : arguments[0]);
	  }

	  return _extendReducer(arguments.length <= 1 ? undefined : arguments[1])(arguments.length <= 0 ? undefined : arguments[0]);
	};

	exports.default = extendReducer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Creates a reducer with passed value as initial state
	 * @param {*} initialState
	 * @returns {function} Reducer function
	 */
	var initialReducer = function initialReducer(initialState) {
	  return function (state) {
	    return typeof state === 'undefined' ? initialState : state;
	  };
	};

	exports.default = initialReducer;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _initialReducer = __webpack_require__(3);

	var _initialReducer2 = _interopRequireDefault(_initialReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * A reducer with null as initial state
	 */
	var nullReducer = (0, _initialReducer2.default)(null);

	exports.default = nullReducer;

/***/ }
/******/ ])
});
;