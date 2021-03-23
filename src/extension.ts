'use strict'

import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
	vscode.languages.registerDocumentFormattingEditProvider(
		{ scheme: 'file', language: 'nft' },
		{
			provideDocumentFormattingEdits(
				document: vscode.TextDocument,
			): vscode.TextEdit[] {
				const edits: vscode.TextEdit[] = []

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
					let newline: string = '\t'.repeat(indentLevel) + line

					if (newline.trim() == '') {
						// No indentation for empty line
						newline = ''
					}

					edits.push(
						vscode.TextEdit.replace(
							document.lineAt(i).range,
							newline,
						),
					)

					if (!skip && line.endsWith('{')) {
						indentLevel++
					}
				}

				return edits
			},
		},
	)
}
