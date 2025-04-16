'use strict'

import * as vscode from 'vscode'

const SHEBANG = '#!' // #!/usr/bin/nft
const BRACE_OPEN = '{'
const BRACE_CLOSE = '}'
const COMMENT = '#'

const registerDocumentProvider = (
	document: vscode.TextDocument,
	options: vscode.FormattingOptions,
): vscode.TextEdit[] => {
	const edits: vscode.TextEdit[] = []
	const { insertSpaces, tabSize } = options

	const indent = insertSpaces ? ' '.repeat(tabSize) : '\t'

	let indentLevel = 0

	for (let i = 0; i < document.lineCount; i++) {
		const line: string = document.lineAt(i).text.trim()

		if (i == 0 && line.startsWith(SHEBANG)) {
			// First line and has a shebang, skip the entire line
			continue
		}

		let skip = false

		if (line.startsWith(COMMENT)) {
			// Comment line, do not care about {}
			skip = true
		}

		if (line.includes(BRACE_OPEN) && line.includes(BRACE_CLOSE)) {
			// Possibly:
			// - define foo = {...}
			// - elements = {...}
			// - ip daddr {...} ... or other rule
			skip = true
		}

		if (!skip && line.includes(BRACE_CLOSE)) {
			indentLevel--
		}

		// Generate new indentated line
		let newline: string = indent.repeat(indentLevel) + line

		if (newline.trim() == '') {
			// No indentation for empty line
			newline = ''
		}

		edits.push(vscode.TextEdit.replace(document.lineAt(i).range, newline))

		if (!skip && line.endsWith(BRACE_OPEN)) {
			indentLevel++
		}
	}

	return edits
}

export function activate(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.languages.registerDocumentFormattingEditProvider(
			{ scheme: 'file', language: 'nft' },
			{
				provideDocumentFormattingEdits: (document, options) =>
					registerDocumentProvider(document, options),
			},
		),
	)
}
