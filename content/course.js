/* ============================================================
   Zero to Live: course content
   ------------------------------------------------------------
   Prose strings support light formatting:
     {{code}}       inline code
     **bold**       bold
     [text](url)    link
   Block types: P, H, UL, OL, ANALOGY, TIP, WARN, CODE, TRY, STEPS, RAW, SIM
   A module with status 'ready' has lessons + quiz + exercise.
   A module with status 'outline' has planned lessons only.
   ============================================================ */
(function () {
  const P = (text) => ({ type: 'p', text });
  const H = (text) => ({ type: 'h', text });
  const UL = (...items) => ({ type: 'list', items });
  const OL = (...items) => ({ type: 'list', ordered: true, items });
  const ANALOGY = (title, text) => ({ type: 'analogy', title, text });
  const TIP = (text, title) => ({ type: 'tip', text, title });
  const WARN = (text, title) => ({ type: 'warn', text, title });
  const CODE = (lang, code, file) => ({ type: 'code', lang, code, file });
  const TRY = (o) => Object.assign({ type: 'try' }, o);
  const STEPS = (...items) => ({ type: 'steps', items: items.map(([title, text]) => ({ title, text })) });
  const RAW = (html) => ({ type: 'html', html });
  const Q = (q, options, answer, explain) => ({ q, options, answer, explain });
  const SIM = (o) => Object.assign({ type: 'sim' }, o); // built-in terminal simulator (Git)

  // Shared with the per-module files (content/m4.js …).
  window.ZTL = {
    P, H, UL, OL, ANALOGY, TIP, WARN, CODE, TRY, STEPS, RAW, Q, SIM,
    addModule(m) { window.COURSE.modules.push(Object.assign({ status: 'ready' }, m)); },
  };

  /* ==========================================================
     MODULE 1 · How the Web Works
     ========================================================== */
  const m1 = {
    id: 'm1',
    icon: '🌐',
    title: 'How the Web Works',
    status: 'ready',
    summary: `Before writing any code, find out what actually happens when you open a website: browsers, servers, domains, DNS, HTTP, and hosting.`,
    goal: `By the end of this module you'll be able to explain, in plain words, how a website gets from a computer somewhere in the world onto your screen.`,
    lessons: [
      {
        id: 'm1-l1',
        title: 'What happens when you visit a website?',
        minutes: 6,
        intro: `You do it dozens of times a day. Let's slow it down and see what's really going on.`,
        milestone: `You just edited your first web page! 🎉`,
        blocks: [
          P(`When you type an address like {{wikipedia.org}} and press Enter, a page appears in about a second. In that second, your computer has talked to computers around the world, asked for some files, received them, and turned them into the page you see.`),
          P(`It sounds complicated, but the idea behind it is simple. Let's start with an analogy.`),
          ANALOGY(`The web is a restaurant`, `**You** are the customer, and your **browser** (Chrome, Safari, Firefox) is how you place orders. The **server** is the kitchen, a computer somewhere that stores the website. The **internet** is the waiter who carries your order to the kitchen and brings the food back. The **website files** are the meal.`),
          H(`The journey, step by step`),
          STEPS(
            [`You type an address`, `For example {{https://example.com}}. This is the website's name.`],
            [`Your browser finds where the site lives`, `It looks up the name in the internet's “address book” (called DNS, which has its own lesson later in this module).`],
            [`Your browser sends a request`, `Basically: “Hi, could I please have your homepage?”`],
            [`The server sends back files`, `Usually some HTML, CSS, JavaScript, and images.`],
            [`Your browser builds the page`, `It reads those files and paints the result on your screen, often in under a second.`]
          ),
          RAW(`<div class="diagram"><div class="flow">
            <div class="node">🧑‍💻 You<small>type an address</small></div>
            <div class="arrow"><span>→</span>request</div>
            <div class="node">🌐 Internet<small>carries messages</small></div>
            <div class="arrow"><span>→</span></div>
            <div class="node">🖥️ Server<small>stores the website</small></div>
          </div><div class="flow" style="margin-top:14px">
            <div class="node">🖼️ Your screen<small>browser builds the page</small></div>
            <div class="arrow"><span>←</span>response (files)</div>
            <div class="node">📦 HTML · CSS · JS · images</div>
          </div><p class="diagram-cap">A request goes out, a response comes back. That's the heartbeat of the web.</p></div>`),
          H(`A website is just a bunch of files`),
          P(`This is the most important idea in the whole course: **a website is a folder of ordinary files**. Most of them are written in three languages, each with its own job:`),
          UL(
            `**HTML** gives the page its **structure and content**: headings, paragraphs, images, links.`,
            `**CSS** controls the **style**: colours, fonts, spacing, layout.`,
            `**JavaScript** adds **behaviour**: things that happen when you click, type, or scroll.`
          ),
          ANALOGY(`A website is like a house`, `HTML is the walls and rooms (the structure). CSS is the paint, furniture, and decoration (the style). JavaScript is the electricity and plumbing: flip a switch and something happens.`),
          P(`Here's a tiny but complete web page. Don't worry about understanding every character yet. Just notice that it's plain text with some words in angle brackets.`),
          CODE('html', `
<h1>Hello, web!</h1>
<p>I'm learning how websites work.</p>`, 'index.html'),
          TRY({
            title: 'Edit your first web page',
            prompt: `Change the words between {{<h1>}} and {{</h1>}} to your own name, and watch the preview on the right update instantly. Then peek at the CSS tab and try a different colour, like {{tomato}} or {{teal}}.`,
            html: `
<h1>Hello, web!</h1>
<p>I'm learning how websites work.</p>`,
            css: `
h1 {
  color: #4f46e5;
  font-family: sans-serif;
}`,
          }),
          TIP(`You don't have to memorise anything in this module. These ideas will come up again and again, and they'll feel familiar by the end of the course.`),
        ],
        quiz: [
          Q(`In the restaurant analogy, what is the **server**?`,
            ['The customer placing an order', 'The kitchen that prepares and sends out the food', 'The menu', 'The table you sit at'], 1,
            `The server is a computer that stores the website and “cooks up” a response when your browser asks for a page.`),
          Q(`Which three languages make up most websites?`,
            ['HTML, CSS, and JavaScript', 'Python, Java, and C', 'HTTP, DNS, and URL', 'Word, Excel, and PowerPoint'], 0,
            `HTML is the structure, CSS the style, and JavaScript the behaviour. You'll learn all three in this course.`),
          Q(`What does your browser do with the files it receives from a server?`,
            ['Sends them to your friends', 'Reads them and builds the page you see', 'Deletes them right away', 'Prints them out'], 1,
            `Your browser is a translator: it reads HTML, CSS, and JavaScript, then draws the finished page on your screen.`),
        ],
      },

      {
        id: 'm1-l2',
        title: 'Browsers and servers',
        minutes: 6,
        intro: `Meet the two computers in every web conversation: the one asking, and the one answering.`,
        blocks: [
          H(`The browser: the asker`),
          P(`A **browser** is the app you use to visit websites: Chrome, Safari, Firefox, Edge. Its job is to **request** pages and **display** them. In tech-speak, the browser is the **client**: the side that asks for things.`),
          H(`The server: the answerer`),
          P(`A **server** is a computer whose job is to wait for requests and answer them, all day, every day. There's nothing magical about it. It's a computer like yours, just without a screen, kept in a big building called a **data centre** and connected to the internet with a very fast connection.`),
          ANALOGY(`A library`, `You (the browser) walk up to the front desk and ask for a book. The librarian (the server) goes into the stacks, finds it, and hands it to you. If the book doesn't exist, the librarian tells you so. Websites work the same way.`),
          H(`Request and response`),
          P(`Every conversation between a browser and a server follows the same pattern: a **request** goes out, and a **response** comes back. Here's a very simplified version:`),
          CODE('text', `
Browser → Server:   "GET /about.html, please"
Server  → Browser:  "200 OK. Here's about.html: <html>...</html>"`, 'A request and a response'),
          P(`The number at the start of the response is a **status code**. It's the server's quick way of saying how things went. You've probably seen a few already:`),
          UL(
            `**200 OK**: everything worked, here's your page.`,
            `**404 Not Found**: the server looked, but that page doesn't exist.`,
            `**301 Moved Permanently**: that page lives at a new address now; the browser follows it automatically.`,
            `**500 Internal Server Error**: something broke on the server's side (not your fault!).`
          ),
          TIP(`You can watch these requests happen yourself. In Module 2 you'll open your browser's DevTools and see every file a page asks for, along with its status code.`),
          TRY({
            title: 'Design a friendly 404 page',
            prompt: `Every website needs a page for when something isn't found. Change the message, the emoji, or the colours in the CSS tab to make this 404 page your own.`,
            html: `
<div class="error">
  <div class="emoji">🧭</div>
  <h1>404</h1>
  <p>Oops! The server looked everywhere but couldn't find that page.</p>
  <a href="#">Take me home</a>
</div>`,
            css: `
body {
  font-family: system-ui, sans-serif;
  background: #f5f3ff;
  display: grid;
  place-items: center;
  min-height: 90vh;
  margin: 0;
}
.error { text-align: center; padding: 24px; }
.emoji { font-size: 56px; }
h1 { font-size: 72px; margin: 0; color: #4f46e5; }
p { color: #555; }
a {
  display: inline-block;
  margin-top: 12px;
  padding: 10px 18px;
  background: #4f46e5;
  color: white;
  border-radius: 999px;
  text-decoration: none;
}`,
          }),
        ],
        quiz: [
          Q(`Which of these is a **browser**?`,
            ['A data centre', 'Firefox', 'HTML', 'A domain name'], 1,
            `Firefox (like Chrome, Safari, and Edge) is a browser: the app that requests web pages and shows them to you.`),
          Q(`What does the status code **404** mean?`,
            ['Everything worked', 'The server crashed', 'The page was not found', 'The site is secure'], 2,
            `404 means “Not Found”: the server is working, but there's no page at that address.`),
          Q(`Which description of a server is most accurate?`,
            ['A computer that stores website files and answers requests', 'A special kind of browser', 'A cable that connects the internet', 'The design of a website'], 0,
            `A server is just a computer whose job is to listen for requests and send back the right files.`),
        ],
      },

      {
        id: 'm1-l3',
        title: 'Domains and DNS',
        minutes: 7,
        intro: `How a name like “example.com” turns into the location of a real computer.`,
        blocks: [
          H(`Computers use numbers, people use names`),
          P(`Every computer on the internet has an **IP address**, a number like {{93.184.215.14}}. It works like a phone number: it tells the network exactly where to send messages.`),
          P(`But nobody wants to memorise numbers like that. So we use **domain names** like {{wikipedia.org}} or {{youtube.com}}: easy-to-remember names that point to those numbers.`),
          ANALOGY(`Your phone's contacts`, `You don't remember your friends' phone numbers. You tap their name, and your phone looks up the number for you. **DNS** (the Domain Name System) is the internet's contacts app: you give it a name, and it gives back the number.`),
          CODE('text', `
example.com     →  93.184.215.14
wikipedia.org   →  185.15.59.224`, 'DNS turns names into numbers'),
          H(`How a DNS lookup works`),
          STEPS(
            [`Check memory first`, `Your browser and computer remember recent lookups. If you visited the site recently, it's instant.`],
            [`Ask a DNS resolver`, `If not, your computer asks a resolver, usually run by your internet provider: “Where is example.com?”`],
            [`Find who's in charge of the domain`, `The resolver asks around until it finds the **nameserver** responsible for that domain.`],
            [`Get the answer`, `The nameserver replies with the IP address. Your browser can now connect to the server.`]
          ),
          P(`All of that usually takes just a few milliseconds.`),
          H(`Reading a web address (URL)`),
          P(`A full web address is called a **URL** (Uniform Resource Locator). Each part has a job:`),
          RAW(`<div class="diagram"><div class="anatomy" role="img" aria-label="The URL https://www.example.com/blog/first-post broken into protocol, subdomain, domain name, top-level domain, and path">
            <span class="c1"><b>https://</b><i>protocol</i></span>
            <span class="c2"><b>www.</b><i>subdomain</i></span>
            <span class="c3"><b>example</b><i>domain name</i></span>
            <span class="c4"><b>.com</b><i>top-level domain</i></span>
            <span class="c5"><b>/blog/first-post</b><i>path (which page)</i></span>
          </div><p class="diagram-cap">The parts of a URL</p></div>`),
          UL(
            `**Protocol** ({{https://}}): the “language” used to talk to the server. More on this in the next lesson.`,
            `**Subdomain** ({{www.}}): an optional section of a site, like {{blog.example.com}} or {{shop.example.com}}.`,
            `**Domain name** ({{example}}): the name someone registered.`,
            `**Top-level domain**, or TLD ({{.com}}): the ending. Others include {{.org}}, {{.dev}}, {{.io}}, and country codes like {{.uk}} and {{.ca}}.`,
            `**Path** ({{/blog/first-post}}): which specific page or file you want on that site.`
          ),
          TIP(`Buying a domain is really **renting** a name, usually for $10–$20 a year. You'll do this (optionally!) in Module 9 and point it at your own site.`),
          TRY({
            title: 'Your favourite websites',
            prompt: `Here's a list of links. Add a few of your own favourite sites, then look at each address and spot the domain name and the TLD. (Links open in a new tab.)`,
            html: `
<h2>My favourite websites</h2>
<ul>
  <li><a href="https://www.wikipedia.org">wikipedia.org</a>: domain "wikipedia", TLD ".org"</li>
  <li><a href="https://developer.mozilla.org">developer.mozilla.org</a>: subdomain "developer"</li>
  <li><a href="https://www.bbc.co.uk">bbc.co.uk</a>: a country-code ending</li>
</ul>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 8px 16px; }
li { margin-bottom: 8px; }
a { color: #0d8a7f; font-weight: 600; }`,
          }),
        ],
        quiz: [
          Q(`What does DNS do?`,
            ['Makes websites load faster by compressing them', 'Turns domain names into IP addresses', 'Encrypts your passwords', 'Designs the layout of a page'], 1,
            `DNS works like the internet's contacts app: it looks up the number (IP address) behind a name (domain).`),
          Q(`In {{https://shop.example.com/cart}}, what is the **top-level domain**?`,
            ['shop', '.com', '/cart', 'https'], 1,
            `The top-level domain is the ending: {{.com}}. {{shop}} is a subdomain and {{/cart}} is the path.`),
          Q(`Why do we use domain names instead of IP addresses?`,
            ['Domain names are faster', 'IP addresses are secret', 'Names are much easier for people to remember', 'Browsers can’t read numbers'], 2,
            `Computers are happy with numbers, but people remember {{youtube.com}} far more easily than a string of digits.`),
        ],
      },

      {
        id: 'm1-l4',
        title: 'HTTP and HTTPS',
        minutes: 6,
        intro: `The language browsers and servers speak, and why that little padlock matters.`,
        blocks: [
          P(`When your browser and a server talk, they need to follow the same rules, just like two people need a shared language. On the web, that language is **HTTP**: HyperText Transfer Protocol.`),
          P(`A **protocol** is simply an agreed set of rules for communicating. HTTP defines how a browser asks for things (a **request**) and how a server answers (a **response**).`),
          H(`Different kinds of requests`),
          P(`Requests come with a **method** that says what the browser wants to do. The two you'll meet most:`),
          CODE('text', `
GET   /about.html   →  "Please give me the About page."
POST  /contact      →  "Here is some form data I'm sending you."`, 'HTTP methods'),
          UL(
            `**GET**: fetch something. Every time you visit a page, that's a GET.`,
            `**POST**: send something, like submitting a contact form or logging in.`
          ),
          H(`So what's the S in HTTPS?`),
          P(`**HTTPS** is HTTP + **S**ecure. Everything sent between your browser and the server is **encrypted**: scrambled so that only the two of them can read it.`),
          ANALOGY(`Postcard vs sealed letter`, `Plain **HTTP** is like sending a postcard: every postal worker who handles it can read it. **HTTPS** is like a sealed, tamper-proof envelope: it still travels through many hands, but nobody can read it or change it on the way.`),
          P(`HTTPS gives you three protections:`),
          UL(
            `**Privacy**: nobody in between (say, on public café Wi-Fi) can read what you send or receive.`,
            `**Integrity**: nobody can secretly change the page on its way to you.`,
            `**Identity**: a digital **certificate** proves the site really is who it claims to be.`
          ),
          P(`When a site uses HTTPS, your browser shows a padlock or a “secure” icon next to the address. Sites without it get a **“Not secure”** warning.`),
          WARN(`Never type a password or card number into a site marked “Not secure”.`),
          TIP(`Good news: HTTPS is free these days, and every free host you'll use in Module 9 switches it on automatically.`),
          TRY({
            title: 'Secure or not?',
            prompt: `This is a pretend browser address bar. In the HTML, swap the {{secure}} class for {{insecure}}, and change {{https}} to {{http}}, to see how browsers warn visitors.`,
            html: `
<div class="bar secure">
  <span class="icon">🔒</span>
  <span class="url">https://my-portfolio.com</span>
</div>
<p class="note">Padlock = the connection is encrypted.</p>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 20px; background: #eef0f6; }
.bar {
  display: flex; align-items: center; gap: 10px;
  background: white; padding: 10px 16px;
  border-radius: 999px; border: 2px solid #ccd;
  font-size: 16px;
}
.secure { border-color: #16a34a; }
.insecure { border-color: #dc2626; }
.insecure .icon::after { content: " Not secure"; color: #dc2626; font-size: 13px; font-weight: bold; }
.note { color: #555; }`,
          }),
        ],
        quiz: [
          Q(`What does the **S** in HTTPS stand for?`,
            ['Simple', 'Server', 'Secure', 'Speed'], 2,
            `HTTPS = HTTP Secure. The connection is encrypted so nobody in between can read or tamper with it.`),
          Q(`Which analogy best describes plain HTTP (without the S)?`,
            ['A postcard anyone handling it can read', 'A locked safe', 'A phone call in a soundproof room', 'A secret diary'], 0,
            `Without encryption, anything sent over HTTP can be read by anyone along the way, just like a postcard.`),
          Q(`Which HTTP method is typically used to **send** form data to a server?`,
            ['GET', 'POST', 'FETCH', 'SEND'], 1,
            `POST sends data to the server. GET is for fetching pages and files.`),
        ],
      },

      {
        id: 'm1-l5',
        title: 'What is hosting?',
        minutes: 6,
        intro: `Where your website lives so the whole world can visit it, and why it can be free.`,
        blocks: [
          P(`Right now, any web page you make lives only on your own computer. If you turn your laptop off, it's gone from the world. To be online 24/7, your files need to live on a server that never sleeps.`),
          P(`**Web hosting** means renting space on one of those always-on servers. You upload your files, and the host serves them to anyone who visits.`),
          ANALOGY(`Address vs. house`, `Your **domain** is your street address. Your **hosting** is the actual house where your stuff lives. You need both: the address tells people where to go, and the house is what they find when they get there.`),
          H(`Static vs. dynamic websites`),
          UL(
            `A **static** site is a set of ready-made files: everyone gets the same HTML, CSS, and JavaScript. Portfolios, blogs, restaurant menus, and landing pages are often static.`,
            `A **dynamic** site builds each page on the fly, often using a database. Your social media feed is dynamic: it's different for every person.`
          ),
          P(`Everything you'll build in this course is **static**, and that's great news, because static hosting is often **completely free**.`),
          H(`Kinds of hosting`),
          UL(
            `**Static hosting** like [GitHub Pages](https://pages.github.com), [Netlify](https://www.netlify.com), or [Vercel](https://vercel.com): free, fast, and perfect for beginners. You'll use one in Module 9.`,
            `**Shared hosting**: a cheap plan where many websites share one server. Common for WordPress sites.`,
            `**Cloud / VPS**: your own virtual server. Powerful and flexible, but you manage it yourself.`
          ),
          H(`The journey of your future website`),
          STEPS(
            [`Build it on your computer`, `Write HTML, CSS, and JavaScript in a code editor (Modules 2–6).`],
            [`Save it with Git`, `Keep a history of your changes and back it up on GitHub (Module 8).`],
            [`Upload it to a host`, `Connect GitHub to a free host like Netlify (Module 9).`],
            [`Connect a domain (optional)`, `Point your own {{yourname.com}} at your host.`],
            [`Share it with the world 🎉`, `Anyone, anywhere, can now visit your site.`]
          ),
          TRY({
            title: 'A sneak peek at your future homepage',
            prompt: `By the end of this course you'll have a real portfolio online. Put your name and a one-line description in the HTML to start imagining it.`,
            html: `
<main class="card">
  <p class="hi">👋 Hi, I'm</p>
  <h1>Your Name</h1>
  <p>Future web developer. Currently learning how the web works.</p>
  <p class="url">🌍 yourname.netlify.app</p>
</main>`,
            css: `
body {
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #eef2ff, #ccfbf1);
  min-height: 90vh; margin: 0;
  display: grid; place-items: center;
}
.card {
  background: white; padding: 32px; border-radius: 20px;
  max-width: 340px; box-shadow: 0 10px 30px rgba(0,0,0,.08);
}
.hi { margin: 0; color: #0d8a7f; font-weight: 600; }
h1 { margin: 4px 0 8px; font-size: 34px; }
.url { color: #4f46e5; font-family: monospace; }`,
          }),
        ],
        quiz: [
          Q(`What is web hosting?`,
            ['Buying a domain name', 'Renting space on an always-on server so your site is reachable', 'Designing a website', 'A type of browser'], 1,
            `Hosting is where your files live online. The domain is just the address that points to it.`),
          Q(`Which of these is a free host for static websites?`,
            ['Netlify', 'Photoshop', 'Chrome', 'DNS'], 0,
            `Netlify (like GitHub Pages and Vercel) hosts static websites for free. You'll use one in Module 9.`),
          Q(`What does it mean for a website to be **static**?`,
            ['It has no images', 'It never changes, ever', 'Every visitor gets the same ready-made files', 'It only works offline'], 2,
            `Static sites serve the same pre-built files to everyone. You can still update them whenever you like.`),
        ],
      },
    ],
    quiz: [
      Q(`Put these in order: what happens first when you visit a website?`,
        ['The server sends files', 'The browser builds the page', 'DNS looks up the IP address for the domain', 'You see the page'], 2,
        `First the browser needs to find the server, so DNS turns the domain into an IP address. Then come the request, the response, and finally the page is built.`),
      Q(`Which part of {{https://blog.mysite.dev/posts}} is the **path**?`,
        ['https://', 'blog', '.dev', '/posts'], 3,
        `The path comes after the domain and tells the server which page you want.`),
      Q(`Your domain is like your street address. What is hosting like?`,
        ['The house where your stuff actually lives', 'The mail carrier', 'The street sign', 'The map'], 0,
        `The domain points people to the right place, and hosting is the place where your files live.`),
      Q(`A site shows “Not secure” in the address bar. What does that most likely mean?`,
        ['It uses HTTP without encryption', 'It is a 404 page', 'Its DNS is broken', 'It is a static site'], 0,
        `“Not secure” means the connection isn't encrypted with HTTPS, so don't type anything private there.`),
      Q(`Which language controls a website's **colours and layout**?`,
        ['HTML', 'CSS', 'JavaScript', 'HTTP'], 1,
        `CSS handles style. HTML is structure and JavaScript is behaviour.`),
    ],
    exercise: {
      title: 'URL detective',
      minutes: 15,
      blocks: [
        P(`Time to be a detective! Pick any website you use often (your favourite shop, news site, or video site). Open it in your browser and look closely at the address bar.`),
        P(`Use the workspace below to fill in what you find. Replace each {{???}} in the HTML tab with your answer, and watch your report build itself in the preview.`),
      ],
      goals: [
        `Pick a website and copy its full URL from the address bar`,
        `Identify the protocol, domain name, and top-level domain`,
        `Find a page on that site with a path (like {{/about}} or {{/help}})`,
        `Check whether it has a padlock (HTTPS)`,
        `Bonus: visit a page that doesn't exist (add {{/asdfgh}} to the URL) and find the site's 404 page`,
      ],
      starter: {
        prompt: `Replace each ??? with what you discovered.`,
        html: `
<h1>🔍 URL detective report</h1>
<p>The URL I investigated: <strong>???</strong></p>
<ul>
  <li><b>Protocol:</b> ???</li>
  <li><b>Subdomain (if any):</b> ???</li>
  <li><b>Domain name:</b> ???</li>
  <li><b>Top-level domain:</b> ???</li>
  <li><b>A path I found:</b> ???</li>
  <li><b>Has a padlock (HTTPS)?</b> ???</li>
  <li><b>What their 404 page says:</b> ???</li>
</ul>`,
        css: `
body { font-family: system-ui, sans-serif; padding: 8px 18px; line-height: 1.6; }
h1 { color: #4f46e5; }
li { margin-bottom: 6px; }
b { color: #0d8a7f; }`,
      },
    },
  };

  /* ==========================================================
     MODULE 2 · Setting Up
     ========================================================== */
  const m2 = {
    id: 'm2',
    icon: '🧰',
    title: 'Setting Up Your Workspace',
    status: 'ready',
    summary: `Get the free tools every web developer uses: a code editor, your browser's developer tools, and a tidy project folder.`,
    goal: `By the end of this module you'll have VS Code installed, a project folder set up, and your first page open in a browser.`,
    lessons: [
      {
        id: 'm2-l1',
        title: 'Your code editor: VS Code',
        minutes: 7,
        intro: `A word processor, but built for code. It's free, and it's what most professionals use.`,
        blocks: [
          P(`Web pages are written in **plain text**. You could technically write one in Notepad, but a **code editor** makes life much easier: it colours your code so it's easier to read, finishes words for you, and catches typos.`),
          WARN(`Don't use Microsoft Word or Google Docs for code. They add hidden formatting (and “smart” curly quotes) that browsers can't understand.`, `Why not Word?`),
          P(`We'll use **Visual Studio Code** (VS Code). It's free, works on Mac, Windows, and Linux, and is the most popular code editor in the world.`),
          H(`Install it`),
          STEPS(
            [`Go to the download page`, `Visit [code.visualstudio.com](https://code.visualstudio.com) and click the big download button for your system.`],
            [`Install it`, `On Mac, drag it into your Applications folder. On Windows, run the installer and click “Next” through the steps (tick “Add to PATH” if you see it).`],
            [`Open it`, `You'll see a Welcome tab. You can close it.`]
          ),
          H(`A quick tour`),
          UL(
            `**Explorer** (the top icon on the left): your project's files and folders.`,
            `**Editor**: the big area in the middle where you type. Each open file gets a tab.`,
            `**Extensions** (the four-squares icon): add-ons that give VS Code new powers.`,
            `**Command Palette** ({{Ctrl+Shift+P}} on Windows, {{Cmd+Shift+P}} on Mac): search for any command by name.`,
            `**Terminal** (View → Terminal): a text-based way to control your computer. You'll use it in Module 8.`
          ),
          H(`Three helpful extensions`),
          P(`Click the Extensions icon, search for each of these, and click **Install**:`),
          UL(
            `**Live Server**: opens your page in the browser and refreshes it automatically every time you save. A huge time-saver!`,
            `**Prettier**: tidies up your code's spacing and indentation with one command.`,
            `**Auto Rename Tag**: when you rename an opening HTML tag, it renames the closing one too.`
          ),
          H(`Shortcuts worth learning today`),
          CODE('text', `
Save the file            Ctrl+S        (Mac: Cmd+S)
Undo                     Ctrl+Z        (Mac: Cmd+Z)
Find in file             Ctrl+F        (Mac: Cmd+F)
Comment out a line       Ctrl+/        (Mac: Cmd+/)
Move a line up / down    Alt+↑ / ↓     (Mac: Option+↑ / ↓)
HTML starter template    type  !  then press Tab (in an .html file)`, 'Keyboard shortcuts'),
          TIP(`That last one is magic. In an empty {{.html}} file, type {{!}} and press Tab, and VS Code writes the whole starter template for you. (This feature is called **Emmet**.)`),
          TRY({
            title: 'Practise in a mini editor',
            prompt: `This little editor works a lot like VS Code. Click into the HTML, add a new line with {{<p>Hello from my editor!</p>}}, and watch the preview. Press Tab to indent.`,
            html: `
<h1>My workspace</h1>
<p>I'm setting up my code editor.</p>
<!-- Add a new paragraph below this line -->
`,
          }),
        ],
        quiz: [
          Q(`Why shouldn't you write code in Microsoft Word?`,
            ['Word is too expensive', 'It adds hidden formatting that browsers can’t read', 'Word can’t save files', 'Code must be handwritten'], 1,
            `Code needs to be plain text. Word adds invisible formatting and changes quote marks, which breaks code.`),
          Q(`Which VS Code extension refreshes your browser automatically when you save?`,
            ['Prettier', 'Auto Rename Tag', 'Live Server', 'Command Palette'], 2,
            `Live Server watches your files and reloads the page whenever you save. No more manual refreshing.`),
          Q(`In an empty HTML file in VS Code, what does typing {{!}} and pressing Tab do?`,
            ['Deletes the file', 'Writes a complete HTML starter template', 'Opens the terminal', 'Shows an error'], 1,
            `That's Emmet, built into VS Code. It expands {{!}} into a full HTML starter template.`),
        ],
      },

      {
        id: 'm2-l2',
        title: 'Folders, files, and naming',
        minutes: 6,
        intro: `A website is a folder. Keeping it tidy now saves you hours of confusion later.`,
        blocks: [
          P(`Remember: **a website is just a folder of files**. That folder is called your **project folder** (or the “root” of your site). Everything for your site goes inside it.`),
          P(`Here's how a typical small website is organised:`),
          CODE('text', `
my-website/
├── index.html        ← the homepage
├── about.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── images/
    ├── logo.svg
    └── me.jpg`, 'A tidy project folder'),
          H(`Why “index.html”?`),
          P(`When someone visits {{yoursite.com}} without naming a specific page, the server automatically looks for a file called {{index.html}} and sends that. So **your homepage must be called {{index.html}}**.`),
          H(`Naming rules that prevent headaches`),
          UL(
            `✅ **Use lowercase**: {{about.html}}, not {{About.HTML}}. Some servers treat {{About}} and {{about}} as different files.`,
            `✅ **No spaces**: use hyphens instead. Write {{my-photo.jpg}}, not {{my photo.jpg}}.`,
            `✅ **No special characters**: avoid {{& ? # ! %}} and accents in file names.`,
            `✅ **Keep the extension**: {{.html}}, {{.css}}, {{.js}}, {{.jpg}}. It tells the browser what kind of file it is.`,
            `✅ **Be descriptive**: {{team-photo.jpg}} beats {{IMG_4821.jpg}}.`
          ),
          H(`File paths: giving directions`),
          P(`When one file needs another (a page showing an image, or loading a stylesheet), you write a **path**: directions from where you are to where the file is.`),
          ANALOGY(`Directions in a building`, `Imagine you're standing in the lobby ({{index.html}}). To reach a photo in the “images” room, the directions are “go into images, then find me.jpg”: {{images/me.jpg}}. To go *back out* of a folder, you use {{../}}, which means “go up one level”.`),
          CODE('html', `
<!-- From index.html (in the main folder) -->
<img src="images/me.jpg" alt="Me smiling">
<link rel="stylesheet" href="css/styles.css">

<!-- From a file inside a "blog" folder, going up one level first -->
<img src="../images/me.jpg" alt="Me smiling">`, 'Relative paths'),
          WARN(`Your computer may hide file extensions, so a file that looks like {{index.html}} might actually be {{index.html.txt}}. Turn on “Show file extensions” (Finder → Settings → Advanced on Mac; View → File name extensions on Windows).`, `Hidden extensions`),
          TRY({
            title: 'Draw your folder map',
            prompt: `Nested lists are a handy way to sketch a folder structure. Add an {{about.html}} file, and a {{js}} folder containing {{script.js}}.`,
            html: `
<h2>📁 my-website</h2>
<ul>
  <li>📄 index.html</li>
  <li>📁 css
    <ul>
      <li>🎨 styles.css</li>
    </ul>
  </li>
  <li>📁 images
    <ul>
      <li>🖼️ me.jpg</li>
    </ul>
  </li>
</ul>`,
            css: `
body { font-family: ui-monospace, monospace; padding: 4px 16px; }
ul { list-style: none; padding-left: 22px; border-left: 2px dashed #c7c9e0; }
li { margin: 6px 0; }`,
          }),
        ],
        quiz: [
          Q(`What must your homepage file be called?`,
            ['home.html', 'index.html', 'main.html', 'start.html'], 1,
            `Servers automatically look for {{index.html}} when no specific page is requested.`),
          Q(`Which file name follows the naming rules best?`,
            ['About Me!.html', 'ABOUT ME.HTML', 'about-me.html', 'about me.html'], 2,
            `Lowercase, hyphens instead of spaces, no special characters, and the {{.html}} extension.`),
          Q(`From {{index.html}}, which path points to {{cat.jpg}} inside the {{images}} folder?`,
            ['images/cat.jpg', 'cat.jpg', '../cat.jpg', 'C:/Desktop/cat.jpg'], 0,
            `Go into {{images}}, then find {{cat.jpg}}. Avoid paths from your own computer (like {{C:/Desktop}}): they break once the site is online.`),
        ],
      },

      {
        id: 'm2-l3',
        title: 'Opening your page in a browser',
        minutes: 6,
        intro: `Create a real file on your computer and see it in your browser.`,
        milestone: `You just set up your first website project! 🗂️`,
        blocks: [
          P(`Time to make a real web page on your own computer. Follow along. It takes about five minutes.`),
          STEPS(
            [`Create a project folder`, `Make a new folder on your Desktop (or in Documents) called {{my-website}}.`],
            [`Open it in VS Code`, `In VS Code choose **File → Open Folder…** and pick {{my-website}}.`],
            [`Create index.html`, `In the Explorer panel, click the “New File” icon and name it {{index.html}}.`],
            [`Add the starter code`, `Type {{!}} and press Tab. VS Code fills in the template below.`],
            [`Add a heading`, `Between {{<body>}} and {{</body>}}, type {{<h1>Hello, world!</h1>}}.`],
            [`Save!`, `Press {{Ctrl+S}} (Mac: {{Cmd+S}}). A white dot on the tab means “unsaved”.`],
            [`Open it in the browser`, `Right-click the file → **Open with Live Server**. Or find the file on your computer and double-click it.`]
          ),
          CODE('html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Website</title>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
</html>`, 'index.html'),
          P(`Look at the browser's address bar. If you double-clicked the file, it starts with {{file:///}}. That means the file is on **your computer**, not on the internet. Only you can see it for now. (If you used Live Server it shows something like {{127.0.0.1:5500}}, which is also just your own computer.)`),
          H(`The edit → save → refresh loop`),
          P(`This is the rhythm of web development: **edit** your code, **save** the file, **refresh** the browser to see the change. With Live Server, the refresh happens for you.`),
          WARN(`Changed your code but the browser still shows the old version? 9 times out of 10 you forgot to save. Look for the white dot on the file's tab.`, `The #1 beginner mistake`),
          TRY({
            title: 'Your starter page',
            prompt: `This is the exact same starter page. Change the {{<h1>}} to your name and add a {{<p>}} underneath. Note: the {{<title>}} text doesn't show in the page itself. It appears on the browser tab.`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Website</title>
</head>
<body>
  <h1>Hello, world!</h1>
</body>
</html>`,
          }),
        ],
        quiz: [
          Q(`The address bar shows {{file:///Users/sam/my-website/index.html}}. What does that mean?`,
            ['The site is live on the internet', 'The file is on your own computer and only you can see it', 'The site has been hacked', 'The page is a 404'], 1,
            `{{file:///}} means the browser is reading a file straight from your computer. It's not online yet.`),
          Q(`You edited your code, but the browser still shows the old version. What's the most likely cause?`,
            ['You need a new computer', 'The internet is down', 'You forgot to save the file (or refresh)', 'HTML is broken'], 2,
            `Save, then refresh. It's the most common beginner hiccup, and it happens to pros too!`),
          Q(`Where does the text inside {{<title>}} appear?`,
            ['As a big heading on the page', 'On the browser tab', 'At the bottom of the page', 'Nowhere'], 1,
            `The title shows on the browser tab, in bookmarks, and in search results, but not on the page itself.`),
        ],
      },

      {
        id: 'm2-l4',
        title: 'Browser DevTools',
        minutes: 8,
        intro: `Every browser has a secret toolbox that gives you X-ray vision into any website.`,
        blocks: [
          P(`Every major browser has **Developer Tools** (DevTools) built in. They let you look inside any web page, see its HTML and CSS, test changes live, and find errors. Professionals use them every day.`),
          H(`How to open DevTools`),
          UL(
            `**Right-click** anything on a page → **Inspect**. (Easiest!)`,
            `Or press {{F12}}, or {{Ctrl+Shift+I}} on Windows, or {{Cmd+Option+I}} on Mac.`,
            `**Safari** users: first turn on Settings → Advanced → “Show features for web developers”.`
          ),
          H(`The panels you'll use most`),
          UL(
            `**Elements**: the page's HTML. Hover over a line and that part of the page lights up. Double-click text to edit it.`,
            `**Styles** (inside Elements): the CSS for the selected element. Untick a checkbox to switch a style off, or click a value to change it.`,
            `**Console**: messages and errors from JavaScript. You can also type JavaScript here and run it.`,
            `**Network**: every file the page requested, with its status code (remember 200 and 404 from Module 1?).`,
            `**Device toolbar** (the phone/tablet icon): preview the page at phone and tablet sizes.`
          ),
          ANALOGY(`A mechanic's diagnostic tool`, `A mechanic plugs a scanner into your car to see what's happening under the hood. DevTools is that scanner for websites. You can poke around safely on any site, even Google or YouTube.`),
          TIP(`Changes you make in DevTools are **temporary**. Refresh the page and they're gone. That makes it a perfect, risk-free playground. Try changing the headline on a news site just for fun!`),
          H(`Saying hello from the Console`),
          P(`JavaScript can write messages to the Console using {{console.log()}}. Developers use it constantly to check what their code is doing:`),
          CODE('js', `
console.log("Hello from the console!");
console.log(2 + 2);  // prints 4`, 'script.js'),
          TRY({
            title: 'Talk to the console',
            focus: 'js',
            prompt: `Our preview has its own mini console. Click the button in the preview and watch a message appear below it. Then change the text inside {{console.log("...")}} in the JavaScript tab.`,
            html: `
<h2>Console playground</h2>
<button id="hello">Click me</button>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 8px 16px; }
button {
  font-size: 16px; padding: 10px 18px; border-radius: 10px;
  border: 0; background: #4f46e5; color: white; cursor: pointer;
}`,
            js: `
console.log("The page has loaded!");

document.querySelector("#hello").addEventListener("click", function () {
  console.log("Button clicked! 👋");
});`,
          }),
          P(`Don't worry about how that JavaScript works yet. You'll learn it in Module 5. For now, just enjoy seeing your code talk back!`),
        ],
        quiz: [
          Q(`What's the easiest way to open DevTools on an element?`,
            ['Restart your computer', 'Right-click it and choose Inspect', 'Type “devtools” in the address bar', 'Install a special app'], 1,
            `Right-click → Inspect opens DevTools with that exact element selected.`),
          Q(`Which DevTools panel shows every file a page loaded, with its status code?`,
            ['Elements', 'Console', 'Network', 'Styles'], 2,
            `The Network panel lists every request and response, including 200s and 404s.`),
          Q(`You change a heading in the Elements panel. What happens when you refresh?`,
            ['The change is saved forever', 'The website owner gets an email', 'The change disappears; DevTools edits are temporary', 'The browser crashes'], 2,
            `DevTools edits only live in your browser until you refresh, so it's a safe place to experiment.`),
        ],
      },
    ],
    quiz: [
      Q(`Which of these is the best tool for writing code?`,
        ['Microsoft Word', 'VS Code', 'Paint', 'A spreadsheet'], 1,
        `VS Code is built for code: plain text, syntax colours, and helpful extensions.`),
      Q(`What's wrong with the file name {{My Photo.JPG}}?`,
        ['Nothing', 'It has a space and capital letters', 'It is too short', 'Images can’t have names'], 1,
        `Use lowercase and hyphens: {{my-photo.jpg}}.`),
      Q(`From a file inside a {{blog}} folder, how do you reach {{images/logo.svg}} in the main folder?`,
        ['images/logo.svg', '../images/logo.svg', 'blog/images/logo.svg', '/blog/logo.svg'], 1,
        `{{../}} means “go up one folder”, then go into {{images}}.`),
      Q(`Which DevTools panel shows error messages from JavaScript?`,
        ['Console', 'Elements', 'Network', 'Device toolbar'], 0,
        `The Console shows errors and anything you print with {{console.log()}}.`),
    ],
    exercise: {
      title: 'Set up your project folder',
      minutes: 20,
      blocks: [
        P(`This one happens **on your own computer**, not in the browser. You'll create the folder you'll keep building on for the rest of the course.`),
        P(`Use the workspace below as a reference and to preview your page before you build it for real.`),
      ],
      goals: [
        `Install VS Code (and the Live Server extension)`,
        `Create a folder called {{my-website}} with three subfolders: {{css}}, {{js}}, and {{images}}`,
        `Create {{index.html}} using the {{!}} + Tab shortcut`,
        `Change the {{<title>}} and add an {{<h1>}} with your name`,
        `Save and open the page with Live Server (or by double-clicking it)`,
        `Right-click your heading → Inspect, then change its text in DevTools just for fun`,
      ],
      starter: {
        prompt: `Practise here first: put your name in the title and heading, and add a sentence about why you're learning web development.`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name · Home</title>
</head>
<body>
  <h1>Your Name</h1>
  <p>I'm learning web development because...</p>
</body>
</html>`,
      },
    },
  };

  /* ==========================================================
     MODULE 3 · HTML
     ========================================================== */
  const m3 = {
    id: 'm3',
    icon: '🧱',
    title: 'HTML: The Structure of the Web',
    status: 'ready',
    summary: `Learn the language every web page is built on: tags, headings, text, links, images, lists, forms, and semantic structure.`,
    goal: `By the end of this module you'll have built a complete “About Me” page from scratch, using real, well-structured HTML.`,
    lessons: [
      {
        id: 'm3-l1',
        title: 'The anatomy of an HTML page',
        minutes: 9,
        intro: `Tags, elements, attributes, and the skeleton every web page shares.`,
        milestone: `You just wrote your first HTML page! 🎉`,
        blocks: [
          P(`**HTML** stands for **HyperText Markup Language**. “Markup” means you *mark up* your content with labels called **tags**, which tell the browser what each piece of content is: “this is a heading”, “this is a paragraph”, “this is a link”.`),
          H(`Tags and elements`),
          P(`Most tags come in pairs: an **opening tag** and a **closing tag** with a forward slash. Together with the content between them, they form an **element**.`),
          RAW(`<div class="diagram"><div class="anatomy" role="img" aria-label="The element p This is a paragraph slash p: opening tag, content, closing tag">
            <span class="c1"><b>&lt;p&gt;</b><i>opening tag</i></span>
            <span class="c2"><b>This is a paragraph.</b><i>content</i></span>
            <span class="c1"><b>&lt;/p&gt;</b><i>closing tag (note the /)</i></span>
          </div><p class="diagram-cap">Opening tag + content + closing tag = one <strong>element</strong></p></div>`),
          P(`A few elements have no content and no closing tag. They're called **void** (or self-closing) elements. You'll meet {{<img>}} (an image), {{<br>}} (a line break), and {{<meta>}} (page info).`),
          H(`Attributes: extra information`),
          P(`Opening tags can carry **attributes**, which add extra details. They're written as {{name="value"}}:`),
          RAW(`<div class="diagram"><div class="anatomy" role="img" aria-label="An a tag with an href attribute">
            <span class="c1"><b>&lt;a</b><i>tag name</i></span>
            <span class="c3"><b>href</b><i>attribute name</i></span>
            <span class="c4"><b>="https://example.com"</b><i>attribute value</i></span>
            <span class="c1"><b>&gt;</b><i>&nbsp;</i></span>
            <span class="c2"><b>Visit Example</b><i>content</i></span>
            <span class="c1"><b>&lt;/a&gt;</b><i>closing tag</i></span>
          </div></div>`),
          H(`The skeleton of every page`),
          P(`Every HTML document follows the same basic structure. Here it is, line by line:`),
          CODE('html', `
<!DOCTYPE html>                 <!-- "This is a modern HTML page" -->
<html lang="en">                <!-- The root: wraps everything. lang = language -->
  <head>                        <!-- Info ABOUT the page (mostly invisible) -->
    <meta charset="UTF-8">      <!-- Supports all characters & emoji -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <!-- ↑ Makes the page work on phones -->
    <title>My Page</title>      <!-- Text on the browser tab -->
  </head>
  <body>                        <!-- Everything VISIBLE goes in here -->
    <h1>Welcome!</h1>
    <p>This is my first web page.</p>
  </body>
</html>`, 'index.html'),
          P(`The parts in grey that start with {{<!--}} and end with {{-->}} are **comments**: notes for humans that the browser ignores.`),
          ANALOGY(`A shipping box`, `The {{<head>}} is the label on the outside of the box: what it is, where it's from, how to handle it. The {{<body>}} is what's actually inside the box: everything the visitor sees.`),
          H(`Nesting: elements inside elements`),
          P(`Elements can go inside other elements. This is called **nesting**. The golden rule: **close tags in the reverse order you opened them**, like stacking boxes.`),
          CODE('html', `
<!-- ✅ Correct: strong opens and closes inside p -->
<p>This is <strong>very</strong> important.</p>

<!-- ❌ Wrong: the tags cross over each other -->
<p>This is <strong>very</p> important.</strong>`, 'Nesting'),
          TIP(`Indenting nested elements (pushing them in with spaces) doesn't change how the page looks, but it makes your code much easier to read.`),
          TRY({
            title: 'Write your first real HTML page',
            prompt: `Change the {{<title>}}, put your name in the {{<h1>}}, and add a second {{<p>}} about something you love. Try making a word **bold** with {{<strong>}}.`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <!-- Change the heading to your name -->
  <h1>Hello, I'm learning HTML!</h1>
  <p>This is my <strong>very first</strong> web page.</p>
</body>
</html>`,
          }),
        ],
        quiz: [
          Q(`Which part of an HTML document holds everything **visible** on the page?`,
            ['{{<head>}}', '{{<body>}}', '{{<title>}}', '{{<meta>}}'], 1,
            `The {{<body>}} holds everything visitors see. The {{<head>}} holds information about the page.`),
          Q(`What's wrong with {{<p><strong>Hi</p></strong>}}?`,
            ['Nothing, it’s fine', 'The tags are closed in the wrong order', '{{<strong>}} isn’t a real tag', 'It needs a {{<title>}}'], 1,
            `Close tags in reverse order: {{<p><strong>Hi</strong></p>}}.`),
          Q(`In {{<a href="about.html">About</a>}}, what is {{href}}?`,
            ['A tag', 'A comment', 'An attribute', 'The content'], 2,
            `{{href}} is an attribute: extra information inside the opening tag. Here it tells the link where to go.`),
        ],
      },

      {
        id: 'm3-l2',
        title: 'Headings, paragraphs, and text',
        minutes: 7,
        intro: `How to structure text so it's easy to read for people, screen readers, and search engines.`,
        blocks: [
          H(`Headings: h1 to h6`),
          P(`HTML has six levels of headings, from {{<h1>}} (most important) to {{<h6>}} (least important). Think of them as the outline of your page, like chapter titles and section titles in a book.`),
          CODE('html', `
<h1>My Travel Blog</h1>          <!-- The page's main title: use once -->
  <h2>Trips in Europe</h2>        <!-- A section -->
    <h3>Lisbon, Portugal</h3>     <!-- A sub-section -->
    <h3>Rome, Italy</h3>
  <h2>Trips in Asia</h2>
    <h3>Kyoto, Japan</h3>`, 'Headings form an outline'),
          UL(
            `Use **one {{<h1>}}** per page, for the main title.`,
            `**Don't skip levels**: go {{h2}} → {{h3}}, not {{h2}} → {{h5}}.`,
            `**Don't pick a heading because of its size.** Choose it for its meaning. You'll control size with CSS in Module 4.`
          ),
          TIP(`People using screen readers often jump from heading to heading to skim a page, just like you scan headings with your eyes. Good headings make your site accessible.`),
          H(`Paragraphs`),
          P(`Wrap each block of text in {{<p>}}. Here's a surprise: **HTML ignores extra spaces and line breaks**. Five spaces, or ten blank lines, all collapse into a single space. To start a new paragraph, use a new {{<p>}}.`),
          CODE('html', `
<p>This      has     lots of
   spaces and line breaks,
   but displays as one tidy line.</p>

<p>A new paragraph starts here.</p>

<p>Use a line break<br>only when it's part of the content, like in an address or a poem.</p>`, 'Paragraphs and whitespace'),
          H(`Giving words meaning`),
          UL(
            `{{<strong>}}: **important** text (shown bold).`,
            `{{<em>}}: emphasised text, the way you'd stress a word when speaking (shown in italics).`,
            `{{<mark>}}: highlighted text, like a highlighter pen.`,
            `{{<blockquote>}}: a quote from somewhere else.`,
            `{{<hr>}}: a thematic break (a horizontal line between sections).`
          ),
          TRY({
            title: 'Write a mini article',
            prompt: `Add an {{<h3>}} under “Favourite foods” with a specific dish, then a paragraph about it. Try typing lots of spaces between two words and watch them collapse into one.`,
            html: `
<h1>All About Me</h1>
<p>Hi! I'm <strong>Sam</strong>, and I'm <em>really</em> excited to learn web development.</p>

<h2>Favourite foods</h2>
<p>I could eat <mark>tacos</mark> every day.</p>

<hr>

<h2>A quote I love</h2>
<blockquote>The best way to predict the future is to create it.</blockquote>`,
            css: `
body { font-family: Georgia, serif; padding: 4px 18px; line-height: 1.6; }
blockquote { border-left: 4px solid #4f46e5; margin-left: 0; padding-left: 14px; color: #555; font-style: italic; }`,
          }),
        ],
        quiz: [
          Q(`How many {{<h1>}} headings should a page usually have?`,
            ['None', 'One', 'Exactly six', 'As many as you like'], 1,
            `One {{<h1>}} for the page's main title, then {{<h2>}} and below for sections.`),
          Q(`You type five spaces between two words in HTML. What shows in the browser?`,
            ['Five spaces', 'One space', 'No space', 'An error'], 1,
            `HTML collapses all runs of spaces and line breaks into a single space.`),
          Q(`Which tag marks text as **important**?`,
            ['{{<strong>}}', '{{<big>}}', '{{<h7>}}', '{{<important>}}'], 0,
            `{{<strong>}} means “this is important”, and browsers show it in bold. {{<h7>}} and {{<important>}} don't exist.`),
        ],
      },

      {
        id: 'm3-l3',
        title: 'Links',
        minutes: 7,
        intro: `Links are what make it a “web”: they connect pages, sites, and sections together.`,
        blocks: [
          P(`The “HyperText” in HTML means text that links to other text. Links are made with the {{<a>}} (anchor) tag, and the {{href}} attribute says **where** the link goes.`),
          CODE('html', `
<a href="https://developer.mozilla.org">Learn more on MDN</a>`, 'A basic link'),
          H(`Kinds of links`),
          CODE('html', `
<!-- To another website (absolute URL) -->
<a href="https://www.wikipedia.org">Wikipedia</a>

<!-- To another page on YOUR site (relative path) -->
<a href="about.html">About me</a>

<!-- To a section on the same page (uses an id) -->
<a href="#contact">Jump to contact</a>
...
<h2 id="contact">Contact</h2>

<!-- To start an email -->
<a href="mailto:hello@example.com">Email me</a>

<!-- Open in a new tab -->
<a href="https://github.com" target="_blank" rel="noopener">GitHub</a>`, 'Different kinds of links'),
          UL(
            `**Absolute URLs** include the full address, starting with {{https://}}. Use them for other websites.`,
            `**Relative paths** like {{about.html}} point to files in your own project (remember paths from Module 2?).`,
            `**#id links** jump to an element with a matching {{id}} on the page. Great for long pages.`
          ),
          H(`Write link text that makes sense on its own`),
          P(`Avoid “click here”. Screen reader users often browse a list of just the links on a page, and “click here, click here, click here” tells them nothing. Describe where the link goes instead.`),
          CODE('html', `
<!-- ❌ Vague -->
To see our prices, <a href="pricing.html">click here</a>.

<!-- ✅ Descriptive -->
See our <a href="pricing.html">pricing plans</a>.`, 'Good link text'),
          TIP(`Only use {{target="_blank"}} (new tab) for external sites, and use it sparingly. Many people prefer to decide that for themselves.`),
          TRY({
            title: 'Build a navigation menu',
            prompt: `Click the links in the preview: the {{#}} links jump down the page, and the external one opens a new tab. Add a link to your own favourite website.`,
            html: `
<nav>
  <a href="#about">About</a> |
  <a href="#hobbies">Hobbies</a> |
  <a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN Web Docs ↗</a>
</nav>

<h2 id="about">About</h2>
<p>I'm learning to build websites. Email me at <a href="mailto:me@example.com">me@example.com</a>.</p>
<p style="height:300px">(Lots of content here…)</p>

<h2 id="hobbies">Hobbies</h2>
<p>Hiking, coffee, and now… coding!</p>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
nav { position: sticky; top: 0; background: white; padding: 12px 0; border-bottom: 1px solid #ddd; }
a { color: #4f46e5; font-weight: 600; }`,
          }),
        ],
        quiz: [
          Q(`Which attribute holds a link's destination?`,
            ['src', 'href', 'link', 'to'], 1,
            `{{href}} (hypertext reference) holds the destination. You'll see {{src}} on images next.`),
          Q(`Which link text is best?`,
            ['Click here', 'Link', 'Read our beginner’s guide to HTML', 'More'], 2,
            `Descriptive link text tells everyone, including screen reader users, exactly where the link goes.`),
          Q(`Where does {{<a href="#contact">}} take you?`,
            ['To a page called contact.html', 'To the element with {{id="contact"}} on the same page', 'To your email app', 'Nowhere, it’s broken'], 1,
            `A {{#}} followed by a name jumps to the element with that {{id}} on the current page.`),
        ],
      },

      {
        id: 'm3-l4',
        title: 'Images',
        minutes: 7,
        intro: `Adding pictures, and describing them so everyone can enjoy your page.`,
        blocks: [
          P(`Images use the {{<img>}} tag. It's a void element (no closing tag) with two essential attributes:`),
          CODE('html', `
<img src="images/dog.jpg" alt="A golden retriever catching a frisbee in the park">`, 'An image'),
          UL(
            `{{src}} (source): **where** the image file is: a path in your project or a full URL.`,
            `{{alt}} (alternative text): **a description** of the image for people who can't see it.`
          ),
          H(`Why alt text matters`),
          P(`Alt text is read aloud by screen readers for blind and visually impaired visitors. It also shows up if the image fails to load, and it helps search engines understand your images.`),
          UL(
            `✅ Good: {{alt="Sam presenting at a coding meetup"}}`,
            `❌ Unhelpful: {{alt="image"}} or {{alt="IMG_2041.jpg"}}`,
            `If an image is **purely decorative** (like a swirl), use an empty {{alt=""}} so screen readers skip it.`
          ),
          H(`Width and height`),
          P(`Adding {{width}} and {{height}} (in pixels) lets the browser reserve space before the image loads, so the page doesn't jump around:`),
          CODE('html', `
<img src="images/me.jpg" alt="Me smiling on a beach" width="400" height="300">`, 'Reserving space'),
          H(`Image formats in a nutshell`),
          UL(
            `**JPG**: photos. Small files, no transparency.`,
            `**PNG**: graphics and screenshots, supports transparency.`,
            `**SVG**: logos and icons. Made of shapes, not pixels, so they stay perfectly sharp at any size.`,
            `**WebP / AVIF**: modern formats, much smaller than JPG or PNG, and supported by all current browsers.`
          ),
          H(`Captions with figure`),
          CODE('html', `
<figure>
  <img src="images/sunset.jpg" alt="Orange sunset over the ocean">
  <figcaption>Sunset in Lisbon, summer 2025.</figcaption>
</figure>`, 'An image with a caption'),
          WARN(`Only use images you have the right to use. Free, high-quality photos are available from sites like [Unsplash](https://unsplash.com) and [Pexels](https://www.pexels.com).`, `Copyright`),
          TIP(`Big images make pages slow. Before adding a photo, shrink and compress it with a free tool like [Squoosh](https://squoosh.app). More on this in Module 7.`),
          TRY({
            title: 'Add and describe an image',
            prompt: `This image loads from the internet. Try breaking the {{src}} (delete a letter) to see the alt text appear in its place. Then rewrite the alt text and caption in your own words.`,
            html: `
<figure>
  <img src="https://picsum.photos/id/1025/480/320" alt="A pug wrapped in a blanket, looking at the camera" width="480" height="320">
  <figcaption>My dream office buddy.</figcaption>
</figure>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 8px 16px; }
figure { margin: 0; }
img { max-width: 100%; height: auto; border-radius: 14px; }
figcaption { color: #666; font-size: 14px; margin-top: 6px; }`,
          }),
        ],
        quiz: [
          Q(`What is the {{alt}} attribute for?`,
            ['Making the image bigger', 'Describing the image for people who can’t see it', 'Adding a border', 'Linking to another page'], 1,
            `Alt text is read by screen readers, shown if the image fails, and helps search engines.`),
          Q(`What's the best format for a logo that must stay sharp at any size?`,
            ['JPG', 'SVG', 'A screenshot', 'GIF'], 1,
            `SVG images are made of shapes, not pixels, so they scale perfectly.`),
          Q(`Does {{<img>}} need a closing {{</img>}} tag?`,
            ['Yes, always', 'No, it’s a void element', 'Only for photos', 'Only on mobile'], 1,
            `{{<img>}} has no content, so it doesn't have a closing tag.`),
        ],
      },

      {
        id: 'm3-l5',
        title: 'Lists',
        minutes: 5,
        intro: `Bullet points, numbered steps, and the secret behind most navigation menus.`,
        blocks: [
          P(`HTML has two main kinds of lists. Each item inside either kind goes in an {{<li>}} (list item).`),
          UL(
            `{{<ul>}}: **unordered** list (bullets). Use it when the order doesn't matter, like ingredients.`,
            `{{<ol>}}: **ordered** list (numbers). Use it when order matters, like steps in a recipe.`
          ),
          CODE('html', `
<h3>Ingredients</h3>
<ul>
  <li>2 eggs</li>
  <li>1 cup of flour</li>
  <li>A pinch of salt</li>
</ul>

<h3>Steps</h3>
<ol>
  <li>Whisk the eggs.</li>
  <li>Add the flour and salt.</li>
  <li>Cook in a hot pan.</li>
</ol>`, 'Unordered and ordered lists'),
          H(`Lists inside lists`),
          P(`To nest a list, put the whole new list **inside** an {{<li>}}:`),
          CODE('html', `
<ul>
  <li>Fruits
    <ul>
      <li>Apples</li>
      <li>Mangoes</li>
    </ul>
  </li>
  <li>Vegetables</li>
</ul>`, 'A nested list'),
          TIP(`Most website navigation menus are actually just a {{<ul>}} of links, styled with CSS to sit in a row. You'll build one in Module 4.`),
          TRY({
            title: 'Write a recipe',
            prompt: `Add another ingredient and another step. Then try adding {{start="5"}} to the {{<ol>}} tag and see what happens to the numbers.`,
            html: `
<h2>🥞 Simple pancakes</h2>

<h3>Ingredients</h3>
<ul>
  <li>1 cup flour</li>
  <li>1 cup milk</li>
  <li>1 egg</li>
</ul>

<h3>Steps</h3>
<ol>
  <li>Mix everything in a bowl.</li>
  <li>Pour some batter into a hot pan.</li>
  <li>Flip when bubbles appear.</li>
</ol>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 0 16px; }
li { margin-bottom: 4px; }
li::marker { color: #0d8a7f; font-weight: bold; }`,
          }),
        ],
        quiz: [
          Q(`Which tag creates a **numbered** list?`,
            ['{{<ul>}}', '{{<ol>}}', '{{<li>}}', '{{<nl>}}'], 1,
            `{{<ol>}} is an ordered (numbered) list. {{<ul>}} uses bullets.`),
          Q(`Each item in a list is wrapped in which tag?`,
            ['{{<item>}}', '{{<p>}}', '{{<li>}}', '{{<list>}}'], 2,
            `{{<li>}} stands for “list item” and works in both {{<ul>}} and {{<ol>}}.`),
          Q(`Navigation menus are usually built as…`,
            ['A {{<ul>}} of links', 'One very long paragraph', 'A table', 'Images of text'], 0,
            `A list of links is the standard, accessible way to build a menu.`),
        ],
      },

      {
        id: 'm3-l6',
        title: 'Forms',
        minutes: 9,
        intro: `Search boxes, sign-ups, contact forms: how websites collect information from people.`,
        blocks: [
          P(`Whenever you type into a website (searching, logging in, sending a message) you're using a **form**. Forms are built from a few key pieces:`),
          UL(
            `{{<form>}}: the container that groups the fields together.`,
            `{{<label>}}: the visible name of a field.`,
            `{{<input>}}: a one-line box (and many other kinds of controls).`,
            `{{<textarea>}}: a multi-line text box.`,
            `{{<select>}}: a dropdown menu.`,
            `{{<button>}}: the button that sends the form.`
          ),
          CODE('html', `
<form>
  <label for="name">Your name</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>

  <label for="topic">Topic</label>
  <select id="topic" name="topic">
    <option>Say hello</option>
    <option>Work together</option>
  </select>

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="4"></textarea>

  <button type="submit">Send message</button>
</form>`, 'A contact form'),
          H(`Labels: always connect them`),
          P(`A label's {{for}} attribute must match its input's {{id}}. That connection means clicking the label focuses the box, and screen readers announce the right name for each field.`),
          H(`Input types do a lot for free`),
          UL(
            `{{type="email"}}: checks for an @ sign, and shows an email keyboard on phones.`,
            `{{type="password"}}: hides what you type.`,
            `{{type="number"}}, {{type="date"}}, {{type="color"}}: show special pickers.`,
            `{{type="checkbox"}}: tick boxes (choose many). {{type="radio"}}: pick exactly one.`
          ),
          H(`Built-in checking`),
          P(`Adding {{required}} means the form won't send until that field is filled in. Browsers show a friendly message automatically. No JavaScript needed!`),
          H(`Where does the data go?`),
          P(`Each field's {{name}} attribute is the label its data travels with. On a real site the form's {{action}} attribute sends the data to a server. Static sites can use free services like Netlify Forms or Formspree for this. You'll set one up in Module 9.`),
          TRY({
            title: 'Build a sign-up form',
            prompt: `Try submitting with an empty or invalid email to see the built-in checks, then fill it in properly and submit. The data shows up in the console below the preview. Add a new field for “Favourite colour” using {{type="color"}}.`,
            html: `
<form>
  <h2>Join the newsletter 💌</h2>

  <label for="name">Name</label>
  <input type="text" id="name" name="name" placeholder="Ada Lovelace" required>

  <label for="email">Email</label>
  <input type="email" id="email" name="email" placeholder="ada@example.com" required>

  <fieldset>
    <legend>How often?</legend>
    <label><input type="radio" name="frequency" value="weekly" checked> Weekly</label>
    <label><input type="radio" name="frequency" value="monthly"> Monthly</label>
  </fieldset>

  <label><input type="checkbox" name="terms" required> I agree to the friendly terms</label>

  <button type="submit">Sign me up</button>
</form>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 4px 16px; }
form { display: grid; gap: 8px; max-width: 340px; }
h2 { margin-bottom: 4px; }
label { font-weight: 600; font-size: 14px; }
input[type=text], input[type=email] {
  padding: 10px; border: 1.5px solid #ccd; border-radius: 8px; font-size: 15px;
}
fieldset { border: 1.5px solid #ccd; border-radius: 8px; }
fieldset label { font-weight: normal; margin-right: 12px; }
button {
  margin-top: 6px; padding: 12px; border: 0; border-radius: 8px;
  background: #4f46e5; color: white; font-size: 16px; font-weight: 600; cursor: pointer;
}`,
          }),
        ],
        quiz: [
          Q(`Why should every input have a connected {{<label>}}?`,
            ['It makes the page load faster', 'It names the field, makes it clickable, and helps screen readers', 'Browsers require it or the page breaks', 'It encrypts the data'], 1,
            `Connected labels (with matching {{for}} and {{id}}) make forms easier for everyone to use.`),
          Q(`Which input type automatically checks for an @ sign?`,
            ['{{type="text"}}', '{{type="email"}}', '{{type="at"}}', '{{type="mail"}}'], 1,
            `{{type="email"}} validates the format and shows an email-friendly keyboard on phones.`),
          Q(`Which attribute stops a form from sending until a field is filled in?`,
            ['{{needed}}', '{{must}}', '{{required}}', '{{validate}}'], 2,
            `{{required}} turns on the browser's built-in check, with no JavaScript needed.`),
        ],
      },

      {
        id: 'm3-l7',
        title: 'Semantic HTML',
        minutes: 7,
        intro: `Use tags that describe what content *is*, not just how it looks.`,
        blocks: [
          P(`“Semantic” means **having meaning**. A {{<div>}} is a generic box: it tells the browser nothing about what's inside. A {{<nav>}} says “this is navigation”, and a {{<footer>}} says “this is the footer”.`),
          ANALOGY(`Labelled moving boxes`, `Imagine moving house with 30 identical, unlabelled boxes. Now imagine the same boxes labelled “Kitchen”, “Books”, and “Bathroom”. Semantic tags are those labels: they help browsers, screen readers, search engines, and other developers understand your page instantly.`),
          H(`The main layout tags`),
          RAW(`<div class="diagram"><div class="layout-diagram" role="img" aria-label="Page layout: header and nav on top, main with article and section, aside to the side, footer at the bottom">
            <div class="ld-header c1">&lt;header&gt;</div>
            <div class="ld-nav c5">&lt;nav&gt;</div>
            <div class="ld-main c2">&lt;main&gt;<div>&lt;article&gt;</div><div>&lt;section&gt;</div></div>
            <div class="ld-aside c3">&lt;aside&gt;</div>
            <div class="ld-footer c4">&lt;footer&gt;</div>
          </div><p class="diagram-cap">A typical page built from semantic tags</p></div>`),
          UL(
            `{{<header>}}: the top of the page (logo, site title, often the navigation).`,
            `{{<nav>}}: the main navigation links.`,
            `{{<main>}}: the main, unique content of this page. Use only one per page.`,
            `{{<section>}}: a themed group of content, usually with its own heading.`,
            `{{<article>}}: a self-contained piece, like a blog post or a product card.`,
            `{{<aside>}}: related extra content, like a sidebar or a “fun fact” box.`,
            `{{<footer>}}: the bottom: copyright, contact links, social media.`
          ),
          CODE('html', `
<body>
  <header>
    <h1>Sam's Kitchen</h1>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="recipes.html">Recipes</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>The perfect pancake</h2>
      <p>It all starts with...</p>
    </article>
  </main>

  <footer>
    <p>© 2026 Sam's Kitchen</p>
  </footer>
</body>`, 'A semantic page'),
          H(`Why bother?`),
          UL(
            `**Accessibility**: screen reader users can jump straight to the {{<main>}} content or the {{<nav>}}.`,
            `**SEO**: search engines understand which parts of your page matter most.`,
            `**Readable code**: you (and others) can find things quickly.`
          ),
          TIP(`{{<div>}} and {{<span>}} are still useful! Use them when you need a box purely for styling and no semantic tag fits.`),
          TRY({
            title: 'Build a semantic layout',
            prompt: `The CSS gives each semantic area a coloured outline so you can see the structure. Add an {{<aside>}} inside {{<main>}} with a “Fun fact” about you.`,
            html: `
<header>
  <h1>My Blog</h1>
  <nav>
    <a href="#">Home</a> · <a href="#">Posts</a> · <a href="#">About</a>
  </nav>
</header>

<main>
  <article>
    <h2>Why I'm learning to code</h2>
    <p>I want to build my own website and share my projects with the world.</p>
  </article>
  <!-- Add an <aside> here -->
</main>

<footer>
  <p>© 2026 My Blog</p>
</footer>`,
            css: `
body { font-family: system-ui, sans-serif; padding: 8px; }
header, nav, main, article, aside, footer {
  border: 2px dashed; border-radius: 10px; padding: 8px 12px; margin: 8px 0;
}
header { border-color: #6366f1; }
nav { border-color: #2563eb; }
main { border-color: #0d9488; }
article { border-color: #ea580c; }
aside { border-color: #d946ef; background: #fdf4ff; }
footer { border-color: #64748b; }`,
          }),
        ],
        quiz: [
          Q(`Which tag should wrap your site's main navigation links?`,
            ['{{<div>}}', '{{<nav>}}', '{{<menu-bar>}}', '{{<links>}}'], 1,
            `{{<nav>}} tells browsers and screen readers “this is the main navigation”.`),
          Q(`Which tag holds the main, unique content of a page?`,
            ['{{<main>}}', '{{<body>}}', '{{<section>}}', '{{<header>}}'], 0,
            `{{<main>}} holds the core content, and there's only one per page.`),
          Q(`What's the biggest benefit of semantic HTML?`,
            ['It changes the colours automatically', 'Browsers, screen readers, and search engines understand your page', 'It makes the code shorter', 'It’s required for HTTPS'], 1,
            `Semantic tags carry meaning, which helps accessibility, SEO, and readability.`),
        ],
      },

      {
        id: 'm3-l8',
        title: 'Putting it all together',
        minutes: 10,
        intro: `Combine everything you've learned into one complete, well-structured page.`,
        milestone: `You built a complete web page with HTML! 🏆`,
        blocks: [
          P(`You now know the most important HTML elements. Let's put them all together into a real page: a personal “About Me” page. This is the foundation of the portfolio you'll build in Module 6.`),
          H(`How developers plan a page`),
          STEPS(
            [`Decide what goes on it`, `Write the content first: your name, an intro, a photo, some hobbies, contact details.`],
            [`Sketch the structure`, `Header at the top, main content in the middle, footer at the bottom.`],
            [`Pick the right tags`, `Headings for titles, lists for lists, a form for contact, semantic tags for layout.`],
            [`Build it, then check it`, `Write the HTML, look at it in the browser, and fix anything that's off.`]
          ),
          H(`The complete page`),
          P(`Read through this example and spot each element you've learned. Every single tag here has appeared in this module.`),
          CODE('html', `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Rivera · About Me</title>
</head>
<body>
  <header>
    <h1>Alex Rivera</h1>
    <nav>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#hobbies">Hobbies</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>About me</h2>
      <img src="images/alex.jpg" alt="Alex smiling, holding a cup of coffee" width="200" height="200">
      <p>I'm a <strong>future web developer</strong> from Toronto who loves design and coffee.</p>
    </section>

    <section id="hobbies">
      <h2>Things I love</h2>
      <ul>
        <li>Photography</li>
        <li>Rock climbing</li>
        <li>Building websites (new!)</li>
      </ul>
    </section>

    <section id="contact">
      <h2>Say hello</h2>
      <form>
        <label for="email">Your email</label>
        <input type="email" id="email" name="email" required>
        <button type="submit">Send</button>
      </form>
    </section>
  </main>

  <footer>
    <p>© 2026 Alex Rivera · <a href="mailto:alex@example.com">alex@example.com</a></p>
  </footer>
</body>
</html>`, 'about.html'),
          TIP(`Does your page look plain, with a basic font and everything stacked down the left? **That's completely normal!** HTML is only the structure. In Module 4, CSS will make it beautiful.`, `It looks a bit plain…`),
          TRY({
            title: 'Make it yours',
            prompt: `Replace Alex's details with your own: name, intro, hobbies, and email. Swap the image for a different one from picsum.photos (change the number after {{/id/}}). Don't forget to update the alt text!`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Rivera · About Me</title>
</head>
<body>
  <header>
    <h1>Alex Rivera</h1>
    <nav>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#hobbies">Hobbies</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>About me</h2>
      <img src="https://picsum.photos/id/64/200/200" alt="Portrait of a person smiling" width="200" height="200">
      <p>I'm a <strong>future web developer</strong> from Toronto who loves design and coffee.</p>
    </section>

    <section id="hobbies">
      <h2>Things I love</h2>
      <ul>
        <li>Photography</li>
        <li>Rock climbing</li>
        <li>Building websites (new!)</li>
      </ul>
    </section>

    <section id="contact">
      <h2>Say hello</h2>
      <form>
        <label for="email">Your email</label>
        <input type="email" id="email" name="email" required>
        <button type="submit">Send</button>
      </form>
    </section>
  </main>

  <footer>
    <p>© 2026 Alex Rivera · <a href="mailto:alex@example.com">alex@example.com</a></p>
  </footer>
</body>
</html>`,
          }),
        ],
        quiz: [
          Q(`What's the usual top-to-bottom order of a page's main layout areas?`,
            ['footer → main → header', 'header → main → footer', 'main → header → footer', 'nav → footer → main'], 1,
            `Header at the top, main content in the middle, footer at the bottom.`),
          Q(`Which of these tags is **not** semantic?`,
            ['{{<nav>}}', '{{<footer>}}', '{{<div>}}', '{{<article>}}'], 2,
            `{{<div>}} is a generic box with no meaning. It's still useful for styling.`),
          Q(`What is HTML responsible for?`,
            ['The structure and content of a page', 'Colours and fonts', 'Animations and clicks', 'Hosting the site'], 0,
            `HTML = structure and content. CSS = style. JavaScript = behaviour.`),
        ],
      },
    ],
    quiz: [
      Q(`Which line correctly adds an image?`,
        ['{{<image href="cat.jpg">}}', '{{<img src="cat.jpg" alt="A sleeping cat">}}', '{{<img>cat.jpg</img>}}', '{{<picture src="cat.jpg">}}'], 1,
        `{{<img>}} with {{src}} for the file and {{alt}} for the description.`),
      Q(`Which is the correct way to make a link to your About page?`,
        ['{{<link href="about.html">About</link>}}', '{{<a src="about.html">About</a>}}', '{{<a href="about.html">About</a>}}', '{{<a>about.html</a>}}'], 2,
        `Links use {{<a>}} with an {{href}}. ({{<link>}} is for stylesheets, in the head.)`),
      Q(`A label has {{for="email"}}. What must the matching input have?`,
        ['{{name="label"}}', '{{id="email"}}', '{{type="for"}}', '{{class="email"}}'], 1,
        `The label's {{for}} matches the input's {{id}}. That's what connects them.`),
      Q(`Which element should you use only once per page for the main title?`,
        ['{{<h1>}}', '{{<h2>}}', '{{<title>}}', '{{<header>}}'], 0,
        `One {{<h1>}} per page. ({{<title>}} is the browser tab text, not a visible heading.)`),
      Q(`You want a numbered list of steps. Which tags do you need?`,
        ['{{<ul>}} and {{<li>}}', '{{<ol>}} and {{<li>}}', '{{<list>}} and {{<item>}}', '{{<steps>}} and {{<step>}}'], 1,
        `{{<ol>}} creates a numbered list, and each step goes in an {{<li>}}.`),
    ],
    exercise: {
      title: 'Build your “About Me” page',
      minutes: 30,
      blocks: [
        P(`Time to build your own page from scratch! Use the workspace below, which has a skeleton with {{TODO}} comments to guide you. When you're happy with it, copy the code into the {{index.html}} file in your {{my-website}} folder from Module 2.`),
        TIP(`Stuck? Scroll back to lesson 3.8. It has a complete example. Looking at examples is exactly what professional developers do all day.`),
      ],
      goals: [
        `A {{<header>}} with an {{<h1>}} containing your name`,
        `A {{<nav>}} with at least three links that jump to sections ({{#about}}, etc.)`,
        `An “About” section with a paragraph and an image with good alt text`,
        `A list of your hobbies, skills, or favourite things`,
        `A link to a website you love`,
        `A contact form with a connected label, an email input, and a submit button`,
        `A {{<footer>}} with a copyright line`,
      ],
      starter: {
        prompt: `Follow the TODO comments. The preview updates as you type.`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name · About Me</title>
</head>
<body>
  <header>
    <!-- TODO: an h1 with your name -->

    <!-- TODO: a nav with a list of links to #about, #favourites, #contact -->
  </header>

  <main>
    <section id="about">
      <h2>About me</h2>
      <!-- TODO: an image with alt text (try https://picsum.photos/200) -->
      <!-- TODO: a paragraph introducing yourself -->
    </section>

    <section id="favourites">
      <h2>My favourite things</h2>
      <!-- TODO: a list, plus a link to a site you love -->
    </section>

    <section id="contact">
      <h2>Contact me</h2>
      <!-- TODO: a form with a label, an email input, and a button -->
    </section>
  </main>

  <footer>
    <!-- TODO: a copyright line -->
  </footer>
</body>
</html>`,
      },
    },
  };

  /* Modules 4–10 live in content/m4.js … content/m10.js and register themselves with ZTL.addModule(). */

  window.COURSE = {
    title: 'Zero to Live: Web Development',
    modules: [m1, m2, m3],
  };
})();
