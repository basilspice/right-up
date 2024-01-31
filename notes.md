**MVP 2**

Switch the restrictions over to allergies

Reduce amount of complexity to make generating a "different recipe easier"

E.G. 

Basic and Simple are actually the same "complexity" but will use different key words for the search result. 

I would like a basic...

would be the first result. 

Try Again would use the same parameters given except use the word simple instead of basic;
I would like a simple.....
to potentially yield different results. Need to do some more testing on OpenAI

Try Again would need to have the logic handling of reseting state moved over to generate NEW recipe. 


Add Switcher for Desert or Savory

Add Logo in place of text

**MVP 3**

Generate Images based off of recipe return title

**MVP 4**

Try Again or Generate another recipe will now call a different AI api to generate the recipe. 


**Brainstorming**

Recipe My Fridge

ingredient ditcher

modal based inputs

takes how many ingredients you want to "get rid of"

can just generate static amount of modals to render

modal for each ingredient will prolly make adding them easier code wise

Back Menu<- ->Next

have a theme you can enter

Prompt just takes a number

certain amoumt of addiotnal things needed

quantity = amount of stuff
ingredients = food
theme = What kind of food (mexican, chinese, greek, american, southern, japanese, french, italian)
// number of ingredients = if 5 is selected 5 and less than 5 - saving for MVP2



"I have these ${quantity} ${ingredients} that i neeed to use up in a dish for cooking. I would like it to be based off of ${theme}. If possible  i would like to be able to keep it simple and have it be under ${numberIngredients} ingredients

// First Prompts

//I have 1 cup of bacon, 5 slices of french bread , 4 dill pickles,  2 cups of panang curry. I would like a greek themed recipe to make using those ingredients

// First Response

Preheat your oven to 375°F (190°C).
Slice the French bread into thin slices and place them on a baking sheet.
Brush each slice of bread with olive oil and toast them in the oven until they are golden brown.
In a bowl, mix the crumbled bacon, chopped dill pickles, and crumbled feta cheese.
Once the bread slices are toasted, spoon the bacon, pickle, and feta mixture onto each slice.
Drizzle a small amount of Panang curry over each bruschetta.
Place the bruschettas back in the oven for a few minutes until the toppings are warmed through.
Remove from the oven and serve immediately.
This recipe combines the crunchiness of French bread, the savory flavor of bacon, the tanginess of dill pickles, and the creaminess of feta cheese, all with a unique twist of a Panang curry drizzle for an extra kick. Enjoy your Greek-inspired creation!


MVP1

Intake ingredients

Intake quantity


Theme
Complexity
Ingredients

would you like to make a desert or savory

pull n/n1 title to generate image

savory=""
desert="desert"


on loading screen could be where the ad is played

put logo in in place of text

image ingredient puller

Could have an option for camping which would be wood fired or something. Maybe an entire different prompt for camping food