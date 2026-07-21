import { ListSupportedCountriesInput } from '../gen/messages_pb';
import { listSupportedCountries } from './list_supported_countries';
import { testContext } from './testkit';

describe('ListSupportedCountries', () => {
  it('lists all 250 recognized countries, sorted by code, unfiltered', () => {
    const input = new ListSupportedCountriesInput();
    const result = listSupportedCountries(testContext, input);
    expect(result.getCount()).toBe(250);
    expect(result.getCountriesList().length).toBe(250);
    const codes = result.getCountriesList().map((c) => c.getCountryCode());
    expect([...codes].sort()).toEqual(codes); // sorted
    expect(codes).toContain('DE');
    expect(codes).toContain('US');
  });

  it('includes Germany with iban_registry_member=true, sepa=true, iban_length=22', () => {
    const input = new ListSupportedCountriesInput();
    const result = listSupportedCountries(testContext, input);
    const de = result.getCountriesList().find((c) => c.getCountryCode() === 'DE');
    expect(de).toBeDefined();
    expect(de!.getIbanRegistryMember()).toBe(true);
    expect(de!.getSepa()).toBe(true);
    expect(de!.getIbanLength()).toBe(22);
  });

  it('iban_registry_only=true excludes non-IBAN countries like the US', () => {
    const input = new ListSupportedCountriesInput();
    input.setIbanRegistryOnly(true);
    const result = listSupportedCountries(testContext, input);
    const codes = result.getCountriesList().map((c) => c.getCountryCode());
    expect(codes).not.toContain('US');
    expect(codes).toContain('DE');
    expect(result.getCount()).toBeLessThan(250);
    expect(result.getCount()).toBeGreaterThan(0);
    for (const c of result.getCountriesList()) {
      expect(c.getIbanRegistryMember()).toBe(true);
    }
  });

  it('sepa_only=true returns only SEPA member countries', () => {
    const input = new ListSupportedCountriesInput();
    input.setSepaOnly(true);
    const result = listSupportedCountries(testContext, input);
    expect(result.getCount()).toBeGreaterThan(0);
    for (const c of result.getCountriesList()) {
      expect(c.getSepa()).toBe(true);
    }
    const codes = result.getCountriesList().map((c) => c.getCountryCode());
    expect(codes).not.toContain('US');
  });
});
