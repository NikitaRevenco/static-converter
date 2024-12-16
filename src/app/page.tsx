"use client";

import YAML from "json-to-pretty-yaml";

import { useState } from "react";

export default function Home() {
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
    const parsed = JSON.parse(code);
    text = YAML.stringify(parsed);
  } catch (err) {
    text = (err as SyntaxError).message;
  }

  return (
    <div className="m-auto flex flex-col gap-8 max-w-[80%] max-h-screen">
      <h1 className="text-center">Convert a to b</h1>
      <main className="flex *:bg-slate-800 *:w-[500px] *:h-[800px] gap-4">
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
