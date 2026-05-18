import { editor } from "monaco-editor";
import { Id } from "../../convex/_generated/dataModel";

export interface ExecutionResult {
  code: string;
  output: string;
  error: string | null;
}

export interface CodeEditorState {
  language: string;
  fontSize: number;
  theme: string;

  output: string;
  isRunning: boolean;
  error: string | null;

  editor: editor.IStandaloneCodeEditor | null;

  executionResult: ExecutionResult | null;

  getCode: () => string;

  setEditor: (
    editor: editor.IStandaloneCodeEditor
  ) => void;

  setTheme: (
    theme: string
  ) => void;

  setFontSize: (
    fontSize: number
  ) => void;

  setLanguage: (
    language: string
  ) => void;

  runCode: () => Promise<void>;
}

export interface Theme {
  id: string;
  label: string;
  color: string;
}

export interface Snippet {
  _id: Id<"snippets">;
  _creationTime: number;
  title: string;
  language: string;
  code: string;
  userId: string;
  userName: string;
}