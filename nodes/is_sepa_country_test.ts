import { IsSepaCountryInput } from '../gen/messages_pb';
import { isSepaCountry } from './is_sepa_country';
import { testContext } from './testkit';

describe('IsSepaCountry', () => {
  it('reports Germany as a SEPA member', () => {
    const input = new IsSepaCountryInput();
    input.setCountryCode('de');
    const result = isSepaCountry(testContext, input);
    expect(result.getIsSepa()).toBe(true);
    expect(result.getRecognizedCountry()).toBe(true);
  });

  it('reports the US as recognized but NOT a SEPA member', () => {
    const input = new IsSepaCountryInput();
    input.setCountryCode('US');
    const result = isSepaCountry(testContext, input);
    expect(result.getIsSepa()).toBe(false);
    expect(result.getRecognizedCountry()).toBe(true);
  });

  it('reports an unrecognized code as neither recognized nor SEPA', () => {
    const input = new IsSepaCountryInput();
    input.setCountryCode('ZZ');
    const result = isSepaCountry(testContext, input);
    expect(result.getIsSepa()).toBe(false);
    expect(result.getRecognizedCountry()).toBe(false);
  });

  it('rejects a malformed country code with a structured error, not a crash', () => {
    const input = new IsSepaCountryInput();
    input.setCountryCode('DEU');
    const result = isSepaCountry(testContext, input);
    expect(result.getError()).toBe('INVALID_COUNTRY_CODE_FORMAT');
  });
});
