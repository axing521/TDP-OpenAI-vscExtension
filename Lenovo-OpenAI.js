/***
 * @creater:ACBash
 * @create_time:23-4-10 14:37:43
 * @last_modify:ACBash
 * @modify_time:23-4-18 9:37:33
 * @line_count:77
 **/

//引入vscode扩展API
const vscode = require('vscode');

//引入webview-provider
const { ChatGptViewProvider } = require("./chatgpt-view-provider");

//vscode扩展上下文的激活/未激活函数
function activate(context) {
    //显示已激活扩展
    console.log(`Good! 联想内部使用OpenAI插件成功激活!`);
    vscode.window.showInformationMessage(`Good! 联想内部使用OpenAI插件成功激活!`);

    //侧边栏可视化交互式窗口UI
    const chatViewProvider = new ChatGptViewProvider(context);
    
    context.subscriptions.push(
		vscode.commands.registerCommand('Lenovo-OpenAI.askGPT', askChatGPT),
		vscode.commands.registerCommand('Lenovo-OpenAI.whyBroken', askGPTWhyBroken),
		vscode.commands.registerCommand('Lenovo-OpenAI.explainPls', askGPTToExplain),
		vscode.commands.registerCommand('Lenovo-OpenAI.refactor', askGPTToRefactor),
		vscode.commands.registerCommand('Lenovo-OpenAI.clear', clearHTML),
		vscode.commands.registerCommand('Lenovo-OpenAI.resetToken', resetToken),
		vscode.commands.registerCommand('Lenovo-OpenAI.resetAPIKey', resetAPIKey),
		vscode.window.registerWebviewViewProvider("Lenovo-OpenAI.view", chatViewProvider, {
			webviewOptions: { retainContextWhenHidden: true }
		})
	);

    async function resetToken() {
		await context.globalState.update('chatgpt-session-token', null);
		await context.globalState.update('chatgpt-clearance-token', null);
		await context.globalState.update('chatgpt-user-agent', null);
		await chatViewProvider.ensureApiKey();
		// await vscode.window.showInformationMessage("Token reset, you'll be prompted for it next to you next ask ChatGPT a question.");
	}

    async function resetAPIKey() {
        await chatViewProvider.resetApiKey();
    }

    async function askChatGPT(userInput) {
        if (!userInput) {
            userInput = await vscode.window.showInputBox({ prompt: "向ChatGPT问一个问题" });
        }

        let editor = vscode.window.activeTextEditor;

        if (editor) {
            const selectedCode = editor.document.getText(vscode.window.activeTextEditor?.selection);
            const entireFileContents = editor.document.getText();

            const code = selectedCode
                ? selectedCode
                : `这是${editor.document.languageId}文件并且其中的内容是\n\n${entireFileContents}`;

            chatViewProvider.sendOpenAiApiRequest(userInput, code);
        }
    }

    async function askGPTToExplain() { await askChatGPT('你能解释一下这段代码是做什么的吗?'); }
	async function askGPTWhyBroken() { await askChatGPT('为什么这段代码会报错?'); }
	async function askGPTToRefactor() { await askChatGPT('你能重构优化这段代码吗'); }

    async function clearHTML() { await chatViewProvider.clearHTML(); }
}

function deactivate(context) {
    //显示未激活扩展
    console.log(`GodDamnIt! 插件未激活`);
    vscode.window.showInformationMessage(`GodDamnIt! 插件未激活`);
}

//模块导出
module.exports = {
    activate,
    deactivate
};