import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

function onChange(value) {
  if (value == "yes") {
    setTheme(true);
  } else {
    setTheme(false);
  }
}

export default function Home() {
  const [dishStyle, setDishStyle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [complexity, setComplexity] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [allergies, setAllergies] = useState("");
  //const [theme, setTheme] = useState("");
  // const [ingredientQuantity, setIngredientQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dishStyle,
          ingredients,
          complexity,
          restrictions,
          allergies,
        }),
      });

      const data = await response.json();
      setResult(data.result.replaceAll("\n", "<br />"));
    } catch (e) {
      alert("Failed to generate recipe. Try later");
      console.log(data.result);
      console.log(onSubmit.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>Right-Up - Recipe Maker</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      {/* 
default state is Classic
if no is selected classic will be used
if yes is selected render the input  box for the theme to be inputed 
*/}
      <main className={styles.main}>
        <img src="/icon.png" className={styles.icon} />
        <h2>Turn some things into something delicious</h2>
        <form onSubmit={onSubmit}>
          <label>Dish Style</label>
          <input
            type="text"
            name="dishstyle"
            placeholder="e.g. Classic, Greek, Mexican, Korean..."
            value={dishStyle}
            onChange={(e) => setDishStyle(e.target.value)}
          />

          <label>Complexity</label>
          <select
            name="complexity"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          >
            <option value="Basic">Basic</option>
            <option value="Simple">Simple</option>
            <option value="Average Diffuclty">Average</option>
            <option value="Complex">Complex</option>
            {/* <option value="Hard">Hard</option> */}
            {/* <option value="Master level">Master Chef</option> */}
            <option value="Michelin Star level">Michelin Level Chef</option>
          </select>

          <label>Restrictions</label>
          <select
            name="restrictions"
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
          >
            <option value="">None</option>
            <option value="without a stove">No Stovetop</option>
            <option value="without a oven">No Oven</option>
            <option value="without a stove or oven">No Stovetop + Oven</option>
          </select>

          <label>Allergies</label>
          <input
            type="text"
            name="allergies"
            placeholder="e.g. Nothing, Tree Nuts, Shellfish"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />

          <label>Ingredients</label>
          <input
            type="text"
            name="ingredients"
            placeholder="e.g. 2 steaks, leftover meatloaf, 3 slices of bacon"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <input
            type="submit"
            value="Create a Recipe"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          />
        </form>
        {loading && (
          <div>
            <div>
              <h3>
                Your recipe is coming <text class={styles.brand}>Right-Up</text>
              </h3>
            </div>
            <div>
              <img src="/loading.gif" class={styles.loading} />
            </div>
          </div>
        )}
        {result && (
          <div
            className={styles.result}
            dangerouslySetInnerHTML={{ __html: result }}
          />
        )}
      </main>
    </div>
  );
}
