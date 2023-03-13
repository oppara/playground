import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function ask(content: string, model = 'gpt-3.5-turbo-0301') {
  const res = await openai.createChatCompletion({
    model: model,
    messages: [{ role: 'user', content: content }],
  });

  const answer = res.data.choices[0].message?.content;
  console.log(answer);
}

const q = 'あなたおお名前なんて〜の？';
ask(q);
