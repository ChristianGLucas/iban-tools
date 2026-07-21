import * as ibantools from 'ibantools';
import { ParseIbanInput, ParseIbanOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { normalizeIban, ibanErrorCodeNames, ibanReason } from './lib';

/**
 * Parse an IBAN into its components: country code, the two check digits,
 * the BBAN, and — where the country's specification defines them — the
 * bank identifier, branch identifier, and account number. Accepts print
 * form ("NL91 ABNA 0417 1643 00") or electronic form, any case. When the
 * IBAN fails checksum/structure validation, valid=false and the structural
 * sub-fields are empty; a best-effort country_code/check_digits is still
 * returned when the input is long enough to contain them.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function parseIban(ax: AxiomContext, input: ParseIbanInput): ParseIbanOutput {
  const out = new ParseIbanOutput();
  const norm = normalizeIban(input.getIban());
  if (norm.error) {
    out.setValid(false);
    out.setError(norm.error);
    return out;
  }
  const electronic = norm.value!;
  out.setIban(electronic);
  const validation = ibantools.validateIBAN(electronic);
  if (!validation.valid) {
    out.setValid(false);
    out.setCountryCode(electronic.length >= 2 ? electronic.slice(0, 2) : '');
    out.setCheckDigits(electronic.length >= 4 ? electronic.slice(2, 4) : '');
    out.setError(ibanReason(ibanErrorCodeNames(validation.errorCodes)));
    return out;
  }
  const extracted = ibantools.extractIBAN(electronic);
  out.setValid(true);
  out.setCountryCode(extracted.countryCode ?? '');
  out.setCheckDigits(electronic.slice(2, 4));
  out.setBban(extracted.bban ?? '');
  out.setBankIdentifier(extracted.bankIdentifier ?? '');
  out.setBranchIdentifier(extracted.branchIdentifier ?? '');
  out.setAccountNumber(extracted.accountNumber ?? '');
  out.setError('');
  return out;
}
