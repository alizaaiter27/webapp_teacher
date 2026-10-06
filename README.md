#  Zero to Live: Web Development

A free, interactive course that takes complete beginners from zero coding experience to a live website. It runs in the browser with no build step, no framework, and no backend.

## Features

- **10 modules, 61 lessons.** Covers how the web works through to putting a site online.
- **Live code editors.** Learners edit HTML, CSS, and JavaScript and see the result straight away in a sandboxed preview that also shows console output.
- **Git terminal simulator.** Practise `git` commands in a fake terminal inside the browser, with nothing to install.
- **Quizzes and exercises.** Every module ends with a checkpoint quiz and a hands-on project.
- **Progress tracking.** Completed lessons, quiz results, and checklist ticks are saved in `localStorage`.
- **Glossary.** 184 plain-English definitions, each linked to the module that teaches it.
- **Launch checklist.** An "Is my website ready to launch?" checklist with 34 items.
- **Light and dark themes.** Follows the system setting by default and remembers the learner's choice.
- **Accessible and responsive.** Skip link, keyboard focus handling, ARIA labels, and a mobile drawer menu.

## Curriculum

| # | Module | Lessons |
|---|--------|---------|
| 1 | How the Web Works | 5 |
| 2 | Setting Up Your Workspace | 4 |
| 3 | HTML: The Structure of the Web | 8 |
| 4 | CSS: Making It Beautiful | 8 |
| 5 | JavaScript: Adding Interactivity | 7 |
| 6 | Building a Real Project | 7 |
| 7 | Best Practices | 5 |
| 8 | Version Control with Git & GitHub | 6 |
| 9 | Going Live | 6 |
| 10 | Next Steps | 5 |

## Getting started

Everything is static, so you can open `index.html` directly in a browser. A local server is better, though, because it behaves the same way the site will once it's hosted:

```bash
# Python 3
python3 -m http.server 8000

# or Node.js
npx serve .
```

Then go to <http://localhost:8000>.

## Project structure

```
.
├── index.html          # Page shell; loads the content files and then app.js
├── styles.css          # All styling, including light and dark themes
├── app.js              # Engine: routing, rendering, editors, Git sim, quizzes, progress
└── content/
    ├── course.js       # Content helpers + Modules 1–3
    ├── m4.js … m10.js  # One file per module (4–10)
    ├── glossary.js     # window.GLOSSARY
    └── checklist.js    # window.CHECKLIST
```

All course content lives in `content/`. `app.js` only renders it.

### Routes

The app uses hash-based routing:

| Route | View |
|-------|------|
| `#/` | Course overview |
| `#/module/<id>` | Module page |
| `#/lesson/<id>` | Lesson |
| `#/review/<moduleId>` | Module checkpoint (quiz + exercise) |
| `#/glossary` | Glossary |
| `#/checklist` | Launch checklist |

## Writing content

Lessons are built from block helpers exposed on `window.ZTL`:

| Helper | Purpose |
|--------|---------|
| `P(text)` | Paragraph |
| `H(text)` | Subheading |
| `UL(...items)` / `OL(...items)` | Bulleted / numbered list |
| `ANALOGY(title, text)` | Analogy callout |
| `TIP(text, title?)` / `WARN(text, title?)` | Tip / warning callout |
| `CODE(lang, code, file?)` | Syntax-highlighted code block (`html`, `css`, `js`, `bash`, `text`) |
| `TRY({...})` | Interactive live editor |
| `STEPS([title, text], ...)` | Numbered step-by-step walkthrough |
| `SIM({...})` | Git terminal simulator |
| `RAW(html)` | Raw HTML (e.g. diagrams) |
| `Q(question, options, answer, explain)` | Quiz question |

Prose strings support light inline formatting:

- `{{code}}` for inline code
- `**bold**` and `*italic*`
- `[text](url)` for links (external links open in a new tab)

### Adding a module

Create a new file in `content/` and register the module:

```js
(function () {
  const { P, H, TIP, CODE, Q } = window.ZTL;

  window.ZTL.addModule({
    id: 'm11',
    icon: '✨',
    title: 'My New Module',
    summary: `One-line description shown on the overview.`,
    goal: `By the end of this module you'll be able to…`,
    lessons: [
      {
        id: 'm11-l1',
        title: 'First lesson',
        minutes: 5,
        intro: `A short hook.`,
        blocks: [
          P(`Hello {{world}}!`),
        ],
      },
    ],
    // plus a quiz and exercise for the module checkpoint — see existing modules
  });
})();
```

Then add a `<script src="content/m11.js"></script>` tag to `index.html`. It must come after `course.js` and before `app.js`.

## Saved progress

Progress is stored in the browser under the `localStorage` key `ztl-progress-v1`. To reset it, clear the site's data or run this in the browser console:

```js
localStorage.removeItem('ztl-progress-v1');
```

## Deployment

Because the site is fully static, any static host will work: GitHub Pages, Netlify, Vercel, or Cloudflare Pages. Upload the repository as it is; there is nothing to build.
