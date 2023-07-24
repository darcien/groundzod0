import { onMount } from "solid-js";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// https://github.com/microsoft/monaco-editor/issues/4045
// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

const editorDivId = "foo";
const previewDivId = "bar";

export default function Editor() {
  onMount(() => {
    const div = document.getElementById(editorDivId)!;
    monaco.editor.create(div, {
      value: 'console.log("Hello, world")',
      language: "typescript",
    });
  });

  return (
    <div class="h-screen w-full flex flex-row">
      <div
        id={editorDivId}
        class="flex-1"
      />
      <div
        id={previewDivId}
        class="flex-1 bg-red-300"
      />
    </div>
  );
}
