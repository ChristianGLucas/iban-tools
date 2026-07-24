// Shared bounds, normalization, and error-code vocabulary for the iban-tools
// nodes. Not a node and not a test file, so it is neither registered nor
// collected.
//
// SECURITY / DETERMINISM DISCIPLINE:
//   - ibantools' own validateIBAN/isQRIBAN/isValidBIC/composeIBAN do NOT
//     normalize whitespace, dashes, or case themselves (they slice the raw
//     string directly) — only extractIBAN/electronicFormatIBAN/
//     friendlyFormatIBAN do. A realistic caller pastes an IBAN copied off a
//     bank statement or invoice in *print* form ("NL91 ABNA 0417 1643 00"),
//     so every node here normalizes to electronic format itself before
//     calling a function that doesn't already do so — otherwise a genuinely
//     valid IBAN would be misreported invalid purely because of formatting.
//   - Nothing here reads the system clock, the filesystem, or the network.
//     Every function is a pure string -> structure transform.

import * as ibantools from 'ibantools';

/** ISO 13616 hard ceiling: no real IBAN, once formatting characters are
 * stripped, can exceed 34 characters — this is a genuine domain-format
 * bound, not a payload guard. */
export const MAX_IBAN_ELECTRONIC_LEN = 34;

export interface NormResult {
  value?: string;
  error?: string;
}

/** Normalize a raw IBAN string to electronic format (uppercase, no
 * spaces/dashes), bounding length before and after normalization. Does NOT
 * validate structure/checksum — only shape/type/length. */
export function normalizeIban(raw: string): NormResult {
  if (typeof raw !== 'string') return { error: 'IBAN_NOT_A_STRING' };
  if (raw.length === 0) return { error: 'NO_IBAN_PROVIDED' };
  const electronic = ibantools.electronicFormatIBAN(raw);
  if (!electronic) return { error: 'NO_IBAN_PROVIDED' };
  if (electronic.length > MAX_IBAN_ELECTRONIC_LEN) return { error: 'IBAN_TOO_LONG' };
  return { value: electronic };
}

/** Normalize a raw BIC/SWIFT string: trim surrounding whitespace, uppercase.
 * Does NOT strip internal characters — internal whitespace in a BIC is a
 * genuine structural defect, not a formatting convention (unlike IBAN). */
export function normalizeBic(raw: string): NormResult {
  if (typeof raw !== 'string') return { error: 'BIC_NOT_A_STRING' };
  if (raw.length === 0) return { error: 'NO_BIC_PROVIDED' };
  const value = raw.trim().toUpperCase();
  if (value.length === 0) return { error: 'NO_BIC_PROVIDED' };
  return { value };
}

/** Normalize a raw ISO 3166-1 alpha-2 country code: trim, uppercase, and
 * require exactly two letters. */
export function normalizeCountryCode(raw: string): NormResult {
  if (typeof raw !== 'string') return { error: 'COUNTRY_CODE_NOT_A_STRING' };
  if (raw.length === 0) return { error: 'NO_COUNTRY_CODE_PROVIDED' };
  const value = raw.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(value)) return { error: 'INVALID_COUNTRY_CODE_FORMAT' };
  return { value };
}

/** Bound + type-check a raw BBAN string. ibantools.composeIBAN normalizes
 * (electronicFormatIBAN) internally, so this only guards cost/type. */
export function checkBbanBounds(raw: string): NormResult {
  if (typeof raw !== 'string') return { error: 'BBAN_NOT_A_STRING' };
  if (raw.length === 0) return { error: 'NO_BBAN_PROVIDED' };
  return { value: raw };
}

// ibantools.ValidationErrorsIBAN is a numeric enum; map each ordinal to a
// stable, machine-readable string name and a human-readable explanation.
const IBAN_ERROR_NAMES: string[] = [
  'NO_IBAN_PROVIDED',
  'NO_IBAN_COUNTRY',
  'WRONG_BBAN_LENGTH',
  'WRONG_BBAN_FORMAT',
  'CHECKSUM_NOT_NUMBER',
  'WRONG_IBAN_CHECKSUM',
  'WRONG_ACCOUNT_BANK_BRANCH_CHECKSUM',
  'QR_IBAN_NOT_ALLOWED',
];

const IBAN_ERROR_REASONS: Record<string, string> = {
  NO_IBAN_PROVIDED: 'No IBAN was provided.',
  NO_IBAN_COUNTRY: 'The first two characters are not a recognized IBAN country code.',
  WRONG_BBAN_LENGTH: "The IBAN's length does not match the expected length for its country.",
  WRONG_BBAN_FORMAT: 'The BBAN portion does not match the expected character structure for its country.',
  CHECKSUM_NOT_NUMBER: 'The two check digits (positions 3-4) are not numeric.',
  WRONG_IBAN_CHECKSUM: 'The IBAN fails the mod-97-10 checksum test (ISO 7064).',
  WRONG_ACCOUNT_BANK_BRANCH_CHECKSUM:
    "The country-specific internal check digit(s) within the account/bank/branch number are invalid.",
  QR_IBAN_NOT_ALLOWED: 'The IBAN is a Swiss/Liechtenstein QR-IBAN, which was rejected by reject_qr_iban.',
};

export function ibanErrorCodeNames(codes: number[]): string[] {
  return codes.map((c) => IBAN_ERROR_NAMES[c] ?? `UNKNOWN_ERROR_${c}`);
}

export function ibanReason(codeNames: string[]): string {
  return codeNames.map((n) => IBAN_ERROR_REASONS[n] ?? n).join(' ');
}

// ibantools.ValidationErrorsBIC is a numeric enum; same treatment as IBAN.
const BIC_ERROR_NAMES: string[] = ['NO_BIC_PROVIDED', 'NO_BIC_COUNTRY', 'WRONG_BIC_FORMAT'];

const BIC_ERROR_REASONS: Record<string, string> = {
  NO_BIC_PROVIDED: 'No BIC was provided.',
  NO_BIC_COUNTRY: 'Characters 5-6 are not a recognized ISO 3166-1 alpha-2 country code.',
  WRONG_BIC_FORMAT:
    'The BIC does not match the required structure: 4-letter bank code + 2-letter country code + 2-character location code + optional 3-character branch code.',
};

export function bicErrorCodeNames(codes: number[]): string[] {
  return codes.map((c) => BIC_ERROR_NAMES[c] ?? `UNKNOWN_ERROR_${c}`);
}

export function bicReason(codeNames: string[]): string {
  return codeNames.map((n) => BIC_ERROR_REASONS[n] ?? n).join(' ');
}
