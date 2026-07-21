import { ParseIbanInput } from '../gen/messages_pb';
import { parseIban } from './parse_iban';
import { testContext } from './testkit';

describe('ParseIban', () => {
  it('decomposes a valid Dutch IBAN into country, check digits, bban, bank id, account number', () => {
    const input = new ParseIbanInput();
    input.setIban('NL91 ABNA 0417 1643 00');
    const result = parseIban(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getIban()).toBe('NL91ABNA0417164300');
    expect(result.getCountryCode()).toBe('NL');
    expect(result.getCheckDigits()).toBe('91');
    expect(result.getBban()).toBe('ABNA0417164300');
    expect(result.getBankIdentifier()).toBe('ABNA');
    expect(result.getAccountNumber()).toBe('0417164300');
    expect(result.getError()).toBe('');
  });

  it('decomposes a valid German IBAN (different field layout: bank id 8 chars, no branch)', () => {
    const input = new ParseIbanInput();
    input.setIban('DE89370400440532013000');
    const result = parseIban(testContext, input);
    expect(result.getValid()).toBe(true);
    expect(result.getCountryCode()).toBe('DE');
    expect(result.getBban()).toBe('370400440532013000');
    expect(result.getBankIdentifier()).toBe('37040044');
    expect(result.getAccountNumber()).toBe('0532013000');
    // Germany's spec doesn't define a separate branch identifier.
    expect(result.getBranchIdentifier()).toBe('');
  });

  it('reports valid=false with an explanatory error and no structural fields for an invalid checksum', () => {
    const input = new ParseIbanInput();
    input.setIban('NL92ABNA0417164300');
    const result = parseIban(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getBban()).toBe('');
    expect(result.getAccountNumber()).toBe('');
    expect(result.getError().length).toBeGreaterThan(0);
    // Best-effort diagnostic fields are still populated.
    expect(result.getCountryCode()).toBe('NL');
    expect(result.getCheckDigits()).toBe('92');
  });

  it('rejects an empty IBAN with a structured error, not a crash', () => {
    const input = new ParseIbanInput();
    input.setIban('');
    const result = parseIban(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toBe('NO_IBAN_PROVIDED');
  });

  it('rejects oversized input with a structured error, not a crash', () => {
    const input = new ParseIbanInput();
    input.setIban('X'.repeat(500));
    const result = parseIban(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toBe('IBAN_TOO_LONG');
  });
});
