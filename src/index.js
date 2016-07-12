import { extendReducer, nullReducer } from 'redux-reuse';

/**
 * These are private action types reserved by redux-reset-reduser.
 *
 * From Redux:
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
export const actionTypes = {
  RESET: '@@reduxReuse/RESET'
};

const generateInitialState = (initialState, state, action, reducer) => {
  if (initialState === undefined) {
    return reducer(undefined, { type: actionTypes.RESET });
  }

  return typeof initialState === 'function'
    ? initialState(state, action)
    : initialState;
}
  

const withPredicate = (predicate, initialState) => (reducer) => (state, action) => {
  if (predicate(state, action)) {
    return generateInitialState(initialState, state, action, reducer);
  }

  return reducer(state, action);
}

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
const reset = ({ actionCheck, initialState }) => (reducer = nullReducer) => {
  if (!actionCheck) {
    return reducer;
  }

  if (typeof actionCheck === 'function') {
    return withPredicate(actionCheck, initialState)(reducer);
  }

  const actionTypes = Array.isArray(actionCheck) ? actionCheck : [actionCheck];

  const newHandlers = actionTypes.reduce((handlers, actionType) => ({
    ...handlers,
    [actionType]: (state, action) => generateInitialState(initialState, state, action, reducer),
  }), {});
  
  return extendReducer(reducer, newHandlers);
};

export default reset;
