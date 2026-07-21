import { IsQrIbanInput } from '../gen/messages_pb';
import { isQrIban } from './is_qr_iban';
import { testContext } from './testkit';

describe('IsQrIban', () => {
  it('detects a Swiss QR-IBAN', () => {
    const input = new IsQrIbanInput();
    input.setIban('CH4431999123000889012');
    const result = isQrIban(testContext, input);
    expect(result.getIsQrIban()).toBe(true);
    expect(result.getCountryCode()).toBe('CH');
  });

  it('reports false for an ordinary (non-QR) Swiss IBAN', () => {
    const input = new IsQrIbanInput();
    input.setIban('CH9300762011623852957');
    const result = isQrIban(testContext, input);
    expect(result.getIsQrIban()).toBe(false);
  });

  it('reports false for a Dutch IBAN (QR-IBAN is CH/LI only)', () => {
    const input = new IsQrIbanInput();
    input.setIban('NL92ABNA0517164300');
    const result = isQrIban(testContext, input);
    expect(result.getIsQrIban()).toBe(false);
    expect(result.getCountryCode()).toBe('NL');
  });

  it('rejects an empty IBAN with a structured error, not a crash', () => {
    const input = new IsQrIbanInput();
    input.setIban('');
    const result = isQrIban(testContext, input);
    expect(result.getError()).toBe('NO_IBAN_PROVIDED');
    expect(result.getIsQrIban()).toBe(false);
  });
});
