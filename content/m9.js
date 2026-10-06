/* ==========================================================
   MODULE 9 · Going Live
   ========================================================== */
(function () {
  const { P, H, UL, OL, ANALOGY, TIP, WARN, CODE, TRY, STEPS, RAW, Q } = window.ZTL;

  window.ZTL.addModule({
    id: 'm9',
    icon: '🚀',
    title: 'Going Live',
    summary: `Publish your website for free, (optionally) connect your own domain, and make sure HTTPS is on. Launch day!`,
    goal: `By the end of this module your portfolio will be live on the internet at a real address you can share with anyone.`,
    lessons: [
      {
        id: 'm9-l1',
        title: 'Choosing a host',
        minutes: 7,
        intro: `GitHub Pages, Netlify, Vercel: which free host is right for you?`,
        blocks: [
          P(`Remember Module 1: **hosting** is renting space on an always-on server. For static sites like yours, several excellent hosts are **completely free**, with HTTPS and a global CDN included.`),
          H(`The big three for static sites`),
          RAW(`<div class="diagram" style="overflow-x:auto"><table class="compare">
            <thead><tr><th></th><th>GitHub Pages</th><th>Netlify</th><th>Vercel</th></tr></thead>
            <tbody>
              <tr><th>Cost for a portfolio</th><td>Free</td><td>Free</td><td>Free</td></tr>
              <tr><th>Deploy from GitHub</th><td>✅</td><td>✅</td><td>✅</td></tr>
              <tr><th>Drag-and-drop upload</th><td>❌</td><td>✅ (Netlify Drop)</td><td>❌ (CLI instead)</td></tr>
              <tr><th>Free HTTPS</th><td>✅</td><td>✅</td><td>✅</td></tr>
              <tr><th>Custom domain</th><td>✅</td><td>✅</td><td>✅</td></tr>
              <tr><th>Built-in form handling</th><td>❌</td><td>✅</td><td>❌</td></tr>
              <tr><th>Preview of each change</th><td>❌</td><td>✅</td><td>✅</td></tr>
              <tr><th>Default address</th><td><code>you.github.io/repo</code></td><td><code>name.netlify.app</code></td><td><code>name.vercel.app</code></td></tr>
            </tbody></table></div>`),
          UL(
            `**GitHub Pages**: the simplest if your code is already on GitHub. A couple of clicks in your repository settings.`,
            `**Netlify**: very beginner-friendly. Drag a folder onto a web page and you're live. Also handles contact forms.`,
            `**Vercel**: polished and fast, especially popular with React and Next.js developers (Module 10).`,
            `**Cloudflare Pages** is another great free option, with a very fast global network.`
          ),
          ANALOGY(`Free gallery space`, `These hosts are like galleries that hang your artwork for free, in exchange for nothing more than following their rules. They take care of lighting, security, and keeping the doors open 24/7.`),
          TIP(`You can't really choose wrong. All three are free, fast, and give you HTTPS. Moving between them later takes minutes, because your site is just files in a Git repository.`),
          WARN(`Free plans have fair-use limits (like monthly bandwidth). A personal portfolio will never get close, but read the terms if you expect huge traffic or want to run a commercial shop.`, `Free tier limits`),
          TRY({
            title: 'Which host should I pick?',
            focus: 'html',
            prompt: `Answer the questions in the preview to get a recommendation. Then peek at the JavaScript to see how it works: it's just {{if}} statements from Module 5!`,
            html: `
<form id="quiz">
  <h2>🏠 Find your host</h2>

  <fieldset>
    <legend>Is your code already on GitHub?</legend>
    <label><input type="radio" name="github" value="yes" checked> Yes</label>
    <label><input type="radio" name="github" value="no"> Not yet</label>
  </fieldset>

  <fieldset>
    <legend>Do you need a contact form?</legend>
    <label><input type="radio" name="forms" value="yes"> Yes</label>
    <label><input type="radio" name="forms" value="no" checked> No / I'll use Formspree</label>
  </fieldset>

  <fieldset>
    <legend>Planning to learn React soon?</legend>
    <label><input type="radio" name="react" value="yes"> Yes</label>
    <label><input type="radio" name="react" value="no" checked> Not yet</label>
  </fieldset>

  <button>Recommend a host</button>
  <p id="result" role="status"></p>
</form>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
fieldset { border: 1.5px solid #e2e8f0; border-radius: 10px; margin-bottom: 10px; }
legend { font-weight: 600; }
label { margin-right: 14px; }
button { padding: 10px 16px; border: 0; border-radius: 10px; background: #0d9488; color: white; font-size: 15px; cursor: pointer; }
#result { font-size: 18px; font-weight: 600; }`,
            js: `
document.querySelector("#quiz").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  let pick;

  if (data.get("forms") === "yes") {
    pick = "Netlify: it has contact forms built in. 📬";
  } else if (data.get("react") === "yes") {
    pick = "Vercel: a natural home for React projects later. ⚛️";
  } else if (data.get("github") === "yes") {
    pick = "GitHub Pages: your code is already there! 🐙";
  } else {
    pick = "Netlify: drag and drop your folder to go live. 🪂";
  }

  document.querySelector("#result").textContent = "👉 " + pick;
  console.log("Recommended:", pick);
});`,
          }),
        ],
        quiz: [
          Q(`What do GitHub Pages, Netlify, and Vercel all offer for a static portfolio?`,
            ['Paid hosting only', 'Free hosting with HTTPS and custom domains', 'A database', 'Email accounts'], 1,
            `All three host static sites for free, with HTTPS and custom-domain support.`),
          Q(`Which host lets you publish by dragging a folder onto a web page?`,
            ['GitHub Pages', 'Netlify', 'Vercel', 'None of them'], 1,
            `Netlify Drop: drag your folder in and get a live URL.`),
          Q(`Why is it easy to switch hosts later?`,
            ['Hosts copy each other', 'A static site is just files in a Git repository, so any host can serve them', 'You can’t switch', 'Domains move automatically'], 1,
            `Your site isn't locked in. Point another host at the same repository.`),
        ],
      },

      {
        id: 'm9-l2',
        title: 'Publishing with GitHub Pages',
        minutes: 9,
        intro: `Turn your GitHub repository into a live website in a few clicks.`,
        blocks: [
          P(`If your portfolio is on GitHub (Module 8), you're about 60 seconds from being live.`),
          STEPS(
            [`Open your repository on GitHub`, `For example {{github.com/alex/portfolio}}.`],
            [`Go to Settings → Pages`, `It's in the left sidebar of the Settings tab.`],
            [`Choose the source`, `Under “Build and deployment”, set **Source** to “Deploy from a branch”, pick **main** and the **/ (root)** folder, then click **Save**.`],
            [`Wait a minute`, `GitHub builds your site. Refresh the Pages settings and you'll see “Your site is live at…”.`],
            [`Visit your site! 🎉`, `It'll be at {{https://alex.github.io/portfolio/}}.`]
          ),
          P(`From now on, **every {{git push}} to main updates the live site automatically**, usually within a minute.`),
          H(`Your address`),
          UL(
            `A normal repo named {{portfolio}} is published at {{https://USERNAME.github.io/portfolio/}}.`,
            `A repo named exactly {{USERNAME.github.io}} becomes your main **user site** at {{https://USERNAME.github.io/}}, with no folder at the end. Great for a portfolio!`
          ),
          H(`The path gotcha`),
          P(`Because a project site lives in a sub-folder ({{/portfolio/}}), paths that start with a slash break:`),
          CODE('html', `
<!-- ❌ Starts with / so it looks in alex.github.io/css/... (the wrong place!) -->
<link rel="stylesheet" href="/css/styles.css">

<!-- ✅ Relative: works on your computer AND in any folder online -->
<link rel="stylesheet" href="css/styles.css">`, 'Use relative paths'),
          WARN(`If your live site loads but has no styling or missing images, it's almost always a path problem: a leading {{/}}, a wrong capital letter ({{Images/}} vs {{images/}}, since servers are case-sensitive), or a {{C:/Users/...}} path from your computer.`, `Site looks broken?`),
          TIP(`Add a {{404.html}} file to the root of your repo, and GitHub Pages will show it automatically for any missing page.`),
          TRY({
            title: 'Path checker',
            focus: 'html',
            prompt: `This mini checker scans the HTML for paths that will break once you're online. Read its report in the console, then fix each path (make it relative) until it reports ✅.`,
            html: `
<link rel="stylesheet" href="/css/styles.css">
<script src="js/script.js" defer></script>

<nav>
  <a href="index.html">Home</a>
  <a href="/projects.html">Projects</a>
  <a href="About.html">About</a>
</nav>

<img src="C:/Users/alex/Desktop/portfolio/images/me.jpg" alt="Alex">
<img src="images/logo.svg" alt="Logo">`,
            css: `body { font-family: system-ui, sans-serif; padding: 0 16px; } nav a { margin-right: 10px; }`,
            js: `
const paths = [...document.querySelectorAll("[href], [src]")]
  .map((el) => el.getAttribute("href") || el.getAttribute("src"))
  .filter((p) => !/^(https?:|mailto:|#)/.test(p));

let problems = 0;
paths.forEach((p) => {
  if (/^[a-z]:[\\\\/]|^file:/i.test(p)) { console.error("💥 " + p + ": a path from your own computer. It won't exist online."); problems++; }
  else if (p.startsWith("/")) { console.warn("⚠️ " + p + ": starts with /, which breaks on project sites like you.github.io/portfolio/"); problems++; }
  else if (p !== p.toLowerCase()) { console.warn("⚠️ " + p + ": has capital letters. Servers are case-sensitive; make sure the real file matches exactly."); problems++; }
  else console.log("✓ " + p);
});

console.log(problems ? problems + " path(s) to fix." : "✅ All paths look safe to publish!");`,
          }),
        ],
        quiz: [
          Q(`Where do you turn on GitHub Pages?`,
            ['In VS Code', 'In the repository’s Settings → Pages', 'In your GitHub profile picture', 'In the terminal with git pages'], 1,
            `Repository → Settings → Pages → Deploy from a branch.`),
          Q(`How do you update your live GitHub Pages site after the first publish?`,
            ['Re-create the repository', 'Commit and {{git push}} to main', 'Email GitHub', 'Delete and re-enable Pages'], 1,
            `Every push to the published branch redeploys automatically.`),
          Q(`Your styles load locally but not on {{you.github.io/portfolio/}}. The link is {{href="/css/styles.css"}}. What's wrong?`,
            ['CSS isn’t supported on GitHub', 'The leading / points to the wrong folder; use {{css/styles.css}}', 'You need a custom domain', 'Nothing'], 1,
            `A leading slash means “from the root of the domain”, which skips the {{/portfolio/}} folder.`),
        ],
      },

      {
        id: 'm9-l3',
        title: 'Publishing with Netlify or Vercel',
        minutes: 9,
        intro: `Drag-and-drop deploys, automatic updates, and built-in forms.`,
        blocks: [
          H(`Option A: Netlify Drop (the fastest way, ever)`),
          STEPS(
            [`Go to app.netlify.com/drop`, `Sign up for a free account (you can sign in with GitHub).`],
            [`Drag your portfolio folder onto the page`, `The whole folder, with {{index.html}} at its top level.`],
            [`You're live`, `Netlify gives you a random address like {{dreamy-panda-123.netlify.app}}. Rename it under **Site configuration → Change site name**.`]
          ),
          P(`Drag-and-drop is perfect for a first launch, but you'd have to drag the folder again after every change. The better long-term setup is connecting Git:`),
          H(`Option B: Connect your GitHub repository (recommended)`),
          STEPS(
            [`Add new site → Import an existing project`, `Choose GitHub and authorise Netlify.`],
            [`Pick your portfolio repository`],
            [`Build settings`, `For a plain HTML/CSS/JS site: leave the build command **empty** and set the publish directory to the root (or wherever {{index.html}} lives).`],
            [`Deploy`, `From now on, every {{git push}} redeploys your site automatically. This is called **continuous deployment**.`]
          ),
          ANALOGY(`A printing press`, `Continuous deployment is like a newspaper that reprints itself every time the editor approves a change. You just write ({{git push}}), and the press handles the rest.`),
          H(`Bonus: Netlify Forms`),
          P(`Netlify can collect your contact form's submissions with no extra service. Add {{data-netlify="true"}} and a {{name}} to the form, deploy, and submissions appear in your Netlify dashboard (with optional email notifications):`),
          CODE('html', `
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <!-- Hidden "honeypot" field: real people never fill it in, spam bots do -->
  <p hidden><label>Don't fill this in: <input name="bot-field"></label></p>

  <label for="email">Email</label>
  <input id="email" type="email" name="email" required>

  <label for="message">Message</label>
  <textarea id="message" name="message" required></textarea>

  <button type="submit">Send</button>
</form>`, 'contact.html'),
          H(`Vercel works the same way`),
          P(`Sign up at [vercel.com](https://vercel.com) with GitHub, click **Add New → Project**, import your repo, and deploy. Leave “Framework Preset” as **Other** for a plain site. Every push redeploys, and every branch gets its own **preview URL**: a private live version to test before merging.`),
          TIP(`Deploy previews are amazing for branches (Module 8): push a {{new-design}} branch and you get a separate live link to check it on your phone before merging into main.`),
          TRY({
            title: 'A spam-resistant Netlify form',
            prompt: `This form is ready for Netlify Forms. Submit it to see the data (the honeypot field stays empty for real people). Add a {{name="subject"}} dropdown, and notice it gets sent too.`,
            html: `
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <h2>Contact me</h2>
  <p hidden><label>Don't fill this in: <input name="bot-field"></label></p>

  <label for="name">Name</label>
  <input id="name" name="name" required autocomplete="name">

  <label for="email">Email</label>
  <input id="email" type="email" name="email" required autocomplete="email">

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="4" required></textarea>

  <button type="submit">Send</button>
</form>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
form { display: grid; gap: 6px; max-width: 380px; }
label { font-weight: 600; font-size: 14px; }
input, textarea, select { font: inherit; padding: 9px 11px; border: 1.5px solid #cbd5e1; border-radius: 9px; }
button { margin-top: 8px; padding: 11px; border: 0; border-radius: 9px; background: #00ad9f; color: white; font-weight: 700; cursor: pointer; }`,
          }),
        ],
        quiz: [
          Q(`What is continuous deployment?`,
            ['Paying monthly for hosting', 'The site redeploys automatically every time you push to Git', 'Uploading files by FTP', 'Never updating your site'], 1,
            `Connect your repo once, and each push publishes the new version.`),
          Q(`What does {{data-netlify="true"}} on a form do (when hosted on Netlify)?`,
            ['Makes the form invisible', 'Lets Netlify collect the form’s submissions', 'Adds CAPTCHA', 'Turns it into a link'], 1,
            `Netlify detects the attribute at deploy time and handles submissions for you.`),
          Q(`What is a honeypot field for?`,
            ['Collecting real users’ phone numbers', 'Catching spam bots, which fill in hidden fields that people never see', 'Styling the form', 'Speeding up submission'], 1,
            `If the hidden field has a value, the submission is almost certainly from a bot.`),
        ],
      },

      {
        id: 'm9-l4',
        title: 'Buying a domain',
        minutes: 8,
        intro: `Your own address on the internet, and how to avoid paying too much for it.`,
        blocks: [
          P(`Your site already has a free address like {{alex.netlify.app}}. That's totally fine! But a custom domain like {{alexrivera.dev}} looks more professional and is yours to keep, even if you change hosts. **This step is optional.**`),
          P(`You buy (really, **rent**) a domain from a **registrar** for a year at a time.`),
          H(`Where to buy`),
          UL(
            `**Cloudflare Registrar**: sells domains at cost, with no markup and no upsells.`,
            `**Porkbun** and **Namecheap**: popular, friendly, and fairly priced.`,
            `Your host may sell domains too (Netlify, Vercel), which is convenient, but compare prices.`
          ),
          H(`Watch out for`),
          UL(
            `**Renewal price**: a {{.com}} might be $2 for the first year, then $15+ after. Always check the renewal price.`,
            `**Upsells**: you don't need the registrar's hosting, website builder, “SEO package”, or email for a static portfolio.`,
            `**WHOIS privacy**: your contact details are attached to the domain's public record. Make sure free privacy protection is switched on.`,
            `**Auto-renew**: turn it on, so you don't lose your domain because a card expired.`
          ),
          H(`Choosing a good name`),
          UL(
            `Short, easy to say, and easy to spell: {{alexrivera.dev}} beats {{the-alex-rivera-web-dev-portfolio.com}}.`,
            `Avoid hyphens and numbers (people forget them when you say the address out loud).`,
            `Your name is usually the best choice for a portfolio.`,
            `TLD options: {{.com}} is classic; {{.dev}} is popular with developers; {{.me}} and {{.io}} are common too. Expect roughly $10–20/year for most.`
          ),
          TIP(`{{.dev}} domains require HTTPS by design, so browsers refuse to load them over plain HTTP. Since your host gives you free HTTPS anyway, that's just a nice extra bit of safety.`),
          TRY({
            title: 'Domain name tester',
            focus: 'js',
            prompt: `Type some domain ideas into the box in the preview. The checker gives feedback on length, hyphens, numbers, and the ending. (It can't check whether the name is available. For that, search on a registrar's website.)`,
            html: `
<h2>🌐 Domain idea tester</h2>
<label for="domain">Try a domain:</label>
<input id="domain" value="alexrivera.dev" spellcheck="false">
<ul id="feedback"></ul>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
input { font: 18px ui-monospace, monospace; padding: 10px 12px; width: 100%; max-width: 360px; border: 2px solid #c7d2fe; border-radius: 10px; }
li { margin: 6px 0; list-style: none; }`,
            js: `
const input = document.querySelector("#domain");
const feedback = document.querySelector("#feedback");

function check() {
  const domain = input.value.trim().toLowerCase();
  const [name, ...rest] = domain.split(".");
  const tld = rest.join(".");
  const notes = [];

  if (!tld) notes.push("❌ Add an ending, like .com or .dev");
  else notes.push("✅ Ending: ." + tld);

  if (name.length > 15) notes.push("⚠️ Quite long (" + name.length + " letters). Shorter is easier to remember.");
  else if (name.length > 0) notes.push("✅ Nice length (" + name.length + " letters)");

  if (name.includes("-")) notes.push("⚠️ Hyphens are easy to forget when saying it out loud");
  if (/\\d/.test(name)) notes.push("⚠️ Numbers are confusing: is it '4' or 'four'?");
  if (/[^a-z0-9-]/.test(name)) notes.push("❌ Only letters, numbers and hyphens are allowed");

  feedback.innerHTML = "";
  notes.forEach((n) => {
    const li = document.createElement("li");
    li.textContent = n;
    feedback.appendChild(li);
  });
}

input.addEventListener("input", check);
check();`,
          }),
        ],
        quiz: [
          Q(`What is a domain registrar?`,
            ['A company you rent domain names from', 'A type of web host', 'A DNS record', 'A browser'], 0,
            `Registrars (Cloudflare, Porkbun, Namecheap…) handle domain registration.`),
          Q(`A domain costs $1.99 for year one. What should you check before buying?`,
            ['The renewal price for following years', 'The font', 'Whether it has HTTPS', 'Nothing'], 0,
            `Cheap first years often renew at a much higher price.`),
          Q(`Which name is best for a personal portfolio?`,
            ['{{best-web-dev-4-u.com}}', '{{alexrivera.dev}}', '{{a1ex-r1vera123.biz}}', '{{my-portfolio-website-site.net}}'], 1,
            `Short, no hyphens or numbers, and it's your name.`),
        ],
      },

      {
        id: 'm9-l5',
        title: 'Connecting your domain',
        minutes: 10,
        intro: `Pointing your domain at your host with DNS records.`,
        blocks: [
          P(`You've got a domain and a live site. Now you need to tell the internet's address book (**DNS**, from Module 1) that your domain should lead to your host. You do that by adding **DNS records** in your registrar's dashboard.`),
          ANALOGY(`Mail forwarding`, `Your domain is a new address. DNS records are the forwarding instructions you give the post office: “anything addressed to alexrivera.dev, deliver to Netlify's building”.`),
          H(`The records you'll meet`),
          UL(
            `**A record**: points a name to an **IP address** (e.g. {{185.199.108.153}}). Used for the “apex” or “root” domain: {{alexrivera.dev}} with nothing in front.`,
            `**CNAME record**: points a name to **another name** (e.g. {{www}} → {{alex.github.io}}). Used for subdomains like {{www}}.`,
            `**TXT record**: a text note, often used to prove you own the domain.`,
            `**Nameservers**: hand the *whole* domain's DNS over to another company (e.g. Netlify DNS or Cloudflare), who then manage the records for you.`
          ),
          H(`Step by step`),
          STEPS(
            [`Add the domain at your host first`, `GitHub Pages: repo **Settings → Pages → Custom domain**. Netlify: **Domain management → Add a domain**. Vercel: **Settings → Domains**.`],
            [`Your host shows you the exact records to create`, `Copy them carefully.`],
            [`Add them at your registrar`, `Find “DNS” or “Manage DNS” for your domain, and create the records.`],
            [`Wait`, `DNS changes take anywhere from a few minutes to a few hours (sometimes up to 48) to spread around the world. This is called **propagation**.`],
            [`Check`, `Your host's dashboard shows a ✅ when it sees the records. You can also check at [dnschecker.org](https://dnschecker.org).`]
          ),
          H(`Example: GitHub Pages`),
          CODE('text', `
Type    Name   Value
A       @      185.199.108.153
A       @      185.199.109.153
A       @      185.199.110.153
A       @      185.199.111.153
CNAME   www    alex.github.io`, 'DNS records for GitHub Pages'),
          P(`{{@}} means “the domain itself” (the apex). Four A records give GitHub several servers to choose from, for reliability.`),
          WARN(`IP addresses and target names are **different for every host** and can change over time. Always copy the exact values from your host's current documentation or dashboard, not from a tutorial (including this one!).`, `Copy from your host`),
          TIP(`Netlify and Vercel can manage your DNS for you if you switch your domain's **nameservers** to theirs. It's often the easiest route. Your host then creates the right records automatically.`),
          TRY({
            title: 'DNS records practice',
            focus: 'html',
            prompt: `Your task: point {{alexrivera.dev}} at GitHub Pages for the user {{alex}}. Edit the table in the HTML so it has the four GitHub A records for {{@}} and a CNAME for {{www}}. The checker in the console tells you what's missing.`,
            html: `
<h2>DNS for alexrivera.dev</h2>
<table id="dns">
  <thead><tr><th>Type</th><th>Name</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>A</td><td>@</td><td>185.199.108.153</td></tr>
    <tr><td>A</td><td>@</td><td>185.199.109.153</td></tr>
    <tr><td>CNAME</td><td>www</td><td>alex.netlify.app</td></tr>
    <!-- Add or fix rows here -->
  </tbody>
</table>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
table { border-collapse: collapse; font-family: ui-monospace, monospace; font-size: 14px; }
th, td { border: 1px solid #cbd5e1; padding: 6px 12px; text-align: left; }
th { background: #f1f5f9; }`,
            js: `
const needed = ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"];
const rows = [...document.querySelectorAll("#dns tbody tr")].map((tr) =>
  [...tr.children].map((td) => td.textContent.trim())
);

const aValues = rows.filter(([type, name]) => type === "A" && name === "@").map((r) => r[2]);
const cname = rows.find(([type, name]) => type === "CNAME" && name === "www");

needed.forEach((ip) => {
  if (aValues.includes(ip)) console.log("✓ A @ " + ip);
  else console.warn("Missing: A record for @ → " + ip);
});

if (!cname) console.warn("Missing: CNAME for www");
else if (cname[2] !== "alex.github.io") console.warn("The www CNAME should point to alex.github.io (it points to " + cname[2] + ")");
else console.log("✓ CNAME www → alex.github.io");

const ok = needed.every((ip) => aValues.includes(ip)) && cname && cname[2] === "alex.github.io";
console.log(ok ? "✅ Perfect! These records would point your domain at GitHub Pages." : "Keep going. Fix the warnings above.");`,
          }),
        ],
        quiz: [
          Q(`Which DNS record points a name to **another name** (like www → alex.github.io)?`,
            ['A record', 'CNAME record', 'TXT record', 'MX record'], 1,
            `CNAME = canonical name, an alias to another hostname. A records point to IP addresses.`),
          Q(`In DNS settings, what does {{@}} usually mean?`,
            ['Email', 'The root (apex) domain itself, e.g. alexrivera.dev', 'Every subdomain', 'An error'], 1,
            `{{@}} is shorthand for the bare domain.`),
          Q(`You added DNS records 5 minutes ago and the domain doesn't work yet. Most likely?`,
            ['You broke the internet', 'DNS propagation: changes can take minutes to hours', 'Your HTML is invalid', 'You need a new domain'], 1,
            `Give it time, then check your host's dashboard or dnschecker.org.`),
        ],
      },

      {
        id: 'm9-l6',
        title: 'HTTPS and launch day',
        minutes: 9,
        intro: `Lock the padlock, run the checklist, and tell the world.`,
        milestone: `You're LIVE! Your website is on the internet. 🎉🚀`,
        blocks: [
          H(`HTTPS: (almost) automatic`),
          P(`Remember the padlock from Module 1? All three hosts get you a free HTTPS certificate (usually from **Let's Encrypt**) automatically, and renew it for you. For custom domains, it's issued shortly after your DNS records are working.`),
          UL(
            `**GitHub Pages**: Settings → Pages → tick **Enforce HTTPS** (it becomes available once the certificate is ready).`,
            `**Netlify**: Domain management → HTTPS. The certificate is automatic, and visitors are redirected to HTTPS by default.`,
            `**Vercel**: automatic for every domain.`
          ),
          H(`Mixed content`),
          P(`If your HTTPS page loads anything over plain {{http://}} (an image, script, or font), browsers may block it or show warnings. Make sure every external link to a resource uses {{https://}}.`),
          CODE('html', `
<!-- ❌ Mixed content on an HTTPS page -->
<img src="http://example.com/photo.jpg" alt="...">

<!-- ✅ -->
<img src="https://example.com/photo.jpg" alt="...">`, 'Avoid mixed content'),
          H(`Launch checklist`),
          P(`Before you share your link, run through the **[Launch checklist](#/checklist)** in this course. It covers content, links, mobile, accessibility, SEO, performance, and deployment. Tick everything off!`),
          H(`Tell the world`),
          UL(
            `Add the link to your GitHub profile, your repo's README, and your CV.`,
            `Share it on LinkedIn, with friends, or in a developer community.`,
            `Ask 2–3 people for honest feedback, then keep improving. Every {{git push}} updates the live site.`
          ),
          TIP(`Your site is never “finished”. Most developers rebuild their portfolio every year or two as their skills grow. That's a great sign of progress.`, `Keep going`),
          TRY({
            title: 'Pre-launch scan',
            focus: 'html',
            prompt: `A last automated check before launch: this script looks for mixed content, a missing title, description, or viewport tag, and images without alt. Fix the HTML until it says you're ready for lift-off. 🚀`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alex Rivera · Web Developer</title>
</head>
<body>
  <h1>Alex Rivera</h1>
  <img src="http://picsum.photos/id/64/120/120" alt="Alex smiling" width="120" height="120">
  <img src="https://picsum.photos/id/180/120/120" width="120" height="120">
  <p>Welcome to my brand-new website!</p>
</body>
</html>`,
            css: `body { font-family: system-ui, sans-serif; padding: 0 16px; } img { border-radius: 12px; margin-right: 8px; }`,
            js: `
const issues = [];

if (!document.title.trim()) issues.push("Add a <title>");
if (!document.querySelector('meta[name="description"]')) issues.push('Add <meta name="description" content="...">');
if (!document.querySelector('meta[name="viewport"]')) issues.push('Add the viewport meta tag for phones');

document.querySelectorAll("[src], link[href]").forEach((el) => {
  const url = el.getAttribute("src") || el.getAttribute("href");
  if (url.startsWith("http://")) issues.push("Mixed content (use https://): " + url);
});

document.querySelectorAll("img:not([alt])").forEach((img) => issues.push("Image missing alt text: " + img.getAttribute("src")));

if (issues.length) {
  issues.forEach((i) => console.warn("⚠️ " + i));
  console.log(issues.length + " thing(s) to fix before launch.");
} else {
  console.log("🚀 All clear. Ready for lift-off!");
}`,
          }),
        ],
        quiz: [
          Q(`Who provides the free HTTPS certificates most static hosts use?`,
            ['Let’s Encrypt', 'Your browser', 'Google Fonts', 'Your code editor'], 0,
            `Let's Encrypt issues free certificates, and hosts request and renew them automatically.`),
          Q(`What is mixed content?`,
            ['Using two fonts', 'An HTTPS page loading resources over plain HTTP', 'Mixing HTML and CSS', 'A page with images and text'], 1,
            `Browsers block or warn about insecure resources on secure pages.`),
          Q(`After launch, how do you update your live site?`,
            ['Buy a new domain', 'Edit, commit, and push. The host redeploys automatically', 'Email your host', 'You can’t'], 1,
            `With continuous deployment, every push goes live.`),
        ],
      },
    ],
    quiz: [
      Q(`Which of these is NOT needed to put a static portfolio online?`,
        ['A host', 'Your files (HTML/CSS/JS)', 'A paid server you manage yourself', 'An internet connection'], 2,
        `Free static hosts handle the servers for you.`),
      Q(`Your site works locally but images are missing online. The path is {{Images/Me.JPG}} and the file is {{images/me.jpg}}. Why?`,
        ['Servers are case-sensitive', 'Images aren’t allowed online', 'You need HTTPS', 'DNS isn’t ready'], 0,
        `Many computers ignore capital letters in file names, but web servers don't.`),
      Q(`Which DNS record type points the apex domain at an IP address?`,
        ['A', 'CNAME', 'TXT', 'NS'], 0,
        `A records map a name to an IPv4 address.`),
      Q(`What should you watch for when buying a domain?`,
        ['Renewal price and unnecessary upsells', 'The colour of the registrar’s logo', 'Whether it includes React', 'Nothing'], 0,
        `Cheap first years and add-ons you don't need are the usual traps.`),
      Q(`What's the benefit of connecting your Git repo to Netlify or Vercel instead of uploading files?`,
        ['It’s required by law', 'Every push redeploys automatically, and branches get preview links', 'It makes HTML shorter', 'It hides your code'], 1,
        `Continuous deployment plus deploy previews make updating effortless.`),
    ],
    exercise: {
      title: 'Launch day! 🎉',
      minutes: 45,
      blocks: [
        P(`This is the moment the whole course has been building towards: **put your portfolio on the internet**. Choose a host from this module, follow its steps, and work through the goals below.`),
        P(`Use the workspace to draft the short message you'll post when sharing your site.`),
        TIP(`Run through the **[Launch checklist](#/checklist)** before you share the link. Then celebrate. You earned it!`),
      ],
      goals: [
        `Choose a host (GitHub Pages, Netlify, or Vercel)`,
        `Deploy your portfolio and open the live URL on your phone`,
        `Set up continuous deployment, so a {{git push}} updates the site`,
        `Fix any paths, images, or mixed content that broke online`,
        `Make sure HTTPS is on (padlock in the address bar)`,
        `Optional: buy a domain and connect it with DNS records`,
        `Complete the course's Launch checklist`,
        `Share your link with at least one person 🎉`,
      ],
      starter: {
        prompt: `Draft your launch announcement and preview how it looks as a social card.`,
        html: `
<article class="post">
  <header><span class="avatar">👋</span> <strong>Your Name</strong></header>
  <p>I just launched my first website, built from scratch with HTML, CSS and JavaScript! 🚀 Would love your feedback:</p>
  <div class="card">
    <div class="card-img">🌐</div>
    <div class="card-body">
      <small>yourname.netlify.app</small>
      <strong>Your Name · Web Developer</strong>
      <span>Projects, about me, and how to get in touch.</span>
    </div>
  </div>
</article>`,
        css: `
body { font-family: system-ui, sans-serif; background: #f1f5f9; padding: 16px; }
.post { background: white; border-radius: 14px; padding: 16px; max-width: 460px; box-shadow: 0 2px 10px rgba(0,0,0,.06); }
.avatar { display: inline-grid; place-items: center; width: 36px; height: 36px; background: #ede9fe; border-radius: 50%; }
.card { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
.card-img { height: 120px; display: grid; place-items: center; font-size: 48px; background: linear-gradient(135deg, #6366f1, #14b8a6); }
.card-body { padding: 10px 12px; display: grid; gap: 2px; }
.card-body small { color: #64748b; }
.card-body span { color: #475569; font-size: 14px; }`,
      },
    },
  });
})();
