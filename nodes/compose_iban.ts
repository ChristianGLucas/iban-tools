import * as ibantools from 'ibantools';
import { ComposeIbanInput, ComposeIbanOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { normalizeCountryCode, checkBbanBounds } from './lib';

/**
 * Construct a full, checksum-correct IBAN from a country code and that
 * country's BBAN (bank/branch/account digits), computing the two mod-97-10
 * check digits (positions 3-4). Fails with a structured error when the
 * country is unrecognized or the BBAN's length/character structure doesn't
 * match what that country's IBAN specification requires.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function composeIban(ax: AxiomContext, input: ComposeIbanInput): ComposeIbanOutput {
  const out = new ComposeIbanOutput();
  const country = normalizeCountryCode(input.getCountryCode());
  if (country.error) {
    out.setSuccess(false);
    out.setError(country.error);
    return out;
  }
  const bban = checkBbanBounds(input.getBban());
  if (bban.error) {
    out.setSuccess(false);
    out.setError(bban.error);
    return out;
  }
  const iban = ibantools.composeIBAN({ countryCode: country.value!, bban: bban.value! });
  if (iban === null) {
    out.setSuccess(false);
    out.setError('COMPOSE_FAILED: country is not an IBAN-registry member, or the BBAN does not match its expected length/structure.');
    return out;
  }
  out.setSuccess(true);
  out.setIban(iban);
  out.setIbanPrintable(ibantools.friendlyFormatIBAN(iban) ?? '');
  out.setError('');
  return out;
}
