# iban-tools

Composable Axiom nodes for deterministic validation, parsing, formatting, and
construction of International Bank Account Numbers (IBAN, ISO 13616) and
Business Identifier Codes (BIC/SWIFT, ISO 9362).

Built for the [Axiom](https://axiomide.com) marketplace under the
`christiangeorgelucas` handle. Wraps [ibantools](https://github.com/Simplify/ibantools)
(dual MIT/MPL-2.0 licensed — used here under MIT), a pure, dependency-free
TypeScript implementation with all country IBAN/BIC specifications embedded
at build time. Every node is stateless, deterministic, and fully offline: no
network call, no wall-clock read, no randomness. Malformed or oversized input
returns a structured error, never a crash.

## Use it from your agent or app

Every node in this package is a **live, auto-scaling API endpoint** on the
[Axiom](https://axiomide.com) marketplace — call it from an AI agent or your own
code, with nothing to self-host.

**📦 See it on the marketplace:**
https://dev.axiomide.com/marketplace/christiangeorgelucas/iban-tools@0.1.0

**Hook it up to an AI agent (MCP).** Add Axiom's hosted MCP server to any MCP
client and every node becomes a typed tool your agent can call — search the
catalog, inspect a schema, and invoke it directly.

```bash
# Claude Code
claude mcp add --transport http axiom https://api.axiomide.com/mcp \
  --header "Authorization: Bearer $AXIOM_API_KEY"
```

Claude Desktop, Cursor, or any config-based client:

```json
{
  "mcpServers": {
    "axiom": {
      "type": "http",
      "url": "https://api.axiomide.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_AXIOM_API_KEY" }
    }
  }
}
```

**Call it from the CLI.**

```bash
axiom invoke christiangeorgelucas/iban-tools/ValidateIban --input '{ ... }'
```

**Call it over HTTP.**

```bash
curl -X POST https://api.axiomide.com/invocations/v1/nodes/christiangeorgelucas/iban-tools/0.1.0/ValidateIban \
  -H "Authorization: Bearer $AXIOM_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{ ... }'
```

> Input/output schema for each node is on the marketplace page above, or via
> `axiom inspect node christiangeorgelucas/iban-tools/ValidateIban`.

### Get started free

Install the CLI:

```bash
# macOS / Linux — Homebrew
brew install axiomide/tap/axiom

# macOS / Linux — install script
curl -fsSL https://raw.githubusercontent.com/AxiomIDE/axiom-releases/main/install.sh | sh
```

**Windows:** download the `windows/amd64` `.zip` from the
[releases page](https://github.com/AxiomIDE/axiom-releases/releases), unzip it,
and put `axiom.exe` on your `PATH`.

Then `axiom version` to verify, `axiom login` (GitHub or Google) to authenticate,
and create an API key under **Console → API Keys**. Docs and sign-up at
**[axiomide.com](https://axiomide.com)**.

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
