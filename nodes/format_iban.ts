import * as ibantools from 'ibantools';
import { FormatIbanInput, FormatIbanOutput } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
/**
 * Reformat an IBAN string for print (grouped in blocks of 4, e.g. "NL91
 * ABNA 0417 1643 00") or electronic transmission (no separators, e.g.
 * "NL91ABNA0417164300"). Pure reformatting — does NOT validate the IBAN's
 * checksum or structure (use ValidateIban for that); a malformed IBAN is
 * still reformatted best-effort. style accepts "print" or "electronic"
 * ("" defaults to "electronic"); any other value is a structured error.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function formatIban(ax: AxiomContext, input: FormatIbanInput): FormatIbanOutput {
  const out = new FormatIbanOutput();
  const raw = input.getIban();
  if (typeof raw !== 'string' || raw.length === 0) {
    out.setError('NO_IBAN_PROVIDED');
    return out;
  }
  const style = input.getStyle() || 'electronic';
  if (style !== 'print' && style !== 'electronic') {
    out.setError('INVALID_STYLE');
    return out;
  }
  const separatorRaw = input.getSeparator();
  if (style === 'electronic') {
    const formatted = ibantools.electronicFormatIBAN(raw);
    if (formatted === null) {
      out.setError('NO_IBAN_PROVIDED');
      return out;
    }
    out.setFormatted(formatted);
    return out;
  }
  const separator = separatorRaw.length > 0 ? separatorRaw : ' ';
  const formatted = ibantools.friendlyFormatIBAN(raw, separator);
  if (formatted === null) {
    out.setError('NO_IBAN_PROVIDED');
    return out;
  }
  out.setFormatted(formatted);
  return out;
}
