// src/02-table-tests/index.test.ts
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 5, b: 3, action: Action.Add, expected: 8 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: '5', b: 3, action: Action.Add, expected: null },  // Invalid a
  { a: 5, b: '3', action: Action.Add, expected: null },  // Invalid b
  { a: 5, b: 3, action: '%', expected: null },           // Invalid action
  { a: null, b: 3, action: Action.Add, expected: null }, // Invalid a (null)
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should calculate $a $action $b and return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    }
  );
});
