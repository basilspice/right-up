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
  const [allergies, setAllergies] = useState("");
  // const [restrictions, setRestrictions] = useState("");
  // const [theme, setTheme] = useState("");
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
        <title>Right-Up - AI Assisted Recipe Generator</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/icon.png" className={styles.icon} />
        <h2>Turn some things into something delicious</h2>
        <form onSubmit={onSubmit}>
          <label>Dish Style</label>
          <input
            type="text"
            name="dishstyle"
            placeholder="Dessert, Korean Dinner, Greek, Italian..."
            value={dishStyle}
            onChange={(e) => setDishStyle(e.target.value)}
          />

          <label>Complexity</label>
          <input
            type="text"
            name="complexity"
            placeholder="Michelin Star, Simple, Advanced..."
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          />

          {/* <label>Complexity</label>
          <select
            name="complexity"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          >
            <option value="Basic">Basic</option>
            <option value="Simple">Simple</option>
            <option value="Average Diffuclty">Average</option>
            <option value="Complex">Complex</option>
            <option value="Michelin Star level">Michelin Level Chef</option>
          </select> */}

          <label>Allergies</label>
          <input
            type="text"
            name="allergies"
            placeholder="Nothing, Tree Nuts, Shellfish, Dairy..."
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />

          <label>Ingredients</label>
          <input
            type="text"
            name="ingredients"
            placeholder="Panang Curry, 3 Slices of Bacon, 2 Duck Eggs"
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
            <div>
              <img src="/loading.gif" class={styles.loading} />
            </div>
              <h3>
                Your recipe is coming <text class={styles.brand}>Right-Up</text>
              </h3>
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
