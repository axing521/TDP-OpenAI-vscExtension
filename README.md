# Lenovo-OpenAI-vscExtension

![v2](https://lenovo-openai-demo.oss-cn-beijing.aliyuncs.com/v2.gif)

一个在vscode中使用OpenAI的API的扩展插件，Lenovo-OpenAI，vscodeAPI + OpenAIApi + js + html + css。

vscode扩展市场发布名称：Lenovo-OpenAI

**项目背景**：本人在北京联想公司实习期间，部门主要业务的低代码平台开发需要用到ChatGPT组件，leader让我首先去实现一个在vscode中使用OpenAI的API的扩展插件。

**项目内容**：开发一个vscode中使用OpenAI的API的扩展插件，能够让用户通过命令使用、右键菜单以及webview视图交互式UI进行ChatGPT的使用。

**技术方案**：在vscode插件交互方面，首先用vscode插件开发脚手架初始化项目，配置package.json（插件发布信息，命令注册，menu注册，webview注册），然后写入口文件的activate函数（使用vscode扩展的API，写的逻辑主要是命令的回调函数），这里将回调函数的逻辑全部写在webview-provider里统一管理，防止activate函数臃肿。技术难点在于webview的编写。webview里编写一些属性和方法，具体包括：

![image-20230418143902506](https://lenovo-openai-demo.oss-cn-beijing.aliyuncs.com/image-20230418143902506.png)

在openAIApi调用方面，封装request网络请求，暴露一个APIKey和用户输入UserQuery。

**项目目录结构**：

![image-20230418141600989](https://lenovo-openai-demo.oss-cn-beijing.aliyuncs.com/image-20230418141600989.png)

**项目成果**：ctrl+shift+p输入Lenovo即可出现多条功能命令，右键菜单也有多条功能命令，扩展webview视图交互UI（设置APIkey，清空面板，询问OpenAI）。用户能够成功通过命令使用、右键菜单以及webview视图交互式UI进行ChatGPT的使用。相较于v1版本的微服务代理，有更好的用户交互体验，并且响应速度提升了550%。

备注：使用功能命令之前，如果没有选取代码块将询问整个文件。

**插件的运行原理架构**：

![image-20230418152937250](https://lenovo-openai-demo.oss-cn-beijing.aliyuncs.com/image-20230418152937250.png)

github源码地址：https://github.com/axing521/Lenovo-OpenAI-vscExtension

![下载量](https://lenovo-openai-demo.oss-cn-beijing.aliyuncs.com/d661d5f56ec1992ef861c574fe50bef.png)

---

An extension that uses OpenAI's API in vscode. 2023.4.4 I started to develop.

一个在vscode中使用OpenAI的API的扩展插件。 2023.4.4由本人在北京联想开始着手开发。

## !!注意，目前v2版本需要挂梯子!!

## Features

### V2

* ctrl+shift+p输入Lenovo即可出现多条功能命令
* 右键菜单也有多条功能命令
* 扩展webview视图交互UI（设置APIkey，清空面板，询问OpenAI）

![v2](https://lenovo-openai-demo.oss-cn-beijing.aliyuncs.com/v2.gif)

备注：使用功能命令之前，如果没有选取代码块将询问整个文件

### V1

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
