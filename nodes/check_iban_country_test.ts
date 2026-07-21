import { CheckIbanCountryInput } from '../gen/messages_pb';
import { checkIbanCountry } from './check_iban_country';
import { testContext } from './testkit';

describe('CheckIbanCountry', () => {
  it('matches=true when the valid IBAN is from the expected country', () => {
    const input = new CheckIbanCountryInput();
    input.setIban('NL91ABNA0417164300');
    input.setExpectedCountryCode('nl');
    const result = checkIbanCountry(testContext, input);
    expect(result.getMatches()).toBe(true);
    expect(result.getIbanValid()).toBe(true);
    expect(result.getActualCountryCode()).toBe('NL');
  });

  it('matches=false when the valid IBAN is from a different country', () => {
    const input = new CheckIbanCountryInput();
    input.setIban('NL91ABNA0417164300');
    input.setExpectedCountryCode('DE');
    const result = checkIbanCountry(testContext, input);
    expect(result.getMatches()).toBe(false);
    expect(result.getIbanValid()).toBe(true);
    expect(result.getActualCountryCode()).toBe('NL');
  });

  it('matches=false when the IBAN itself is checksum-invalid, even if the country matches', () => {
    const input = new CheckIbanCountryInput();
    input.setIban('NL92ABNA0417164300'); // bad checksum, country still NL
    input.setExpectedCountryCode('NL');
    const result = checkIbanCountry(testContext, input);
    expect(result.getMatches()).toBe(false);
    expect(result.getIbanValid()).toBe(false);
    expect(result.getActualCountryCode()).toBe('NL');
  });

  it('rejects an empty IBAN with a structured error, not a crash', () => {
    const input = new CheckIbanCountryInput();
    input.setIban('');
    input.setExpectedCountryCode('NL');
    const result = checkIbanCountry(testContext, input);
    expect(result.getMatches()).toBe(false);
    expect(result.getError()).toBe('NO_IBAN_PROVIDED');
  });

  it('rejects a malformed expected_country_code with a structured error', () => {
    const input = new CheckIbanCountryInput();
    input.setIban('NL91ABNA0417164300');
    input.setExpectedCountryCode('NLD'); // 3 letters, not ISO 3166-1 alpha-2
    const result = checkIbanCountry(testContext, input);
    expect(result.getMatches()).toBe(false);
    expect(result.getError()).toBe('INVALID_COUNTRY_CODE_FORMAT');
  });
});
