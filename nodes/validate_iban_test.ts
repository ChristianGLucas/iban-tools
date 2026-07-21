import { ValidateIbanInput } from '../gen/messages_pb';
import { validateIban } from './validate_iban';
import { testContext, mod97Independent, KNOWN_VALID_IBANS } from './testkit';

describe('ValidateIban', () => {
  it('accepts hand-verified real-format valid IBANs (electronic form)', () => {
    for (const iban of Object.values(KNOWN_VALID_IBANS)) {
      // Independent-oracle sanity check: our own from-spec mod-97 must also say 1.
      expect(mod97Independent(iban)).toBe(1);
      const input = new ValidateIbanInput();
      input.setIban(iban);
      const result = validateIban(testContext, input);
      expect(result.getValid()).toBe(true);
      expect(result.getErrorCodesList()).toEqual([]);
      expect(result.getReason()).toBe('');
    }
  });

  it('accepts the same IBAN in print (spaced) form, any case', () => {
    const input = new ValidateIbanInput();
    input.setIban('nl91 abna 0417 1643 00');
    const result = validateIban(testContext, input);
    expect(result.getValid()).toBe(true);
  });

  it('rejects an IBAN with a wrong (transposed) checksum, with the specific reason', () => {
    // NL91ABNA0417164300 with check digits mutated 91 -> 92.
    expect(mod97Independent('NL92ABNA0417164300')).not.toBe(1);
    const input = new ValidateIbanInput();
    input.setIban('NL92ABNA0417164300');
    const result = validateIban(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toContain('WRONG_IBAN_CHECKSUM');
    expect(result.getReason()).toContain('checksum');
  });

  it('rejects an unrecognized country code', () => {
    const input = new ValidateIbanInput();
    input.setIban('ZZ91ABNA0417164300');
    const result = validateIban(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toContain('NO_IBAN_COUNTRY');
  });

  it('rejects a truncated (wrong-length) IBAN', () => {
    // DE89370400440532013000 with the last digit dropped.
    const input = new ValidateIbanInput();
    input.setIban('DE8937040044053201300');
    const result = validateIban(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toContain('WRONG_BBAN_LENGTH');
  });

  it('rejects an empty IBAN with a structured error, not a crash', () => {
    const input = new ValidateIbanInput();
    input.setIban('');
    const result = validateIban(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toEqual(['NO_IBAN_PROVIDED']);
  });

  it('rejects oversized input with a structured error, not a crash', () => {
    const input = new ValidateIbanInput();
    input.setIban('NL91ABNA0417164300'.repeat(10));
    const result = validateIban(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toEqual(['IBAN_TOO_LONG']);
  });

  it('reject_qr_iban=true rejects an otherwise-valid Swiss QR-IBAN', () => {
    const input = new ValidateIbanInput();
    input.setIban('CH4431999123000889012');
    input.setRejectQrIban(true);
    const result = validateIban(testContext, input);
    expect(result.getValid()).toBe(false);
    expect(result.getErrorCodesList()).toContain('QR_IBAN_NOT_ALLOWED');
  });

  it('allows the same Swiss QR-IBAN by default (reject_qr_iban=false)', () => {
    const input = new ValidateIbanInput();
    input.setIban('CH4431999123000889012');
    const result = validateIban(testContext, input);
    expect(result.getValid()).toBe(true);
  });

  it('is deterministic across repeated invocations', () => {
    const input = new ValidateIbanInput();
    input.setIban('DE89370400440532013000');
    const r1 = validateIban(testContext, input);
    const r2 = validateIban(testContext, input);
    expect(r1.getValid()).toBe(r2.getValid());
    expect(r1.getErrorCodesList()).toEqual(r2.getErrorCodesList());
  });
});
