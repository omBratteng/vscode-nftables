
[![GitHub](https://img.shields.io/github/license/omBratteng/vscode-nftables?style=for-the-badge)](https://github.com/omBratteng/vscode-nftables/blob/32ae6147f4f625be877932532a40f6e31af14009/LICENSE)
![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/ombratteng.nftables?style=for-the-badge)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/omBratteng/vscode-nftables/continuous-integration?label=CI%20Build&style=for-the-badge)](https://github.com/omBratteng/vscode-nftables/actions/workflows/continous-integration.yml)

# Language-NFTables
A VSCode language support package for the nftables configuration syntax.

This package can also auto indent your nftable code.

Enable autoformatting by adding this to you `settings.json`
```json
{
	"[nft]": {
		"editor.formatOnSave": true,
		"editor.defaultFormatter": "omBratteng.nftables"
	},
}
```

## Download
This package is available at [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=omBratteng.nftables) and [Open VSX registry](https://open-vsx.org/extension/omBratteng/nftables)

> Ported from [Natolumin/language-nftables](https://github.com/Natolumin/language-nftables)
