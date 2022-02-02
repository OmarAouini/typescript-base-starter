import {funzione} from '../src/index';

describe("funzione", () => {
  test('param equal to result', () => {
    expect(funzione(1)).toBe(1);
  });
})