import * as ibantools from 'ibantools';
import { ValidateBicInput, ValidateBicOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { normalizeBic, bicErrorCodeNames, bicReason } from './lib';

/**
 * Validate a BIC/SWIFT code's structure: 4-letter bank code + 2-letter ISO
 * 3166-1 country code (must be a recognized country) + 2-character
 * location code + optional 3-character branch code (8 or 11 characters
 * total). BIC has no checksum — this is structural validation only.
 * Returns valid=true/false plus every specific reason it failed.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function validateBic(ax: AxiomContext, input: ValidateBicInput): ValidateBicOutput {
  const out = new ValidateBicOutput();
  const norm = normalizeBic(input.getBic());
  if (norm.error) {
    out.setValid(false);
    out.setErrorCodesList([norm.error]);
    out.setReason(norm.error === 'NO_BIC_PROVIDED' ? 'No BIC was provided.' : `BIC input rejected: ${norm.error}.`);
    return out;
  }
  const result = ibantools.validateBIC(norm.value!);
  const codeNames = bicErrorCodeNames(result.errorCodes);
  out.setValid(result.valid);
  out.setErrorCodesList(codeNames);
  out.setReason(result.valid ? '' : bicReason(codeNames));
  return out;
}
