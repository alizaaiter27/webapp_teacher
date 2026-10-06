/* ==========================================================
   MODULE 4 · CSS
   ========================================================== */
(function () {
  const { P, H, UL, OL, ANALOGY, TIP, WARN, CODE, TRY, STEPS, RAW, Q } = window.ZTL;

  // A small page reused by several lessons so learners can focus on the CSS.
  const SAMPLE_PAGE = `
<header>
  <h1>Alex Rivera</h1>
  <p class="tagline">Future web developer · coffee enthusiast</p>
</header>
<main>
  <section class="card">
    <h2>About me</h2>
    <p>I'm learning to build websites, one lesson at a time.</p>
    <a class="button" href="#contact">Say hello</a>
  </section>
</main>`;

  window.ZTL.addModule({
    id: 'm4',
    icon: '🎨',
    title: 'CSS: Making It Beautiful',
    summary: `Turn plain HTML into a beautiful, well-laid-out page with colours, fonts, spacing, Flexbox, Grid, and responsive design.`,
    goal: `By the end of this module you'll be able to style any page you build, and make it look great on phones and big screens alike.`,
    lessons: [
      {
        id: 'm4-l1',
        title: 'How CSS works',
        minutes: 8,
        intro: `Rules, properties, and values: the grammar of style.`,
        milestone: `You just styled your first web page! 🎨`,
        blocks: [
          P(`**CSS** stands for **Cascading Style Sheets**. HTML says *what* things are; CSS says *how they look*: colours, fonts, sizes, spacing, and where everything sits on the page.`),
          ANALOGY(`Getting dressed`, `HTML is the person: head, body, arms, legs. CSS is the outfit. The same person can look completely different depending on what they wear, and the same HTML can look completely different with different CSS.`),
          H(`Anatomy of a CSS rule`),
          P(`CSS is written as **rules**. Each rule picks some elements, then lists what to change about them:`),
          RAW(`<div class="diagram"><div class="anatomy" role="img" aria-label="A CSS rule: selector h1, then a declaration block with property color and value tomato">
            <span class="c3"><b>h1</b><i>selector (which elements)</i></span>
            <span class="c1"><b>{</b><i>&nbsp;</i></span>
            <span class="c5"><b>color</b><i>property (what to change)</i></span>
            <span class="c1"><b>:</b><i>&nbsp;</i></span>
            <span class="c4"><b>tomato</b><i>value (change it to)</i></span>
            <span class="c1"><b>;</b><i>end of line</i></span>
            <span class="c1"><b>}</b><i>&nbsp;</i></span>
          </div><p class="diagram-cap">Selector + curly braces + <strong>property: value;</strong> pairs = one rule</p></div>`),
          CODE('css', `
/* Make every h1 tomato red and centred */
h1 {
  color: tomato;
  text-align: center;
}

/* Give every paragraph a bigger, airier look */
p {
  font-size: 18px;
  line-height: 1.6;
}`, 'styles.css'),
          P(`Each {{property: value;}} line is called a **declaration**. Don't forget the colon between property and value, and the semicolon at the end. Forgetting a semicolon is the most common CSS typo.`),
          H(`Three ways to add CSS`),
          CODE('html', `
<!-- 1. External stylesheet (✅ the best way) -->
<head>
  <link rel="stylesheet" href="css/styles.css">
</head>

<!-- 2. A <style> block inside the <head> (fine for small experiments) -->
<style>
  h1 { color: tomato; }
</style>

<!-- 3. Inline, on a single element (avoid: hard to maintain) -->
<h1 style="color: tomato;">Hello</h1>`, 'Adding CSS'),
          P(`Use an **external stylesheet** for real projects: one {{.css}} file shared by every page. Change one line and your whole site updates.`),
          H(`What does “cascading” mean?`),
          P(`When two rules disagree, CSS needs a way to decide who wins. Here's the simple version: **if two rules are equally specific, the one that comes later wins**. (The next lesson covers specificity: why some selectors beat others.)`),
          CODE('css', `
p { color: blue; }
p { color: green; }   /* ← this one wins: it comes later */`, 'The cascade'),
          P(`Many properties also **inherit**: set a font on the {{body}} and every element inside it uses that font too, unless told otherwise.`),
          TIP(`In the live editor, CSS goes in the **CSS tab**. Behind the scenes it works just like a {{<style>}} block. In your real project, it would live in {{css/styles.css}}.`),
          TRY({
            title: 'Style your first page',
            focus: 'css',
            prompt: `This HTML has no styling yet except the rules below. Change {{tomato}} to another colour (try {{teal}}, {{orchid}}, or {{#4f46e5}}), then add a new rule that styles the {{p}} elements.`,
            html: SAMPLE_PAGE,
            css: `
body {
  font-family: system-ui, sans-serif;
}

h1 {
  color: tomato;
  text-align: center;
}

/* Add a rule for p below */
`,
          }),
        ],
        quiz: [
          Q(`In {{h1 { color: red; }}}, what is {{color}}?`,
            ['The selector', 'The property', 'The value', 'The tag'], 1,
            `{{h1}} is the selector, {{color}} is the property, and {{red}} is the value.`),
          Q(`What's the best way to add CSS to a real multi-page website?`,
            ['Inline styles on every element', 'An external stylesheet linked with {{<link>}}', 'A {{<style>}} block copied into every page', 'Images of styled text'], 1,
            `One external {{.css}} file, linked from every page, keeps your styles in one place.`),
          Q(`Two equally specific rules set different colours on {{p}}. Which wins?`,
            ['The first one', 'The one that comes later', 'Neither, so the text stays black', 'The browser picks randomly'], 1,
            `That's the “cascade”: when rules are equally specific, the later one wins.`),
        ],
      },

      {
        id: 'm4-l2',
        title: 'Selectors',
        minutes: 9,
        intro: `How to point at exactly the elements you want to style.`,
        blocks: [
          P(`The **selector** is the part of a rule that says *which* elements to style. Get good at selectors and CSS becomes much easier.`),
          H(`The three essential selectors`),
          CODE('css', `
/* 1. Type selector: every element of that type */
p { color: #333; }

/* 2. Class selector (starts with a dot): any element with class="highlight" */
.highlight { background: yellow; }

/* 3. ID selector (starts with #): the ONE element with id="hero" */
#hero { font-size: 48px; }`, 'Type, class, and ID'),
          CODE('html', `
<p>A normal paragraph.</p>
<p class="highlight">This one is highlighted.</p>
<li class="highlight">Classes can be reused on any element.</li>
<section id="hero">An id is unique on the page.</section>

<!-- An element can have several classes, separated by spaces -->
<a class="button button-big" href="#">Sign up</a>`, 'Using classes and ids in HTML'),
          TIP(`**Use classes for almost all your styling.** They're reusable and easy to combine. Save IDs for things like anchor links ({{#contact}}) and JavaScript.`),
          H(`Combining selectors`),
          CODE('css', `
/* Grouping: same style for several selectors */
h1, h2, h3 { font-family: Georgia, serif; }

/* Descendant: links INSIDE a nav (space between) */
nav a { text-decoration: none; }

/* Element with a class: only buttons that have class="primary" */
button.primary { background: royalblue; }`, 'Combining selectors'),
          H(`Pseudo-classes: styling states`),
          P(`Pseudo-classes start with a colon and target an element in a particular **state**:`),
          CODE('css', `
a:hover { color: tomato; }          /* mouse is over it */
button:focus-visible { outline: 3px solid orange; }   /* selected with the keyboard */
li:first-child { font-weight: bold; }   /* the first item in a list */
li:nth-child(even) { background: #f3f3f3; }   /* every other item */`, 'Pseudo-classes'),
          H(`Specificity: who wins?`),
          P(`When rules conflict, the **more specific** selector wins, no matter the order. Think of it as a score:`),
          UL(
            `**Type selectors** ({{p}}, {{h1}}): weakest.`,
            `**Class selectors** ({{.card}}, {{:hover}}): stronger.`,
            `**ID selectors** ({{#hero}}): stronger still.`,
            `**Inline styles** ({{style="..."}}): strongest of all.`
          ),
          ANALOGY(`Name tags`, `Saying “hey, person!” ({{p}}) is vague. “Hey, person in the red jacket!” ({{.red-jacket}}) is more specific. “Hey, Jordan!” ({{#jordan}}) is the most specific of all. The most specific call is the one that gets answered.`),
          WARN(`If a style “isn't working”, a more specific rule is often overriding it. Right-click → Inspect, and the Styles panel shows overridden rules crossed out.`, `Style not applying?`),
          TRY({
            title: 'Target the right elements',
            focus: 'css',
            prompt: `Hover over the menu links to see {{:hover}} in action. Then: give the second list item {{class="featured"}} in the HTML and write a {{.featured}} rule that makes it stand out.`,
            html: `
<nav>
  <a href="#">Home</a>
  <a href="#">Projects</a>
  <a href="#">Contact</a>
</nav>

<h2>My skills</h2>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>Patience</li>
</ul>

<p class="note">Classes are reusable. <span class="note">Even inside other notes.</span></p>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }

nav a {
  margin-right: 12px;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
}
nav a:hover { color: tomato; text-decoration: underline; }

li:first-child { font-weight: bold; }

.note { background: #fef3c7; padding: 2px 6px; border-radius: 4px; }

/* Write your .featured rule here */
`,
          }),
        ],
        quiz: [
          Q(`Which selector targets every element with {{class="card"}}?`,
            ['{{card}}', '{{#card}}', '{{.card}}', '{{*card}}'], 2,
            `Class selectors start with a dot: {{.card}}. A {{#}} is for ids.`),
          Q(`What does {{nav a}} select?`,
            ['All {{nav}} elements and all {{a}} elements', 'Only {{a}} elements inside a {{nav}}', 'Only the first link', 'A nav with class “a”'], 1,
            `A space means “inside”. {{nav a}} selects links that live somewhere inside a {{nav}}.`),
          Q(`{{p { color: blue; }}} comes after {{.intro { color: red; }}}. A paragraph has {{class="intro"}}. What colour is it?`,
            ['Blue, because it comes later', 'Red, because the class selector is more specific', 'Purple', 'Black'], 1,
            `Specificity beats order: a class selector is more specific than a type selector.`),
        ],
      },

      {
        id: 'm4-l3',
        title: 'Colours and backgrounds',
        minutes: 8,
        intro: `Named colours, hex codes, gradients, and how to keep text readable.`,
        blocks: [
          P(`Two properties do most of the colour work: {{color}} sets the **text** colour, and {{background-color}} sets the colour **behind** an element.`),
          H(`Four ways to write a colour`),
          CODE('css', `
h1 { color: tomato; }                    /* 1. Named colour (about 140 to choose from) */
h1 { color: #ff6347; }                   /* 2. Hex code: red, green, blue in pairs */
h1 { color: rgb(255, 99, 71); }          /* 3. RGB: amounts of red, green, blue (0–255) */
h1 { color: hsl(9, 100%, 64%); }         /* 4. HSL: hue, saturation, lightness */

/* Add transparency with a 4th value */
.overlay { background-color: rgb(0 0 0 / 50%); }   /* 50% see-through black */`, 'All four lines are the same tomato red'),
          UL(
            `**Named colours** are easy to read: {{red}}, {{teal}}, {{rebeccapurple}}.`,
            `**Hex codes** like {{#4f46e5}} are what designers usually hand you.`,
            `**HSL** is the easiest to tweak by hand: keep the hue, change the lightness to make shades of the same colour.`
          ),
          TIP(`Use your browser's colour picker: in DevTools, click any colour square in the Styles panel. Or try [coolors.co](https://coolors.co) for ready-made palettes.`),
          H(`Backgrounds`),
          CODE('css', `
body { background-color: #f5f3ff; }

/* A gradient that fades from one colour to another */
.hero {
  background: linear-gradient(135deg, #6366f1, #14b8a6);
}

/* A background image that covers the whole area */
.banner {
  background-image: url("../images/mountains.jpg");
  background-size: cover;      /* fill the box, cropping if needed */
  background-position: center;
}`, 'Backgrounds'),
          H(`Contrast: can people actually read it?`),
          P(`Light grey text on a white background might look stylish, but many people (and anyone in bright sunlight) won't be able to read it. **Contrast** is the difference in brightness between text and its background.`),
          UL(
            `✅ Dark text on a light background (or the reverse) is safest.`,
            `✅ Aim for a contrast ratio of at least **4.5 : 1** for normal text. DevTools shows this ratio when you click a colour.`,
            `❌ Avoid yellow on white, light grey on white, or red on green.`
          ),
          WARN(`Never use colour **alone** to communicate something, like “required fields are red”. About 1 in 12 men are colour-blind. Add an icon or text too.`, `Colour isn't enough`),
          TRY({
            title: 'Paint a profile card',
            focus: 'css',
            prompt: `Change the gradient colours on {{header}}, then try changing the {{.card}} background. Bonus: change the {{.tagline}} colour to light grey and notice how hard it gets to read. That's contrast in action.`,
            html: SAMPLE_PAGE,
            css: `
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  background-color: #f5f3ff;
  color: #1f2937;
}

header {
  background: linear-gradient(135deg, #6366f1, #14b8a6);
  color: white;
  padding: 32px 20px;
}
.tagline { color: rgb(255 255 255 / 85%); }

.card {
  background-color: white;
  margin: 20px;
  padding: 20px;
}

.button {
  background-color: #f97316;
  color: white;
  padding: 8px 14px;
  text-decoration: none;
}`,
          }),
        ],
        quiz: [
          Q(`Which property changes the colour of **text**?`,
            ['{{background-color}}', '{{text-color}}', '{{color}}', '{{font-color}}'], 2,
            `Just {{color}}. ({{text-color}} and {{font-color}} don't exist.)`),
          Q(`What does the hex code {{#ffffff}} represent?`,
            ['Black', 'White', 'Red', 'Transparent'], 1,
            `{{ff}} is the maximum for red, green, and blue. All three at maximum makes white. {{#000000}} is black.`),
          Q(`Why does colour contrast matter?`,
            ['It makes pages load faster', 'Low contrast text is hard or impossible for many people to read', 'Search engines require purple', 'It doesn’t matter'], 1,
            `Good contrast keeps your text readable for people with low vision, on cheap screens, and in bright sunlight.`),
        ],
      },

      {
        id: 'm4-l4',
        title: 'Fonts and text',
        minutes: 8,
        intro: `Typography: choosing fonts and making text a pleasure to read.`,
        blocks: [
          P(`Most of the web is text, so good typography makes a huge difference. These are the properties you'll use constantly:`),
          CODE('css', `
body {
  font-family: "Inter", system-ui, sans-serif;  /* which font (with backups) */
  font-size: 18px;          /* how big */
  line-height: 1.6;         /* space between lines (1.5–1.7 is comfy) */
  color: #222;
}

h1 {
  font-weight: 800;         /* boldness: 400 = normal, 700 = bold */
  letter-spacing: -0.02em;  /* tighten big headings slightly */
}

.caption {
  font-style: italic;
  text-align: center;       /* left | center | right */
  text-transform: uppercase;
}

a { text-decoration: none; }   /* remove the underline */`, 'Text properties'),
          H(`Font stacks: always have a backup`),
          P(`{{font-family}} takes a **list**. If the first font isn't available, the browser tries the next one. Always end with a generic family: {{sans-serif}}, {{serif}}, or {{monospace}}.`),
          UL(
            `**Sans-serif** fonts (no little “feet”) feel clean and modern: great for most websites.`,
            `**Serif** fonts (with feet) feel classic and bookish: nice for headings or long articles.`,
            `**Monospace** fonts give every letter the same width: used for code.`
          ),
          H(`Using Google Fonts`),
          STEPS(
            [`Pick a font`, `Browse [fonts.google.com](https://fonts.google.com). Popular choices: Inter, Poppins, Lora, DM Sans.`],
            [`Copy the link tag`, `Click “Get font” → “Get embed code” and copy the {{<link>}} tags.`],
            [`Paste it into your <head>`, `Above your own stylesheet link.`],
            [`Use it in CSS`, `{{font-family: "Poppins", sans-serif;}}`]
          ),
          CODE('html', `
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>`, 'Loading a Google Font'),
          TIP(`Stick to **one or two fonts** per site, for example one for headings and one for body text. More than that starts to look messy.`),
          H(`Units: px, rem, and em`),
          UL(
            `{{px}}: pixels. Fixed and easy to understand.`,
            `{{rem}}: relative to the page's base font size (usually 16px), so {{2rem}} = 32px. If a visitor increases their browser's text size, {{rem}} sizes grow with it. **Great for font sizes.**`,
            `{{em}}: relative to the current element's font size. Handy for spacing that should scale with the text.`
          ),
          TRY({
            title: 'Give your page some personality',
            focus: 'css',
            prompt: `This preview loads two Google Fonts. Swap the heading font between {{"Lora"}} and {{"Poppins"}}, then play with {{line-height}} and {{font-size}} until the paragraph feels comfortable to read.`,
            html: `
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@600&family=Poppins:wght@400;700&display=swap" rel="stylesheet">

<article>
  <p class="kicker">Lesson notes</p>
  <h1>Typography is the voice of your website</h1>
  <p>The same words feel completely different in a different font. A friendly rounded font says “welcome!”, a classic serif says “trust me”, and a monospace font says “I'm technical”.</p>
  <p class="caption">— Every designer, ever</p>
</article>`,
            css: `
body {
  font-family: "Poppins", system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #1f2937;
  max-width: 560px;
  margin: 24px auto;
  padding: 0 16px;
}

h1 {
  font-family: "Lora", Georgia, serif;
  font-size: 2.2rem;
  line-height: 1.2;
}

.kicker {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.8rem;
  font-weight: 700;
  color: #0d8a7f;
}

.caption { font-style: italic; text-align: right; color: #6b7280; }`,
          }),
        ],
        quiz: [
          Q(`Why end a {{font-family}} list with something like {{sans-serif}}?`,
            ['It’s required syntax', 'It’s a backup in case the other fonts aren’t available', 'It makes text bold', 'It loads faster'], 1,
            `If none of the named fonts load, the browser uses its default font of that general style.`),
          Q(`What is a comfortable {{line-height}} for body text?`,
            ['0.5', 'About 1.5 to 1.7', '5', 'It doesn’t matter'], 1,
            `Around 1.5–1.7 gives lines room to breathe without drifting apart.`),
          Q(`If the base font size is 16px, how big is {{2rem}}?`,
            ['2px', '16px', '32px', '200%'], 2,
            `{{rem}} multiplies the root font size: 2 × 16px = 32px.`),
        ],
      },

      {
        id: 'm4-l5',
        title: 'The box model',
        minutes: 10,
        intro: `The single most important idea in CSS layout: everything is a box.`,
        blocks: [
          P(`Here's a secret that makes CSS click: **every element on a page is a rectangular box**. Headings, paragraphs, images, links: all boxes. Each box has four layers:`),
          RAW(`<div class="diagram"><div style="max-width:420px;margin:0 auto;font-family:var(--mono);font-size:13px;text-align:center">
            <div style="border:2px dashed #ea580c;background:color-mix(in srgb,#ea580c 10%,transparent);padding:10px 22px 22px;border-radius:12px">
              <div style="color:#ea580c;font-weight:600;margin-bottom:8px">margin: space outside</div>
              <div style="border:6px solid #6366f1;padding:10px 20px 20px;border-radius:8px">
                <div style="color:#6366f1;font-weight:600;margin-bottom:8px">border</div>
                <div style="background:color-mix(in srgb,#14b8a6 18%,transparent);padding:10px 20px 20px;border-radius:6px">
                  <div style="color:#0d8a7f;font-weight:600;margin-bottom:8px">padding: space inside</div>
                  <div style="background:color-mix(in srgb,#2563eb 18%,transparent);padding:18px;border-radius:4px;font-weight:600">content</div>
                </div>
              </div>
            </div>
          </div><p class="diagram-cap">Content → padding → border → margin, from the inside out</p></div>`),
          UL(
            `**Content**: the text or image itself.`,
            `**Padding**: space *inside* the box, between the content and the border.`,
            `**Border**: a line around the padding (can be invisible).`,
            `**Margin**: space *outside* the box, pushing other boxes away.`
          ),
          ANALOGY(`A framed picture`, `The **content** is the photo. The **padding** is the white mat around it. The **border** is the frame. The **margin** is the empty wall space you leave between it and the next picture.`),
          CODE('css', `
.card {
  width: 300px;
  padding: 20px;                 /* all four sides */
  border: 2px solid #ddd;        /* width, style, colour */
  margin: 16px;
  border-radius: 12px;           /* rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);   /* soft shadow */
}

/* Different values per side: top, right, bottom, left (clockwise) */
.banner { padding: 10px 20px 30px 40px; }

/* Two values: top/bottom, then left/right */
.button { padding: 8px 16px; }

/* Or one side at a time */
h2 { margin-top: 40px; }`, 'Box model properties'),
          H(`The box-sizing fix`),
          P(`By default, {{width}} only sets the *content* width, and padding and border are added on top. So a 300px box with 20px padding is actually 344px wide! This confuses everyone. Almost every developer adds this at the top of their stylesheet:`),
          CODE('css', `
*, *::before, *::after {
  box-sizing: border-box;   /* width now INCLUDES padding and border */
}`, 'Put this at the top of every stylesheet'),
          H(`Centring a box`),
          CODE('css', `
.container {
  max-width: 800px;   /* never wider than 800px... */
  margin: 0 auto;     /* ...and centred horizontally */
  padding: 0 16px;    /* breathing room on small screens */
}`, 'The classic centred container'),
          H(`Block vs. inline`),
          UL(
            `**Block** elements ({{div}}, {{p}}, {{h1}}, {{section}}) start on a new line and stretch the full width.`,
            `**Inline** elements ({{a}}, {{strong}}, {{span}}) flow inside text and only take up as much room as they need. Width, height, and vertical margins don't work on them.`,
            `{{display: inline-block;}} gives you both: it sits in a line *and* respects width, height, and padding. Great for buttons.`
          ),
          TIP(`Lost in spacing? Open DevTools, select an element, and look at the box diagram at the bottom of the Styles panel. Hovering an element also shows its margin (orange) and padding (green).`),
          TRY({
            title: 'Play with boxes',
            focus: 'css',
            prompt: `Change the {{padding}}, {{border}}, and {{margin}} values on {{.card}} and watch how the box changes. Try removing the {{box-sizing}} line and see the card get wider.`,
            html: `
<div class="container">
  <div class="card">
    <h2>Padding</h2>
    <p>Space inside the border.</p>
  </div>
  <div class="card">
    <h2>Margin</h2>
    <p>Space between this card and the one above.</p>
    <a class="button" href="#">A button</a>
  </div>
</div>`,
            css: `
* { box-sizing: border-box; }

body { font-family: system-ui, sans-serif; background: #f1f5f9; margin: 0; }

.container {
  max-width: 420px;
  margin: 0 auto;
  padding: 16px;
}

.card {
  width: 100%;
  background: white;
  padding: 20px;
  border: 3px solid #6366f1;
  border-radius: 14px;
  margin-bottom: 24px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.card h2 { margin-top: 0; }

.button {
  display: inline-block;
  padding: 10px 18px;
  background: #6366f1;
  color: white;
  border-radius: 999px;
  text-decoration: none;
}`,
          }),
        ],
        quiz: [
          Q(`Which part of the box model is the space **between the content and the border**?`,
            ['Margin', 'Padding', 'Outline', 'Content'], 1,
            `Padding is inside the border; margin is outside it.`),
          Q(`What does {{box-sizing: border-box}} do?`,
            ['Adds a border to every box', 'Makes width include padding and border', 'Removes all margins', 'Turns elements into flexboxes'], 1,
            `With {{border-box}}, a 300px-wide box stays 300px wide, padding and border included.`),
          Q(`How do you centre a block with a {{max-width}} horizontally?`,
            ['{{text-align: center}}', '{{margin: 0 auto}}', '{{padding: center}}', '{{float: middle}}'], 1,
            `Automatic left and right margins split the leftover space evenly, which centres the box.`),
        ],
      },

      {
        id: 'm4-l6',
        title: 'Flexbox',
        minutes: 10,
        intro: `Lining things up in a row or column: navbars, cards, and perfect centring.`,
        blocks: [
          P(`**Flexbox** is a layout tool for arranging items in **one direction**, either a row or a column. It's perfect for navigation bars, rows of buttons, and centring things (which used to be famously hard).`),
          P(`You turn it on for a **parent** (the container), and it arranges the **children** (the items) inside:`),
          CODE('css', `
.navbar {
  display: flex;                  /* turn on flexbox: children line up in a row */
  justify-content: space-between; /* spread along the row */
  align-items: center;            /* line up vertically */
  gap: 16px;                      /* space between items */
}`, 'A flex container'),
          ANALOGY(`Books on a shelf`, `The shelf is the flex container. The books are the items. {{justify-content}} decides how books spread along the shelf (bunched left, centred, evenly spaced). {{align-items}} decides how they line up vertically (tops aligned, centred, bottoms aligned).`),
          H(`The properties you'll use 90% of the time`),
          UL(
            `{{flex-direction}}: {{row}} (default, side by side) or {{column}} (stacked).`,
            `{{justify-content}}: spacing along the main direction: {{flex-start}}, {{center}}, {{flex-end}}, {{space-between}}, {{space-around}}.`,
            `{{align-items}}: alignment across the other direction: {{stretch}} (default), {{center}}, {{flex-start}}, {{flex-end}}.`,
            `{{gap}}: space between items. Much easier than margins!`,
            `{{flex-wrap: wrap}}: let items wrap onto a new line when they run out of room.`
          ),
          H(`On the items: flex`),
          CODE('css', `
.sidebar { width: 250px; }   /* fixed width */
.content { flex: 1; }        /* "take up all the remaining space" */`, 'Growing items'),
          H(`Perfect centring in 3 lines`),
          CODE('css', `
.hero {
  display: flex;
  justify-content: center;   /* centre horizontally */
  align-items: center;       /* centre vertically */
  min-height: 100vh;         /* full screen height */
}`, 'The famous centring trick'),
          TIP(`Flexbox is for **one direction** (a row *or* a column). For two-dimensional layouts (rows *and* columns at once, like a photo gallery), reach for Grid, which is coming up next.`),
          TRY({
            title: 'Build a navbar and a card row',
            focus: 'css',
            prompt: `Change {{justify-content}} on {{nav}} to {{center}}, then {{flex-end}}. On {{.cards}}, change {{flex-direction}} to {{column}}. Finally, make the preview narrower (or add more cards) to see {{flex-wrap}} kick in.`,
            html: `
<nav>
  <a class="logo" href="#">🚀 Alex</a>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Projects</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

<div class="cards">
  <div class="card">🎨 Design</div>
  <div class="card">💻 Code</div>
  <div class="card">🚀 Launch</div>
</div>`,
            css: `
body { font-family: system-ui, sans-serif; margin: 0; background: #f8fafc; }

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: #1e1b4b;
}
nav a { color: white; text-decoration: none; }
.logo { font-weight: 800; font-size: 20px; }

nav ul {
  display: flex;
  gap: 18px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
}
.card {
  flex: 1;
  min-width: 140px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}`,
          }),
        ],
        quiz: [
          Q(`Where do you put {{display: flex}}?`,
            ['On each child item', 'On the parent container', 'On the {{<html>}} tag only', 'In the HTML'], 1,
            `Flexbox is switched on for a container; its direct children become flex items.`),
          Q(`Which property spreads items along the main direction (like space-between)?`,
            ['{{align-items}}', '{{justify-content}}', '{{flex-wrap}}', '{{text-align}}'], 1,
            `{{justify-content}} controls spacing along the row (or column). {{align-items}} works across it.`),
          Q(`What does {{flex: 1}} on an item do?`,
            ['Makes it 1px wide', 'Makes it take up the remaining space', 'Hides it', 'Puts it first'], 1,
            `{{flex: 1}} lets an item grow to fill the leftover space in the container.`),
        ],
      },

      {
        id: 'm4-l7',
        title: 'CSS Grid',
        minutes: 9,
        intro: `Two-dimensional layouts: galleries, dashboards, and whole pages.`,
        blocks: [
          P(`**CSS Grid** lays items out in **rows and columns at the same time**, like a spreadsheet or a photo gallery. You define the columns on the container, and the items flow into the cells.`),
          CODE('css', `
.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* three equal columns */
  gap: 16px;                            /* space between cells */
}`, 'A three-column grid'),
          H(`The fr unit`),
          P(`{{fr}} means “a **fr**action of the free space”. {{1fr 1fr 1fr}} gives three equal columns. {{2fr 1fr}} makes the first column twice as wide as the second. {{250px 1fr}} gives a fixed sidebar plus a flexible main area.`),
          CODE('css', `
grid-template-columns: repeat(4, 1fr);     /* shorthand for 1fr 1fr 1fr 1fr */
grid-template-columns: 250px 1fr;          /* sidebar + main content */`, 'More column patterns'),
          H(`The magic responsive grid`),
          P(`This one line creates a grid that automatically fits as many columns as there's room for, with no media queries needed:`),
          CODE('css', `
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}`, 'Responsive cards, no media queries'),
          P(`In plain English: “Make as many columns as fit. Each one is at least 220px wide, and they share any extra space equally.” On a phone you get one column; on a laptop, maybe four.`),
          H(`Spanning cells`),
          CODE('css', `
.featured {
  grid-column: span 2;   /* this item is two columns wide */
}`, 'Making one item bigger'),
          H(`Page layouts with named areas`),
          CODE('css', `
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
header { grid-area: header; }
aside  { grid-area: sidebar; }
main   { grid-area: main; }
footer { grid-area: footer; }`, 'A whole page layout'),
          TIP(`**Flexbox or Grid?** Use Flexbox for a single row or column of things (a navbar, a row of buttons). Use Grid when you're thinking in rows *and* columns (a gallery, a page layout). Mixing both is completely normal.`),
          TRY({
            title: 'Build a photo gallery',
            focus: 'css',
            prompt: `Change {{220px}} in {{minmax}} to {{150px}} or {{300px}} and watch the number of columns change. Then give the first item {{class="featured"}} in the HTML.`,
            html: `
<h2>My travel gallery 📸</h2>
<div class="gallery">
  <img src="https://picsum.photos/id/1015/400/300" alt="River valley between mountains">
  <img src="https://picsum.photos/id/1016/400/300" alt="Canyon at sunset">
  <img src="https://picsum.photos/id/1018/400/300" alt="Green mountain landscape">
  <img src="https://picsum.photos/id/1019/400/300" alt="Ocean view from a cliff">
  <img src="https://picsum.photos/id/1036/400/300" alt="Snowy forest">
  <img src="https://picsum.photos/id/1039/400/300" alt="Waterfall in a forest">
</div>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px 16px; }

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.gallery img {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;   /* crop to fill, without stretching */
  border-radius: 10px;
  display: block;
}

.featured {
  grid-column: span 2;
  grid-row: span 2;
}`,
          }),
        ],
        quiz: [
          Q(`What does {{grid-template-columns: 1fr 1fr 1fr}} create?`,
            ['Three rows', 'Three equal columns', 'One column 3px wide', 'A 3D grid'], 1,
            `Three columns, each taking one equal fraction ({{fr}}) of the space.`),
          Q(`When is Grid usually a better choice than Flexbox?`,
            ['For a single row of buttons', 'For layouts with both rows and columns, like a gallery', 'Only for text', 'Never'], 1,
            `Grid shines in two dimensions. Flexbox is great for one row or one column.`),
          Q(`What does {{repeat(auto-fit, minmax(200px, 1fr))}} do?`,
            ['Creates exactly 200 columns', 'Fits as many columns of at least 200px as there’s room for', 'Makes every column 1px', 'Repeats the page'], 1,
            `It's a responsive grid in one line: the number of columns adapts to the screen width.`),
        ],
      },

      {
        id: 'm4-l8',
        title: 'Responsive design',
        minutes: 10,
        intro: `One website that looks great on a phone, a tablet, and a giant monitor.`,
        milestone: `Your pages now work on every screen size! 📱`,
        blocks: [
          P(`More than half of all web traffic comes from phones. **Responsive design** means your layout adapts to whatever screen it's on, instead of building separate sites for mobile and desktop.`),
          ANALOGY(`Water in a container`, `Responsive layouts behave like water: pour it into a tall glass or a wide bowl and it fills the shape. Your content should flow to fit the screen, whatever its size.`),
          H(`Ingredient 1: the viewport tag`),
          P(`Without this tag in your {{<head>}}, phones pretend to be a desktop screen and shrink everything down to unreadable size. (VS Code's {{!}} template already includes it.)`),
          CODE('html', `
<meta name="viewport" content="width=device-width, initial-scale=1.0">`, 'Required in every page'),
          H(`Ingredient 2: flexible sizes`),
          CODE('css', `
img { max-width: 100%; height: auto; }   /* images never overflow their container */

.container {
  width: 100%;
  max-width: 1100px;   /* use max-width instead of a fixed width */
  margin: 0 auto;
  padding: 0 16px;
}

h1 { font-size: clamp(2rem, 5vw, 3.5rem); }   /* grows with the screen, within limits */`, 'Flexible by default'),
          P(`{{vw}} means “percent of the viewport width”, so {{5vw}} = 5% of the screen width. {{clamp(min, preferred, max)}} keeps a value between a minimum and maximum.`),
          H(`Ingredient 3: media queries`),
          P(`A **media query** applies CSS only when a condition is true, usually “the screen is at least this wide”:`),
          CODE('css', `
/* Mobile first: these styles apply everywhere */
.cards {
  display: grid;
  grid-template-columns: 1fr;   /* one column on phones */
  gap: 16px;
}

/* From 600px wide and up (tablets) */
@media (min-width: 600px) {
  .cards { grid-template-columns: 1fr 1fr; }
}

/* From 1000px wide and up (laptops) */
@media (min-width: 1000px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}`, 'Media queries'),
          H(`Mobile-first`),
          P(`Notice the pattern above: write the **simple phone layout first**, then add media queries with {{min-width}} to enhance it for bigger screens. It's easier than squeezing a desktop design down, and it keeps phone CSS lean.`),
          STEPS(
            [`Write your base CSS for a phone`, `Single column, comfortable text, big tap targets.`],
            [`Widen the browser until it looks stretched`, `That width is your **breakpoint**.`],
            [`Add a media query at that breakpoint`, `Two columns, a horizontal menu, more whitespace…`],
            [`Repeat for bigger screens if needed`],
          ),
          TIP(`Test with the DevTools **device toolbar** (the phone icon), then on your real phone. Watch out for anything that causes sideways scrolling: that's the #1 sign something isn't responsive.`),
          TRY({
            title: 'Make a layout respond',
            focus: 'css',
            prompt: `This preview is narrow, so you're seeing the phone layout. Change {{600px}} in the first media query to {{300px}} to “trigger” the tablet layout, then try {{1000px}} → {{350px}} to see three columns. That's exactly what happens as screens get wider.`,
            html: `
<header class="hero">
  <h1>Hi, I'm Alex 👋</h1>
  <p>I build friendly websites.</p>
</header>

<section class="cards">
  <article class="card"><h2>🎨</h2><p>Design</p></article>
  <article class="card"><h2>💻</h2><p>Code</p></article>
  <article class="card"><h2>🚀</h2><p>Launch</p></article>
</section>`,
            css: `
* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; margin: 0; background: #f8fafc; }

.hero {
  padding: 32px 16px;
  text-align: center;
  background: linear-gradient(135deg, #6366f1, #14b8a6);
  color: white;
}
.hero h1 { font-size: clamp(1.8rem, 6vw, 3rem); margin: 0 0 8px; }

/* 📱 Mobile first: one column */
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 16px;
}
.card {
  background: white;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}
.card h2 { margin: 0; }

/* 💻 Tablet */
@media (min-width: 600px) {
  .cards { grid-template-columns: 1fr 1fr; }
}

/* 🖥️ Laptop */
@media (min-width: 1000px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
  .hero { text-align: left; padding: 60px 40px; }
}`,
          }),
        ],
        quiz: [
          Q(`What happens on phones if you forget the viewport meta tag?`,
            ['Nothing', 'The page shows as a tiny zoomed-out desktop layout', 'The page won’t load', 'Images disappear'], 1,
            `Without it, phones fake a desktop-width screen and shrink everything down.`),
          Q(`In a mobile-first stylesheet, which kind of media query do you mostly use?`,
            ['{{max-width}}', '{{min-width}}', '{{print}}', '{{orientation: upside-down}}'], 1,
            `Start with phone styles, then add {{min-width}} queries to enhance for bigger screens.`),
          Q(`Which rule stops images from overflowing small screens?`,
            ['{{img { width: 2000px; }}}', '{{img { max-width: 100%; height: auto; }}}', '{{img { display: none; }}}', '{{img { float: left; }}}'], 1,
            `{{max-width: 100%}} lets images shrink to fit, and {{height: auto}} keeps their proportions.`),
        ],
      },
    ],
    quiz: [
      Q(`Which selector is the **most** specific?`,
        ['{{p}}', '{{.intro}}', '{{#main-title}}', '{{*}}'], 2,
        `ID selectors beat classes, which beat type selectors.`),
      Q(`A box has {{width: 200px; padding: 20px; border: 5px solid;}} and {{box-sizing: border-box}}. How wide is it on screen?`,
        ['200px', '240px', '250px', '225px'], 0,
        `With {{border-box}}, the width already includes padding and border, so it's 200px.`),
      Q(`You want a navbar's links spaced across a single row. What's the natural choice?`,
        ['Flexbox', 'Grid with named areas', 'A table', 'Lots of spaces'], 0,
        `A single row of items is a perfect job for Flexbox.`),
      Q(`What does {{@media (min-width: 768px) { ... } }} mean?`,
        ['Only on screens narrower than 768px', 'Only on screens 768px wide or wider', 'Only when printing', 'Always'], 1,
        `{{min-width}} means “at least this wide”.`),
      Q(`Which is the friendliest unit for font sizes, because it respects the visitor's text-size settings?`,
        ['{{px}}', '{{rem}}', '{{cm}}', '{{pt}}'], 1,
        `{{rem}} scales with the visitor's base font size.`),
    ],
    exercise: {
      title: 'Style your “About Me” page',
      minutes: 40,
      blocks: [
        P(`Remember the plain “About Me” page from Module 3? Time to make it beautiful. The workspace has the HTML ready (with a few classes added) and a CSS skeleton with {{TODO}} comments.`),
        P(`When you're happy, copy the CSS into {{css/styles.css}} in your project and link it from {{index.html}} with {{<link rel="stylesheet" href="css/styles.css">}}.`),
        TIP(`Don't aim for perfect. Aim for “better than plain”. You can always come back and polish.`),
      ],
      goals: [
        `Set a font and comfortable {{line-height}} on {{body}}`,
        `Pick a colour palette: a background colour, text colour, and one accent colour`,
        `Centre the content with {{max-width}} and {{margin: 0 auto}}`,
        `Turn the navigation into a horizontal Flexbox menu`,
        `Style the sections as cards using padding, border-radius, and a shadow`,
        `Make the image round and the button look clickable, with a {{:hover}} effect`,
        `Add at least one media query that improves the layout on wider screens`,
      ],
      starter: {
        focus: 'css',
        prompt: `Work through the TODOs in the CSS tab. The HTML is ready for you.`,
        html: `
<header class="site-header">
  <h1>Alex Rivera</h1>
  <nav>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#hobbies">Hobbies</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main class="container">
  <section id="about" class="card">
    <img class="avatar" src="https://picsum.photos/id/64/200/200" alt="Portrait of Alex smiling" width="200" height="200">
    <h2>About me</h2>
    <p>I'm a <strong>future web developer</strong> from Toronto who loves design and coffee.</p>
  </section>

  <section id="hobbies" class="card">
    <h2>Things I love</h2>
    <ul>
      <li>Photography</li>
      <li>Rock climbing</li>
      <li>Building websites (new!)</li>
    </ul>
  </section>

  <section id="contact" class="card">
    <h2>Say hello</h2>
    <form>
      <label for="email">Your email</label>
      <input type="email" id="email" name="email" required>
      <button class="button" type="submit">Send</button>
    </form>
  </section>
</main>

<footer class="site-footer">
  <p>© 2026 Alex Rivera</p>
</footer>`,
        css: `
* { box-sizing: border-box; }

body {
  margin: 0;
  /* TODO: font-family, line-height, background and text colours */
}

.site-header {
  /* TODO: a background colour or gradient, padding, text colour */
}

.nav-links {
  /* TODO: display: flex, a gap, remove bullets (list-style: none) */
}

.container {
  /* TODO: max-width + margin: 0 auto + some padding */
}

.card {
  /* TODO: white background, padding, border-radius, box-shadow, margin-bottom */
}

.avatar {
  /* TODO: border-radius: 50% makes it a circle */
}

.button {
  /* TODO: colours, padding, no border, rounded corners, cursor: pointer */
}

/* TODO: a .button:hover rule */

/* TODO: a media query for wider screens, e.g. @media (min-width: 700px) */
`,
      },
    },
  });
})();
