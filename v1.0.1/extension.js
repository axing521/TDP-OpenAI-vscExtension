/***
 * @creater:ACBash
 * @create_time:23-4-4 16:20:29
 * @last_modify:ACBash
 * @modify_time:23-4-7 12:14:13
 * @line_count:51
 **/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const openAI = require('./openAI.js');

// 从编辑器中获取选取的文本
const getSelectedText = () => {
	return vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor?.selection) || '';
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "demo" is now active!');

	let chatCommand = vscode.commands.registerCommand('demo.chat', async () => {
		let selectedText = getSelectedText();
		if(selectedText == ''){
			vscode.window.showErrorMessage('请先选取文本!');
			return;
		}

		let userQuery = {"content": `${selectedText}`};

		const res = await openAI.chat(userQuery);
		const ans = res.data.message.content;
		console.log(ans);

		vscode.window.showInformationMessage(`${ans}`);
	});
	context.subscriptions.push(chatCommand);

	let helloCommand = vscode.commands.registerCommand('demo.helloWorld', function () {
		vscode.window.showInformationMessage('Hello openAI from demo!');
	});
	context.subscriptions.push(helloCommand);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
