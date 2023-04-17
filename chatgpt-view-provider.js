/***
 * @creater:ACBash
 * @create_time:23-4-12 16:36:5
 * @last_modify:ACBash
 * @modify_time:23-4-17 15:19:51
 * @line_count:195
 **/

//webview-HTML
/* `<!DOCTYPE html>
<html>
<head>
    <title>固定在页面底部的输入框</title>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        .container {
            position: fixed;
            bottom: 0;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            background-color: #1E1E1E;
            text-align: center;
        }
        .container input[type=text] {
            background-color: #3C3C3C;
            color: #fff;
            padding: 10px;
            width: 70%;
            border: none;
            border-radius: 5px;
            outline: none;
            font-size: 16px;
            box-sizing: border-box;
            vertical-align: middle;
        }
        .container input[type=submit] {
            padding: 10px 20px;
            background-color: #4CAF50;
            border: none;
            border-radius: 5px;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            vertical-align: middle;
        }
    </style>
</head>
<body>
    <div class = 'chat'>
        1111111111111
    </div>
    <div class="container">
        <form action="#" method="post">
            <input type="text" name="input" placeholder="请输入内容...">
            <input type="submit" value="提交">
        </form>
    </div>
</body>
</html>`; */

const vscode = require('vscode');
const request = require('./request');

class ChatGptViewProvider {
    constructor(context) {
        this.webView = null;
        this.context = context;
        this.message = null;
        this.apiKey = null;
    }

    resolveWebviewView(webviewView, _context, _token) {
        this.webView = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.context.extensionUri],
        };

        webviewView.webview.html = this.getHtml(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(data => {
            if (data.type === 'askChatGPT') {
                this.sendOpenAiApiRequest(data.value);
            }
        });

        if (this.message !== null) {
            this.sendMessageToWebView(this.message);
            this.message = null;
        }
    }

    getHtml(webview) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'main.js'));
        const stylesMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'main.css'));
        
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="${stylesMainUri}" rel="stylesheet">
                    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body class="overflow-hidden">
                    <div class="flex flex-col h-screen">
                        <div class="flex-1 overflow-y-auto" id="qa-list"></div>
                        <div id="in-progress" class="p-4 flex items-center hidden">
                            <div style="text-align: center;">
                                <div>Please wait while we handle your request ❤️</div>
                                <div class="loader"></div>
                            </div>
                        </div>
                        <div class="p-4 flex items-center">
                            <div class="flex-1">
                                <textarea
                                    type="text"
                                    rows="2"
                                    class="border p-2 w-full"
                                    id="question-input"
                                    placeholder="请输入问题..."
                                ></textarea>
                            </div>
                            <button style="background: var(--vscode-button-background)" id="ask-button" class="p-2 ml-5">提交</button>
                        </div>
                    </div>
                    <script src="${scriptUri}"></script>
                </body>
                </html>`;
    }

    sendMessageToWebView(message) {
        if (this.webView) {
            this.webView?.webview.postMessage(message);
        } else {
            this.message = message;
        }
    }

    async resetApiKey() {
        const apiKeyInput = await vscode.window.showInputBox({
            title: "设定你的OpenAI-APIKey",
            prompt: "请输入你的OpenAI-APIKey. 你可以在https://platform.openai.com/account/api-keys找到",
            ignoreFocusOut: true,
            placeHolder: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        });
        this.apiKey = apiKeyInput;
        this.context.globalState.update('chatgpt-api-key', this.apiKey);
    }

    async ensureApiKey() {
        this.apiKey = await this.context.globalState.get('chatgpt-api-key');

        if (!this.apiKey) {
            const apiKeyInput = await vscode.window.showInputBox({
                title: "设定你的OpenAI-APIKey",
                prompt: "请输入你的OpenAI-APIKey. 你可以在https://platform.openai.com/account/api-keys找到",
                ignoreFocusOut: true,
                placeHolder: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            });
            this.apiKey = apiKeyInput;
            this.context.globalState.update('chatgpt-api-key', this.apiKey);
        }
    }

    async sendOpenAiApiRequest(prompt, code) {
        await this.ensureApiKey();

        const question = (code) ? `${prompt}: ${code}` : prompt;

        if (!this.webView) {
            await vscode.commands.executeCommand('chatgpt-vscode-plugin.view.focus');
        } else {
            this.webView?.show?.(true);
        }

        this.sendMessageToWebView({ type: 'addQuestion', value: prompt, code });

        let response = await request(this.apiKey, question);
        let ans = response.message.content;

        this.sendMessageToWebView( { type: 'addResponse', value: ans } );
    }

    async clearHTML(){
        this.webView.webview.postMessage({ type: 'clearHTML' });
    }
}

module.exports = {
    ChatGptViewProvider
};