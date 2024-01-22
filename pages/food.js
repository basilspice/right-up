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
        }),
      });

      const data = await response.json();
      setResult(data.result.replaceAll("\n", "<br />"));
    } catch (e) {
      alert("Failed to generate gift ideas. Try later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI</title>
        <link rel="icon" href="/loading.gif" />
      </Head>
      {/* 
default state is Classic
if no is selected classic will be used
if yes is selected render the input  box for the theme to be inputed 
*/}
      <main className={styles.main}>
        <h3>Right-UP</h3>
        <form onSubmit={onSubmit}>
          <label>Dish Theme</label>
          <input
            type="text"
            name="dishstyle"
            placeholder="Classic"
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
            <option value="Hard">Hard</option>
            <option value="Master level">Master Chef</option>
            <option value="Michelin Star level">Michelin Level Chef</option>
          </select>

          <label>Restrictions</label>
          <select
            name="restrictions"
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
          >
            <option value="with no restrictions">None</option>
            <option value="without a stove">No Stovetop</option>
            <option value="without a oven">No Oven</option>
            <option value="without a stove or oven">No Stovetop + Oven</option>
          </select>

          <label>Ingredients</label>
          <input
            type="text"
            name="ingredients"
            placeholder="Enter the ingredients"
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
          <div
            class="modal fade"
            id="loadingModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title" id="loadingTitle">
                    Your leftover recipe is coming right-up
                  </h3>
                </div>
                <div class="modal-body">
                  <img src="/loading.gif" class={styles.loading} />
                </div>
                <div class="modal-footer"></div>
              </div>
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
