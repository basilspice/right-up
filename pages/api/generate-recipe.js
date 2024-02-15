import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { dishStyle, ingredients, complexity, allergies } =
    req.body;
  const prompt = generatePrompt(
    dishStyle,
    ingredients,
    complexity,
    allergies
  );

  console.log(prompt);
  

  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 4024,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(
  dishStyle,
  ingredients,
  complexity,
  allergies
) {
  return `I have ${ingredients} and would like a ${complexity} ${dishStyle} themed recipe to make using those ingredients with an allergy to ${allergies}`;
}
