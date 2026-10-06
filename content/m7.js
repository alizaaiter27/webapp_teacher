/* ==========================================================
   MODULE 7 · Best Practices
   ========================================================== */
(function () {
  const { P, H, UL, OL, ANALOGY, TIP, WARN, CODE, TRY, STEPS, RAW, Q } = window.ZTL;

  // A tiny automatic checker learners can run on their own HTML (used in 7.1 and 7.5).
  const AUDIT_JS = `
// 🔍 A mini accessibility checker. Run it, read the console, fix the HTML, repeat!
const problems = [];

document.querySelectorAll("img").forEach((img) => {
  if (!img.hasAttribute("alt")) problems.push("Image is missing alt text: " + img.src.slice(0, 40));
});

document.querySelectorAll("input, textarea, select").forEach((field) => {
  const hasLabel = field.id && document.querySelector('label[for="' + field.id + '"]');
  if (!hasLabel && !field.closest("label") && !field.getAttribute("aria-label")) {
    problems.push("Form field has no label: " + (field.name || field.type));
  }
});

document.querySelectorAll("a").forEach((a) => {
  const text = a.textContent.trim().toLowerCase();
  if (["click here", "here", "read more", "link"].includes(text)) problems.push('Vague link text: "' + text + '"');
});

document.querySelectorAll("[onclick]:not(button):not(a)").forEach((el) => {
  problems.push("A <" + el.tagName.toLowerCase() + "> is acting as a button. Use a real <button>.");
});

const h1s = document.querySelectorAll("h1").length;
if (h1s !== 1) problems.push("The page should have exactly one <h1> (found " + h1s + ")");

if (!document.documentElement.lang) problems.push('The <html> tag is missing a lang attribute');

if (problems.length === 0) {
  console.log("✅ No problems found. Nice work!");
} else {
  problems.forEach((p) => console.warn("⚠️ " + p));
  console.log(problems.length + " problem(s) to fix.");
}`;

  window.ZTL.addModule({
    id: 'm7',
    icon: '✅',
    title: 'Best Practices',
    summary: `Make your site usable by everyone, findable on Google, fast to load, and great on mobile, then test it like a pro.`,
    goal: `By the end of this module you'll know how to audit any website for accessibility, SEO, performance, and mobile-friendliness, and how to fix what you find.`,
    lessons: [
      {
        id: 'm7-l1',
        title: 'Accessibility (a11y)',
        minutes: 10,
        intro: `Building websites that everyone can use, including people with disabilities.`,
        blocks: [
          P(`**Web accessibility** means people with disabilities can perceive, understand, navigate, and use your site. It's often shortened to **a11y** (there are 11 letters between the “a” and the “y”).`),
          P(`About **1 in 6 people** worldwide has a disability. Accessibility helps people who are blind or have low vision, are deaf or hard of hearing, can't use a mouse, or have cognitive differences. It also helps everyone with a broken arm, a bright screen in the sun, or a baby in one hand.`),
          ANALOGY(`Ramps and curb cuts`, `Curb cuts (the ramps at street corners) were made for wheelchair users, but they help parents with strollers, travellers with suitcases, and delivery workers too. Accessible websites work the same way: they're better for *everyone*.`),
          H(`The big wins (most of which you already know!)`),
          UL(
            `**Semantic HTML**: {{<button>}}, {{<nav>}}, {{<main>}}, real headings. This alone solves a huge amount.`,
            `**Alt text** on meaningful images; {{alt=""}} on decorative ones.`,
            `**Labels** connected to every form field.`,
            `**Colour contrast** of at least 4.5 : 1 for normal text.`,
            `**Keyboard access**: everything clickable must be reachable with Tab and usable with Enter or Space.`,
            `**Visible focus styles**: never remove the focus outline without replacing it.`,
            `**Descriptive link text**: no “click here”.`,
            `**A {{lang}} attribute** on {{<html>}} so screen readers use the right pronunciation.`
          ),
          H(`Use real buttons`),
          CODE('html', `
<!-- ❌ Looks like a button, but keyboards and screen readers can't use it -->
<div class="btn" onclick="openMenu()">Menu</div>

<!-- ✅ A real button: focusable, works with Enter and Space, announced as "button" -->
<button class="btn" type="button" onclick="openMenu()">Menu</button>`, 'Buttons'),
          TIP(`**Rule of thumb:** if it takes you somewhere, it's a link ({{<a>}}). If it does something on this page, it's a {{<button>}}.`),
          H(`A skip link`),
          P(`Keyboard users have to Tab through your whole navigation on every page. A **skip link** (hidden until focused) lets them jump straight to the content:`),
          CODE('html', `
<a class="skip-link" href="#main">Skip to content</a>
...
<main id="main">...</main>`, 'Skip link'),
          CODE('css', `
.skip-link { position: absolute; left: -9999px; }
.skip-link:focus { left: 16px; top: 16px; background: white; padding: 8px 16px; }`, 'Hidden until focused'),
          H(`ARIA: use sparingly`),
          P(`**ARIA** attributes ({{aria-label}}, {{aria-expanded}}, {{aria-current}}…) add extra information for assistive technology. They're useful for custom widgets, but the first rule of ARIA is: **if a native HTML element does the job, use that instead.**`),
          TIP(`Try a screen reader! On Mac press {{Cmd+F5}} for VoiceOver; on Windows, NVDA is free. Five minutes listening to your own site is eye-opening.`, `Experience it yourself`),
          TRY({
            title: 'Fix an inaccessible page',
            prompt: `This page has several accessibility problems. Run the checker (it runs automatically) and read the warnings in the console. Fix the HTML until the console shows ✅. (Hint: missing alt, a missing label, vague link text, a fake button, and no lang.)`,
            html: `
<!DOCTYPE html>
<html>
<head><title>Bakery</title></head>
<body>
  <h1>Rosie's Bakery</h1>
  <img src="https://picsum.photos/id/431/300/180" width="300" height="180">

  <p>Fresh bread every morning. To see our menu, <a href="#">click here</a>.</p>

  <div class="btn" onclick="alert('Ordered!')">Order now</div>

  <h2>Newsletter</h2>
  <input type="email" name="email" placeholder="Your email">
  <p class="faint">We never share your email.</p>
</body>
</html>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
img { border-radius: 10px; }
.btn { display: inline-block; background: #be185d; color: white; padding: 10px 18px; border-radius: 8px; cursor: pointer; }
button.btn { border: 0; font: inherit; }
.faint { color: #d4d4d4; }  /* also a contrast problem: can you fix it? */`,
            js: AUDIT_JS,
          }),
        ],
        quiz: [
          Q(`Which element should you use for something that **does an action** on the page, like opening a menu?`,
            ['{{<div onclick>}}', '{{<button>}}', '{{<span>}}', '{{<a href="#">}}'], 1,
            `A real {{<button>}} is keyboard-accessible and announced correctly by screen readers, for free.`),
          Q(`What is the first rule of ARIA?`,
            ['Add ARIA to every element', 'If a native HTML element does the job, use it instead', 'ARIA replaces alt text', 'Only use ARIA in the footer'], 1,
            `Native elements come with accessibility built in. ARIA is for filling gaps.`),
          Q(`Who benefits from accessible websites?`,
            ['Only blind users', 'Only people using old browsers', 'Everyone, including people with temporary or situational limitations', 'Only search engines'], 2,
            `Like curb cuts, accessibility improvements help far more people than they were designed for.`),
        ],
      },

      {
        id: 'm7-l2',
        title: 'SEO basics',
        minutes: 9,
        intro: `Helping search engines find, understand, and show your site.`,
        blocks: [
          P(`**SEO** (Search Engine Optimisation) means making your site easy for search engines like Google to find and understand, so it shows up when people search for things you offer.`),
          H(`How search engines work`),
          STEPS(
            [`Crawl`, `Automated programs (“crawlers” or “bots”) follow links around the web, discovering pages.`],
            [`Index`, `They read each page and store what it's about in a giant database.`],
            [`Rank`, `When someone searches, the engine picks the most relevant, useful pages and orders them.`]
          ),
          ANALOGY(`A library catalogue`, `Search engines are librarians cataloguing every book in the world. Your job is to give your book a clear title, a good blurb on the back, and well-labelled chapters, so the librarian files it in the right place.`),
          H(`On-page essentials`),
          CODE('html', `
<head>
  <!-- The blue clickable headline in search results (about 50–60 characters) -->
  <title>Alex Rivera · Web Developer in Toronto</title>

  <!-- The grey snippet under it (about 150–160 characters) -->
  <meta name="description" content="Junior web developer building fast, accessible websites for small businesses. See my projects and get in touch.">
</head>`, 'Title and description'),
          UL(
            `**A unique {{<title>}} on every page** that describes that page.`,
            `**A {{meta description}}** that makes people want to click.`,
            `**One {{<h1>}}** and a logical heading structure. Search engines use headings to understand topics.`,
            `**Descriptive link text** and **alt text**: both help search engines too.`,
            `**Readable URLs**: {{/projects/recipe-app}} beats {{/page?id=7}}.`,
            `**Real, helpful content.** This matters most. Write for humans first.`
          ),
          H(`Looking good when shared`),
          P(`When someone shares your link on social media or in a chat app, **Open Graph** tags control the preview card:`),
          CODE('html', `
<meta property="og:title" content="Alex Rivera · Web Developer">
<meta property="og:description" content="Fast, accessible websites for small businesses.">
<meta property="og:image" content="https://alexrivera.dev/images/social-card.png">
<meta property="og:url" content="https://alexrivera.dev">`, 'Open Graph tags'),
          H(`Helping crawlers`),
          UL(
            `A {{sitemap.xml}} file lists all your pages for search engines.`,
            `A {{robots.txt}} file tells crawlers what they may and may not visit.`,
            `[Google Search Console](https://search.google.com/search-console) (free) shows how Google sees your site and lets you submit your sitemap.`
          ),
          WARN(`Ignore anyone who promises “#1 on Google guaranteed”. Keyword stuffing and buying links can get sites *penalised*. Good content plus good HTML is the real strategy.`, `SEO myths`),
          TRY({
            title: 'Preview your search result',
            prompt: `The JavaScript reads this page's {{<title>}} and {{meta description}} and draws a pretend search result. Rewrite both to be clear and enticing. The checker warns you if they're too long or too short.`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Home</title>
  <meta name="description" content="Welcome to my website.">
</head>
<body>
  <h2>Search result preview</h2>
  <div class="result">
    <div class="url">https://alexrivera.dev</div>
    <a class="title" id="r-title" href="#"></a>
    <p class="desc" id="r-desc"></p>
  </div>
</body>
</html>`,
            css: `
body { font-family: arial, sans-serif; padding: 0 16px; }
.result { max-width: 600px; padding: 12px 0; }
.url { font-size: 13px; color: #202124; }
.title { display: block; font-size: 20px; color: #1a0dab; text-decoration: none; margin: 4px 0; }
.title:hover { text-decoration: underline; }
.desc { font-size: 14px; color: #4d5156; line-height: 1.5; margin: 0; }`,
            js: `
const title = document.title;
const description = document.querySelector('meta[name="description"]').content;

document.querySelector("#r-title").textContent = title.length > 60 ? title.slice(0, 57) + "..." : title;
document.querySelector("#r-desc").textContent = description.length > 160 ? description.slice(0, 157) + "..." : description;

console.log("Title: " + title.length + " characters (aim for 30–60)");
console.log("Description: " + description.length + " characters (aim for 70–160)");
if (title.length < 30) console.warn("Your title is short. Add who you are and what you do.");
if (description.length < 70) console.warn("Your description is short. Tell searchers why they should click.");`,
          }),
        ],
        quiz: [
          Q(`What are the three main steps a search engine performs?`,
            ['Download, print, delete', 'Crawl, index, rank', 'Encrypt, compress, host', 'Style, script, structure'], 1,
            `Crawlers discover pages, indexing stores what they're about, and ranking orders the results.`),
          Q(`Which tag provides the grey snippet text often shown under a search result?`,
            ['{{<title>}}', '{{<meta name="description">}}', '{{<h1>}}', '{{<footer>}}'], 1,
            `The meta description is your one-to-two-sentence pitch in search results.`),
          Q(`What do Open Graph tags control?`,
            ['Page speed', 'How a link preview looks when shared on social media or chat apps', 'The browser tab icon', 'Font loading'], 1,
            `{{og:title}}, {{og:description}}, and {{og:image}} build the preview card.`),
        ],
      },

      {
        id: 'm7-l3',
        title: 'Performance',
        minutes: 9,
        intro: `Fast sites keep visitors. Here's how to make yours quick.`,
        blocks: [
          P(`People leave slow websites. Research consistently shows that as load time goes from 1 to 3 seconds, the chance of a visitor giving up rises sharply. Speed also affects your Google ranking and matters a lot for people on slow mobile data.`),
          ANALOGY(`Packing for a trip`, `Every file is luggage the visitor has to carry from the server. Huge photos are like packing bricks. The goal: bring only what you need, and make it as light as possible.`),
          H(`#1: Images (usually the biggest win)`),
          UL(
            `**Resize** images to the size they're displayed. A 4000px photo shown at 400px wastes 90% of its weight.`,
            `**Compress** them. [Squoosh](https://squoosh.app) often cuts file size by 70% with no visible difference.`,
            `**Use modern formats**: WebP or AVIF are much smaller than JPG and PNG.`,
            `**Lazy-load** images below the fold so they only download when the visitor scrolls near them.`,
            `**Set width and height** so the page doesn't jump around as images load.`
          ),
          CODE('html', `
<img src="images/project.webp"
     alt="Screenshot of the recipe app"
     width="600" height="400"
     loading="lazy">`, 'A fast image'),
          WARN(`Don't lazy-load the big image at the very top of the page (the one people see first). That would slow it down.`, `Lazy-load carefully`),
          H(`#2: Fewer, smaller files`),
          UL(
            `Only load the fonts and weights you actually use (e.g. 400 and 700, not all nine).`,
            `Add {{defer}} to your scripts so they don't block the page from appearing.`,
            `Think twice before adding big libraries. Do you need a 90 KB library for one animation?`,
            `Good hosts (Netlify, Vercel, GitHub Pages) automatically compress files and serve them from a **CDN**: copies of your site in data centres all over the world, close to your visitors.`
          ),
          H(`Measure, don't guess`),
          P(`Open DevTools → **Lighthouse** → Analyze page load. It scores your performance out of 100 and lists exactly what to fix. The **Network** panel shows every file and its size. Sort by size to find the heavy ones.`),
          TIP(`Google's **Core Web Vitals** measure three things: how quickly the main content appears (LCP), how quickly the page responds to a tap (INP), and how much it jumps around while loading (CLS). Lighthouse reports all three.`),
          TRY({
            title: 'See lazy loading in action',
            focus: 'html',
            prompt: `Each image logs a message to the console when it finishes downloading. Notice that only the first few load at first. Now scroll down inside the preview and watch more appear in the console as you go. Remove {{loading="lazy"}} from one and press Run to compare.`,
            html: `
<h2>Lazy-loading gallery</h2>
<p>Scroll down inside this preview ↓</p>
<div class="spacer"></div>
<img src="https://picsum.photos/id/10/400/240" alt="Forest path" width="400" height="240" loading="lazy">
<div class="spacer"></div>
<img src="https://picsum.photos/id/11/400/240" alt="Green field" width="400" height="240" loading="lazy">
<div class="spacer"></div>
<img src="https://picsum.photos/id/12/400/240" alt="Beach at dusk" width="400" height="240" loading="lazy">
<div class="spacer"></div>
<img src="https://picsum.photos/id/13/400/240" alt="Rocky coastline" width="400" height="240" loading="lazy">`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
img { display: block; max-width: 100%; height: auto; border-radius: 10px; background: #e5e7eb; }
.spacer { height: 600px; border-left: 3px dotted #cbd5e1; margin: 8px 0 8px 12px; }`,
            js: `
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", () => console.log("📥 Downloaded: " + img.alt));
});
console.log("Page ready. Only nearby images have started downloading.");`,
          }),
        ],
        quiz: [
          Q(`What is usually the single biggest performance win on a small website?`,
            ['Using more fonts', 'Resizing and compressing images', 'Adding animations', 'More JavaScript'], 1,
            `Images are usually the heaviest files on a page, so optimising them pays off most.`),
          Q(`What does {{loading="lazy"}} on an image do?`,
            ['Makes the image blurry', 'Delays downloading it until the visitor scrolls near it', 'Loads it twice', 'Hides it on mobile'], 1,
            `Lazy loading saves data and speeds up the first view of the page.`),
          Q(`Which tool scores your page's performance and suggests fixes?`,
            ['Lighthouse (in DevTools)', 'The address bar', 'VS Code’s Explorer', 'Google Fonts'], 0,
            `Lighthouse audits performance, accessibility, best practices, and SEO.`),
        ],
      },

      {
        id: 'm7-l4',
        title: 'Mobile-first design',
        minutes: 8,
        intro: `Design for the smallest screen first, then enhance for bigger ones.`,
        blocks: [
          P(`Most visitors will see your site on a phone first. **Mobile-first** means designing for small screens first, then adding enhancements as screens get bigger, instead of building for desktop and squeezing it down later.`),
          ANALOGY(`Packing a carry-on`, `If you pack a carry-on first, you're forced to choose what really matters. Moving to a big suitcase later is easy. Going the other way (cramming a suitcase into a carry-on) is painful. Mobile-first makes you prioritise.`),
          H(`Mobile design principles`),
          UL(
            `**Tap targets at least 44 × 44px**, with space between them. Fingers are much less precise than mouse pointers.`,
            `**Body text at least 16px**, so nobody has to pinch and zoom.`,
            `**One column** by default; add columns at wider breakpoints.`,
            `**Nothing hover-only**: phones can't hover. Any menu or info revealed on hover must also work on tap.`,
            `**The right keyboards**: {{type="email"}}, {{type="tel"}}, and {{inputmode="numeric"}} show the most useful keyboard.`,
            `**Thumb-friendly layout**: key actions within easy reach, not crammed in a top corner.`,
            `**No horizontal scrolling**, ever.`
          ),
          H(`Mobile-first CSS, revisited`),
          CODE('css', `
/* Base = phones */
.button { display: block; width: 100%; padding: 14px; font-size: 1rem; }
.layout { display: grid; gap: 16px; }

/* Bigger screens get enhancements */
@media (min-width: 700px) {
  .button { display: inline-block; width: auto; }
  .layout { grid-template-columns: 2fr 1fr; }
}`, 'Mobile first'),
          TIP(`Test on a real phone, not just DevTools. Real fingers, real sunlight, and real network speed reveal problems that a desktop simulation can't.`),
          TRY({
            title: 'Make it thumb-friendly',
            focus: 'css',
            prompt: `These links and buttons are too small to tap comfortably. In the CSS, make the {{.actions a}} at least 44px tall (padding helps), add space between them, and bump the body text to 16px. Change the phone input's {{type}} to {{tel}} (it shows a number pad on phones).`,
            html: `
<main>
  <h1>Book a table</h1>
  <p>Pick a time and we'll save you a seat.</p>

  <div class="actions">
    <a href="#">6:00</a><a href="#">6:30</a><a href="#">7:00</a><a href="#">7:30</a>
  </div>

  <form>
    <label for="phone">Phone number</label>
    <input id="phone" name="phone" type="text">
    <button>Confirm booking</button>
  </form>
</main>`,
            css: `
body { font-family: system-ui, sans-serif; font-size: 12px; padding: 0 12px; }

.actions a {
  display: inline-block;
  padding: 2px 4px;
  margin: 0;
  border: 1px solid #0d9488;
  border-radius: 6px;
  color: #0d9488;
  text-decoration: none;
}

form { display: grid; gap: 6px; margin-top: 16px; }
input { font-size: 12px; padding: 2px; }
button { padding: 2px 6px; }

/* Bigger screens */
@media (min-width: 700px) {
  main { max-width: 500px; margin: 0 auto; }
}`,
          }),
        ],
        quiz: [
          Q(`What's the recommended minimum size for a tap target?`,
            ['10 × 10px', 'About 44 × 44px', '200 × 200px', 'Size doesn’t matter'], 1,
            `Around 44px gives fingers a comfortable target.`),
          Q(`Why shouldn't important features be hover-only?`,
            ['Hover is slow', 'Touch screens can’t hover', 'Hover breaks SEO', 'Browsers block hover'], 1,
            `Phones and tablets have no hover, so the feature would be unreachable.`),
          Q(`Which input type shows a phone number keypad on mobile?`,
            ['{{type="text"}}', '{{type="tel"}}', '{{type="phone"}}', '{{type="keypad"}}'], 1,
            `{{type="tel"}} brings up a dial-pad keyboard.`),
        ],
      },

      {
        id: 'm7-l5',
        title: 'Testing your site',
        minutes: 9,
        intro: `Catch problems before your visitors do.`,
        milestone: `You can now audit a website like a professional! 🔍`,
        blocks: [
          P(`Professional developers test before they launch. You don't need fancy tools: a few free checks catch the vast majority of problems.`),
          H(`Your testing toolkit`),
          UL(
            `**Lighthouse** (DevTools → Lighthouse): scores Performance, Accessibility, Best Practices, and SEO, with specific fixes.`,
            `**[W3C HTML Validator](https://validator.w3.org)**: catches unclosed tags, typos, and invalid HTML.`,
            `**[WAVE](https://wave.webaim.org)** or the **axe DevTools** extension: detailed accessibility checks.`,
            `**DevTools device toolbar**: test many screen sizes quickly.`,
            `**The Console**: no red errors allowed.`
          ),
          H(`A manual test routine`),
          STEPS(
            [`Keyboard test`, `Unplug your mouse (figuratively). Tab through every page. Is focus always visible? Can you use the menu and forms?`],
            [`Link test`, `Click every link. Check external links open the right sites.`],
            [`Browser test`, `Try Chrome, Firefox, and Safari (or ask a friend with a Mac/iPhone).`],
            [`Real-phone test`, `Load it on your phone, rotate it, fill in the form.`],
            [`Zoom test`, `Zoom the browser to 200%. Is everything still readable and usable?`],
            [`Slow network test`, `DevTools → Network → throttle to “Slow 4G” and reload.`],
            [`Fresh-eyes test`, `Ask someone who's never seen it to find your contact info. Watch, don't help.`]
          ),
          TIP(`Lighthouse scores are a guide, not a goal. A score of 95 with a confusing layout is worse than 88 with a clear one. Fix what actually affects people.`),
          TRY({
            title: 'Bug hunt',
            prompt: `This page has a handful of common problems. The automatic checker (JavaScript tab) reports some of them in the console. Fix them all until you see ✅. Then look for problems the checker *can't* catch, like the typo and the broken heading order.`,
            html: `
<!DOCTYPE html>
<html>
<head><title>My Portfolio</title></head>
<body>
  <h1>Alex Rivera</h1>
  <h1>Web developer</h1>

  <h4>Projects</h4>
  <img src="https://picsum.photos/id/0/300/180" width="300" height="180">
  <p>My lastest project is a recipe app. <a href="#">Read more</a></p>

  <h2>Contact</h2>
  <form>
    <input type="email" name="email" placeholder="Email">
    <span onclick="alert('Sent!')">Send</span>
  </form>
</body>
</html>`,
            css: `body { font-family: system-ui, sans-serif; padding: 0 16px; }`,
            js: AUDIT_JS,
          }),
        ],
        quiz: [
          Q(`What does the W3C validator check?`,
            ['Your page speed', 'Whether your HTML is valid (e.g. unclosed or misspelled tags)', 'Your Google ranking', 'Your domain name'], 1,
            `It catches HTML mistakes that browsers silently try to guess around.`),
          Q(`What's the quickest manual accessibility test you can do?`,
            ['Change the font', 'Navigate the whole site using only the keyboard', 'Delete the CSS', 'Read the source code aloud'], 1,
            `The keyboard test reveals missing focus styles, fake buttons, and unreachable menus in minutes.`),
          Q(`Why test with a real phone, not just DevTools?`,
            ['DevTools is inaccurate about colour', 'Real fingers, screens, and networks reveal issues a simulation misses', 'Phones run different HTML', 'There’s no reason'], 1,
            `Simulation is great for a quick check, but real devices catch tap-size, speed, and glare issues.`),
        ],
      },
    ],
    quiz: [
      Q(`Which of these is the most accessible way to add a clickable action?`,
        ['{{<div onclick="...">}}', '{{<button type="button">}}', '{{<span class="btn">}}', '{{<img onclick="...">}}'], 1,
        `Real buttons are focusable and keyboard-operable out of the box.`),
      Q(`Which pair matters most for how your page appears in search results?`,
        ['{{<title>}} and {{meta description}}', '{{<footer>}} and {{<aside>}}', 'Font size and colour', '{{defer}} and {{async}}'], 0,
        `The title is the clickable headline; the description is the snippet.`),
      Q(`A 3 MB photo is shown at 400px wide. What should you do?`,
        ['Nothing', 'Resize and compress it, ideally to WebP', 'Make it bigger', 'Lazy-load it at the top of the page'], 1,
        `Resizing plus compression can cut it to a tiny fraction of the size.`),
      Q(`In mobile-first CSS, where do the phone styles go?`,
        ['Inside a {{max-width}} media query', 'In the base CSS, outside any media query', 'In a separate website', 'In JavaScript'], 1,
        `Phone styles are the default, and {{min-width}} queries add enhancements.`),
      Q(`Which tool audits Performance, Accessibility, Best Practices, and SEO all at once?`,
        ['Lighthouse', 'Squoosh', 'Formspree', 'Emmet'], 0,
        `Lighthouse is built into Chrome's DevTools.`),
    ],
    exercise: {
      title: 'Audit and improve your portfolio',
      minutes: 45,
      blocks: [
        P(`Put on your inspector's hat and audit the portfolio you built in Module 6. Open it in Chrome, then work through the goals below and fix what you find.`),
        P(`The workspace has the mini checker from this module. Paste in one of your pages' HTML to check it here too.`),
        TIP(`Write down your starting Lighthouse scores. It's very satisfying to compare them after your fixes!`),
      ],
      goals: [
        `Run Lighthouse on your home page and write down the four scores`,
        `Fix every accessibility issue Lighthouse reports`,
        `Give every page a unique {{<title>}} and {{meta description}}`,
        `Resize and compress your images (try WebP) and add {{loading="lazy"}} below the fold`,
        `Add Open Graph tags to your home page`,
        `Pass the keyboard test on every page`,
        `Run your HTML through the W3C validator and fix any errors`,
        `Re-run Lighthouse and compare your scores 🎉`,
      ],
      starter: {
        prompt: `Paste your page's HTML into the HTML tab. The checker in the JavaScript tab reports problems in the console.`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Paste your page here</title>
</head>
<body>
  <h1>Paste your portfolio's HTML into this tab</h1>
  <p>The checker will report problems in the console below.</p>
</body>
</html>`,
        css: `body { font-family: system-ui, sans-serif; padding: 0 16px; }`,
        js: AUDIT_JS,
      },
    },
  });
})();
