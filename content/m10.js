/* ==========================================================
   MODULE 10 · Next Steps
   ========================================================== */
(function () {
  const { P, H, UL, OL, ANALOGY, TIP, WARN, CODE, TRY, STEPS, RAW, Q } = window.ZTL;

  window.ZTL.addModule({
    id: 'm10',
    icon: '🧭',
    title: 'Next Steps',
    summary: `Where to go from here: frameworks like React, backends and APIs, databases, the modern developer toolbox, and a learning roadmap.`,
    goal: `By the end of this module you'll understand the bigger picture of web development and have a clear plan for what to learn next.`,
    lessons: [
      {
        id: 'm10-l1',
        title: 'What frameworks are (and React)',
        minutes: 10,
        intro: `Why big apps use frameworks, and a first taste of React.`,
        blocks: [
          P(`Plain HTML, CSS, and JavaScript (sometimes called “vanilla” JS) can build anything. But as apps grow (think Gmail, Spotify, or Instagram), keeping track of what's on the screen and what needs updating gets hard. **Frameworks** give you structure and shortcuts for that.`),
          ANALOGY(`LEGO vs. carving wood`, `Vanilla JavaScript is like carving everything from a block of wood: total freedom, but slow for big projects. A framework is like LEGO: you build reusable pieces (components) and snap them together. Same result, faster, and easier to change.`),
          H(`Components`),
          P(`The big idea in modern frameworks is the **component**: a reusable piece of UI that bundles its structure, style, and behaviour together. A {{ProjectCard}} component can be used ten times with different data, like the cards you generated from an array in Module 6, but more powerful.`),
          H(`React in 60 seconds`),
          P(`**React** (made by Meta) is the most widely used front-end library. Components are JavaScript functions that return something that looks like HTML. This is called **JSX**:`),
          CODE('js', `
function ProjectCard({ title, description }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  );
}

// Use it like a custom HTML tag
<ProjectCard title="To-do app" description="Add and complete tasks." />`, 'A React component'),
          UL(
            `**Props** ({{title}}, {{description}}) pass data into a component, like attributes on an HTML tag.`,
            `**State** is data that can change (like a counter or a list of to-dos). When state changes, React **automatically re-draws** the parts of the page that depend on it. No more manual {{querySelector}} and {{textContent}}!`,
            `{{className}} is used instead of {{class}} (because {{class}} is a reserved word in JavaScript).`
          ),
          H(`Other popular choices`),
          UL(
            `**Vue** and **Svelte**: friendly, often considered gentler to learn.`,
            `**Angular**: a large, all-in-one framework popular in big companies.`,
            `**Next.js** (React), **Nuxt** (Vue), **SvelteKit**, and **Astro**: “meta-frameworks” that add routing, multiple pages, and server features.`
          ),
          TIP(`**Do you need a framework yet?** For a portfolio, a blog, or a small business site: no! Plain HTML/CSS/JS is perfect. Learn a framework when you want to build *apps* with lots of changing data. And learn JavaScript well first, because frameworks are built on it.`, `When to use one`),
          TRY({
            title: 'Your first React component',
            focus: 'html',
            prompt: `This preview loads React from the internet. Click the buttons, then edit the JSX inside the {{<script type="text/babel">}} in the HTML tab: add a third {{<ProjectCard>}} or change the counter's step. Notice there's no {{querySelector}}: React redraws for you.`,
            html: `
<div id="root"></div>

<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/babel">
  function ProjectCard({ title, emoji }) {
    return (
      <article className="card">
        <span className="emoji">{emoji}</span>
        <h3>{title}</h3>
      </article>
    );
  }

  function LikeCounter() {
    const [likes, setLikes] = React.useState(0);   // state!
    return (
      <button onClick={() => setLikes(likes + 1)}>
        ❤️ {likes} {likes === 1 ? "like" : "likes"}
      </button>
    );
  }

  function App() {
    return (
      <main>
        <h1>Hello from React ⚛️</h1>
        <LikeCounter />
        <div className="grid">
          <ProjectCard title="To-do app" emoji="✅" />
          <ProjectCard title="Recipe page" emoji="🥞" />
        </div>
      </main>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
</script>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
button { font-size: 16px; padding: 8px 16px; border-radius: 999px; border: 1.5px solid #e11d48; background: white; cursor: pointer; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-top: 16px; }
.card { background: #f0f9ff; border-radius: 12px; padding: 14px; text-align: center; }
.card h3 { margin: 6px 0 0; }
.emoji { font-size: 32px; }`,
          }),
        ],
        quiz: [
          Q(`What is a component?`,
            ['A CSS file', 'A reusable piece of UI that bundles structure and behaviour', 'A type of database', 'A web host'], 1,
            `Components are the building blocks of React, Vue, Svelte, and friends.`),
          Q(`In React, what happens when **state** changes?`,
            ['Nothing until you reload', 'React automatically updates the parts of the page that use it', 'The page crashes', 'You must call querySelector'], 1,
            `That automatic re-rendering is the core reason people use React.`),
          Q(`Do you need a framework for a simple portfolio site?`,
            ['Yes, always', 'No. Plain HTML, CSS, and JS are perfect for it', 'Only for the footer', 'Only if it has images'], 1,
            `Frameworks shine for complex, data-heavy apps. Use the simplest tool that does the job.`),
        ],
      },

      {
        id: 'm10-l2',
        title: 'Backends and APIs',
        minutes: 10,
        intro: `Servers that do work, and how your JavaScript can talk to them.`,
        blocks: [
          P(`Everything you've built so far is **front-end**: code that runs in the visitor's browser. Many apps also need a **back-end**: code that runs on a server, doing things the browser can't or shouldn't, like storing everyone's data, checking passwords, taking payments, or sending emails.`),
          ANALOGY(`A restaurant, one more time`, `The **front-end** is the dining room: the menu, the tables, what customers see and touch. The **back-end** is the kitchen: where the real work happens, out of sight. The **API** is the waiter: the agreed way to pass orders in and dishes out.`),
          H(`What's an API?`),
          P(`An **API** (Application Programming Interface) is a set of rules for how programs talk to each other. On the web, it's usually a URL that returns **data** instead of a web page. Weather apps, maps, payment services: they all expose APIs.`),
          H(`JSON: the language of data`),
          P(`APIs usually send data as **JSON** (JavaScript Object Notation). It looks just like the JavaScript objects and arrays from Module 5:`),
          CODE('js', `
{
  "name": "Alex Rivera",
  "skills": ["HTML", "CSS", "JavaScript"],
  "available": true
}`, 'JSON'),
          H(`Fetching data with JavaScript`),
          CODE('js', `
async function getDog() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();   // turn the JSON into a JS object
  console.log(data.message);            // a URL to a random dog photo
}

getDog();`, 'fetch()'),
          UL(
            `{{fetch(url)}} sends a request (a GET, from Module 1!) and waits for the response.`,
            `{{await}} means “wait for this to finish before moving on”. It only works inside an {{async}} function.`,
            `{{response.json()}} converts the JSON text into a JavaScript object you can use.`
          ),
          H(`Back-end languages`),
          P(`You can write back-ends in many languages: **JavaScript** (with **Node.js**, so you can use the language you already know!), **Python**, **PHP**, **Ruby**, **Go**, **Java**, **C#**… “Full-stack” developers work on both front-end and back-end.`),
          TIP(`You can get back-end features without running your own server: **serverless functions** (Netlify Functions, Vercel Functions) let you write small pieces of back-end code that run on demand, deployed right alongside your static site.`),
          WARN(`Never put secret API keys in front-end JavaScript. Anyone can open DevTools and read them. Secrets belong on a back-end or in a serverless function.`, `Keep keys secret`),
          TRY({
            title: 'Fetch data from real APIs',
            focus: 'js',
            prompt: `Click the button for a random dog photo from a free public API, and look up any GitHub username. Check the console to see the raw JSON. (You need to be online for this one.)`,
            html: `
<h2>🐶 Random dog</h2>
<button id="dog-btn">Fetch a dog</button>
<div id="dog"></div>

<h2>🐙 GitHub profile lookup</h2>
<form id="gh-form">
  <input id="gh-user" value="octocat" aria-label="GitHub username">
  <button>Look up</button>
</form>
<div id="gh"></div>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
button { padding: 8px 14px; border: 0; border-radius: 9px; background: #0ea5e9; color: white; cursor: pointer; }
input { padding: 8px 10px; border-radius: 8px; border: 1px solid #cbd5e1; }
#dog img { max-width: 240px; max-height: 200px; border-radius: 12px; margin-top: 10px; display: block; }
.profile { display: flex; gap: 12px; align-items: center; margin-top: 10px; }
.profile img { width: 64px; height: 64px; border-radius: 50%; }`,
            js: `
async function fetchDog() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    console.log("Dog API sent:", data);
    document.querySelector("#dog").innerHTML = '<img alt="A random dog">';
    document.querySelector("#dog img").src = data.message;
  } catch (error) {
    console.error("Couldn't reach the API. Are you online?");
  }
}
document.querySelector("#dog-btn").addEventListener("click", fetchDog);

document.querySelector("#gh-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.querySelector("#gh-user").value.trim();
  const box = document.querySelector("#gh");
  try {
    const response = await fetch("https://api.github.com/users/" + encodeURIComponent(username));
    if (!response.ok) {
      box.textContent = "No user found (status " + response.status + ")";
      return;
    }
    const user = await response.json();
    console.log("GitHub API sent:", { name: user.name, repos: user.public_repos, followers: user.followers });
    box.innerHTML = '<div class="profile"><img alt=""><div><strong></strong><br><span></span></div></div>';
    box.querySelector("img").src = user.avatar_url;
    box.querySelector("strong").textContent = user.name || user.login;
    box.querySelector("span").textContent = user.public_repos + " public repos · " + user.followers + " followers";
  } catch (error) {
    console.error("Couldn't reach GitHub. Are you online?");
  }
});`,
          }),
        ],
        quiz: [
          Q(`What's the difference between front-end and back-end?`,
            ['There isn’t one', 'Front-end runs in the browser; back-end runs on a server', 'Back-end is only CSS', 'Front-end is only for phones'], 1,
            `The front-end is what visitors see and interact with; the back-end does work on a server.`),
          Q(`What does {{response.json()}} do?`,
            ['Sends data to the server', 'Converts the JSON response into a JavaScript object', 'Deletes the response', 'Styles the data'], 1,
            `JSON arrives as text; {{.json()}} parses it into objects and arrays you can use.`),
          Q(`Where should a secret API key go?`,
            ['In your front-end JavaScript', 'In your HTML comments', 'On a back-end or in a serverless function', 'In the README'], 2,
            `Front-end code is visible to everyone. Keep secrets on the server side.`),
        ],
      },

      {
        id: 'm10-l3',
        title: 'Databases',
        minutes: 9,
        intro: `Storing data that lasts: users, posts, orders, and more.`,
        blocks: [
          P(`When you refresh a page, JavaScript variables are wiped. {{localStorage}} remembers a little, but only in one browser on one device. When data needs to **last** and be **shared** between users (accounts, posts, comments, orders), it goes in a **database** on a server.`),
          ANALOGY(`A super-powered spreadsheet`, `A database is like a giant, organised spreadsheet that many people can read and write at once, safely, and that can find any row among millions in an instant.`),
          H(`Two main families`),
          UL(
            `**Relational (SQL) databases** store data in **tables** with rows and columns, like spreadsheets that link to each other. Examples: **PostgreSQL**, **MySQL**, **SQLite**. You talk to them with a language called **SQL**.`,
            `**Document (NoSQL) databases** store flexible JSON-like documents. Examples: **MongoDB**, **Firebase Firestore**.`
          ),
          H(`A table and a query`),
          RAW(`<div class="diagram" style="overflow-x:auto"><table class="compare">
            <thead><tr><th>id</th><th>title</th><th>author</th><th>likes</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>My first website</td><td>alex</td><td>42</td></tr>
              <tr><td>2</td><td>Flexbox tips</td><td>sam</td><td>17</td></tr>
              <tr><td>3</td><td>Learning Git</td><td>alex</td><td>8</td></tr>
            </tbody></table><p class="diagram-cap">A “posts” table</p></div>`),
          CODE('text', `
-- SQL: "give me Alex's posts, most liked first"
SELECT title, likes
FROM posts
WHERE author = 'alex'
ORDER BY likes DESC;`, 'A SQL query'),
          P(`SQL reads almost like English. It's one of the most useful (and longest-lasting) skills in tech. Even non-developers use it for data analysis.`),
          H(`Beginner-friendly options`),
          UL(
            `**Supabase**: a hosted PostgreSQL database with a friendly dashboard, sign-in, and a JavaScript library. Generous free tier.`,
            `**Firebase**: Google's platform with a document database, sign-in, and hosting.`,
            `**SQLite**: a tiny database stored in a single file, perfect for learning SQL on your own computer.`
          ),
          TIP(`Don't build your own login system from scratch while learning. Storing passwords securely is genuinely hard. Use a service (Supabase Auth, Firebase Auth, Clerk) that does it for you.`, `About user accounts`),
          TRY({
            title: 'A pretend database',
            focus: 'js',
            prompt: `This “database” is just an array in memory, but the functions work like real queries. Read the SQL in each comment, then the JavaScript that does the same thing. Try writing a new query: all posts with more than 10 likes.`,
            html: `
<h2>📚 Posts database</h2>
<p>Query results appear in the console below.</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 0 16px; }`,
            js: `
// Our "posts" table
const posts = [
  { id: 1, title: "My first website", author: "alex", likes: 42 },
  { id: 2, title: "Flexbox tips",     author: "sam",  likes: 17 },
  { id: 3, title: "Learning Git",     author: "alex", likes: 8 },
  { id: 4, title: "Why I love CSS",   author: "priya", likes: 25 },
];

// SELECT * FROM posts WHERE author = 'alex';
const alexPosts = posts.filter((p) => p.author === "alex");
console.log("Alex's posts:", alexPosts.map((p) => p.title));

// SELECT title FROM posts ORDER BY likes DESC LIMIT 2;
const top2 = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 2);
console.log("Top 2:", top2.map((p) => p.title + " (" + p.likes + ")"));

// INSERT INTO posts (title, author, likes) VALUES ('Hello DB', 'you', 0);
posts.push({ id: 5, title: "Hello DB", author: "you", likes: 0 });
console.log("Total posts now:", posts.length);

// Your turn: SELECT * FROM posts WHERE likes > 10;
`,
          }),
        ],
        quiz: [
          Q(`Why would an app need a database instead of {{localStorage}}?`,
            ['localStorage is faster', 'Data must last and be shared between many users and devices', 'Databases are required for HTML', 'To style the app'], 1,
            `localStorage lives in one browser; a database lives on a server everyone's app can reach.`),
          Q(`What language do you use to query relational databases?`,
            ['CSS', 'SQL', 'HTML', 'Markdown'], 1,
            `SQL (Structured Query Language): SELECT, INSERT, UPDATE, DELETE…`),
          Q(`What does {{WHERE author = 'alex'}} do in a SQL query?`,
            ['Deletes Alex', 'Filters rows to only those where the author is alex', 'Sorts by author', 'Creates a table'], 1,
            `{{WHERE}} filters rows, just like {{.filter()}} in JavaScript.`),
        ],
      },

      {
        id: 'm10-l4',
        title: 'The developer toolbox',
        minutes: 9,
        intro: `npm, build tools, CSS frameworks, TypeScript, and AI assistants, demystified.`,
        blocks: [
          P(`As you explore further, you'll meet a lot of tool names. Here's what the most common ones are for, so they're not intimidating when you see them.`),
          H(`Node.js and npm`),
          UL(
            `**Node.js** lets JavaScript run outside the browser: on your computer or on a server. Most modern web tools are built with it.`,
            `**npm** (Node Package Manager) installs **packages**: code other people have written and shared. There are millions.`,
            `A {{package.json}} file lists a project's packages and handy commands (“scripts”).`
          ),
          CODE('bash', `
node --version          # check Node is installed
npm create vite@latest  # start a new project with Vite
npm install             # download the packages listed in package.json
npm run dev             # start a local development server`, 'Everyday npm commands'),
          H(`Build tools`),
          P(`**Vite** (pronounced “veet”, French for “quick”) is a popular tool that runs a fast local server while you work and **bundles** your code into small, optimised files when you publish. Frameworks like React usually use it.`),
          H(`CSS frameworks`),
          UL(
            `**Tailwind CSS**: you style elements with small utility classes directly in your HTML ({{class="p-4 bg-blue-500 rounded-lg"}}). Very popular.`,
            `**Bootstrap**: ready-made components (navbars, cards, buttons) with a classic look.`,
            `Your CSS skills from Module 4 make these much easier to learn, because they're shortcuts for the same properties.`
          ),
          H(`TypeScript`),
          P(`**TypeScript** is JavaScript with **types**: you say what kind of value each variable holds ({{let age: number}}), and your editor catches mistakes before you even run the code. Many companies use it. Learn it after you're comfortable with JavaScript.`),
          H(`AI coding assistants`),
          P(`Tools like Claude, GitHub Copilot, and others can explain code, suggest fixes, and write first drafts. They're genuinely useful, and used thoughtfully, they can speed up your learning too.`),
          UL(
            `✅ Ask them to **explain** code or error messages you don't understand.`,
            `✅ Ask for **hints** rather than full answers when you're practising.`,
            `✅ **Read and understand** everything before you use it. You're responsible for your code.`,
            `❌ Don't paste in secrets or private data.`,
            `❌ Don't skip the fundamentals. You need them to judge whether an answer is right.`
          ),
          TIP(`You don't need to learn all of these at once, or at all, for many jobs. Pick tools when a project needs them.`),
          TRY({
            title: 'Try Tailwind CSS',
            focus: 'html',
            prompt: `This preview loads Tailwind from a CDN. Every style comes from the classes in the HTML. Change {{bg-indigo-600}} to {{bg-rose-600}}, {{rounded-2xl}} to {{rounded-none}}, or {{p-6}} to {{p-10}}. Compare it with writing the same CSS by hand in Module 4!`,
            html: `
<script src="https://cdn.tailwindcss.com"></script>

<div class="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
  <div class="bg-white rounded-2xl shadow-lg p-6 max-w-sm">
    <p class="text-sm font-semibold text-indigo-600 uppercase tracking-wide">New project</p>
    <h1 class="text-2xl font-bold text-slate-900 mt-1">Weather dashboard</h1>
    <p class="text-slate-600 mt-2">A React app that fetches live forecasts from a public API.</p>
    <div class="flex gap-2 mt-4">
      <span class="bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full">React</span>
      <span class="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">API</span>
    </div>
    <button class="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg">View project</button>
  </div>
</div>`,
          }),
        ],
        quiz: [
          Q(`What is npm used for?`,
            ['Hosting websites', 'Installing JavaScript packages that other people have shared', 'Writing CSS', 'Buying domains'], 1,
            `npm is the package manager that comes with Node.js.`),
          Q(`What does TypeScript add to JavaScript?`,
            ['Colours', 'Types, so many mistakes are caught before the code runs', 'A database', 'Faster internet'], 1,
            `Types describe what kind of value each variable holds.`),
          Q(`What's the healthiest way to use an AI coding assistant while learning?`,
            ['Copy everything without reading it', 'Ask for explanations and hints, and understand any code before using it', 'Paste in your passwords', 'Never learn the basics'], 1,
            `Use AI as a tutor, and stay in charge of your own understanding.`),
        ],
      },

      {
        id: 'm10-l5',
        title: 'Your learning roadmap',
        minutes: 9,
        intro: `Where to go next, what to build, and how to keep growing.`,
        milestone: `You completed Zero to Live! From zero to a live website. 🏆🎓`,
        blocks: [
          P(`Look how far you've come: you understand how the web works, you can write HTML, CSS, and JavaScript, you've built a multi-page site, used Git and GitHub, and published it to the internet. **That's a huge achievement.** 🎉`),
          H(`Choose a direction`),
          UL(
            `**Front-end developer**: interfaces people see and use. Next: deeper JavaScript → a framework (React or Vue) → TypeScript → testing.`,
            `**Back-end developer**: servers, APIs, and data. Next: Node.js (or Python) → databases and SQL → building APIs → authentication.`,
            `**Full-stack developer**: both! Next: a meta-framework like Next.js plus a database like Supabase.`,
            `**Designer who codes / creative developer**: CSS mastery, animation, accessibility, and design tools like Figma.`
          ),
          H(`A suggested 6-month path`),
          STEPS(
            [`Months 1–2: deepen the fundamentals`, `Build 3 small projects with plain HTML/CSS/JS. Get really comfortable with Flexbox, Grid, the DOM, and {{fetch}}.`],
            [`Month 3: learn a framework`, `Rebuild one of your projects in React (or Vue). Use Vite.`],
            [`Month 4: data and APIs`, `Build an app that uses a public API, then one that saves data with Supabase or Firebase.`],
            [`Month 5: a bigger project`, `Something you genuinely care about. Plan it like Module 6.`],
            [`Month 6: polish and share`, `Update your portfolio, write READMEs, and share your work.`]
          ),
          H(`Project ideas`),
          UL(
            `🌤️ A weather app using a free weather API.`,
            `📝 A notes or habit tracker that saves to {{localStorage}}.`,
            `🍳 A recipe finder with search and filters.`,
            `🎮 A small game: memory cards, quiz, or snake.`,
            `🏪 A real website for a friend, a local club, or a small business. Real users teach you the most!`
          ),
          H(`Great free resources`),
          UL(
            `[MDN Web Docs](https://developer.mozilla.org): the best reference for HTML, CSS, and JavaScript.`,
            `[freeCodeCamp](https://www.freecodecamp.org) and [The Odin Project](https://www.theodinproject.com): free, structured curricula.`,
            `[Frontend Mentor](https://www.frontendmentor.io): realistic design challenges to build.`,
            `[roadmap.sh](https://roadmap.sh): visual roadmaps for every developer path.`,
            `[web.dev](https://web.dev): Google's guides to performance, accessibility, and modern CSS.`
          ),
          H(`Habits that matter more than talent`),
          UL(
            `**Build things.** Tutorials teach; projects make it stick.`,
            `**A little every day** beats a lot once a month.`,
            `**Get comfortable being stuck.** Read the error, search it, take a walk, and ask for help. Every developer does this daily.`,
            `**Share your work** and learn in public. Communities are kind to learners.`
          ),
          TRY({
            title: 'Make your personal roadmap',
            focus: 'html',
            prompt: `Edit the HTML to plan *your* next steps: pick a direction, list three things to learn, and choose your next project. Click the items in the preview to tick them off as you go.`,
            html: `
<main class="roadmap">
  <h1>🧭 My roadmap</h1>
  <p class="direction">Direction: <strong>Front-end developer</strong></p>

  <h2>Learn next</h2>
  <ol class="steps">
    <li>Deeper JavaScript (arrays, objects, fetch)</li>
    <li>React with Vite</li>
    <li>TypeScript basics</li>
  </ol>

  <h2>Next project</h2>
  <div class="project">
    <strong>🌤️ Weather dashboard</strong>
    <p>Search a city and show a 5-day forecast from a free API.</p>
  </div>

  <p class="motto">“Build things. A little every day.”</p>
</main>`,
            css: `
body { font-family: system-ui, sans-serif; margin: 0; background: linear-gradient(160deg, #eef2ff, #ecfeff); min-height: 100vh; }
.roadmap { max-width: 480px; margin: 0 auto; padding: 20px; }
h1 { margin-bottom: 4px; }
.direction { color: #4338ca; }
.steps li { background: white; margin: 8px 0; padding: 10px 14px; border-radius: 10px; cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
.steps li.done { text-decoration: line-through; opacity: .55; }
.steps li.done::after { content: " ✅"; }
.project { background: white; border-left: 5px solid #14b8a6; padding: 12px 16px; border-radius: 10px; }
.project p { margin: 4px 0 0; color: #475569; }
.motto { text-align: center; font-style: italic; color: #64748b; margin-top: 24px; }`,
            js: `
document.querySelectorAll(".steps li").forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("done");
    const done = document.querySelectorAll(".steps li.done").length;
    console.log("Progress: " + done + " / " + document.querySelectorAll(".steps li").length);
  });
});`,
          }),
          TIP(`Thank you for learning with Zero to Live. You started at zero, and now you're live. Keep building! 💜`, `One last thing`),
        ],
        quiz: [
          Q(`Which habit helps most when learning to code?`,
            ['Only watching tutorials', 'Building your own projects, a little every day', 'Memorising every CSS property', 'Never asking for help'], 1,
            `Projects turn knowledge into skill, and consistency beats intensity.`),
          Q(`What's a sensible next step for someone who wants to be a front-end developer?`,
            ['Learn assembly language', 'Deepen JavaScript, then learn a framework like React', 'Start with Kubernetes', 'Stop coding HTML'], 1,
            `Strong JavaScript first, then a framework, then TypeScript.`),
          Q(`Which is the best reference for looking up HTML, CSS, and JavaScript details?`,
            ['MDN Web Docs', 'A random forum post from 2009', 'Your browser history', 'A screenshot'], 0,
            `MDN is accurate, thorough, and kept up to date by browser makers and the community.`),
        ],
      },
    ],
    quiz: [
      Q(`What is React?`,
        ['A database', 'A JavaScript library for building user interfaces from components', 'A web host', 'A CSS property'], 1,
        `React builds UIs from reusable components that update automatically when state changes.`),
      Q(`What does an API typically return?`,
        ['A video', 'Data, often as JSON', 'A domain name', 'A CSS file only'], 1,
        `APIs return data for your code to use, most often in JSON format.`),
      Q(`Which statement about databases is true?`,
        ['They only work offline', 'They store data on a server so it lasts and can be shared between users', 'They replace HTML', 'They’re a type of font'], 1,
        `Databases keep data safe, organised, and shared.`),
      Q(`What does {{npm install}} do?`,
        ['Publishes your website', 'Downloads the packages listed in package.json', 'Deletes node_modules', 'Creates a Git commit'], 1,
        `It installs your project's dependencies.`),
      Q(`What's the most important thing to do after finishing this course?`,
        ['Stop and never code again', 'Keep building projects and sharing them', 'Learn every framework at once', 'Delete your portfolio'], 1,
        `Keep building, keep shipping, keep learning. 🚀`),
    ],
    exercise: {
      title: 'Plan your next project',
      minutes: 30,
      blocks: [
        P(`Finish the course by planning what you'll build next. Pick a project that stretches you a little, using at least one thing you haven't done yet (an API, a framework, a database). Then write a one-page plan, just like you did in Module 6.`),
        P(`Use the workspace template below. Save it in your project's README when you start building!`),
      ],
      goals: [
        `Choose a direction (front-end, back-end, full-stack, or creative)`,
        `Pick a project idea that excites you`,
        `Write the goal and audience in one sentence each`,
        `List 3–5 core features (keep it small!)`,
        `Name one new technology you'll learn for it`,
        `Sketch a wireframe of the main screen`,
        `Set a realistic deadline and start building 🚀`,
      ],
      starter: {
        prompt: `Fill in your project plan. It updates as you type.`,
        html: `
<article class="plan">
  <h1>📋 Project plan: <span>Weather dashboard</span></h1>

  <section>
    <h2>Goal</h2>
    <p>Help people check a 5-day forecast for any city in seconds.</p>
  </section>

  <section>
    <h2>Audience</h2>
    <p>Me and my friends planning weekend hikes.</p>
  </section>

  <section>
    <h2>Core features</h2>
    <ul>
      <li>Search for a city</li>
      <li>Show today's weather and a 5-day forecast</li>
      <li>Remember the last city searched</li>
    </ul>
  </section>

  <section>
    <h2>New thing I'll learn</h2>
    <p>Fetching data from an API with <code>fetch()</code> and <code>async/await</code>.</p>
  </section>

  <section>
    <h2>Deadline</h2>
    <p>4 weeks from today.</p>
  </section>
</article>`,
        css: `
body { font-family: system-ui, sans-serif; margin: 0; background: #f8fafc; color: #1e293b; }
.plan { max-width: 560px; margin: 0 auto; padding: 20px; }
h1 { font-size: 1.5rem; }
h1 span { color: #4f46e5; }
section { background: white; padding: 4px 16px 10px; border-radius: 12px; margin-bottom: 10px; box-shadow: 0 1px 6px rgba(0,0,0,.05); }
h2 { font-size: 1rem; color: #0d9488; text-transform: uppercase; letter-spacing: .05em; }
code { background: #eef2ff; padding: 1px 6px; border-radius: 5px; }`,
      },
    },
  });
})();
