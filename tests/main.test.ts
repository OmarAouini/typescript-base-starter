import {funzione} from '../src/index';

test('param equal to result', () => {
  expect(funzione(1)).toBe(1);
});