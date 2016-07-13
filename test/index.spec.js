import reset from 'index';

describe('Reducers: extenders - withResetReducer', () => {
  const ACTION = 'ACTION';
  const ACTION2 = 'ACTION2';
  const ANOTHER_ACTION = 'ANOTHER_ACTION';
  const INITIAL_STATE = 'INITIAL_STATE';
  const ANOTHER_INITIAL_STATE = 'ANOTHER_INITIAL_STATE';
  const GENERATED_INITIAL_STATE = 'GENERATED_INITIAL_STATE';
  const STATE = 'STATE';

  const reducer = (state = INITIAL_STATE) => state;
  const truthyPredicate = jasmine.createSpy('truthyPredicate').and.returnValue('truthy');
  const stateCreator = jasmine.createSpy('stateCreator').and.returnValue(GENERATED_INITIAL_STATE);

  afterEach(() => {
    truthyPredicate.calls.reset();
    stateCreator.calls.reset();
  });

  it('resets state to original reducer initial state when actions provided', () => {
    const reducerWithReset = reset({ actionCheck: [ACTION, ACTION2] })(reducer);

    expect(reducerWithReset(STATE, { type: ACTION })).toBe(INITIAL_STATE);
    expect(reducerWithReset(STATE, { type: ACTION2 })).toBe(INITIAL_STATE);
  });

  it('resets state to provided state when actions provided', () => {
    const reducerWithReset = reset({
      actionCheck: [ACTION, ACTION2],
      initialState: ANOTHER_INITIAL_STATE,
    })(reducer);

    expect(reducerWithReset(STATE, { type: ACTION })).toBe(ANOTHER_INITIAL_STATE);
    expect(reducerWithReset(STATE, { type: ACTION2 })).toBe(ANOTHER_INITIAL_STATE);
  });

  it('resets state to generated state when actions provided', () => {
    const action2 = { type: ACTION2 };
    const reducerWithReset = reset({
      actionCheck: [ACTION, ACTION2],
      initialState: stateCreator,
    })(reducer);

    expect(reducerWithReset(STATE, { type: ACTION })).toBe(GENERATED_INITIAL_STATE);
    expect(reducerWithReset(STATE, action2)).toBe(GENERATED_INITIAL_STATE);
    expect(stateCreator.calls.mostRecent().args).toEqual([STATE, action2]);
  });

  it('does not reset state on other action when actions provided', () => {
    const reducerWithReset = reset({ actions: [ACTION, ACTION2] })(reducer);

    expect(reducerWithReset(STATE, { type: ANOTHER_ACTION })).toBe(STATE);
  });

  it('resets state to original reducer initial state when predicate provided', () => {
    const action = { type: ACTION };
    const reducerWithReset = reset({ actionCheck: truthyPredicate })(reducer);

    expect(reducerWithReset(STATE, action)).toBe(INITIAL_STATE);
    expect(truthyPredicate.calls.mostRecent().args).toEqual([STATE, action]);
  });

  it('resets state to provided state when predicate provided', () => {
    const action = { type: ACTION };
    const reducerWithReset = reset({
      actionCheck: truthyPredicate,
      initialState: ANOTHER_INITIAL_STATE,
    })(reducer);

    expect(reducerWithReset(STATE, action)).toBe(ANOTHER_INITIAL_STATE);
    expect(truthyPredicate.calls.mostRecent().args).toEqual([STATE, action]);
  });

  it('resets state to generated state when predicate provided', () => {
    const action = { type: ACTION };
    const reducerWithReset = reset({
      actionCheck: truthyPredicate,
      initialState: stateCreator,
    })(reducer);

    expect(reducerWithReset(STATE, action)).toBe(GENERATED_INITIAL_STATE);
    expect(truthyPredicate.calls.mostRecent().args).toEqual([STATE, action]);
    expect(stateCreator.calls.mostRecent().args).toEqual([STATE, action]);
  });

  it('does not reset state when predicate returns falsy value', () => {
    const action = { type: ACTION };
    const falsyPredicate = jasmine.createSpy('falsyPredicate').and.returnValue('');
    const reducerWithReset = reset({ actionCheck: falsyPredicate })(reducer);

    expect(reducerWithReset(STATE, action)).toBe(STATE);
    expect(falsyPredicate.calls.mostRecent().args).toEqual([STATE, action]);
  });

  it('does not do anything if actions and predicate are not provided', () => {
    const reducerWithReset = reset({ initialState: ANOTHER_INITIAL_STATE })(reducer);

    expect(reducerWithReset(STATE, { type: ACTION })).toEqual(STATE);
  });
});
