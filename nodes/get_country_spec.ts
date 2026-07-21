import * as ibantools from 'ibantools';
import { GetCountrySpecInput, GetCountrySpecOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { normalizeCountryCode } from './lib';

/**
 * Look up one country's IBAN specification: whether it is an official IBAN
 * registry member, whether it is a SEPA member, its expected total IBAN
 * length, and its BBAN structure regular expression. found=false when the
 * country code is not recognized at all (as opposed to recognized but not
 * an IBAN user).
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function getCountrySpec(ax: AxiomContext, input: GetCountrySpecInput): GetCountrySpecOutput {
  const out = new GetCountrySpecOutput();
  const norm = normalizeCountryCode(input.getCountryCode());
  if (norm.error) {
    out.setFound(false);
    out.setError(norm.error);
    return out;
  }
  const specs = ibantools.getCountrySpecifications();
  const spec = specs[norm.value!];
  if (!spec) {
    out.setFound(false);
    out.setCountryCode(norm.value!);
    out.setError('COUNTRY_NOT_RECOGNIZED');
    return out;
  }
  out.setFound(true);
  out.setCountryCode(norm.value!);
  out.setIbanRegistryMember(!!spec.IBANRegistry);
  out.setSepa(!!spec.SEPA);
  out.setIbanLength(spec.chars ?? 0);
  out.setBbanPattern(spec.bban_regexp ?? '');
  out.setError('');
  return out;
}
