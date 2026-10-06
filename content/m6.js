/* ==========================================================
   MODULE 6 · Building a Real Project
   ========================================================== */
(function () {
  const { P, H, UL, OL, ANALOGY, TIP, WARN, CODE, TRY, STEPS, RAW, Q } = window.ZTL;

  // The shared stylesheet the learner builds up in lesson 6.2 and reuses afterwards.
  const BASE_CSS = `
/* ===== css/styles.css: shared by every page ===== */
:root {
  --color-bg: #fafaf9;
  --color-text: #1c1917;
  --color-muted: #78716c;
  --color-accent: #7c3aed;
  --color-card: #ffffff;
  --radius: 14px;
  --space: 16px;
  --max-width: 1000px;
  --font: system-ui, -apple-system, "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: var(--font);
  line-height: 1.6;
  color: var(--color-text);
  background: var(--color-bg);
}
img { max-width: 100%; height: auto; display: block; }
a { color: var(--color-accent); }

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space);
}

.button {
  display: inline-block;
  padding: 12px 22px;
  border-radius: 999px;
  background: var(--color-accent);
  color: white;
  text-decoration: none;
  font-weight: 600;
}
.button:hover { filter: brightness(1.1); }
`;

  const NAV_HTML = `
<header class="site-header">
  <div class="container nav">
    <a class="logo" href="index.html">Alex Rivera</a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="menu">☰ Menu</button>
    <ul class="nav-links" id="menu">
      <li><a href="index.html" aria-current="page">Home</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </div>
</header>`;

  const NAV_CSS = `
/* ===== Header & navigation ===== */
.site-header { background: var(--color-card); border-bottom: 1px solid #e7e5e4; }
.nav { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; padding-top: 14px; padding-bottom: 14px; }
.logo { font-weight: 800; font-size: 20px; color: var(--color-text); text-decoration: none; }
.menu-toggle { display: none; border: 1px solid #d6d3d1; background: none; border-radius: 8px; padding: 6px 12px; font: inherit; cursor: pointer; }
.nav-links { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
.nav-links a { color: var(--color-text); text-decoration: none; font-weight: 500; padding: 4px 0; }
.nav-links a:hover { color: var(--color-accent); }
.nav-links a[aria-current="page"] { color: var(--color-accent); border-bottom: 2px solid var(--color-accent); }

/* On small screens, hide the links behind the menu button */
@media (max-width: 600px) {
  .menu-toggle { display: block; }
  .nav-links { display: none; width: 100%; flex-direction: column; gap: 8px; padding-top: 12px; }
  .nav-links.open { display: flex; }
}
`;

  const NAV_JS = `
// Mobile menu: show/hide the links when the button is pressed
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");

toggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen);
});`;

  const FOOTER_HTML = `
<footer class="site-footer">
  <div class="container">
    <p>© 2026 Alex Rivera · <a href="mailto:alex@example.com">alex@example.com</a> · <a href="https://github.com">GitHub</a></p>
  </div>
</footer>`;

  const FOOTER_CSS = `
.site-footer { margin-top: 48px; padding: 24px 0; border-top: 1px solid #e7e5e4; color: var(--color-muted); font-size: 14px; }
`;

  window.ZTL.addModule({
    id: 'm6',
    icon: '🏗️',
    title: 'Building a Real Project',
    summary: `Plan and build a multi-page personal portfolio site from scratch, step by step, using everything you've learned.`,
    goal: `By the end of this module you'll have a complete four-page portfolio (Home, Projects, About, Contact) ready to put online.`,
    lessons: [
      {
        id: 'm6-l1',
        title: 'Planning your portfolio',
        minutes: 9,
        intro: `Ten minutes of planning saves hours of rebuilding.`,
        blocks: [
          P(`Professional developers rarely open a code editor first. They start by deciding **what** they're building and **who it's for**. Let's plan your portfolio: a website that shows who you are and what you can do.`),
          ANALOGY(`Building a house`, `Nobody pours concrete before drawing a floor plan. Your sitemap is the floor plan (which rooms exist), and your wireframes are the sketches of each room (where the furniture goes).`),
          H(`Step 1: Goal and audience`),
          P(`Answer these in one sentence each:`),
          UL(
            `**Who will visit?** Employers, clients, friends, other developers?`,
            `**What should they learn about you?** Your skills, your projects, your personality?`,
            `**What should they do next?** Email you, look at your GitHub, download your CV?`
          ),
          CODE('text', `
Goal:      Show employers I can build clean, accessible websites.
Audience:  Hiring managers and recruiters, mostly on their phones.
Action:    Contact me by email or view my projects on GitHub.`, 'An example plan'),
          H(`Step 2: Sitemap`),
          P(`A **sitemap** lists every page and how they connect. Keep it small. Four pages is plenty:`),
          CODE('text', `
index.html      Home: who you are in one line, highlights, a call to action
projects.html   Projects: cards for 3–6 things you've built
about.html      About: your story, skills, photo
contact.html    Contact: a form and your links`, 'Sitemap'),
          H(`Step 3: Wireframes`),
          P(`A **wireframe** is a rough sketch of a page layout using grey boxes. No colours, no real text, just *where things go*. Pen and paper is perfect. So is the live editor below!`),
          H(`Step 4: Gather your content`),
          UL(
            `A short bio (2–3 sentences) and a longer one for the About page.`,
            `A friendly photo of you (or an illustration/avatar).`,
            `3+ projects: a title, one-sentence description, image or screenshot, and a link. **Your exercises from this course count!** The 404 page, the About Me page, the to-do widget…`,
            `Your contact links: email, GitHub, LinkedIn.`
          ),
          TIP(`Look at 5 portfolios you like (search “developer portfolio examples”) and note what you like about each. Borrowing *ideas* is how everyone learns design. Just don't copy code or text wholesale.`),
          TRY({
            title: 'Wireframe your home page',
            focus: 'html',
            prompt: `This is a grey-box wireframe built with HTML and CSS. Rearrange, add, or remove boxes to sketch *your* home page. Maybe you want a photo next to the intro, or a testimonials section?`,
            html: `
<div class="wf header">LOGO ············ Home · Projects · About · Contact</div>

<div class="wf hero">
  <div class="wf line big"></div>
  <div class="wf line"></div>
  <div class="wf btn">Button</div>
</div>

<div class="row">
  <div class="wf card">Project</div>
  <div class="wf card">Project</div>
  <div class="wf card">Project</div>
</div>

<div class="wf footer">Footer: email · GitHub · LinkedIn</div>`,
            css: `
body { font-family: ui-monospace, monospace; padding: 12px; background: #fff; color: #555; font-size: 13px; }
.wf { background: #e5e7eb; border: 2px dashed #9ca3af; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.hero { padding: 32px 20px; display: grid; gap: 10px; justify-items: start; }
.line { height: 12px; width: 70%; padding: 0; border: 0; background: #cbd5e1; margin: 0; }
.line.big { height: 24px; width: 50%; }
.btn { background: #c7d2fe; padding: 8px 20px; margin: 0; }
.row { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; }
.card { height: 90px; display: grid; place-items: center; margin: 0; }
.footer { margin-top: 12px; text-align: center; }`,
          }),
        ],
        quiz: [
          Q(`What is a sitemap?`,
            ['A list of every page and how they connect', 'A Google Maps embed', 'A CSS file', 'A list of fonts'], 0,
            `A sitemap is the floor plan of your website: which pages exist and how they link together.`),
          Q(`What does a wireframe focus on?`,
            ['Colours and fonts', 'Where things go on the page', 'The final wording', 'Server settings'], 1,
            `Wireframes are deliberately rough: grey boxes that show layout, not decoration.`),
          Q(`Which is the best first question when planning a portfolio?`,
            ['Which animation library should I use?', 'Who will visit, and what should they do next?', 'What colour is trendy?', 'How many pages can I make?'], 1,
            `Knowing your audience and goal guides every other decision.`),
        ],
      },

      {
        id: 'm6-l2',
        title: 'Project setup',
        minutes: 9,
        intro: `Folders, a starter template, and a shared stylesheet with CSS variables.`,
        blocks: [
          P(`Let's set up the project properly. A tidy foundation makes every page faster to build.`),
          CODE('text', `
portfolio/
├── index.html
├── projects.html
├── about.html
├── contact.html
├── 404.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── images/
    ├── me.jpg
    └── projects/`, 'Project structure'),
          H(`A starter template for every page`),
          P(`Every page shares the same {{<head>}}, header, and footer. Write it once, then copy it for each new page and change only the title, description, and {{<main>}} content.`),
          CODE('html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projects · Alex Rivera</title>
  <meta name="description" content="Websites and experiments built by Alex Rivera.">
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/script.js" defer></script>
</head>
<body>
  <!-- header (same on every page) -->
  <main>
    <!-- the unique content of this page -->
  </main>
  <!-- footer (same on every page) -->
</body>
</html>`, 'template.html'),
          H(`CSS variables: your design system`),
          P(`**CSS custom properties** (variables) let you define your colours, spacing, and fonts **once**, at the top of your stylesheet, and reuse them everywhere. Want a new accent colour? Change one line.`),
          CODE('css', `
:root {
  --color-accent: #7c3aed;
  --radius: 14px;
}

.button {
  background: var(--color-accent);
  border-radius: var(--radius);
}
a { color: var(--color-accent); }`, 'Defining and using variables'),
          ANALOGY(`A brand kit`, `Companies have a brand kit: “our purple is exactly this shade, our corners are this round”. CSS variables are your website's brand kit, kept in one place so everything stays consistent.`),
          TIP(`The base stylesheet below (box-sizing, a centred container, sensible image defaults, a button style) is a great starting point for almost any site. Keep it and reuse it.`),
          TRY({
            title: 'Your design system',
            focus: 'css',
            prompt: `Change {{--color-accent}} at the top of the CSS and watch the button and link update together. Try {{--radius: 0}} or {{--font: Georgia, serif}}. That's the power of variables.`,
            html: `
<div class="container">
  <h1>Hello, I'm Alex 👋</h1>
  <p>I design and build friendly, accessible websites. <a href="#">See my work</a>.</p>
  <a class="button" href="#">Get in touch</a>
</div>`,
            css: BASE_CSS,
          }),
        ],
        quiz: [
          Q(`How do you **use** a CSS variable called {{--color-accent}}?`,
            ['{{color: --color-accent;}}', '{{color: var(--color-accent);}}', '{{color: $color-accent;}}', '{{color: @color-accent;}}'], 1,
            `Define with {{--name: value}}, use with {{var(--name)}}.`),
          Q(`Where are site-wide CSS variables usually defined?`,
            ['In {{:root}} at the top of the stylesheet', 'Inside each HTML tag', 'In JavaScript only', 'In the footer'], 0,
            `{{:root}} is the top of the page, so variables there are available everywhere.`),
          Q(`Why use one shared {{styles.css}} for all pages?`,
            ['Browsers require it', 'Changes apply everywhere and pages stay consistent', 'It makes HTML shorter only', 'It hides your code'], 1,
            `One stylesheet means one place to update, and a consistent look across the site.`),
        ],
      },

      {
        id: 'm6-l3',
        title: 'Shared header, navigation, and footer',
        minutes: 10,
        intro: `Consistent navigation on every page, including a mobile menu.`,
        blocks: [
          P(`Visitors should always know where they are and how to get anywhere else. That means the **same header and footer on every page**, with the current page highlighted.`),
          H(`Marking the current page`),
          P(`Use {{aria-current="page"}} on the link to the page you're on. Screen readers announce it (“current page”), and you can style it with CSS:`),
          CODE('css', `
.nav-links a[aria-current="page"] {
  color: var(--color-accent);
  border-bottom: 2px solid var(--color-accent);
}`, 'Styling the current page link'),
          P(`On {{projects.html}}, move the {{aria-current="page"}} attribute to the Projects link, and so on for each page.`),
          H(`A mobile menu`),
          P(`On small screens there isn't room for four links in a row, so a common pattern is a **menu button** that shows and hides them. It's the toggle-a-class trick from Module 5:`),
          STEPS(
            [`HTML`, `A {{<button>}} with {{aria-expanded="false"}} and {{aria-controls}} pointing at the list's id.`],
            [`CSS`, `On small screens, hide the list unless it has the {{.open}} class.`],
            [`JavaScript`, `On click, toggle {{.open}} and update {{aria-expanded}} so screen readers know if the menu is open.`]
          ),
          CODE('js', NAV_JS, 'js/script.js'),
          TIP(`{{classList.toggle()}} returns {{true}} if it just added the class and {{false}} if it removed it. Handy for keeping {{aria-expanded}} in sync.`),
          H(`The footer`),
          P(`Footers usually hold contact links, social profiles, and a copyright line. Keep it simple and identical on every page.`),
          WARN(`Copy-pasting the header to four pages means changing four files when you add a link. That's normal for small static sites! Bigger sites use tools (or frameworks, see Module 10) that let you write shared pieces once.`, `Copy-paste is okay here`),
          TRY({
            title: 'A responsive navbar',
            prompt: `The preview is narrow, so you see the mobile menu. Click “☰ Menu” to open it. In the CSS, change {{max-width: 600px}} to {{max-width: 200px}} to see the desktop version. Then move {{aria-current}} to the “About” link.`,
            html: NAV_HTML + `
<main class="container">
  <h1>Home</h1>
  <p>The header above is the same on every page.</p>
</main>
` + FOOTER_HTML,
            css: BASE_CSS + NAV_CSS + FOOTER_CSS,
            js: NAV_JS,
          }),
        ],
        quiz: [
          Q(`Which attribute marks the link to the page you're currently on?`,
            ['{{class="here"}}', '{{aria-current="page"}}', '{{current="true"}}', '{{href="#"}}'], 1,
            `{{aria-current="page"}} tells assistive technology which link is the current page, and gives you a hook for CSS.`),
          Q(`What does {{aria-expanded}} on a menu button communicate?`,
            ['The button’s colour', 'Whether the menu it controls is open or closed', 'How many links there are', 'The page title'], 1,
            `Screen readers announce “expanded” or “collapsed”, so update it whenever the menu toggles.`),
          Q(`Why keep the same header and footer on every page?`,
            ['It’s required by HTML', 'Consistency helps visitors find their way around', 'It loads faster', 'Search engines ban different headers'], 1,
            `Predictable navigation means people never get lost.`),
        ],
      },

      {
        id: 'm6-l4',
        title: 'The home page',
        minutes: 10,
        intro: `A strong first impression: hero, highlights, and a clear next step.`,
        blocks: [
          P(`Visitors decide within a few seconds whether to stay. Your home page should answer three questions immediately: **Who are you? What do you do? What should I do next?**`),
          H(`The anatomy of a good home page`),
          STEPS(
            [`Hero section`, `Your name, a one-line description, and a **call-to-action** (CTA) button like “See my work”.`],
            [`Short intro`, `Two or three friendly sentences. Not your life story. That goes on the About page.`],
            [`Highlights`, `Your top 3 projects, or 3 things you're good at.`],
            [`Closing CTA`, `“Want to work together? Get in touch.”`]
          ),
          CODE('html', `
<section class="hero">
  <div class="container">
    <p class="eyebrow">Hi, I'm Alex 👋</p>
    <h1>I build friendly, accessible websites.</h1>
    <p class="lead">Junior web developer based in Toronto, currently learning React.</p>
    <a class="button" href="projects.html">See my work</a>
    <a class="button button-ghost" href="contact.html">Contact me</a>
  </div>
</section>`, 'A hero section'),
          TIP(`Write your one-liner like a headline: specific and short. “I build friendly, accessible websites” beats “Welcome to my website!”`, `Your headline`),
          H(`Highlights with Grid`),
          P(`Remember the responsive grid from Module 4? It's perfect for a highlights row: three cards on a laptop, one per row on a phone, no media query needed.`),
          TRY({
            title: 'Build your hero and highlights',
            prompt: `Replace the hero text with your own headline, then edit the three highlight cards. Try the {{--color-accent}} variable for a different mood.`,
            html: NAV_HTML + `
<main>
  <section class="hero">
    <div class="container">
      <p class="eyebrow">Hi, I'm Alex 👋</p>
      <h1>I build friendly, accessible websites.</h1>
      <p class="lead">Junior web developer in Toronto. Currently learning React.</p>
      <div class="actions">
        <a class="button" href="projects.html">See my work</a>
        <a class="button button-ghost" href="contact.html">Contact me</a>
      </div>
    </div>
  </section>

  <section class="container">
    <h2>What I do</h2>
    <div class="highlights">
      <article class="card"><span class="icon">🎨</span><h3>Clean design</h3><p>Layouts that are simple, calm and easy to read.</p></article>
      <article class="card"><span class="icon">📱</span><h3>Mobile-first</h3><p>Every page works beautifully on phones.</p></article>
      <article class="card"><span class="icon">♿</span><h3>Accessible</h3><p>Built so everyone can use it, including keyboard and screen reader users.</p></article>
    </div>
  </section>
</main>
` + FOOTER_HTML,
            css: BASE_CSS + NAV_CSS + FOOTER_CSS + `
/* ===== Home page ===== */
.hero {
  padding: 64px 0 56px;
  background: linear-gradient(160deg, #ede9fe, #fafaf9 70%);
}
.eyebrow { font-weight: 600; color: var(--color-accent); margin: 0; }
.hero h1 { font-size: clamp(2rem, 6vw, 3.4rem); line-height: 1.1; margin: 8px 0 12px; max-width: 14ch; }
.lead { font-size: 1.15rem; color: var(--color-muted); max-width: 40ch; }
.actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }
.button-ghost { background: transparent; color: var(--color-accent); border: 2px solid var(--color-accent); }

.highlights { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space); }
.card { background: var(--color-card); border-radius: var(--radius); padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,.06); }
.card h3 { margin: 8px 0 4px; }
.card p { margin: 0; color: var(--color-muted); }
.icon { font-size: 28px; }
`,
            js: NAV_JS,
          }),
        ],
        quiz: [
          Q(`What is a call-to-action (CTA)?`,
            ['A phone number', 'A prominent button or link telling visitors what to do next', 'An error message', 'A JavaScript event'], 1,
            `CTAs like “See my work” or “Contact me” guide visitors to the next step.`),
          Q(`Which headline is most effective for a portfolio hero?`,
            ['Welcome to my website!', 'Home', 'I build fast, accessible websites for small businesses.', 'Page 1'], 2,
            `Specific beats generic: it tells visitors exactly what you do.`),
          Q(`Which CSS makes a highlights row responsive without media queries?`,
            ['{{float: left}}', '{{grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))}}', '{{display: inline}}', '{{width: 33%}}'], 1,
            `The auto-fit/minmax grid adjusts the number of columns to the available space.`),
        ],
      },

      {
        id: 'm6-l5',
        title: 'The projects page',
        minutes: 11,
        intro: `Show off your work with a responsive grid of project cards.`,
        blocks: [
          P(`Your projects page is the heart of your portfolio. Each project gets a **card**: an image, a title, a short description, the tools you used, and links.`),
          CODE('html', `
<article class="project">
  <img src="images/projects/todo.png" alt="Screenshot of a to-do list app with three tasks" width="600" height="400">
  <div class="project-body">
    <h2>To-do list</h2>
    <p>A small app to add, complete and clear tasks.</p>
    <ul class="tags"><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>
    <a href="https://github.com/you/todo">View code</a>
  </div>
</article>`, 'One project card'),
          H(`Writing good project descriptions`),
          UL(
            `**What is it?** “A to-do list app.”`,
            `**What did you learn or solve?** “I learned to update the DOM and save tasks with localStorage.”`,
            `**What did you use?** Small tags: HTML, CSS, JavaScript.`,
            `**Where can I see it?** A live demo link and/or a code link.`
          ),
          H(`Generating cards from data (optional)`),
          P(`Once you have several projects, you can keep them in a JavaScript array and **generate** the cards with a loop. Adding a project then means adding one object to the array. Remember: data + loop + DOM.`),
          CODE('js', `
const projects = [
  { title: "To-do list", text: "Add, complete and clear tasks.", tags: ["JS"] },
  { title: "Recipe page", text: "A responsive recipe layout.", tags: ["HTML", "CSS"] },
];

const grid = document.querySelector(".projects");

projects.forEach((p) => {
  const card = document.createElement("article");
  card.className = "project";
  card.innerHTML = "<h2></h2><p></p>";
  card.querySelector("h2").textContent = p.title;
  card.querySelector("p").textContent = p.text;
  grid.appendChild(card);
});`, 'Cards from an array'),
          TIP(`Screenshots make great project images. Take one, crop it, then compress it (squoosh.app) to keep the page fast. Always describe what the screenshot shows in the alt text.`),
          TRY({
            title: 'A data-driven project grid',
            focus: 'js',
            prompt: `The cards are generated from the {{projects}} array in the JavaScript tab. Add a fourth project object, with your own title, text, tags, and a picsum image number, and watch a new card appear.`,
            html: NAV_HTML.replace('<li><a href="index.html" aria-current="page">Home</a></li>\n      <li><a href="projects.html">Projects</a></li>', '<li><a href="index.html">Home</a></li>\n      <li><a href="projects.html" aria-current="page">Projects</a></li>') + `
<main class="container">
  <h1>Projects</h1>
  <p class="intro">Things I've built while learning web development.</p>
  <div class="projects"></div>
</main>
` + FOOTER_HTML,
            css: BASE_CSS + NAV_CSS + FOOTER_CSS + `
/* ===== Projects page ===== */
.intro { color: var(--color-muted); }
.projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
.project { background: var(--color-card); border-radius: var(--radius); overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.07); display: flex; flex-direction: column; transition: transform .2s; }
.project:hover { transform: translateY(-4px); }
.project img { aspect-ratio: 3 / 2; object-fit: cover; width: 100%; }
.project-body { padding: 16px 18px 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.project h2 { margin: 0; font-size: 1.2rem; }
.project p { margin: 0; color: var(--color-muted); flex: 1; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; padding: 0; margin: 0; }
.tags li { background: #ede9fe; color: var(--color-accent); font-size: 12px; font-weight: 600; padding: 2px 10px; border-radius: 999px; }
`,
            js: NAV_JS + `

// ===== Project cards, generated from data =====
const projects = [
  { title: "Friendly 404 page", text: "A custom error page that helps lost visitors find their way.", tags: ["HTML", "CSS"], img: 1062 },
  { title: "Recipe page", text: "A responsive recipe with ingredients and steps.", tags: ["HTML", "CSS", "Grid"], img: 292 },
  { title: "To-do app", text: "Add, complete and clear tasks, with dark mode.", tags: ["JavaScript", "DOM"], img: 3 },
];

const grid = document.querySelector(".projects");

projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "project";
  card.innerHTML = \`
    <img src="https://picsum.photos/id/\${project.img}/600/400" alt="" width="600" height="400">
    <div class="project-body">
      <h2></h2>
      <p></p>
      <ul class="tags"></ul>
      <a href="https://github.com">View code →</a>
    </div>\`;
  card.querySelector("h2").textContent = project.title;
  card.querySelector("p").textContent = project.text;
  project.tags.forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    card.querySelector(".tags").appendChild(li);
  });
  grid.appendChild(card);
});`,
          }),
        ],
        quiz: [
          Q(`What should every project card include?`,
            ['Only a giant image', 'A title, short description, tools used, and a link', 'Your phone number', 'Background music'], 1,
            `Visitors want to know what it is, what you used, and where to see it.`),
          Q(`What's the benefit of generating cards from a JavaScript array?`,
            ['It’s required by browsers', 'Adding a project means adding one object, not copying HTML', 'Cards load without images', 'It improves contrast'], 1,
            `Data + a loop keeps all the cards consistent and easy to update.`),
          Q(`Why use {{textContent}} (not {{innerHTML}}) for the title and description?`,
            ['It’s faster to type', 'It treats the data as plain text, which is safer', 'It adds bold automatically', 'It’s required for images'], 1,
            `It's a good habit: plain-text insertion can never accidentally inject HTML or scripts.`),
        ],
      },

      {
        id: 'm6-l6',
        title: 'About and contact pages',
        minutes: 10,
        intro: `Tell your story, list your skills, and make it easy to reach you.`,
        blocks: [
          H(`The About page`),
          P(`People hire people. Your About page is where you become a person, not just a list of skills. A simple structure:`),
          UL(
            `**A photo** with good alt text.`,
            `**Your story** in a few short paragraphs: where you're from, why you got into web development, what you enjoy.`,
            `**Skills**: a simple list or tags. Be honest; “learning” is a perfectly good label!`,
            `**Something human**: hobbies, a fun fact, what you're reading.`
          ),
          H(`The Contact page`),
          P(`A static site has no server to receive form data, but free services handle that for you. With [Formspree](https://formspree.io), you create a free form and get a unique URL to put in your form's {{action}} attribute. Submissions arrive in your email inbox.`),
          CODE('html', `
<form action="https://formspree.io/f/your-form-id" method="POST">
  <label for="name">Name</label>
  <input id="name" name="name" required autocomplete="name">

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required autocomplete="email">

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="5" required></textarea>

  <button class="button" type="submit">Send message</button>
</form>`, 'contact.html'),
          UL(
            `{{method="POST"}} sends the data in the request body (Module 1!).`,
            `Every field needs a {{name}}: that's the label the data arrives with.`,
            `{{autocomplete}} lets browsers fill in name and email for visitors.`,
            `Netlify (Module 9) has its own built-in alternative: just add {{data-netlify="true"}} to the form.`
          ),
          TIP(`Always include a plain email link too. Some people prefer writing from their own email app.`),
          TRY({
            title: 'About + contact in one page',
            prompt: `Personalise the bio, skills, and fun fact. Submit the form to see the data it would send (the {{action}} is a placeholder here). Try adding a “Subject” {{<select>}} with a few options.`,
            html: `
<main class="container">
  <section class="about">
    <img class="avatar" src="https://picsum.photos/id/64/240/240" alt="Alex smiling in front of a brick wall" width="240" height="240">
    <div>
      <h1>About me</h1>
      <p>I grew up in a small town near the coast and moved to Toronto for university. I started building websites in 2026 because I wanted to make my friend's bakery a home online, and I haven't stopped since.</p>
      <h2>Skills</h2>
      <ul class="tags"><li>HTML</li><li>CSS</li><li>JavaScript</li><li>Git</li><li>React (learning!)</li></ul>
      <p class="fun">☕ Fun fact: I've tried coffee from 23 countries.</p>
    </div>
  </section>

  <section class="contact card">
    <h2>Get in touch</h2>
    <form action="https://formspree.io/f/your-form-id" method="POST">
      <label for="name">Name</label>
      <input id="name" name="name" required autocomplete="name">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required autocomplete="email">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="4" required></textarea>
      <button class="button" type="submit">Send message</button>
    </form>
    <p>Or email me directly: <a href="mailto:alex@example.com">alex@example.com</a></p>
  </section>
</main>`,
            css: BASE_CSS + `
/* ===== About & contact ===== */
main { padding-top: 24px; }
.about { display: grid; gap: 24px; align-items: start; }
@media (min-width: 640px) { .about { grid-template-columns: 200px 1fr; } }
.avatar { border-radius: 50%; width: 200px; }
.about h1 { margin-top: 0; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; padding: 0; }
.tags li { background: #ede9fe; color: var(--color-accent); font-weight: 600; font-size: 13px; padding: 4px 12px; border-radius: 999px; }
.fun { background: #fef3c7; padding: 10px 14px; border-radius: 10px; }

.card { background: var(--color-card); border-radius: var(--radius); padding: 20px; margin-top: 28px; box-shadow: 0 2px 12px rgba(0,0,0,.06); }
form { display: grid; gap: 6px; max-width: 480px; }
label { font-weight: 600; font-size: 14px; margin-top: 6px; }
input, textarea, select { font: inherit; padding: 10px 12px; border: 1.5px solid #d6d3d1; border-radius: 10px; }
input:focus, textarea:focus { outline: 3px solid #ddd6fe; border-color: var(--color-accent); }
form .button { justify-self: start; margin-top: 10px; border: 0; cursor: pointer; }
`,
          }),
        ],
        quiz: [
          Q(`A static site has no server of its own. How can its contact form still deliver messages?`,
            ['It can’t, so forms are impossible', 'Use a form service like Formspree or Netlify Forms', 'Put your password in the HTML', 'Use {{alert()}}'], 1,
            `Form services receive the submission and forward it to your email.`),
          Q(`Which attribute must every form field have for its data to be sent?`,
            ['{{id}}', '{{class}}', '{{name}}', '{{style}}'], 2,
            `The {{name}} is the key the value is sent under. Fields without a name are skipped.`),
          Q(`What does {{autocomplete="email"}} do?`,
            ['Validates the email', 'Lets the browser offer to fill in the visitor’s saved email', 'Sends an automatic reply', 'Hides the field'], 1,
            `It saves visitors typing, which is especially nice on phones.`),
        ],
      },

      {
        id: 'm6-l7',
        title: 'Polish and review',
        minutes: 10,
        intro: `The small details that make a site feel professional.`,
        milestone: `Your portfolio is built! That's a real, multi-page website. 🏆`,
        blocks: [
          P(`Your pages work. Now let's make them feel *finished*. Polish is mostly about **consistency** and **small details**.`),
          H(`A polish checklist`),
          UL(
            `**Consistent spacing**: use your {{--space}} variable (or multiples of it) everywhere, instead of random values.`,
            `**Consistent colours**: only use the colours in your {{:root}} variables.`,
            `**Hover and focus states** on every link and button, so people can see what's clickable.`,
            `**Smooth transitions**: a subtle {{transition}} makes hovers feel polished.`,
            `**A favicon**: the little icon on the browser tab.`,
            `**A custom 404 page**: friendly, with a link back home.`,
            `**Proofread** every page. Then ask a friend to proofread it too.`
          ),
          CODE('css', `
/* Smooth, subtle hover effects */
.button, .card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.1);
}

/* Visible keyboard focus */
a:focus-visible, button:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 3px;
}

/* Respect people who prefer less motion */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}`, 'Polish CSS'),
          CODE('html', `
<!-- An emoji favicon: no image file needed! -->
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>">

<!-- Or a real image file -->
<link rel="icon" href="images/favicon.png">`, 'Favicons'),
          H(`Test like a visitor`),
          STEPS(
            [`Click every link on every page`, `No 404s allowed!`],
            [`Use only your keyboard`, `Tab through each page. Can you see where you are? Can you reach everything?`],
            [`Try it on your phone`, `Or the DevTools device toolbar at 375px wide.`],
            [`Check the console`, `No red errors.`],
            [`Ask someone else`, `Watch them use it without helping. Where do they hesitate?`]
          ),
          TIP(`“Done” beats “perfect”. Real developers ship, then improve. You can (and will) keep tweaking your portfolio for years.`),
          TRY({
            title: 'Add the finishing touches',
            focus: 'css',
            prompt: `Hover over the cards and button, and Tab through with your keyboard to see focus styles. Experiment with the {{transition}} timing, the hover lift distance, or the shadow. Then make your own friendly 404 message.`,
            html: `
<main class="container">
  <section class="notfound card">
    <p class="big">🧭</p>
    <h1>Page not found</h1>
    <p>Sorry, that page wandered off. Let's get you back on track.</p>
    <a class="button" href="index.html">Back to home</a>
  </section>

  <div class="grid">
    <a class="card link-card" href="#">🎨 <strong>Projects</strong><span>See what I've built</span></a>
    <a class="card link-card" href="#">👋 <strong>About</strong><span>Get to know me</span></a>
    <a class="card link-card" href="#">✉️ <strong>Contact</strong><span>Say hello</span></a>
  </div>
</main>`,
            css: BASE_CSS + `
/* ===== Polish ===== */
main { padding: 32px var(--space); }
.card {
  background: var(--color-card);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  transition: transform .2s ease, box-shadow .2s ease;
}
.notfound { text-align: center; margin-bottom: 24px; }
.big { font-size: 64px; margin: 0; }

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space); }
.link-card { display: flex; flex-direction: column; gap: 4px; text-decoration: none; color: var(--color-text); font-size: 24px; }
.link-card strong { font-size: 18px; }
.link-card span { font-size: 14px; color: var(--color-muted); }
.link-card:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(0,0,0,.1); }

.button { transition: transform .2s ease; }
.button:hover { transform: scale(1.05); }

a:focus-visible, button:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}`,
          }),
        ],
        quiz: [
          Q(`What makes hover effects feel smooth instead of jumpy?`,
            ['{{transition}}', '{{display: none}}', '{{z-index}}', '{{float}}'], 0,
            `{{transition}} animates between the normal and hover styles.`),
          Q(`Why add {{:focus-visible}} styles?`,
            ['To make text bigger', 'So keyboard users can see which element is selected', 'To hide links', 'Search engines require it'], 1,
            `Without a visible focus style, keyboard users can't tell where they are on the page.`),
          Q(`What does {{prefers-reduced-motion}} let you do?`,
            ['Speed up the site', 'Turn off animations for people who’ve asked their device for less motion', 'Disable JavaScript', 'Reduce file size'], 1,
            `Some people get dizzy or distracted by motion, and their system setting tells you to tone it down.`),
        ],
      },
    ],
    quiz: [
      Q(`What's the correct order for building a site?`,
        ['Code → plan → content', 'Plan (goal, sitemap, wireframes) → set up → build pages → polish', 'Polish → plan → code', 'Buy a domain → code → plan'], 1,
        `Plan first, then set up a solid foundation, build, and polish.`),
      Q(`Where should site-wide colours and spacing be defined?`,
        ['As CSS variables in {{:root}}', 'Inline on every element', 'In each HTML file', 'In the footer'], 0,
        `One source of truth keeps everything consistent.`),
      Q(`On {{about.html}}, which nav link should have {{aria-current="page"}}?`,
        ['Home', 'Projects', 'About', 'All of them'], 2,
        `Only the link to the page you're on.`),
      Q(`What does a static site need to receive contact-form messages?`,
        ['Nothing extra', 'A form service such as Formspree or Netlify Forms', 'A database on your laptop', 'An {{alert()}}'], 1,
        `A form service receives submissions and emails them to you.`),
      Q(`Which is a good polish step before launching?`,
        ['Tab through every page with only the keyboard', 'Remove all alt text', 'Add five more fonts', 'Turn off the viewport tag'], 0,
        `Keyboard testing quickly reveals focus and accessibility problems.`),
    ],
    exercise: {
      title: 'Build your complete portfolio',
      minutes: 120,
      blocks: [
        P(`This is the big one: build your own four-page portfolio **on your computer**, in VS Code. Use the lessons in this module as your guide, and reuse code from the live examples freely.`),
        P(`The workspace below is a scratchpad for trying ideas before you put them in your real files. Here it's pre-loaded with the shared header, footer, and stylesheet.`),
        TIP(`Work page by page: get {{index.html}} looking right first, then copy it as the template for the others. Save often, and check your phone layout as you go.`),
      ],
      goals: [
        `Create the project folder: {{index.html}}, {{projects.html}}, {{about.html}}, {{contact.html}}, plus {{css/}}, {{js/}}, and {{images/}}`,
        `Write one shared {{styles.css}} with CSS variables in {{:root}}`,
        `Add the same header (with a working mobile menu) and footer to every page`,
        `Home: a hero with your headline and a call-to-action, plus three highlights`,
        `Projects: at least three project cards with images, descriptions, and links`,
        `About: photo, story, and skills. Contact: a working form (Formspree) and an email link`,
        `Polish: hover and focus styles, a favicon, and a friendly {{404.html}}`,
        `Test every link, keyboard navigation, and the layout at phone width`,
      ],
      starter: {
        prompt: `A scratchpad with the shared pieces ready. Build your home page here first.`,
        html: NAV_HTML + `
<main class="container">
  <!-- TODO: your hero section -->
  <h1>Your headline here</h1>

  <!-- TODO: three highlights -->
</main>
` + FOOTER_HTML,
        css: BASE_CSS + NAV_CSS + FOOTER_CSS + `
/* ===== Your page styles go below ===== */
`,
        js: NAV_JS,
      },
    },
  });
})();
