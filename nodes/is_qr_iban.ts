import * as ibantools from 'ibantools';
import { IsQrIbanInput, IsQrIbanOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { normalizeIban } from './lib';

/**
 * Detect whether an IBAN is a Swiss/Liechtenstein QR-IBAN — a national-only
 * payment variant identified by a reserved Institution ID range at
 * positions 5-9. Checks structure only, independent of full checksum
 * validity (matching the underlying library's own isQRIBAN semantics).
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function isQrIban(ax: AxiomContext, input: IsQrIbanInput): IsQrIbanOutput {
  const out = new IsQrIbanOutput();
  const norm = normalizeIban(input.getIban());
  if (norm.error) {
    out.setIsQrIban(false);
    out.setError(norm.error);
    return out;
  }
  const electronic = norm.value!;
  out.setCountryCode(electronic.length >= 2 ? electronic.slice(0, 2) : '');
  out.setIsQrIban(ibantools.isQRIBAN(electronic));
  out.setError('');
  return out;
}
