/* ==========================================================
   MODULE 5 · JavaScript
   ========================================================== */
(function () {
  const { P, H, UL, OL, ANALOGY, TIP, WARN, CODE, TRY, STEPS, RAW, Q } = window.ZTL;

  window.ZTL.addModule({
    id: 'm5',
    icon: '⚡',
    title: 'JavaScript: Adding Interactivity',
    summary: `Make your pages respond to people: variables, functions, decisions, events, and changing the page with the DOM.`,
    goal: `By the end of this module you'll be able to make buttons do things, react to what people type, and update the page on the fly.`,
    lessons: [
      {
        id: 'm5-l1',
        title: 'What JavaScript does',
        minutes: 7,
        intro: `The language that makes web pages *do* things.`,
        milestone: `You just ran your first JavaScript! ⚡`,
        blocks: [
          P(`HTML is the structure. CSS is the style. **JavaScript** (JS) is the **behaviour**: everything that happens when you click, type, scroll, or wait. Dropdown menus, image sliders, form checks, dark-mode toggles, and live search are all JavaScript.`),
          ANALOGY(`The house again`, `If HTML is the walls and CSS is the paint, JavaScript is the electricity: flip a switch (click a button) and the lights come on (something changes on the page).`),
          WARN(`Despite the name, **JavaScript has nothing to do with Java**. The name was a marketing decision in 1995. They're completely different languages.`, `Fun fact`),
          H(`Adding JavaScript to a page`),
          P(`Just like CSS, JavaScript is best kept in its own file, linked from your HTML:`),
          CODE('html', `
<head>
  ...
  <!-- defer = "wait until the HTML is loaded before running" -->
  <script src="js/script.js" defer></script>
</head>`, 'Linking a script'),
          P(`The {{defer}} attribute is important: it makes the browser finish building the page *before* running your script, so your code can find the elements it needs. (Another common approach is putting the {{<script>}} tag at the very end of the {{<body>}}.)`),
          H(`Your first lines of code`),
          CODE('js', `
// This is a comment. JavaScript ignores it.

console.log("Hello, world!");   // print a message to the console
console.log(7 * 6);             // do some maths: prints 42

alert("Welcome to my site!");   // a pop-up box (use sparingly!)`, 'script.js'),
          UL(
            `Each instruction is a **statement**. Statements usually end with a semicolon {{;}}.`,
            `{{//}} starts a **comment**: a note for humans.`,
            `JavaScript is **case-sensitive**: {{console.log}} works, {{Console.Log}} doesn't.`,
            `Text goes in quotes ({{"like this"}}). Numbers don't.`
          ),
          H(`The console is your best friend`),
          P(`{{console.log()}} prints anything to the console so you can see what your code is doing. When something goes wrong, the console also shows a red error message telling you what broke and on which line. Reading error messages is a core skill. They're clues, not failures!`),
          TRY({
            title: 'Run some JavaScript',
            focus: 'js',
            prompt: `Your output appears in the console under the preview. Change the messages, try some maths (like {{console.log(365 * 24)}}), then click the button. Try misspelling {{console}} to see what an error looks like.`,
            html: `
<h2>JavaScript playground ⚡</h2>
<button onclick="alert('You clicked me! 🎉')">Click me</button>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
button { font-size: 16px; padding: 10px 18px; border-radius: 10px; border: 0; background: #f59e0b; cursor: pointer; }`,
            js: `
console.log("Hello from JavaScript!");
console.log(7 * 6);
console.log("Hours in a year:", 365 * 24);`,
          }),
        ],
        quiz: [
          Q(`What is JavaScript mainly responsible for on a web page?`,
            ['Structure', 'Style', 'Behaviour and interactivity', 'Hosting'], 2,
            `HTML = structure, CSS = style, JavaScript = behaviour.`),
          Q(`What does the {{defer}} attribute on a {{<script>}} tag do?`,
            ['Deletes the script', 'Runs the script after the HTML has loaded', 'Makes the script run twice', 'Hides errors'], 1,
            `{{defer}} waits until the page is built, so your code can find the elements it needs.`),
          Q(`Where do you see the output of {{console.log()}}?`,
            ['On the page itself', 'In the browser’s DevTools console', 'In the address bar', 'In an email'], 1,
            `{{console.log()}} writes to the console (DevTools → Console). It's invisible to normal visitors.`),
        ],
      },

      {
        id: 'm5-l2',
        title: 'Variables and data types',
        minutes: 9,
        intro: `Storing information so your code can remember and use it.`,
        blocks: [
          P(`A **variable** is a named container for a value. You create it once, then use the name wherever you need the value.`),
          ANALOGY(`Labelled jars`, `Picture a kitchen shelf of jars with labels: “sugar”, “flour”, “userName”. The label is the variable name; what's inside the jar is the value. You can look inside, use it, or (with {{let}}) swap the contents.`),
          CODE('js', `
const siteName = "Alex's Portfolio";   // const: this will never change
let visits = 0;                        // let: this CAN change later

visits = visits + 1;    // now 1
visits += 1;            // shortcut: now 2

console.log(siteName, visits);`, 'Creating variables'),
          UL(
            `Use {{const}} by default, for values that won't be reassigned.`,
            `Use {{let}} when the value needs to change (like a counter).`,
            `You'll see {{var}} in old tutorials. It's the old way; avoid it.`,
            `Names use **camelCase**: {{firstName}}, {{totalPrice}}, {{isLoggedIn}}.`
          ),
          H(`The main data types`),
          CODE('js', `
const name = "Sam";               // String: text, in quotes
const age = 29;                   // Number: no quotes
const price = 9.99;               // Numbers can have decimals
const isMember = true;            // Boolean: true or false
let nickname = null;              // null: "intentionally empty"

const hobbies = ["hiking", "coffee", "code"];   // Array: an ordered list
console.log(hobbies[0]);          // "hiking"  (counting starts at 0!)
console.log(hobbies.length);      // 3

const user = {                    // Object: a group of named values
  name: "Sam",
  age: 29,
  city: "Lisbon",
};
console.log(user.city);           // "Lisbon"`, 'Data types'),
          WARN(`Arrays start counting at **0**, not 1. The first item is {{hobbies[0]}}. This trips up everyone at first!`, `Zero-based counting`),
          H(`Working with strings`),
          P(`Template literals use backticks and let you drop variables right into text with {{\${ }}}:`),
          CODE('js', `
const firstName = "Sam";
const city = "Lisbon";

// Old way: joining with +
const a = "Hi, I'm " + firstName + " from " + city + ".";

// Template literal (backticks): much easier to read
const b = \`Hi, I'm \${firstName} from \${city}.\`;

console.log(b.toUpperCase());   // "HI, I'M SAM FROM LISBON."
console.log(b.length);          // number of characters`, 'Strings'),
          TIP(`Not sure what type something is? {{console.log(typeof age)}} prints {{"number"}}.`),
          TRY({
            title: 'Build a profile with variables',
            focus: 'js',
            prompt: `Change the values in the {{me}} object and add another hobby to the array. The page is built from your variables. Then try {{console.log(me.hobbies.length)}}.`,
            html: `
<div id="profile"></div>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
#profile { background: #eef2ff; padding: 16px 20px; border-radius: 14px; }
.tag { display: inline-block; background: #4f46e5; color: white; padding: 2px 10px; border-radius: 999px; margin: 2px; font-size: 14px; }`,
            js: `
const me = {
  name: "Sam",
  age: 29,
  city: "Lisbon",
  hobbies: ["hiking", "coffee", "coding"],
};

let greeting = \`Hi, I'm \${me.name}! I'm \${me.age} and I live in \${me.city}.\`;

console.log(greeting);
console.log("Number of hobbies:", me.hobbies.length);

// Don't worry about this part yet. It puts your data on the page (lesson 5.6!)
document.querySelector("#profile").innerHTML =
  "<h2>" + greeting + "</h2>" +
  me.hobbies.map(h => '<span class="tag">' + h + "</span>").join(" ");`,
          }),
        ],
        quiz: [
          Q(`Which keyword should you use for a value that **will change**, like a score?`,
            ['{{const}}', '{{let}}', '{{fixed}}', '{{change}}'], 1,
            `{{let}} can be reassigned. {{const}} can't.`),
          Q(`Given {{const colors = ["red", "green", "blue"];}}, what is {{colors[1]}}?`,
            ['"red"', '"green"', '"blue"', 'An error'], 1,
            `Arrays start at 0: {{[0]}} is "red", {{[1]}} is "green".`),
          Q(`What type of value is {{true}}?`,
            ['String', 'Number', 'Boolean', 'Array'], 2,
            `Booleans are either {{true}} or {{false}}. Note: {{"true"}} in quotes would be a string!`),
        ],
      },

      {
        id: 'm5-l3',
        title: 'Functions',
        minutes: 8,
        intro: `Reusable recipes: write the steps once, use them anywhere.`,
        blocks: [
          P(`A **function** is a named block of code that does a job. You **define** it once, then **call** it (run it) whenever you need it.`),
          ANALOGY(`A recipe`, `A function is like a recipe card. The **parameters** are the ingredients you hand it. The steps inside are the instructions. The **return value** is the dish that comes out. Write the recipe once, cook it as many times as you like.`),
          CODE('js', `
// Define the function
function greet(name) {
  return "Hello, " + name + "!";
}

// Call it (as many times as you like)
console.log(greet("Sam"));    // "Hello, Sam!"
console.log(greet("Priya"));  // "Hello, Priya!"`, 'A function'),
          UL(
            `{{name}} is a **parameter**: a placeholder for the value you pass in.`,
            `{{"Sam"}} is an **argument**: the actual value you pass when you call it.`,
            `{{return}} sends a value back out of the function. Code after {{return}} doesn't run.`
          ),
          H(`Multiple parameters`),
          CODE('js', `
function calculateTotal(price, quantity) {
  const total = price * quantity;
  return total;
}

const cost = calculateTotal(4.5, 3);
console.log(cost);   // 13.5`, 'Two parameters'),
          H(`Arrow functions`),
          P(`You'll often see this shorter way of writing functions, especially for small ones:`),
          CODE('js', `
// The same function, written as an arrow function
const greet = (name) => {
  return "Hello, " + name + "!";
};

// Even shorter: a one-liner returns automatically
const double = (n) => n * 2;
console.log(double(21));   // 42`, 'Arrow functions'),
          TIP(`Good function names are verbs that say what they do: {{showMenu()}}, {{calculateTotal()}}, {{validateEmail()}}. Keep each function focused on **one job**.`),
          TRY({
            title: 'A tip calculator',
            focus: 'js',
            prompt: `Read through {{calculateTip}}, then change the bill amount or tip percentage in the calls at the bottom. Challenge: write a {{splitBill(total, people)}} function that divides the bill between friends.`,
            html: `
<h2>🧾 Tip calculator</h2>
<p>Results appear in the console below.</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 0 16px; }`,
            js: `
function calculateTip(bill, percent) {
  const tip = bill * (percent / 100);
  return tip;
}

function formatMoney(amount) {
  return "$" + amount.toFixed(2);   // always 2 decimal places
}

const bill = 64;
const tip = calculateTip(bill, 18);

console.log("Tip:", formatMoney(tip));
console.log("Total:", formatMoney(bill + tip));

// Challenge: write splitBill(total, people) below and log the result
`,
          }),
        ],
        quiz: [
          Q(`In {{function add(a, b) { return a + b; }}}, what are {{a}} and {{b}}?`,
            ['Arguments', 'Parameters', 'Return values', 'Variables named by the browser'], 1,
            `They're parameters: placeholders. The values you pass when calling, like {{add(2, 3)}}, are arguments.`),
          Q(`What does {{return}} do?`,
            ['Prints to the console', 'Sends a value back from the function', 'Restarts the function', 'Deletes the function'], 1,
            `{{return}} hands a value back to wherever the function was called.`),
          Q(`What does {{const triple = (n) => n * 3;}} return for {{triple(5)}}?`,
            ['8', '15', '35', 'Nothing'], 1,
            `A one-line arrow function returns its expression automatically: 5 × 3 = 15.`),
        ],
      },

      {
        id: 'm5-l4',
        title: 'Decisions and loops',
        minutes: 9,
        intro: `Making choices with if/else, and repeating work with loops.`,
        blocks: [
          H(`if / else: making decisions`),
          P(`Code often needs to do different things depending on the situation. {{if}} runs code only when a condition is {{true}}:`),
          CODE('js', `
const hour = new Date().getHours();   // 0–23, from your computer's clock

if (hour < 12) {
  console.log("Good morning! ☀️");
} else if (hour < 18) {
  console.log("Good afternoon! 🌤️");
} else {
  console.log("Good evening! 🌙");
}`, 'if / else if / else'),
          H(`Comparisons`),
          CODE('js', `
5 === 5      // true   equal (use THREE equals signs)
5 !== 3      // true   not equal
7 > 3        // true   greater than
2 >= 2       // true   greater than or equal
"cat" === "Cat"   // false: comparisons are case-sensitive`, 'Comparison operators'),
          WARN(`One {{=}} **assigns** a value ({{let x = 5}}). Three {{===}} **compares** values ({{x === 5}}). Mixing them up is a classic bug. (There's also {{==}}, but it has confusing rules, so stick with {{===}}.)`, `= vs ===`),
          H(`Combining conditions`),
          CODE('js', `
const age = 20;
const hasTicket = true;

if (age >= 18 && hasTicket) { console.log("Come in!"); }   // && = AND (both true)
if (age < 13 || age > 65) { console.log("Discount!"); }    // || = OR (either true)
if (!hasTicket) { console.log("Buy a ticket first."); }    // ! = NOT (flips it)`, 'AND, OR, NOT'),
          H(`Loops: doing things over and over`),
          CODE('js', `
// A classic for loop: count from 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log("Lap", i);
}

// Loop over every item in an array (the friendliest way)
const fruits = ["🍎 apple", "🍌 banana", "🍒 cherry"];
for (const fruit of fruits) {
  console.log("I like", fruit);
}

// Arrays have a built-in loop too
fruits.forEach((fruit, index) => {
  console.log(index + 1, fruit);
});`, 'Loops'),
          P(`The {{for}} loop has three parts: **start** ({{let i = 1}}), **keep going while** ({{i <= 5}}), and **after each lap** ({{i++}}, which adds 1).`),
          TIP(`Loops are how you turn data into page content: loop over an array of projects and create a card for each one. You'll do exactly that in the next lessons.`),
          TRY({
            title: 'Greeting and a shopping list',
            focus: 'js',
            prompt: `The greeting changes depending on the time on your computer. Change {{hour}} to a fixed number (like {{const hour = 21;}}) to test each branch. Then add items to the shopping list array.`,
            html: `
<h2 id="greeting"></h2>
<h3>Shopping list</h3>
<ul id="list"></ul>`,
            css: `body { font-family: system-ui, sans-serif; padding: 0 16px; } li { margin: 4px 0; }`,
            js: `
const hour = new Date().getHours();
let message;

if (hour < 12) {
  message = "Good morning! ☀️";
} else if (hour < 18) {
  message = "Good afternoon! 🌤️";
} else {
  message = "Good evening! 🌙";
}
document.querySelector("#greeting").textContent = message;

const shopping = ["Milk", "Bread", "Avocados"];

for (const item of shopping) {
  console.log("Adding", item);
  document.querySelector("#list").innerHTML += "<li>" + item + "</li>";
}

if (shopping.length > 5) {
  console.log("That's a big shop! 🛒");
}`,
          }),
        ],
        quiz: [
          Q(`Which operator checks whether two values are **equal**?`,
            ['{{=}}', '{{===}}', '{{=>}}', '{{!=}}'], 1,
            `{{===}} compares. A single {{=}} assigns a value.`),
          Q(`When does {{if (a > 10 && b > 10)}} run its code?`,
            ['When either a or b is over 10', 'Only when both a and b are over 10', 'Never', 'Always'], 1,
            `{{&&}} means AND: both conditions must be true.`),
          Q(`How many times does {{for (let i = 0; i < 3; i++)}} loop?`,
            ['2', '3', '4', 'Forever'], 1,
            `i goes 0, 1, 2 (three laps), then stops because 3 is not less than 3.`),
        ],
      },

      {
        id: 'm5-l5',
        title: 'Events',
        minutes: 8,
        intro: `Reacting when people click, type, scroll, or submit.`,
        blocks: [
          P(`An **event** is something that happens on the page: a click, a key press, a form being submitted, the page finishing loading. JavaScript can **listen** for events and run a function when they happen.`),
          ANALOGY(`A doorbell`, `You don't stand at the door all day waiting for visitors. You install a doorbell, and when it rings, you respond. An **event listener** is a doorbell: you attach it to an element, and your function runs whenever that event “rings”.`),
          CODE('js', `
const button = document.querySelector("#like");

button.addEventListener("click", function () {
  console.log("Thanks for the like! ❤️");
});`, 'Listening for a click'),
          P(`{{addEventListener}} takes two things: the **name of the event** (in quotes) and the **function to run** when it happens.`),
          H(`Common events`),
          UL(
            `{{click}}: an element is clicked or tapped.`,
            `{{input}}: the value of a text box changes (every keystroke).`,
            `{{submit}}: a form is submitted.`,
            `{{keydown}}: a key is pressed.`,
            `{{mouseenter}} / {{mouseleave}}: the pointer moves over or off an element.`,
            `{{scroll}}: the page is scrolled.`
          ),
          H(`The event object`),
          P(`Your function automatically receives an **event object** with details about what happened. A really common use: stopping a form from reloading the page so you can handle it with JavaScript.`),
          CODE('js', `
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();   // stop the page from reloading
  console.log("Form submitted!");
});

const search = document.querySelector("#search");
search.addEventListener("input", (event) => {
  console.log("You typed:", event.target.value);   // what's in the box right now
});`, 'Using the event object'),
          TIP(`Prefer {{addEventListener}} in your JavaScript file over {{onclick="..."}} in your HTML. It keeps behaviour separate from structure, just like CSS lives in its own file.`),
          TRY({
            title: 'A like button and live typing',
            focus: 'js',
            prompt: `Click the heart and type in the box. Then add a third listener: when the mouse enters the {{.box}}, log “Hello mouse!”. (Hint: the event is {{mouseenter}}.)`,
            html: `
<button id="like">🤍 Like</button>
<span id="count">0 likes</span>

<p><label>Type your name: <input id="name"></label></p>
<p id="hello">Hello, stranger!</p>

<div class="box">Hover over me</div>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
button { font-size: 18px; padding: 8px 16px; border-radius: 999px; border: 1.5px solid #e11d48; background: white; cursor: pointer; }
input { padding: 6px 10px; font-size: 16px; }
.box { margin-top: 12px; padding: 20px; background: #ecfeff; border: 2px dashed #0891b2; border-radius: 12px; text-align: center; }`,
            js: `
let likes = 0;
const likeButton = document.querySelector("#like");
const count = document.querySelector("#count");

likeButton.addEventListener("click", () => {
  likes = likes + 1;
  likeButton.textContent = "❤️ Liked";
  count.textContent = likes + (likes === 1 ? " like" : " likes");
  console.log("Likes:", likes);
});

const nameInput = document.querySelector("#name");
nameInput.addEventListener("input", (event) => {
  const name = event.target.value;
  document.querySelector("#hello").textContent = "Hello, " + (name || "stranger") + "!";
});

// Your turn: add a mouseenter listener to .box
`,
          }),
        ],
        quiz: [
          Q(`Which method attaches a function to an event?`,
            ['{{listen()}}', '{{addEventListener()}}', '{{onEvent()}}', '{{attach()}}'], 1,
            `{{element.addEventListener("click", myFunction)}} is the standard way.`),
          Q(`Which event fires every time the text in an input box changes?`,
            ['{{click}}', '{{submit}}', '{{input}}', '{{load}}'], 2,
            `{{input}} fires on every change: perfect for live search or character counters.`),
          Q(`What does {{event.preventDefault()}} do in a form's submit listener?`,
            ['Deletes the form', 'Stops the browser’s default action (reloading the page)', 'Clears every field', 'Sends the form twice'], 1,
            `It stops the default behaviour so JavaScript can handle the form itself.`),
        ],
      },

      {
        id: 'm5-l6',
        title: 'The DOM: changing the page',
        minutes: 10,
        intro: `Finding elements and changing their text, styles, and classes with JavaScript.`,
        blocks: [
          P(`When the browser reads your HTML, it builds a live model of the page in memory called the **DOM** (Document Object Model). JavaScript can read and change the DOM, and the page updates instantly.`),
          ANALOGY(`A family tree`, `The DOM is shaped like a family tree: {{<html>}} is the ancestor, {{<head>}} and {{<body>}} are its children, and every element inside is a child of its parent. JavaScript can walk this tree, find any member, and change them.`),
          H(`Step 1: find the element`),
          CODE('js', `
// querySelector uses CSS selectors, so you already know how!
const title = document.querySelector("h1");          // first <h1>
const menu = document.querySelector("#menu");        // id="menu"
const firstCard = document.querySelector(".card");   // first class="card"

// querySelectorAll finds ALL matches
const cards = document.querySelectorAll(".card");
cards.forEach((card) => console.log(card));`, 'Selecting elements'),
          H(`Step 2: change it`),
          CODE('js', `
title.textContent = "Welcome back!";      // change the text

title.style.color = "tomato";             // change a style (camelCase names!)
title.style.fontSize = "48px";

menu.classList.add("open");               // add a class
menu.classList.remove("open");            // remove a class
menu.classList.toggle("open");            // add if missing, remove if present

const img = document.querySelector("img");
img.src = "images/new-photo.jpg";         // change an attribute
img.alt = "A new photo";`, 'Changing elements'),
          TIP(`**Toggle classes instead of setting lots of styles.** Write the look in CSS ({{.menu.open { display: block; } }}), then let JavaScript just add or remove the class. Your styles stay in your CSS where they belong.`),
          H(`Step 3 (sometimes): create new elements`),
          CODE('js', `
const list = document.querySelector("#todo-list");

const item = document.createElement("li");   // make a new <li>
item.textContent = "Learn the DOM";          // give it text
list.appendChild(item);                      // add it to the page

item.remove();                               // ...and remove it again`, 'Creating elements'),
          WARN(`{{textContent}} treats everything as plain text, which is safe. {{innerHTML}} reads text as HTML, which is handy but risky with text typed by visitors (someone could inject code). Prefer {{textContent}} for user input.`, `textContent vs innerHTML`),
          TRY({
            title: 'Control the page',
            focus: 'js',
            prompt: `Click each button to see the DOM change. Then add a fourth button that changes the heading's text to your name.`,
            html: `
<h1 id="title">Hello, DOM!</h1>
<div class="buttons">
  <button id="color">🎨 Random colour</button>
  <button id="toggle">🌗 Toggle highlight</button>
  <button id="add">➕ Add item</button>
</div>
<ul id="list"><li>First item</li></ul>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; transition: background .3s; }
.buttons { display: flex; flex-wrap: wrap; gap: 8px; }
button { padding: 8px 14px; border-radius: 10px; border: 1px solid #ccc; background: white; cursor: pointer; font-size: 15px; }
.highlight { background: #fef9c3; }
.highlight h1 { text-decoration: underline wavy #f59e0b; }`,
            js: `
const title = document.querySelector("#title");
const list = document.querySelector("#list");

document.querySelector("#color").addEventListener("click", () => {
  const hue = Math.floor(Math.random() * 360);
  title.style.color = "hsl(" + hue + ", 70%, 45%)";
});

document.querySelector("#toggle").addEventListener("click", () => {
  document.body.classList.toggle("highlight");
});

let count = 1;
document.querySelector("#add").addEventListener("click", () => {
  count++;
  const li = document.createElement("li");
  li.textContent = "Item number " + count;
  list.appendChild(li);
});`,
          }),
        ],
        quiz: [
          Q(`What is the DOM?`,
            ['A JavaScript library you install', 'The browser’s live, tree-shaped model of the page that JavaScript can change', 'A type of CSS', 'A server'], 1,
            `The DOM is built from your HTML. Change the DOM and the page updates.`),
          Q(`Which line finds the element with {{id="menu"}}?`,
            ['{{document.querySelector("menu")}}', '{{document.querySelector("#menu")}}', '{{document.querySelector(".menu")}}', '{{document.find(menu)}}'], 1,
            `{{querySelector}} uses CSS selectors, so ids start with {{#}}.`),
          Q(`What does {{element.classList.toggle("open")}} do?`,
            ['Always adds the class', 'Always removes it', 'Adds it if missing, removes it if present', 'Deletes the element'], 2,
            `Toggle flips it on or off, which is perfect for menus and dark mode.`),
        ],
      },

      {
        id: 'm5-l7',
        title: 'Mini project: interactive widgets',
        minutes: 12,
        intro: `Combine everything into three real features you'll want on your site.`,
        milestone: `You built real interactive features with JavaScript! 🏆`,
        blocks: [
          P(`Time to put variables, functions, conditions, events, and the DOM together. Here are three widgets that appear on websites everywhere. Each one follows the same recipe:`),
          STEPS(
            [`Find the elements`, `{{document.querySelector(...)}}`],
            [`Listen for an event`, `{{addEventListener("click", ...)}}`],
            [`Change something`, `Toggle a class, change text, or add an element.`]
          ),
          H(`Widget 1: dark-mode toggle`),
          CODE('js', `
const toggle = document.querySelector("#theme-toggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
});`, 'Dark mode'),
          P(`The {{? :}} is a shortcut for if/else called the **ternary operator**: {{condition ? valueIfTrue : valueIfFalse}}.`),
          H(`Widget 2: “show more” button`),
          CODE('js', `
const more = document.querySelector("#more");
const extra = document.querySelector("#extra-text");

more.addEventListener("click", () => {
  extra.hidden = !extra.hidden;   // flip between hidden and visible
  more.textContent = extra.hidden ? "Show more" : "Show less";
});`, 'Show more / less'),
          H(`Widget 3: a to-do list`),
          CODE('js', `
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") return;          // ignore empty items

  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", () => li.classList.toggle("done"));
  list.appendChild(li);

  input.value = "";                 // clear the box
});`, 'To-do list'),
          TIP(`Want things to survive a page refresh? Browsers can remember small bits of data with {{localStorage.setItem("theme", "dark")}} and {{localStorage.getItem("theme")}}. That's exactly how this course remembers your progress!`),
          TRY({
            title: 'All three widgets together',
            focus: 'js',
            prompt: `Try all three widgets. Then pick a challenge: (1) show how many to-dos are left, (2) add a “Clear completed” button, or (3) make the dark theme your own colours in the CSS tab.`,
            html: `
<header>
  <h1>My widgets</h1>
  <button id="theme-toggle">🌙 Dark mode</button>
</header>

<section>
  <h2>About me</h2>
  <p>I'm learning JavaScript and it's going great.</p>
  <p id="extra-text" hidden>Honestly, I didn't think I'd get this far. But here I am, building interactive widgets! 🎉</p>
  <button id="more">Show more</button>
</section>

<section>
  <h2>To-do list</h2>
  <form id="todo-form">
    <input id="todo-input" placeholder="Something to do…" aria-label="New to-do">
    <button>Add</button>
  </form>
  <ul id="todo-list"></ul>
  <p class="hint">Click an item to mark it done.</p>
</section>`,
            css: `
body {
  font-family: system-ui, sans-serif; padding: 0 16px 16px; margin: 0;
  background: #ffffff; color: #1f2937; transition: background .3s, color .3s;
}
body.dark { background: #111827; color: #f3f4f6; }

header { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
button { padding: 8px 14px; border-radius: 10px; border: 0; background: #6366f1; color: white; cursor: pointer; font-size: 15px; }
section { margin-top: 12px; }
input { padding: 8px 10px; font-size: 15px; border-radius: 8px; border: 1px solid #cbd5e1; }

#todo-list li { cursor: pointer; padding: 4px 0; }
#todo-list li.done { text-decoration: line-through; opacity: .5; }
.hint { font-size: 13px; opacity: .7; }`,
            js: `
// 1. Dark mode
const toggle = document.querySelector("#theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
});

// 2. Show more
const more = document.querySelector("#more");
const extra = document.querySelector("#extra-text");
more.addEventListener("click", () => {
  extra.hidden = !extra.hidden;
  more.textContent = extra.hidden ? "Show more" : "Show less";
});

// 3. To-do list
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", () => li.classList.toggle("done"));
  list.appendChild(li);
  input.value = "";
  console.log("Added:", text);
});`,
          }),
        ],
        quiz: [
          Q(`What's the general recipe behind most interactive widgets?`,
            ['Write more HTML', 'Find elements → listen for an event → change something', 'Reload the page', 'Add more CSS'], 1,
            `Select, listen, change: that pattern covers a huge amount of everyday JavaScript.`),
          Q(`What does {{isDark ? "☀️" : "🌙"}} evaluate to when {{isDark}} is {{false}}?`,
            ['"☀️"', '"🌙"', 'true', 'An error'], 1,
            `The ternary returns the value after {{:}} when the condition is false.`),
          Q(`Why call {{input.value.trim()}} before adding a to-do?`,
            ['To make it uppercase', 'To remove extra spaces from the start and end', 'To delete the input', 'To submit the form'], 1,
            `{{trim()}} removes surrounding spaces, so a box full of spaces counts as empty.`),
        ],
      },
    ],
    quiz: [
      Q(`Which keyword creates a variable that can't be reassigned?`,
        ['{{let}}', '{{const}}', '{{var}}', '{{static}}'], 1,
        `{{const}} values can't be reassigned.`),
      Q(`What does this print? {{const nums = [10, 20, 30]; console.log(nums[2]);}}`,
        ['10', '20', '30', 'undefined'], 2,
        `Index 2 is the third item, 30. Arrays start counting at 0.`),
      Q(`Which line runs {{showMenu}} when a button is clicked?`,
        ['{{button.addEventListener("click", showMenu);}}', '{{button.click = showMenu();}}', '{{showMenu.addEventListener(button);}}', '{{button.on(showMenu)}}'], 0,
        `Pass the event name and the function (without calling it).`),
      Q(`Which is the safest way to put text typed by a visitor onto the page?`,
        ['{{innerHTML}}', '{{textContent}}', '{{document.write}}', '{{eval}}'], 1,
        `{{textContent}} treats input as plain text, so nobody can inject HTML or scripts.`),
      Q(`What's the best way to change how something looks from JavaScript?`,
        ['Set ten different {{style}} properties', 'Toggle a class and let CSS handle the look', 'Rewrite the whole page', 'Use an image'], 1,
        `Keep the look in CSS; let JavaScript switch classes on and off.`),
    ],
    exercise: {
      title: 'Bring your page to life',
      minutes: 40,
      blocks: [
        P(`Add real interactivity to your “About Me” page. The workspace has a styled page with empty slots for your JavaScript. When you're done, copy the JS into {{js/script.js}} in your project and link it with {{<script src="js/script.js" defer></script>}}.`),
        TIP(`Build one feature at a time, and check the console after each step. Small steps make bugs easy to find.`),
      ],
      goals: [
        `A greeting that changes depending on the time of day`,
        `A dark-mode toggle button that switches a class on {{<body>}}`,
        `A “Show more” button that reveals extra text about you`,
        `A contact form that checks the message isn't empty before “sending”`,
        `Show a friendly thank-you message after the form is submitted`,
        `Bonus: remember the chosen theme with {{localStorage}}`,
      ],
      starter: {
        focus: 'js',
        prompt: `Write your code in the JavaScript tab, following the TODOs.`,
        html: `
<header>
  <h1 id="greeting">Hello!</h1>
  <button id="theme-toggle">🌙 Dark mode</button>
</header>

<main>
  <section class="card">
    <h2>About me</h2>
    <p>I'm Alex, and I'm learning to build websites.</p>
    <p id="more-text" hidden>Fun fact: I wrote this page by hand, line by line. 💪</p>
    <button id="more-btn">Show more</button>
  </section>

  <section class="card">
    <h2>Contact</h2>
    <form id="contact-form">
      <label for="message">Message</label>
      <textarea id="message" rows="3"></textarea>
      <button type="submit">Send</button>
      <p id="form-status" role="status"></p>
    </form>
  </section>
</main>`,
        css: `
* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #1e293b; transition: background .3s, color .3s; }
body.dark { background: #0f172a; color: #e2e8f0; }
body.dark .card { background: #1e293b; }
header { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.card { background: white; padding: 16px 20px; border-radius: 14px; margin-top: 14px; box-shadow: 0 2px 10px rgba(0,0,0,.06); }
button { padding: 8px 14px; border-radius: 10px; border: 0; background: #6366f1; color: white; cursor: pointer; }
textarea { width: 100%; padding: 8px; border-radius: 8px; border: 1px solid #cbd5e1; font: inherit; margin: 6px 0; }
.error { color: #dc2626; }
.success { color: #16a34a; }`,
        js: `
// TODO 1: Greeting
// Get the hour with new Date().getHours(), then set #greeting's text
// to "Good morning", "Good afternoon" or "Good evening".


// TODO 2: Dark mode
// When #theme-toggle is clicked, toggle the "dark" class on document.body
// and update the button's text.


// TODO 3: Show more
// When #more-btn is clicked, flip #more-text's hidden property
// and change the button text.


// TODO 4: Form check
// On submit: preventDefault(), then if #message is empty show an error
// in #form-status (add class "error"), otherwise show a thank-you
// (class "success") and clear the textarea.
`,
      },
    },
  });
})();
