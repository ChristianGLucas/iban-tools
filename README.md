# iban-tools

Composable Axiom nodes for deterministic validation, parsing, formatting, and
construction of International Bank Account Numbers (IBAN, ISO 13616) and
Business Identifier Codes (BIC/SWIFT, ISO 9362).

Built for the [Axiom](https://axiom.co) marketplace under the
`christiangeorgelucas` handle. Wraps [ibantools](https://github.com/Simplify/ibantools)
(dual MIT/MPL-2.0 licensed — used here under MIT), a pure, dependency-free
TypeScript implementation with all country IBAN/BIC specifications embedded
at build time. Every node is stateless, deterministic, and fully offline: no
network call, no wall-clock read, no randomness. Malformed or oversized input
returns a structured error, never a crash.

## Nodes

- **ValidateIban** — validate an IBAN's checksum + country-specific
  structure; reports valid/invalid plus every specific failure reason.
- **ParseIban** — decompose an IBAN into country code, check digits, BBAN,
  bank identifier, branch identifier, and account number.
- **FormatIban** — reformat an IBAN for print (grouped in 4s) or electronic
  (no separators) form.
- **ComposeIban** — construct a full, checksum-correct IBAN from a country
  code and BBAN.
- **CheckIbanCountry** — confirm an IBAN's country matches an expected
  country code.
- **IsQrIban** — detect a Swiss/Liechtenstein QR-IBAN.
- **IsSepaCountry** — check whether a country participates in SEPA.
- **GetCountrySpec** — look up one country's IBAN specification (registry
  membership, SEPA membership, expected length, BBAN pattern).
- **ListSupportedCountries** — enumerate every recognized country, with
  optional IBAN-registry/SEPA filters.
- **ValidateBic** — validate a BIC/SWIFT code's structure; reports every
  specific failure reason.
- **ParseBic** — decompose a BIC into bank code, country code, location
  code, branch code, and test/live status.

## License

MIT — Copyright (c) 2026 Christian George Lucas.
