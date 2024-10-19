import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values using strict comparison', () => {
    const input = [1, 2, 3, 4];
    const expectedOutput = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    };

    const result = generateLinkedList(input);
    expect(result).toStrictEqual(expectedOutput);
  });

  test('should generate linked list from values and match snapshot', () => {
    const input = [1, 2, 3, 4];
    const result = generateLinkedList(input);
    expect(result).toMatchSnapshot();
  });
});
