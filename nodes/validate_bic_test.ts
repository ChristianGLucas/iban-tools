import { ValidateBicInput } from '../gen/messages_pb';
import { validateBic } from './validate_bic';
import { testContext } from './testkit';

// Independent ISO 9362 structural oracle, written from the spec (NOT calling
// ibantools): 4 letters (bank code) + 2 letters (country code) + 2
// alphanumerics (location code) + optional 3 alphanumerics (branch code).
// Country recognition is deliberately NOT re-checked here (that requires the
// full ISO 3166-1 list) — this oracle checks pure structural shape only.
function looksStructurallyValidBic(bic: string): boolean {
  return /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic);
}

describe('ValidateBic', () => {
  it('accepts a real-format 8-character BIC, agreeing with an independent structural oracle', () => {
    expect(looksStructurallyValidBic('DEUTDEFF')).toBe(true);
    const input = new ValidateBicInput();
    input.setBic('deutdeff');
    const result = validateBic(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getErrorCodesList()).toEqual([]);
  });

  it('accepts a real-format 11-character BIC with a branch code', () => {
    expect(looksStructurallyValidBic('NEDSZAJJXXX')).toBe(true);
    const input = new ValidateBicInput();
    input.setBic('NEDSZAJJXXX');
    const result = validateBic(testContext, input);
    expect(result.getValid()).toBe(true);
  });

  it('rejects a BIC with a digit in the letters-only bank-code position', () => {
    expect(looksStructurallyValidBic('ABN4NL2A')).toBe(false);
    const input = new ValidateBicInput();
    input.setBic('ABN4NL2A');
    const result = validateBic(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toContain('WRONG_BIC_FORMAT');
  });

  it('rejects a BIC with an unrecognized country code', () => {
    const input = new ValidateBicInput();
    input.setBic('DEUTZZFF');
    const result = validateBic(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toContain('NO_BIC_COUNTRY');
  });

  it('rejects a wrong-length BIC (9 characters)', () => {
    const input = new ValidateBicInput();
    input.setBic('DEUTDEFFX');
    const result = validateBic(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toContain('WRONG_BIC_FORMAT');
  });

  it('rejects an empty BIC with a structured error, not a crash', () => {
    const input = new ValidateBicInput();
    input.setBic('');
    const result = validateBic(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toEqual(['NO_BIC_PROVIDED']);
  });

  it('handles a large input with a structured error, not a crash', () => {
    // This package no longer caps raw input length itself — the platform's
    // ingress/transport already bounds request size. A large non-BIC
    // string is still cleanly rejected as a structural mismatch.
    const input = new ValidateBicInput();
    input.setBic('X'.repeat(1000));
    const result = validateBic(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toEqual(['NO_BIC_COUNTRY']);
  });
});
