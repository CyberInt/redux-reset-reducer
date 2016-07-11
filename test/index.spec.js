import reset from 'index';

describe('Reducers: extenders - withResetReducer', () => {
  const ACTION = 'ACTION';
  const ACTION2 = 'ACTION2';
  const INITIAL_STATE = 'initialState';
  const reducer = (state = INITIAL_STATE) => state;
  const reducerWithReset = reset(ACTION, ACTION2)(reducer);

  it('resets state', () => {
    expect(reducerWithReset({}, { type: ACTION })).toBe(INITIAL_STATE);
    expect(reducerWithReset({}, { type: ACTION2 })).toBe(INITIAL_STATE);
  });
});
