# Lenovo-OpenAI-vscExtension

An extension that uses OpenAI's API in vscode. 2023.4.4 I started to develop.

一个在vscode中使用OpenAI的API的扩展插件。 2023.4.4由本人在北京联想开始着手开发。

## Features

###V2

* ctrl+shift+p输入Lenovo即可出现多条功能命令
* 右键菜单也有多条功能命令
* 扩展webview视图交互UI（设置APIkey，清空面板，询问OpenAI）

![v2](https://lenovo-openai-demo.oss-cn-beijing.aliyuncs.com/v2.gif)

备注：使用功能命令之前，如果没有选取代码块将询问整个文件

###V1

安装此插件后，可以在文件中用鼠标选取一部分文本，然后ctrl+shift+p输入openAI: chat命令，即可等待chatGPT对你的回复。

![demo-gif](https://lenovo-openai-demo.oss-cn-beijing.aliyuncs.com/demo.gif)

## Requirements

vscode + install this extension


## Extension Settings

**不需要OpenAI账户APIkey，Enjoy**!

(最新的v2需要APIKey)


## Release Notes

## V2 可视化交互UI，右键菜单，用户自设置APIKey

### 2.0.1

2023.4.17 询问方式全部转成中文，以便结果也是中文

### 2.0.0

2023.4.17 new version, 可视化交互UI，右键菜单，用户自设置APIKey


## V1 代理+微服务，0门槛上ChatGPT

### 1.1.0

2023.4.14 updated, 右键菜单，新文件打开

### 1.0.1

2023.4.10 patched，内部使用

### 1.0.0

2023.4.7 Initial，chat功能
