import { ComposeIbanInput } from '../gen/messages_pb';
import { composeIban } from './compose_iban';
import { testContext, mod97Independent } from './testkit';

describe('ComposeIban', () => {
  it('constructs a checksum-correct Dutch IBAN from country + BBAN, verified by an independent mod-97 oracle', () => {
    const input = new ComposeIbanInput();
    input.setCountryCode('NL');
    input.setBban('ABNA0417164300');
    const result = composeIban(testContext, input);
    expect(result.getSuccess()).toBe(true);
    expect(result.getIban()).toBe('NL91ABNA0417164300');
    expect(result.getIbanPrintable()).toBe('NL91 ABNA 0417 1643 00');
    // Independent-oracle check: the composed check digits must satisfy mod-97-10.
    expect(mod97Independent(result.getIban())).toBe(1);
  });

  it('constructs a checksum-correct German IBAN (different length/structure)', () => {
    const input = new ComposeIbanInput();
    input.setCountryCode('de');
    input.setBban('370400440532013000');
    const result = composeIban(testContext, input);
    expect(result.getSuccess()).toBe(true);
    expect(result.getIban()).toBe('DE89370400440532013000');
    expect(mod97Independent(result.getIban())).toBe(1);
  });

  it('fails with a structured error for an unrecognized country code', () => {
    const input = new ComposeIbanInput();
    input.setCountryCode('ZZ');
    input.setBban('ABNA0417164300');
    const result = composeIban(testContext, input);
    expect(result.getSuccess()).toBe(false);
    expect(result.getIban()).toBe('');
    expect(result.getError().length).toBeGreaterThan(0);
  });

  it('fails with a structured error when the BBAN length does not match the country', () => {
    const input = new ComposeIbanInput();
    input.setCountryCode('NL');
    input.setBban('ABNA04171643'); // too short for NL
    const result = composeIban(testContext, input);
    expect(result.getSuccess()).toBe(false);
    expect(result.getIban()).toBe('');
  });

  it('rejects an empty BBAN with a structured error, not a crash', () => {
    const input = new ComposeIbanInput();
    input.setCountryCode('NL');
    input.setBban('');
    const result = composeIban(testContext, input);
    expect(result.getSuccess()).toBe(false);
    expect(result.getError()).toBe('NO_BBAN_PROVIDED');
  });
});
