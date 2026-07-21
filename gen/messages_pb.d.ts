// package: christiangeorgelucas.iban_tools
// file: messages.proto

import * as jspb from "google-protobuf";

export class ValidateIbanInput extends jspb.Message {
  getIban(): string;
  setIban(value: string): void;

  getRejectQrIban(): boolean;
  setRejectQrIban(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateIbanInput.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateIbanInput): ValidateIbanInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateIbanInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateIbanInput;
  static deserializeBinaryFromReader(message: ValidateIbanInput, reader: jspb.BinaryReader): ValidateIbanInput;
}

export namespace ValidateIbanInput {
  export type AsObject = {
    iban: string,
    rejectQrIban: boolean,
  }
}

export class ValidateIbanOutput extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  clearErrorCodesList(): void;
  getErrorCodesList(): Array<string>;
  setErrorCodesList(value: Array<string>): void;
  addErrorCodes(value: string, index?: number): string;

  getReason(): string;
  setReason(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateIbanOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateIbanOutput): ValidateIbanOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateIbanOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateIbanOutput;
  static deserializeBinaryFromReader(message: ValidateIbanOutput, reader: jspb.BinaryReader): ValidateIbanOutput;
}

export namespace ValidateIbanOutput {
  export type AsObject = {
    valid: boolean,
    errorCodesList: Array<string>,
    reason: string,
  }
}

export class ParseIbanInput extends jspb.Message {
  getIban(): string;
  setIban(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParseIbanInput.AsObject;
  static toObject(includeInstance: boolean, msg: ParseIbanInput): ParseIbanInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ParseIbanInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParseIbanInput;
  static deserializeBinaryFromReader(message: ParseIbanInput, reader: jspb.BinaryReader): ParseIbanInput;
}

export namespace ParseIbanInput {
  export type AsObject = {
    iban: string,
  }
}

export class ParseIbanOutput extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getIban(): string;
  setIban(value: string): void;

  getCountryCode(): string;
  setCountryCode(value: string): void;

  getCheckDigits(): string;
  setCheckDigits(value: string): void;

  getBban(): string;
  setBban(value: string): void;

  getBankIdentifier(): string;
  setBankIdentifier(value: string): void;

  getBranchIdentifier(): string;
  setBranchIdentifier(value: string): void;

  getAccountNumber(): string;
  setAccountNumber(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParseIbanOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ParseIbanOutput): ParseIbanOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ParseIbanOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParseIbanOutput;
  static deserializeBinaryFromReader(message: ParseIbanOutput, reader: jspb.BinaryReader): ParseIbanOutput;
}

export namespace ParseIbanOutput {
  export type AsObject = {
    valid: boolean,
    iban: string,
    countryCode: string,
    checkDigits: string,
    bban: string,
    bankIdentifier: string,
    branchIdentifier: string,
    accountNumber: string,
    error: string,
  }
}

export class FormatIbanInput extends jspb.Message {
  getIban(): string;
  setIban(value: string): void;

  getStyle(): string;
  setStyle(value: string): void;

  getSeparator(): string;
  setSeparator(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FormatIbanInput.AsObject;
  static toObject(includeInstance: boolean, msg: FormatIbanInput): FormatIbanInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FormatIbanInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FormatIbanInput;
  static deserializeBinaryFromReader(message: FormatIbanInput, reader: jspb.BinaryReader): FormatIbanInput;
}

export namespace FormatIbanInput {
  export type AsObject = {
    iban: string,
    style: string,
    separator: string,
  }
}

export class FormatIbanOutput extends jspb.Message {
  getFormatted(): string;
  setFormatted(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FormatIbanOutput.AsObject;
  static toObject(includeInstance: boolean, msg: FormatIbanOutput): FormatIbanOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FormatIbanOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FormatIbanOutput;
  static deserializeBinaryFromReader(message: FormatIbanOutput, reader: jspb.BinaryReader): FormatIbanOutput;
}

export namespace FormatIbanOutput {
  export type AsObject = {
    formatted: string,
    error: string,
  }
}

export class ComposeIbanInput extends jspb.Message {
  getCountryCode(): string;
  setCountryCode(value: string): void;

  getBban(): string;
  setBban(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ComposeIbanInput.AsObject;
  static toObject(includeInstance: boolean, msg: ComposeIbanInput): ComposeIbanInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ComposeIbanInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ComposeIbanInput;
  static deserializeBinaryFromReader(message: ComposeIbanInput, reader: jspb.BinaryReader): ComposeIbanInput;
}

export namespace ComposeIbanInput {
  export type AsObject = {
    countryCode: string,
    bban: string,
  }
}

export class ComposeIbanOutput extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getIban(): string;
  setIban(value: string): void;

  getIbanPrintable(): string;
  setIbanPrintable(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ComposeIbanOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ComposeIbanOutput): ComposeIbanOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ComposeIbanOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ComposeIbanOutput;
  static deserializeBinaryFromReader(message: ComposeIbanOutput, reader: jspb.BinaryReader): ComposeIbanOutput;
}

export namespace ComposeIbanOutput {
  export type AsObject = {
    success: boolean,
    iban: string,
    ibanPrintable: string,
    error: string,
  }
}

export class CheckIbanCountryInput extends jspb.Message {
  getIban(): string;
  setIban(value: string): void;

  getExpectedCountryCode(): string;
  setExpectedCountryCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckIbanCountryInput.AsObject;
  static toObject(includeInstance: boolean, msg: CheckIbanCountryInput): CheckIbanCountryInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckIbanCountryInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckIbanCountryInput;
  static deserializeBinaryFromReader(message: CheckIbanCountryInput, reader: jspb.BinaryReader): CheckIbanCountryInput;
}

export namespace CheckIbanCountryInput {
  export type AsObject = {
    iban: string,
    expectedCountryCode: string,
  }
}

export class CheckIbanCountryOutput extends jspb.Message {
  getMatches(): boolean;
  setMatches(value: boolean): void;

  getActualCountryCode(): string;
  setActualCountryCode(value: string): void;

  getIbanValid(): boolean;
  setIbanValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckIbanCountryOutput.AsObject;
  static toObject(includeInstance: boolean, msg: CheckIbanCountryOutput): CheckIbanCountryOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckIbanCountryOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckIbanCountryOutput;
  static deserializeBinaryFromReader(message: CheckIbanCountryOutput, reader: jspb.BinaryReader): CheckIbanCountryOutput;
}

export namespace CheckIbanCountryOutput {
  export type AsObject = {
    matches: boolean,
    actualCountryCode: string,
    ibanValid: boolean,
    error: string,
  }
}

export class IsQrIbanInput extends jspb.Message {
  getIban(): string;
  setIban(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsQrIbanInput.AsObject;
  static toObject(includeInstance: boolean, msg: IsQrIbanInput): IsQrIbanInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IsQrIbanInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsQrIbanInput;
  static deserializeBinaryFromReader(message: IsQrIbanInput, reader: jspb.BinaryReader): IsQrIbanInput;
}

export namespace IsQrIbanInput {
  export type AsObject = {
    iban: string,
  }
}

export class IsQrIbanOutput extends jspb.Message {
  getIsQrIban(): boolean;
  setIsQrIban(value: boolean): void;

  getCountryCode(): string;
  setCountryCode(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsQrIbanOutput.AsObject;
  static toObject(includeInstance: boolean, msg: IsQrIbanOutput): IsQrIbanOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IsQrIbanOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsQrIbanOutput;
  static deserializeBinaryFromReader(message: IsQrIbanOutput, reader: jspb.BinaryReader): IsQrIbanOutput;
}

export namespace IsQrIbanOutput {
  export type AsObject = {
    isQrIban: boolean,
    countryCode: string,
    error: string,
  }
}

export class IsSepaCountryInput extends jspb.Message {
  getCountryCode(): string;
  setCountryCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsSepaCountryInput.AsObject;
  static toObject(includeInstance: boolean, msg: IsSepaCountryInput): IsSepaCountryInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IsSepaCountryInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsSepaCountryInput;
  static deserializeBinaryFromReader(message: IsSepaCountryInput, reader: jspb.BinaryReader): IsSepaCountryInput;
}

export namespace IsSepaCountryInput {
  export type AsObject = {
    countryCode: string,
  }
}

export class IsSepaCountryOutput extends jspb.Message {
  getIsSepa(): boolean;
  setIsSepa(value: boolean): void;

  getRecognizedCountry(): boolean;
  setRecognizedCountry(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IsSepaCountryOutput.AsObject;
  static toObject(includeInstance: boolean, msg: IsSepaCountryOutput): IsSepaCountryOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IsSepaCountryOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IsSepaCountryOutput;
  static deserializeBinaryFromReader(message: IsSepaCountryOutput, reader: jspb.BinaryReader): IsSepaCountryOutput;
}

export namespace IsSepaCountryOutput {
  export type AsObject = {
    isSepa: boolean,
    recognizedCountry: boolean,
    error: string,
  }
}

export class GetCountrySpecInput extends jspb.Message {
  getCountryCode(): string;
  setCountryCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCountrySpecInput.AsObject;
  static toObject(includeInstance: boolean, msg: GetCountrySpecInput): GetCountrySpecInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCountrySpecInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCountrySpecInput;
  static deserializeBinaryFromReader(message: GetCountrySpecInput, reader: jspb.BinaryReader): GetCountrySpecInput;
}

export namespace GetCountrySpecInput {
  export type AsObject = {
    countryCode: string,
  }
}

export class GetCountrySpecOutput extends jspb.Message {
  getFound(): boolean;
  setFound(value: boolean): void;

  getCountryCode(): string;
  setCountryCode(value: string): void;

  getIbanRegistryMember(): boolean;
  setIbanRegistryMember(value: boolean): void;

  getSepa(): boolean;
  setSepa(value: boolean): void;

  getIbanLength(): number;
  setIbanLength(value: number): void;

  getBbanPattern(): string;
  setBbanPattern(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCountrySpecOutput.AsObject;
  static toObject(includeInstance: boolean, msg: GetCountrySpecOutput): GetCountrySpecOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCountrySpecOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCountrySpecOutput;
  static deserializeBinaryFromReader(message: GetCountrySpecOutput, reader: jspb.BinaryReader): GetCountrySpecOutput;
}

export namespace GetCountrySpecOutput {
  export type AsObject = {
    found: boolean,
    countryCode: string,
    ibanRegistryMember: boolean,
    sepa: boolean,
    ibanLength: number,
    bbanPattern: string,
    error: string,
  }
}

export class ListSupportedCountriesInput extends jspb.Message {
  getIbanRegistryOnly(): boolean;
  setIbanRegistryOnly(value: boolean): void;

  getSepaOnly(): boolean;
  setSepaOnly(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListSupportedCountriesInput.AsObject;
  static toObject(includeInstance: boolean, msg: ListSupportedCountriesInput): ListSupportedCountriesInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListSupportedCountriesInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListSupportedCountriesInput;
  static deserializeBinaryFromReader(message: ListSupportedCountriesInput, reader: jspb.BinaryReader): ListSupportedCountriesInput;
}

export namespace ListSupportedCountriesInput {
  export type AsObject = {
    ibanRegistryOnly: boolean,
    sepaOnly: boolean,
  }
}

export class CountrySummary extends jspb.Message {
  getCountryCode(): string;
  setCountryCode(value: string): void;

  getIbanRegistryMember(): boolean;
  setIbanRegistryMember(value: boolean): void;

  getSepa(): boolean;
  setSepa(value: boolean): void;

  getIbanLength(): number;
  setIbanLength(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountrySummary.AsObject;
  static toObject(includeInstance: boolean, msg: CountrySummary): CountrySummary.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountrySummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountrySummary;
  static deserializeBinaryFromReader(message: CountrySummary, reader: jspb.BinaryReader): CountrySummary;
}

export namespace CountrySummary {
  export type AsObject = {
    countryCode: string,
    ibanRegistryMember: boolean,
    sepa: boolean,
    ibanLength: number,
  }
}

export class ListSupportedCountriesOutput extends jspb.Message {
  clearCountriesList(): void;
  getCountriesList(): Array<CountrySummary>;
  setCountriesList(value: Array<CountrySummary>): void;
  addCountries(value?: CountrySummary, index?: number): CountrySummary;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListSupportedCountriesOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ListSupportedCountriesOutput): ListSupportedCountriesOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListSupportedCountriesOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListSupportedCountriesOutput;
  static deserializeBinaryFromReader(message: ListSupportedCountriesOutput, reader: jspb.BinaryReader): ListSupportedCountriesOutput;
}

export namespace ListSupportedCountriesOutput {
  export type AsObject = {
    countriesList: Array<CountrySummary.AsObject>,
    count: number,
  }
}

export class ValidateBicInput extends jspb.Message {
  getBic(): string;
  setBic(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateBicInput.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateBicInput): ValidateBicInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateBicInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateBicInput;
  static deserializeBinaryFromReader(message: ValidateBicInput, reader: jspb.BinaryReader): ValidateBicInput;
}

export namespace ValidateBicInput {
  export type AsObject = {
    bic: string,
  }
}

export class ValidateBicOutput extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  clearErrorCodesList(): void;
  getErrorCodesList(): Array<string>;
  setErrorCodesList(value: Array<string>): void;
  addErrorCodes(value: string, index?: number): string;

  getReason(): string;
  setReason(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateBicOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateBicOutput): ValidateBicOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateBicOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateBicOutput;
  static deserializeBinaryFromReader(message: ValidateBicOutput, reader: jspb.BinaryReader): ValidateBicOutput;
}

export namespace ValidateBicOutput {
  export type AsObject = {
    valid: boolean,
    errorCodesList: Array<string>,
    reason: string,
  }
}

export class ParseBicInput extends jspb.Message {
  getBic(): string;
  setBic(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParseBicInput.AsObject;
  static toObject(includeInstance: boolean, msg: ParseBicInput): ParseBicInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ParseBicInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParseBicInput;
  static deserializeBinaryFromReader(message: ParseBicInput, reader: jspb.BinaryReader): ParseBicInput;
}

export namespace ParseBicInput {
  export type AsObject = {
    bic: string,
  }
}

export class ParseBicOutput extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getBankCode(): string;
  setBankCode(value: string): void;

  getCountryCode(): string;
  setCountryCode(value: string): void;

  getLocationCode(): string;
  setLocationCode(value: string): void;

  getBranchCode(): string;
  setBranchCode(value: string): void;

  getHasBranchCode(): boolean;
  setHasBranchCode(value: boolean): void;

  getIsTestBic(): boolean;
  setIsTestBic(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParseBicOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ParseBicOutput): ParseBicOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ParseBicOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParseBicOutput;
  static deserializeBinaryFromReader(message: ParseBicOutput, reader: jspb.BinaryReader): ParseBicOutput;
}

export namespace ParseBicOutput {
  export type AsObject = {
    valid: boolean,
    bankCode: string,
    countryCode: string,
    locationCode: string,
    branchCode: string,
    hasBranchCode: boolean,
    isTestBic: boolean,
    error: string,
  }
}

