import { extendReducer, nullReducer } from 'redux-reuse';

/**
 * These are private action types reserved by redux-reuse.
 *
 * From Redux:
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
export const actionTypes = {
  RESET: '@@reduxReuse/RESET'
};

/**
 * Creates a reducer wrapper which resets the state for the given action type(s)
 * @param {string[]} actions
 * @returns {function} a function of signature (reducer) => newReducer
 */
const reset = (...actions) => (reducer = nullReducer) =>
  extendReducer(reducer,
    actions.reduce((handlers, actionType) => ({
      ...handlers,
      [actionType]: () => reducer(undefined, { type: actionTypes.RESET }),
    }), {})
  );

export default reset;
