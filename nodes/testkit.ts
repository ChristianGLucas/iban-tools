// Shared test fixtures, AxiomContext mock, and an INDEPENDENT mod-97-10
// checksum oracle for iban-tools node tests. Not a node and not itself a
// test file (no _test.ts suffix), so jest does not collect it directly.

import { AxiomContext, AxiomLogger, AxiomSecrets, AxiomReflection, AxiomMutation } from '../gen/axiomContext';

const testReflection: AxiomReflection = {
  flow: {
    nodes: [],
    edges: [],
    loopEdges: [],
    position: { currentInstance: 0, depth: 0, loopIterations: {}, subflowStackGraphIds: [] },
    graphId: '',
  },
};

const testMutation: AxiomMutation = {
  flow: {
    addNode: (_packageName: string, _packageVersion: string) => 0,
    addEdge: (_srcInstance: number, _dstInstance: number) => {},
  },
};

export const testContext: AxiomContext = {
  log: {
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
  } satisfies AxiomLogger,
  secrets: {
    get: (_name: string): [string, boolean] => ['', false],
  } satisfies AxiomSecrets,
  executionId: 'test-execution-id',
  flowId: 'test-flow-id',
  tenantId: 'test-tenant-id',
  reflection: testReflection,
  mutation: testMutation,
};

/**
 * Independent re-implementation of the ISO 7064 mod-97-10 IBAN checksum
 * algorithm, written from the spec (NOT calling ibantools' own checksum
 * code): move the first 4 characters (country + check digits) to the end,
 * expand each letter A-Z to two digits 10-35, interpret the result as one
 * big decimal integer, and reduce mod 97. A structurally-valid IBAN has
 * remainder exactly 1. Used in tests as a second, independent oracle that
 * the package's ValidateIban/ComposeIban must agree with — a round-trip
 * through ibantools alone would only prove self-consistency, not
 * correctness.
 */
export function mod97Independent(electronicIban: string): number {
  const rearranged = electronicIban.slice(4) + electronicIban.slice(0, 4);
  let numeric = '';
  for (const ch of rearranged) {
    if (ch >= '0' && ch <= '9') {
      numeric += ch;
    } else if (ch >= 'A' && ch <= 'Z') {
      numeric += (ch.charCodeAt(0) - 55).toString(); // A=10 .. Z=35
    } else {
      numeric += '0'; // non-alphanumeric: independent oracle treats as invalid digit
    }
  }
  return Number(BigInt(numeric || '0') % 97n);
}

/** Hand-verified, real-format IBANs (the classic Wikipedia/ISO 13616
 * "IBAN example" set for each country) known to be checksum- and
 * structure-valid. Independently re-confirmed via mod97Independent. */
export const KNOWN_VALID_IBANS: Record<string, string> = {
  GB: 'GB82WEST12345698765432',
  DE: 'DE89370400440532013000',
  FR: 'FR1420041010050500013M02606',
  GR: 'GR1601101250000000012300695',
  NL: 'NL91ABNA0417164300',
  CH: 'CH9300762011623852957',
};
