/***
 * @creater:ACBash
 * @create_time:23-4-4 15:27:49
 * @last_modify:ACBash
 * @modify_time:23-4-8 14:9:7
 * @line_count:124
 **/

/* const axios = require('axios');     //网络请求调用openAI的API
const openai = require('openai');   //引入openAI的SDK

// var apiKey = 'YOUR_API_KEY_HERE';    openAI_APIkey

// let chatGPT = null;

const configuration = new openai.Configuration({ apiKey: apiKey });
const client = new openai.OpenAIApi(configuration);

const result = async (content) => {
    return await client.createChatCompletion({
        // 使用当前 OpenAI 开放的最新 4 模型，如果后续 新模型 发布，则修改此处参数即可
        model: 'gpt-4',
        messages: [{ role: 'user', content }]
    });
};

console.log(result("hello!")); */

/* chatGPT = async (content) => {
    return await client.createChatCompletion({
        // 使用当前 OpenAI 开放的最新 4 模型，如果后续 新模型 发布，则修改此处参数即可
        model: 'gpt-4',
        messages: [{ role: 'user', content }]
    });
}; */

//用户输入
// let userInput = "hello!";

//将用户具体消息发送给 ChatGPT
// const result = chatGPT(userInput);

//打印ChatGPT的反馈
// console.log(result);

/* function callApi(query, callback) {
    var options = {
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        method: 'POST',
        body: JSON.stringify({
            "model": "gpt-4",
            "message": [{"role": "user", "content": query}]
        }),
        json: {
            'prompt': query,
            'max_tokens': 100,
            'temperature': 0.5,
            'top_p': 1,
            'frequency_penalty': 0,
            'presence_penalty': 0
        }
    };
    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(body);
        } else {
            console.log('Error contacting OpenAI: ' + error);
        }
    });
}

callApi("hello!", console.log); */

/* module.exports = {
    callApi: callApi
}; */

/* const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

const start = async function(){
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "Hello world"}],
    });
    console.log(completion.data.choices[0].message);
};

start(); */

const axios = require('axios');
const host = "微服务接口地址";
const service = axios.create({
    baseURL: host,
    timeout: '60000'
});

const request = (options) => {
    //以post方式发起get请求
    if(options.method == 'get'){
        options.params = options.data;
    }
    return service(options);
};
//vue框架和react有什么区别？
const chat = async (data) => {
    const res = await request({
        method: 'get',
        url: '/hello',
        data
    });
    /* console.log(res); */
    return res;
};

let userInput = {
    "content": "hello!",
};

/* chat(userInput); */

module.exports = {
    chat: chat
};