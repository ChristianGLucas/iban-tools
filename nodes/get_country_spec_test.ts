import { GetCountrySpecInput } from '../gen/messages_pb';
import { getCountrySpec } from './get_country_spec';
import { testContext } from './testkit';

describe('GetCountrySpec', () => {
  it('returns Germany\'s IBAN spec: registry member, SEPA, length 22', () => {
    const input = new GetCountrySpecInput();
    input.setCountryCode('de');
    const result = getCountrySpec(testContext, input);
    expect(result.getFound()).toBe(true);
    expect(result.getCountryCode()).toBe('DE');
    expect(result.getIbanRegistryMember()).toBe(true);
    expect(result.getSepa()).toBe(true);
    expect(result.getIbanLength()).toBe(22);
    expect(result.getBbanPattern().length).toBeGreaterThan(0);
  });

  it('returns found=true but iban_registry_member=false for a recognized non-IBAN country (US)', () => {
    const input = new GetCountrySpecInput();
    input.setCountryCode('US');
    const result = getCountrySpec(testContext, input);
    expect(result.getFound()).toBe(true);
    expect(result.getIbanRegistryMember()).toBe(false);
    expect(result.getIbanLength()).toBe(0);
  });

  it('returns found=false for an unrecognized country code', () => {
    const input = new GetCountrySpecInput();
    input.setCountryCode('ZZ');
    const result = getCountrySpec(testContext, input);
    expect(result.getFound()).toBe(false);
    expect(result.getError()).toBe('COUNTRY_NOT_RECOGNIZED');
  });

  it('rejects a malformed country code with a structured error, not a crash', () => {
    const input = new GetCountrySpecInput();
    input.setCountryCode('');
    const result = getCountrySpec(testContext, input);
    expect(result.getFound()).toBe(false);
    expect(result.getError()).toBe('NO_COUNTRY_CODE_PROVIDED');
  });
});
