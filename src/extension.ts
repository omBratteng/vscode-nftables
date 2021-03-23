'use strict'

import * as vscode from 'vscode'

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

		let skip = false

		if (line.includes('{') && line.includes('}')) {
			skip = true
		}

		if (!skip && line.endsWith('}')) {
			indentLevel--
		}

		// Generate new indentated line
		let newline: string = indent.repeat(indentLevel) + line

		if (newline.trim() == '') {
			// No indentation for empty line
			newline = ''
		}

		edits.push(vscode.TextEdit.replace(document.lineAt(i).range, newline))

		if (!skip && line.endsWith('{')) {
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
