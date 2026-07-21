import { ParseBicInput } from '../gen/messages_pb';
import { parseBic } from './parse_bic';
import { testContext } from './testkit';

describe('ParseBic', () => {
  it('parses an 8-character BIC: bank code, country, location, no branch', () => {
    const input = new ParseBicInput();
    input.setBic('deutdeff');
    const result = parseBic(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getBankCode()).toBe('DEUT');
    expect(result.getCountryCode()).toBe('DE');
    expect(result.getLocationCode()).toBe('FF');
    expect(result.getBranchCode()).toBe('');
    expect(result.getHasBranchCode()).toBe(false);
    expect(result.getIsTestBic()).toBe(false);
  });

  it('parses an 11-character BIC with an explicit branch code', () => {
    const input = new ParseBicInput();
    input.setBic('DEUTDEFFXXX');
    const result = parseBic(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getBranchCode()).toBe('XXX');
    expect(result.getHasBranchCode()).toBe(true);
  });

  it('detects a test/non-live BIC (2nd char of location code is 0)', () => {
    const input = new ParseBicInput();
    input.setBic('DEUTDEF0');
    const result = parseBic(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getIsTestBic()).toBe(true);
  });

  it('reports a live BIC as not a test BIC even when the location code contains a 0 elsewhere', () => {
    // "0F": first char is 0, second char is F -> per the library's own
    // convention (2nd char == '0'), this is NOT a test BIC.
    const input = new ParseBicInput();
    input.setBic('DEUTDE0F');
    const result = parseBic(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getIsTestBic()).toBe(false);
  });

  it('reports valid=false with an explanatory error for a structurally invalid BIC', () => {
    const input = new ParseBicInput();
    input.setBic('ABN4NL2A');
    const result = parseBic(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getBankCode()).toBe('');
    expect(result.getError().length).toBeGreaterThan(0);
  });

  it('rejects an empty BIC with a structured error, not a crash', () => {
    const input = new ParseBicInput();
    input.setBic('');
    const result = parseBic(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toBe('NO_BIC_PROVIDED');
  });
});
