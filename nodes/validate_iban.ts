import * as ibantools from 'ibantools';
import { ValidateIbanInput, ValidateIbanOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { normalizeIban, ibanErrorCodeNames, ibanReason } from './lib';

/**
 * Validate an IBAN's structure and checksum: country-specific length and
 * BBAN character pattern, any country-specific internal check digit, and
 * the mod-97-10 (ISO 7064) IBAN checksum. Accepts print form ("NL91 ABNA
 * 0417 1643 00") or electronic form, any case. Returns valid=true/false
 * plus every specific reason validation failed (never just a bare false).
 * Set reject_qr_iban=true to also reject an otherwise-valid Swiss/
 * Liechtenstein QR-IBAN.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function validateIban(ax: AxiomContext, input: ValidateIbanInput): ValidateIbanOutput {
  const out = new ValidateIbanOutput();
  const norm = normalizeIban(input.getIban());
  if (norm.error) {
    out.setValid(false);
    out.setErrorCodesList([norm.error]);
    out.setReason(
      norm.error === 'NO_IBAN_PROVIDED' ? 'No IBAN was provided.' : `IBAN input rejected: ${norm.error}.`,
    );
    return out;
  }
  const result = ibantools.validateIBAN(norm.value!, { allowQRIBAN: !input.getRejectQrIban() });
  const codeNames = ibanErrorCodeNames(result.errorCodes);
  out.setValid(result.valid);
  out.setErrorCodesList(codeNames);
  out.setReason(result.valid ? '' : ibanReason(codeNames));
  return out;
}
