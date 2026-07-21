import * as ibantools from 'ibantools';
import { ListSupportedCountriesInput, ListSupportedCountriesOutput, CountrySummary } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';

/**
 * List every country the underlying IBAN/SEPA registry recognizes, each
 * with its IBAN-registry-membership flag, SEPA-membership flag, and
 * expected IBAN length (0 when the country does not use IBAN). Optionally
 * filter to IBAN-registry members and/or SEPA members only. Results are
 * sorted by country code for deterministic output.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function listSupportedCountries(ax: AxiomContext, input: ListSupportedCountriesInput): ListSupportedCountriesOutput {
  const out = new ListSupportedCountriesOutput();
  const specs = ibantools.getCountrySpecifications();
  const ibanRegistryOnly = input.getIbanRegistryOnly();
  const sepaOnly = input.getSepaOnly();

  const codes = Object.keys(specs).sort();
  const summaries: CountrySummary[] = [];
  for (const code of codes) {
    const spec = specs[code];
    const ibanRegistryMember = !!spec.IBANRegistry;
    const sepa = !!spec.SEPA;
    if (ibanRegistryOnly && !ibanRegistryMember) continue;
    if (sepaOnly && !sepa) continue;
    const summary = new CountrySummary();
    summary.setCountryCode(code);
    summary.setIbanRegistryMember(ibanRegistryMember);
    summary.setSepa(sepa);
    summary.setIbanLength(spec.chars ?? 0);
    summaries.push(summary);
  }
  out.setCountriesList(summaries);
  out.setCount(summaries.length);
  return out;
}
