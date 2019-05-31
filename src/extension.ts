import * as vscode from 'vscode';
import { debounce } from 'lodash';

class Config {
  public configuration = vscode.workspace.getConfiguration('highlight-dodgy-characters');

  get badCharMatcher() {
    return `[^\x00-\x7F\n\u0009${this.configuration.whitelist}]`;
  }

  get badCharDecorationType() {
    return vscode.window.createTextEditorDecorationType(this.configuration.badCharDecorationStyle);
  }

  public updateConfiguration() {
    this.configuration = vscode.workspace.getConfiguration('highlight-dodgy-characters');
  }
}

const config = new Config();

export function activate(context: vscode.ExtensionContext) {
  // execute function on the leading edge of the debounce -> only defer subsequent calls
  const triggerUpdateDecorations = debounce(updateDecorations, 500, { leading: true });

  triggerUpdateDecorations();

  vscode.window.onDidChangeActiveTextEditor(
    editor => triggerUpdateDecorations(editor),
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeTextDocument(
    event => {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document === event.document) triggerUpdateDecorations(editor);
    },
    null,
    context.subscriptions
  );

  // Refreshes the highlighting after settings change instead of requireing a reload
  vscode.workspace.onDidChangeConfiguration(() => {
    config.updateConfiguration();
    triggerUpdateDecorations();
  });
}

function updateDecorations(editor: vscode.TextEditor | void) {
  if (!editor) editor = vscode.window.activeTextEditor;
  if (editor) {
    const decorations = createDecorations(editor);
    editor.setDecorations(config.badCharDecorationType, decorations);
  }
}

export function createDecorations(editor: vscode.TextEditor): vscode.DecorationOptions[] {
  const badCahrRegExp = new RegExp(config.badCharMatcher, 'gi');
  const text = editor.document.getText();
  const decorations = [];
  let match;
  while (match = badCahrRegExp.exec(text)) {
    const startPos = editor.document.positionAt(match.index);
    const endPos = editor.document.positionAt(match.index + match[0].length);
    const hexCharCode = match[0].charCodeAt(0).toString(16);
    const decoration = {
      range: new vscode.Range(startPos, endPos),
      hoverMessage: `Bad character: [${hexCharCode}](https://unicode.org/cldr/utility/character.jsp?a=${hexCharCode})`
    };
    decorations.push(decoration);
  }

  return decorations;
}
