import { FormatIbanInput } from '../gen/messages_pb';
import { formatIban } from './format_iban';
import { testContext } from './testkit';

describe('FormatIban', () => {
  it('formats electronic (no separators) by default', () => {
    const input = new FormatIbanInput();
    input.setIban('NL91 ABNA 0417 1643 00');
    const result = formatIban(testContext, input);
    expect(result.getFormatted()).toBe('NL91ABNA0417164300');
    expect(result.getError()).toBe('');
  });

  it('formats print style grouped in 4s with a space by default', () => {
    const input = new FormatIbanInput();
    input.setIban('NL91ABNA0417164300');
    input.setStyle('print');
    const result = formatIban(testContext, input);
    expect(result.getFormatted()).toBe('NL91 ABNA 0417 1643 00');
  });

  it('formats print style with a custom separator', () => {
    const input = new FormatIbanInput();
    input.setIban('NL91ABNA0417164300');
    input.setStyle('print');
    input.setSeparator('-');
    const result = formatIban(testContext, input);
    expect(result.getFormatted()).toBe('NL91-ABNA-0417-1643-00');
  });

  it('explicit electronic style strips spaces and uppercases', () => {
    const input = new FormatIbanInput();
    input.setIban('nl91-abna-0417-1643-00');
    input.setStyle('electronic');
    const result = formatIban(testContext, input);
    expect(result.getFormatted()).toBe('NL91ABNA0417164300');
  });

  it('does not validate the IBAN — reformats a checksum-invalid IBAN anyway', () => {
    const input = new FormatIbanInput();
    input.setIban('NL92ABNA0417164300');
    const result = formatIban(testContext, input);
    expect(result.getError()).toBe('');
    expect(result.getFormatted()).toBe('NL92ABNA0417164300');
  });

  it('rejects an unrecognized style value with a structured error', () => {
    const input = new FormatIbanInput();
    input.setIban('NL91ABNA0417164300');
    input.setStyle('uppercase');
    const result = formatIban(testContext, input);
    expect(result.getError()).toBe('INVALID_STYLE');
    expect(result.getFormatted()).toBe('');
  });

  it('rejects an empty IBAN with a structured error, not a crash', () => {
    const input = new FormatIbanInput();
    input.setIban('');
    const result = formatIban(testContext, input);
    expect(result.getError()).toBe('NO_IBAN_PROVIDED');
  });
});
