"use client";

import YAML from "yaml";
import TOML from "smol-toml";
import { csv2json, json2csv } from "json-2-csv";

type Parser = (a: string) => object;
type Stringifier = (c: unknown) => string;

const CSV = {
  parse: csv2json,
  stringify: json2csv as Stringifier,
};

const converters: Record<string, { parse: Parser; stringify: Stringifier }> = {
  YAML,
  TOML,
  CSV,
  JSON: {
    parse: JSON.parse,
    stringify: (c: unknown) => JSON.stringify(c, null, 2),
  },
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

export default function Home() {
  const [convertTo, setConvertTo] = useState("json");
  const [convertFrom, setConvertFrom] = useState("json");

  const [code, setCode] = useState(`{
  "a": 1,
  "b": 2,
  "c": [
    {
      "d": "cool",
      "e": "new"
    },
    {
      "f": "free",
      "g": "soon"
    }
  ]
}`);

  let text = "";

  try {
    const json = converters[convertFrom].parse(code) as object;

    text = converters[convertTo].stringify(json) as string;
  } catch (err) {
    text = (err as SyntaxError).message;
  }

  return (
    <div className="m-auto flex flex-col gap-8 max-w-[80%] max-h-screen">
      <div className="text-center">
        <Select value={convertFrom} onValueChange={setConvertFrom}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Convert from" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="yaml">YAML</SelectItem>
            <SelectItem value="toml">TOML</SelectItem>
            <SelectItem value="xml">XML</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
          </SelectContent>
        </Select>
        Convert to
        <Select value={convertTo} onValueChange={setConvertTo}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Convert to" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="yaml">YAML</SelectItem>
            <SelectItem value="toml">TOML</SelectItem>
            <SelectItem value="xml">XML</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <main className="flex *:bg-slate-800 *:w-[500px] *:h-[800px] gap-4 text-white">
        <textarea
          onChange={(e) => {
            setCode(e.target.value);
          }}
          value={code}
        />
        <pre className="overflow-x-auto">{text}</pre>
      </main>
    </div>
  );
}
