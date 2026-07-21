import * as ibantools from 'ibantools';
import { CheckIbanCountryInput, CheckIbanCountryOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { normalizeIban, normalizeCountryCode } from './lib';

/**
 * Check whether an IBAN's country matches an expected country code — e.g.
 * confirming a payer supplied an IBAN from the country their form claims.
 * matches=true only when the IBAN is itself structurally/checksum valid
 * AND its country equals expected_country_code. actual_country_code is
 * still reported best-effort even when the IBAN fails full validation.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function checkIbanCountry(ax: AxiomContext, input: CheckIbanCountryInput): CheckIbanCountryOutput {
  const out = new CheckIbanCountryOutput();
  const ibanNorm = normalizeIban(input.getIban());
  const countryNorm = normalizeCountryCode(input.getExpectedCountryCode());

  const actualCountryCode = ibanNorm.value && ibanNorm.value.length >= 2 ? ibanNorm.value.slice(0, 2) : '';
  out.setActualCountryCode(actualCountryCode);

  if (ibanNorm.error) {
    out.setMatches(false);
    out.setIbanValid(false);
    out.setError(ibanNorm.error);
    return out;
  }
  if (countryNorm.error) {
    out.setMatches(false);
    out.setIbanValid(ibantools.isValidIBAN(ibanNorm.value!));
    out.setError(countryNorm.error);
    return out;
  }

  const ibanValid = ibantools.isValidIBAN(ibanNorm.value!);
  out.setIbanValid(ibanValid);
  out.setMatches(ibanValid && actualCountryCode === countryNorm.value);
  out.setError('');
  return out;
}
