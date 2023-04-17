/***
 * @creater:ACBash
 * @create_time:23-4-11 14:37:12
 * @last_modify:ACBash
 * @modify_time:23-4-11 14:53:54
 * @line_count:20
 **/

//配置chat请求
const { Configuration, OpenAIApi } = require('openai');

module.exports = async function(APIKey, userQuery) {
    const configuration = new Configuration({
        apiKey: APIKey,
    });
    
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: userQuery}],
    });
    // console.log(completion.data.choices[0].message);
    
    return {
        message: completion.data.choices[0].message,
    };
}