import YAML from "yaml";
import TOML from "smol-toml";
import INI from "ini";
import { parse as xmlParser } from "js2xmlparser";
import xml2json from "@hendt/xml2json";
// @ts-expect-error
import { parse as env2json, stringify as json2env } from "envfile";
import { csv2json, json2csv } from "json-2-csv";
import { json2nix } from "./nix";
import { markdownTable } from "markdown-table";
import {
  parseEDNString,
  toEDNString,
  toEDNStringFromSimpleObject,
} from "edn-data";

type Parser = (a: string) => object;
type Stringifier = (c: unknown) => string;
type Converter = { parse: Parser; stringify: Stringifier };

export const converters: Record<string, Converter> = {
  YAML,
  TOML,
  CSV: {
    parse: csv2json,
    stringify: json2csv as Stringifier,
  },
  NIX: {
    stringify: json2nix,
    parse: () => {
      throw new Error("Need parser for Nix string -> Json");
    },
  },
  INI,
  XML: {
    stringify: (c) => xmlParser("object", c),
    parse: xml2json,
  },
  ENV: {
    stringify: json2env,
    parse: env2json,
  },
  "MARKDOWN TABLE": {
    // TODO: smarter parser for objects
    // examples:
    // Array<primitive> => List
    // Nested object => Nested markdown tables
    stringify: (c) => markdownTable(Object.entries(c as object)),
    parse: () => {
      throw new Error("Need parser for Markdown Table -> Json");
    },
  },
  EDN: {
    stringify: (c) =>
      toEDNStringFromSimpleObject(c as any, { keysAs: "keyword" }),
    parse: (c) => parseEDNString(c) as any,
  },
  JSON: {
    parse: JSON.parse,
    stringify: (c: unknown) => JSON.stringify(c, null, 2),
  },
};
