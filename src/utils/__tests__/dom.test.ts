import { describe, expect, it } from 'vitest';
import { Window } from 'happy-dom';
import { setCssProperty } from '../dom';

describe('setCssProperty', () => {
  const testProperty = {
    key: 'test-property',
    value: '10',
  };

  it('returns css property', async () => {
    const window = new Window();
    const document = window.document;
    const testDiv = document.createElement('div') as any;

    setCssProperty(testDiv, testProperty.key, testProperty.value);

    expect(testDiv.style.getPropertyValue(`--${testProperty.key}`)).toEqual(
      testProperty.value,
    );
  });
});
