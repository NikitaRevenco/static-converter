"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { converters } from "@/lib/converters";

import { useState } from "react";

export default function Home() {
  const [convertTo, setConvertTo] = useState("JSON");
  const [convertFrom, setConvertFrom] = useState("JSON");

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
    // console.log(convertFrom, converters, convertTo);
    const json = converters[convertFrom].parse(code) as object;

    // console.log(converters, convertFrom, converters[convertFrom]);
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
            <SelectItem value="JSON">JSON</SelectItem>
            <SelectItem value="YAML">YAML</SelectItem>
            <SelectItem value="TOML">TOML</SelectItem>
            <SelectItem value="CSV">CSV</SelectItem>
          </SelectContent>
        </Select>
        Convert to
        <Select value={convertTo} onValueChange={setConvertTo}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Convert to" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="JSON">JSON</SelectItem>
            <SelectItem value="YAML">YAML</SelectItem>
            <SelectItem value="TOML">TOML</SelectItem>
            <SelectItem value="NIX">NIX</SelectItem>
            <SelectItem value="CSV">CSV</SelectItem>
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
