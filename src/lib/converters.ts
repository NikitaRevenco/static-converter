import YAML from "yaml";
import TOML from "smol-toml";
import { csv2json, json2csv } from "json-2-csv";

type Parser = (a: string) => object;
type Stringifier = (c: unknown) => string;
type Converter = { parse: Parser; stringify: Stringifier };

const CSV = {
  parse: csv2json,
  stringify: json2csv as Stringifier,
};

function json2nix(json: unknown, level: number = 1): string {
  const ONE_INDENT = "  ";

  const indent_level = ONE_INDENT.repeat(level);
  const sub_indent_level = indent_level.slice(0, -ONE_INDENT.length);

  if (
    typeof json === "string" ||
    typeof json === "number" ||
    json === null ||
    typeof json === "boolean"
  )
    return JSON.stringify(json);
  else if (Array.isArray(json)) {
    return `[\n${json.map((item) => `${indent_level}${json2nix(item, level + 1)}`).join("\n")}\n${sub_indent_level}]`;
  } else {
    const attributeSet = Object.entries(json as object)
      .map(([k, v]) => {
        const validUnquotedNix = /^[\w'_-]*$/;

        const key = validUnquotedNix.test(k) ? k : `"${k}"`;
        const val = json2nix(v, level + 1);

        return `${indent_level}${key} = ${val};\n`;
      })
      .join("");

    return `{\n${attributeSet}${sub_indent_level}}`;
  }
}

const NIX: Converter = {
  stringify: json2nix,
  parse: () => {
    throw new Error("Need parser for Nix string -> Json");
  },
};

export const converters: Record<string, Converter> = {
  YAML,
  TOML,
  CSV,
  NIX,
  JSON: {
    parse: JSON.parse,
    stringify: (c: unknown) => JSON.stringify(c, null, 2),
  },
};
