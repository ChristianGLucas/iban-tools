import * as ibantools from 'ibantools';
import { IsSepaCountryInput, IsSepaCountryOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { normalizeCountryCode } from './lib';

/**
 * Check whether a country participates in SEPA (the Single Euro Payments
 * Area). recognized_country distinguishes "not a real ISO 3166-1 alpha-2
 * code" (false) from "a real country that just isn't in SEPA" (true, but
 * is_sepa=false).
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function isSepaCountry(ax: AxiomContext, input: IsSepaCountryInput): IsSepaCountryOutput {
  const out = new IsSepaCountryOutput();
  const norm = normalizeCountryCode(input.getCountryCode());
  if (norm.error) {
    out.setIsSepa(false);
    out.setRecognizedCountry(false);
    out.setError(norm.error);
    return out;
  }
  const specs = ibantools.getCountrySpecifications();
  const recognized = norm.value! in specs;
  out.setRecognizedCountry(recognized);
  out.setIsSepa(recognized ? ibantools.isSEPACountry(norm.value!) : false);
  out.setError('');
  return out;
}
