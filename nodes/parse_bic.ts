import * as ibantools from 'ibantools';
import { ParseBicInput, ParseBicOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { normalizeBic, bicErrorCodeNames, bicReason } from './lib';

/**
 * Parse a BIC/SWIFT code into its components: bank code, country code,
 * location code, and branch code (when the 11-character form was given).
 * is_test_bic reports the SWIFT convention that the second character of
 * the location code being '0' marks a test/non-live BIC. On an invalid
 * BIC, valid=false and error explains why.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function parseBic(ax: AxiomContext, input: ParseBicInput): ParseBicOutput {
  const out = new ParseBicOutput();
  const norm = normalizeBic(input.getBic());
  if (norm.error) {
    out.setValid(false);
    out.setError(norm.error);
    return out;
  }
  const bic = norm.value!;
  const validation = ibantools.validateBIC(bic);
  if (!validation.valid) {
    out.setValid(false);
    out.setError(bicReason(bicErrorCodeNames(validation.errorCodes)));
    return out;
  }
  const extracted = ibantools.extractBIC(bic);
  out.setValid(true);
  out.setBankCode(extracted.bankCode ?? '');
  out.setCountryCode(extracted.countryCode ?? '');
  out.setLocationCode(extracted.locationCode ?? '');
  out.setBranchCode(extracted.branchCode ?? '');
  out.setHasBranchCode(extracted.branchCode !== null);
  out.setIsTestBic(extracted.testBIC);
  out.setError('');
  return out;
}
