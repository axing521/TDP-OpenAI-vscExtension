/***
 * @creater:ACBash
 * @create_time:23-4-4 17:25:7
 * @last_modify:ACBash
 * @modify_time:23-4-4 17:25:12
 * @line_count:34
 **/

// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

/* const start = async function(){
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "Hello world"}],
    });
    console.log(completion.data.choices[0].message);
};

start(); */

module.exports = async function(params, context) {
  console.log('Received params:', params);

  const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "Hello world"}],
    });
  console.log(completion.data.choices[0].message);
  
  return {
    message: completion.data.choices[0].message,
  };
}