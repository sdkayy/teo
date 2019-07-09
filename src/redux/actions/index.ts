import * as types from '../types';

export const doThing = data => ({
  type: types.DATA,
  data: {
    ...data,
  },
});
