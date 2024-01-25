import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { dishStyle, ingredients, complexity, restrictions } = req.body;
  const prompt = generatePrompt(
    dishStyle,
    ingredients,
    complexity,
    restrictions
  );

  console.log(prompt);

  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 2024,
  });
  res.status(500).json({ result: completion.data.choices[0].text });
}

function generatePrompt(dishStyle, ingredients, complexity, restrictions) {
  return `I have ${ingredients} and would like a ${complexity} ${dishStyle} themed recipe to make using those ingredients ${restrictions}`;
}
