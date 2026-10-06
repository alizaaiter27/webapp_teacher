/* ==========================================================
   MODULE 8 · Version Control with Git & GitHub
   Uses the SIM block: a pretend terminal built into the app.
   ========================================================== */
(function () {
  const { P, H, UL, OL, ANALOGY, TIP, WARN, CODE, TRY, STEPS, RAW, Q, SIM } = window.ZTL;

  const SIM_NOTE = `This is a **practice terminal** built into the course. It only understands Git and a few basic commands, and nothing you type touches your real computer. {{edit <file>}} is a pretend command that simulates you changing a file in VS Code and saving it.`;

  window.ZTL.addModule({
    id: 'm8',
    icon: '🌿',
    title: 'Version Control with Git & GitHub',
    summary: `Save snapshots of your work, undo mistakes, try ideas safely with branches, and back up your code on GitHub.`,
    goal: `By the end of this module your portfolio will live in a Git repository on GitHub, with a full history of every change.`,
    lessons: [
      {
        id: 'm8-l1',
        title: 'Why version control?',
        minutes: 7,
        intro: `Save points for your code, so you can never really lose your work.`,
        blocks: [
          P(`Have you ever had files like {{essay-final.docx}}, {{essay-final-v2.docx}}, and {{essay-FINAL-really.docx}}? That's version control done by hand, and it gets messy fast.`),
          P(`**Git** is a tool that tracks every change to your project. You take **snapshots** (called **commits**) whenever you reach a good point, and Git remembers them all, forever.`),
          ANALOGY(`Save points in a video game`, `Before a tough boss fight, you save the game. If things go wrong, you reload the save. Commits are save points for your code: break something? Jump back to the last version that worked.`),
          H(`What Git gives you`),
          UL(
            `**History**: see what changed, when, and why, for every file.`,
            `**Undo**: go back to any earlier version.`,
            `**Experiments**: try an idea on a separate **branch** without risking your working site.`,
            `**Backup**: copy your project to GitHub, so a dead laptop doesn't mean lost work.`,
            `**Teamwork**: several people can work on the same project without overwriting each other.`
          ),
          H(`Git vs. GitHub`),
          UL(
            `**Git** is the tool that runs on your computer and tracks changes. It's free and works offline.`,
            `**GitHub** is a website that stores Git projects online, so you can back them up, share them, and collaborate. (GitLab and Bitbucket are alternatives.)`
          ),
          ANALOGY(`Photos and the cloud`, `Git is like your phone's camera roll: it keeps all your photos (versions) on the device. GitHub is like cloud photo backup: a copy online that you can share and that survives if you lose your phone.`),
          H(`Key words`),
          UL(
            `**Repository** (or **repo**): a project folder that Git is tracking.`,
            `**Commit**: a saved snapshot, with a message describing what changed.`,
            `**Branch**: a separate line of work.`,
            `**Remote**: a copy of the repo somewhere else, usually GitHub.`
          ),
          P(SIM_NOTE),
          SIM({
            title: 'Explore an existing project',
            prompt: `This project already has some history. Type {{git log --oneline}} and press Enter to see its commits, newest first. Then try {{git status}}.`,
            start: { repo: true, commits: ['Create homepage', 'Add about page', 'Style the navigation'] },
            welcome: 'This project already has 3 commits. Try: git log --oneline',
            tasks: [['See the history with {{git log --oneline}}', 'log'], ['Check the current state with {{git status}}', 'status']],
          }),
        ],
        quiz: [
          Q(`What is a **commit**?`,
            ['A deleted file', 'A saved snapshot of your project, with a message', 'A website', 'A type of branch'], 1,
            `Each commit is a save point you can return to.`),
          Q(`What's the difference between Git and GitHub?`,
            ['They are the same thing', 'Git tracks changes on your computer; GitHub stores Git projects online', 'GitHub is offline; Git is online', 'Git is only for teams'], 1,
            `Git is the tool. GitHub is a website for hosting and sharing Git repositories.`),
          Q(`What is a repository?`,
            ['A project folder that Git tracks', 'A web browser', 'A CSS file', 'A domain name'], 0,
            `A repo is your project folder, plus Git's record of its entire history.`),
        ],
      },

      {
        id: 'm8-l2',
        title: 'Installing Git and your first repository',
        minutes: 10,
        intro: `A few terminal basics, a one-time setup, and git init.`,
        blocks: [
          H(`Install Git`),
          UL(
            `**Mac**: open the Terminal app and type {{git --version}}. If Git isn't installed, macOS offers to install it for you. Click Install.`,
            `**Windows**: download it from [git-scm.com](https://git-scm.com) and run the installer. The default options are fine. It also installs “Git Bash”, a terminal you can use.`,
            `**Linux**: use your package manager, e.g. {{sudo apt install git}}.`
          ),
          H(`Terminal survival kit`),
          P(`Git is usually used from the **terminal**: a window where you type commands instead of clicking. In VS Code, open one with **View → Terminal** and it starts in your project folder. You only need a few commands:`),
          CODE('bash', `
pwd              # "print working directory": where am I?
ls               # list the files here (Windows PowerShell also accepts ls)
cd my-website    # "change directory": move into a folder
cd ..            # go up one folder
clear            # tidy up the screen`, 'Terminal basics'),
          TIP(`Press the **Up arrow** to bring back previous commands, and **Tab** to auto-complete file and folder names. Both save loads of typing.`),
          H(`One-time setup: tell Git who you are`),
          P(`Every commit is labelled with your name and email. Set them once per computer (use the same email you'll use for GitHub):`),
          CODE('bash', `
git config --global user.name "Alex Rivera"
git config --global user.email "alex@example.com"`, 'Run once'),
          H(`Create a repository`),
          P(`Inside your project folder, run {{git init}}. That's it: Git creates a hidden {{.git}} folder where it will store the whole history.`),
          CODE('bash', `
cd my-website
git init
# Initialized empty Git repository in .../my-website/.git/

git status
# Shows which files Git sees, and their state`, 'Your first repository'),
          WARN(`Run {{git init}} inside your **project folder**, not your home folder or Desktop. Otherwise Git would try to track every file on your computer!`, `Careful where you init`),
          TIP(`Prefer clicking? VS Code's **Source Control** panel (the branch icon on the left) can do everything in this module with buttons. Learning the commands first makes the buttons make sense.`),
          P(SIM_NOTE),
          SIM({
            title: 'Set up Git',
            prompt: `Do the one-time setup, then turn this folder into a repository and look at its status. Watch the file panel on the right: after {{git init}}, the files show as “untracked” (Git sees them but isn't saving them yet).`,
            start: { files: { 'index.html': 1, 'about.html': 1, 'styles.css': 1 } },
            welcome: 'You are in ~/my-website. Try: ls',
            tasks: [
              ['List the files with {{ls}}', 'ls'],
              ['Set your name: {{git config --global user.name "Your Name"}}', 'config'],
              ['Create a repository: {{git init}}', 'init'],
              ['Check its state: {{git status}}', 'status'],
            ],
          }),
        ],
        quiz: [
          Q(`Which command turns a folder into a Git repository?`,
            ['{{git start}}', '{{git init}}', '{{git new}}', '{{git create}}'], 1,
            `{{git init}} creates the hidden {{.git}} folder that stores history.`),
          Q(`What does {{cd ..}} do in the terminal?`,
            ['Deletes the folder', 'Moves up one folder', 'Lists files', 'Clears the screen'], 1,
            `{{cd}} changes directory, and {{..}} means the parent folder.`),
          Q(`Why set {{user.name}} and {{user.email}}?`,
            ['So Git can label your commits with who made them', 'To create a GitHub account', 'To make Git faster', 'It’s optional and does nothing'], 0,
            `Every commit records its author. Use the same email as your GitHub account.`),
        ],
      },

      {
        id: 'm8-l3',
        title: 'Add, commit, repeat',
        minutes: 10,
        intro: `The everyday rhythm of Git: change, stage, commit.`,
        milestone: `You've learned the core Git workflow! 🌿`,
        blocks: [
          P(`Saving work with Git is a two-step process: first you **stage** the changes you want to include ({{git add}}), then you **commit** them with a message ({{git commit}}).`),
          H(`The three areas`),
          RAW(`<div class="diagram"><div class="flow">
            <div class="node">📝 Working folder<small>files you edit</small></div>
            <div class="arrow"><span>→</span>git add</div>
            <div class="node">📦 Staging area<small>changes ready to save</small></div>
            <div class="arrow"><span>→</span>git commit</div>
            <div class="node">🗄️ Repository<small>saved history</small></div>
          </div><p class="diagram-cap">Edit → stage → commit</p></div>`),
          ANALOGY(`Packing a parcel`, `Your working folder is the room with all your stuff. {{git add}} puts chosen items into a box (staging). {{git commit}} seals the box and writes a label on it (the message). You decide exactly what goes in each box.`),
          CODE('bash', `
git status                     # what changed?
git add index.html             # stage one file
git add .                      # or stage everything that changed
git commit -m "Add hero section to homepage"
git log --oneline              # see your history`, 'The everyday loop'),
          H(`Writing good commit messages`),
          UL(
            `Describe **what** the commit does, in the imperative: “Add contact form”, “Fix broken link in footer”.`,
            `Keep it short (under ~50 characters) but specific.`,
            `❌ “stuff”, “update”, “asdf”, “final version”. Future you will have no idea what happened.`
          ),
          H(`How often should I commit?`),
          P(`Whenever you finish a small, meaningful step that works: “added the navbar”, “styled the cards”, “fixed the mobile menu”. Small commits are easier to understand and easier to undo.`),
          H(`Ignoring files`),
          P(`Some files shouldn't be tracked: system junk like {{.DS_Store}}, or secrets. List them in a file called {{.gitignore}}:`),
          CODE('text', `
.DS_Store
Thumbs.db
.env`, '.gitignore'),
          WARN(`**Never commit passwords, API keys, or other secrets.** Once they're in your history (and especially on GitHub), consider them leaked.`, `Secrets`),
          P(SIM_NOTE),
          SIM({
            title: 'Make your first commits',
            prompt: `This repo exists but has no commits. Stage and commit the files, then make a change with {{edit index.html}}, and commit again. Watch the file badges change: **U** untracked → **A** staged → **✓** committed → **M** modified.`,
            start: { repo: true, files: { 'index.html': 1, 'styles.css': 1 }, user: 'You' },
            welcome: 'A fresh repository with two untracked files. Start with: git status',
            tasks: [
              ['Stage everything: {{git add .}}', 'add'],
              ['Commit: {{git commit -m "Create homepage"}}', 'commit'],
              ['Change a file: {{edit index.html}}', 'edit'],
              ['Make 3 commits in total', 'commit3'],
              ['View your history: {{git log}}', 'log'],
            ],
          }),
        ],
        quiz: [
          Q(`What does {{git add}} do?`,
            ['Saves a commit', 'Stages changes so they’ll be included in the next commit', 'Uploads to GitHub', 'Creates a new file'], 1,
            `Staging chooses what goes into the next snapshot.`),
          Q(`Which commit message is best?`,
            ['{{"update"}}', '{{"stuff"}}', '{{"Fix broken link in footer"}}', '{{"asdfgh"}}'], 2,
            `Specific, short, and in the imperative mood: it says what the commit does.`),
          Q(`What should you list in {{.gitignore}}?`,
            ['Your homepage', 'Files Git should not track, like system junk and secrets', 'Your commit messages', 'Your GitHub password'], 1,
            `Git skips anything matching the patterns in {{.gitignore}}.`),
        ],
      },

      {
        id: 'm8-l4',
        title: 'GitHub: your code online',
        minutes: 10,
        intro: `Create an account, connect your repo, and push your code to the cloud.`,
        milestone: `You know how to back up your code on GitHub! 🌍`,
        blocks: [
          P(`So far, your history lives only on your computer. Let's put a copy on **GitHub**, so it's backed up, shareable, and ready to publish in Module 9.`),
          H(`Step 1: Create an account and a repository`),
          STEPS(
            [`Sign up`, `Go to [github.com](https://github.com) and create a free account. Your username will appear in your URLs, so pick something professional.`],
            [`Create a new repository`, `Click **+** → **New repository**. Name it (e.g. {{portfolio}}), keep it **Public**, and **don't** tick “Add a README” (your project already has files).`],
            [`Copy the URL`, `GitHub shows a URL like {{https://github.com/alex/portfolio.git}}.`]
          ),
          H(`Step 2: Connect and push`),
          CODE('bash', `
# Tell your local repo where GitHub's copy lives (once)
git remote add origin https://github.com/alex/portfolio.git

# Make sure your main branch is called "main"
git branch -M main

# Upload your commits (-u remembers the destination for next time)
git push -u origin main`, 'Pushing to GitHub'),
          UL(
            `**origin** is the conventional nickname for your GitHub copy (the “remote”).`,
            `**push** uploads your commits. After the first time, just {{git push}}.`,
            `**pull** ({{git pull}}) downloads commits from GitHub, which is useful if you work on two computers.`,
            `**clone** ({{git clone <url>}}) copies an existing GitHub repository onto your computer.`
          ),
          H(`Signing in`),
          P(`The first time you push, Git needs to prove you're you. On most setups a browser window pops up to sign in to GitHub. If you're asked for a password in the terminal, GitHub requires a **personal access token** instead of your real password. Easier options: sign in through VS Code (Source Control → Publish to GitHub), use [GitHub Desktop](https://desktop.github.com), or the GitHub CLI ({{gh auth login}}).`),
          H(`The daily routine`),
          CODE('bash', `
git add .
git commit -m "Describe what you changed"
git push`, 'Every time you finish something'),
          TIP(`Refresh your repository page on GitHub after pushing: your files, commit messages, and history are all there. You can even edit files right in the browser.`),
          P(SIM_NOTE),
          SIM({
            title: 'Push to GitHub',
            prompt: `This repo has commits but no remote yet. Connect it to GitHub and push. Then make a change, commit it, and push again. Notice the {{origin}} tag in the commit list showing what GitHub has.`,
            start: { repo: true, user: 'You', files: { 'index.html': 1, 'about.html': 1, 'styles.css': 1 }, commits: ['Create homepage', 'Add about page'] },
            welcome: 'Two commits, no remote. Try: git remote -v',
            tasks: [
              ['Add the remote: {{git remote add origin https://github.com/you/portfolio.git}}', 'remote'],
              ['Push: {{git push -u origin main}}', 'push'],
              ['Edit a file and make a new commit', 'commit'],
            ],
          }),
        ],
        quiz: [
          Q(`What does {{git push}} do?`,
            ['Downloads changes from GitHub', 'Uploads your local commits to the remote (GitHub)', 'Deletes the repository', 'Creates a branch'], 1,
            `Push sends commits up; pull brings them down.`),
          Q(`What is {{origin}}?`,
            ['Your first commit', 'The usual nickname for your GitHub remote', 'The main branch', 'A file'], 1,
            `{{origin}} is just a nickname for the remote repository's URL.`),
          Q(`GitHub asks for a password in the terminal and your normal password doesn't work. Why?`,
            ['GitHub is broken', 'GitHub requires a personal access token (or a browser sign-in) instead', 'You need a paid plan', 'Git doesn’t support GitHub'], 1,
            `For security, GitHub doesn't accept account passwords for Git operations. Use a token, browser sign-in, or a tool like GitHub Desktop.`),
        ],
      },

      {
        id: 'm8-l5',
        title: 'Branches',
        minutes: 9,
        intro: `Try new ideas safely without breaking the site that works.`,
        blocks: [
          P(`A **branch** is a separate line of development. Your stable, working version lives on {{main}}. To try something new (a redesign, a new page) you create a branch, work there, and only **merge** it back into {{main}} when it's ready.`),
          ANALOGY(`A parallel universe`, `Creating a branch is like stepping into a parallel universe that starts as a copy of yours. Whatever you do there doesn't affect the original. If the experiment works, you merge the universes. If it fails, you simply leave it behind.`),
          RAW(`<div class="diagram"><svg viewBox="0 0 560 150" width="100%" style="max-width:560px;display:block;margin:0 auto" role="img" aria-label="Diagram: main branch with commits, a feature branch splitting off, getting two commits, then merging back into main">
            <line x1="40" y1="50" x2="520" y2="50" stroke="#6366f1" stroke-width="4"/>
            <path d="M160 50 C 200 50, 200 110, 240 110 L 360 110 C 400 110, 400 50, 440 50" stroke="#0d9488" stroke-width="4" fill="none"/>
            <g fill="#6366f1"><circle cx="40" cy="50" r="11"/><circle cx="160" cy="50" r="11"/><circle cx="300" cy="50" r="11"/><circle cx="440" cy="50" r="13"/></g>
            <g fill="#0d9488"><circle cx="250" cy="110" r="11"/><circle cx="340" cy="110" r="11"/></g>
            <text x="526" y="55" font-size="14" fill="#6366f1" font-family="system-ui" font-weight="700">main</text>
            <text x="250" y="140" font-size="14" fill="#0d9488" font-family="system-ui" font-weight="700" text-anchor="middle">new-design branch</text>
            <text x="440" y="26" font-size="13" fill="currentColor" font-family="system-ui" text-anchor="middle">merge</text>
          </svg><p class="diagram-cap">Branch off, commit safely, merge back when it's ready</p></div>`),
          CODE('bash', `
git switch -c new-design      # create a branch AND switch to it
# ...edit files, then:
git add .
git commit -m "Try a darker colour scheme"

git switch main               # go back to main (your files change back!)
git merge new-design          # bring the branch's commits into main
git branch -d new-design      # tidy up: delete the merged branch`, 'Working with a branch'),
          UL(
            `{{git branch}} lists branches; the current one has a {{*}}.`,
            `{{git switch <name>}} moves between branches. (Older tutorials use {{git checkout}}, which still works.)`,
            `**Commit before switching**: Git won't let you switch with unsaved changes that would be overwritten.`
          ),
          H(`Merge conflicts (don't panic)`),
          P(`If two branches change the **same lines** of the same file, Git can't decide which to keep, so it asks you. It marks the file like this:`),
          CODE('text', `
<<<<<<< HEAD
<h1>Welcome!</h1>
=======
<h1>Hello there!</h1>
>>>>>>> new-design`, 'A conflict'),
          P(`Edit the file to keep what you want (delete the markers), then {{git add}} and {{git commit}}. VS Code highlights conflicts and gives you “Accept current / Accept incoming” buttons.`),
          TIP(`On GitHub, teams merge branches through **pull requests**: a page where others can review the changes before they're merged. You'll see “PR” everywhere in the developer world.`),
          P(SIM_NOTE),
          SIM({
            title: 'Branch, commit, merge',
            prompt: `Create a branch for a redesign, commit a change on it, then switch back to {{main}} and merge it in. Watch the commit list change as you switch branches.`,
            start: { repo: true, user: 'You', files: { 'index.html': 1, 'styles.css': 1 }, commits: ['Create homepage', 'Add styles'] },
            welcome: 'You are on main with 2 commits. Try: git branch',
            tasks: [
              ['Create and switch to a branch: {{git switch -c new-design}}', 'branch'],
              ['Edit {{styles.css}} and commit on the new branch', 'branchcommit'],
              ['Switch back: {{git switch main}}', 'switch'],
              ['Merge it: {{git merge new-design}}', 'merge'],
            ],
          }),
        ],
        quiz: [
          Q(`Why use a branch?`,
            ['To delete old commits', 'To work on something new without affecting the stable main version', 'To make the site load faster', 'To push to GitHub'], 1,
            `Branches isolate experiments until they're ready to merge.`),
          Q(`Which command creates a new branch and switches to it?`,
            ['{{git branch main}}', '{{git switch -c feature}}', '{{git merge feature}}', '{{git init feature}}'], 1,
            `{{-c}} means “create”. ({{git checkout -b feature}} does the same.)`),
          Q(`When does a merge conflict happen?`,
            ['Every time you merge', 'When two branches changed the same lines in the same file', 'When you forget to push', 'When a branch is deleted'], 1,
            `Git needs you to decide which version of those lines to keep.`),
        ],
      },

      {
        id: 'm8-l6',
        title: 'README files and Markdown',
        minutes: 8,
        intro: `The front page of every project, written in a simple formatting language.`,
        blocks: [
          P(`When someone opens your repository on GitHub, the first thing they see (below the files) is the **README**: a file called {{README.md}} that explains what the project is. A good README makes your projects look professional to employers.`),
          H(`Markdown in two minutes`),
          P(`The {{.md}} stands for **Markdown**: a simple way to format text using ordinary characters. GitHub turns it into nicely formatted HTML automatically.`),
          CODE('text', `
# Big heading (like <h1>)
## Smaller heading (like <h2>)

Normal paragraph. **Bold text** and *italic text*.

- A bullet point
- Another one

1. A numbered step
2. Another step

[A link](https://example.com)
![Alt text for an image](images/screenshot.png)

Inline \`code\` and a code block:

\`\`\`html
<h1>Hello</h1>
\`\`\``, 'README.md'),
          H(`What to put in a README`),
          UL(
            `**Title and one-line description**: what is it?`,
            `**A screenshot** and a **link to the live site** (after Module 9!).`,
            `**Features**: a short bullet list.`,
            `**Built with**: HTML, CSS, JavaScript…`,
            `**What I learned**: great for portfolios.`,
            `**How to run it**: for a static site, “open index.html” or the live link.`
          ),
          TIP(`Your GitHub **profile** can have a README too: create a public repository with exactly the same name as your username, and its README appears at the top of your profile page.`),
          TRY({
            title: 'Write a README with live preview',
            prompt: `Type Markdown in the box on the left side of the preview, and the right side shows how GitHub will display it. Fill in your project's details. (This preview uses a small Markdown library loaded from the internet.)`,
            html: `
<div class="split">
  <textarea id="md" aria-label="Markdown">
# My Portfolio 🚀

A personal website built from scratch while learning web development.

**Live site:** https://alex.netlify.app

## Features
- Responsive layout that works on any screen
- Dark mode toggle
- Accessible contact form

## Built with
HTML, CSS, and JavaScript. No frameworks!

## What I learned
How to plan a site, use **Flexbox** and **Grid**, and publish with \`git push\`.
</textarea>
  <div id="out" class="markdown"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/marked@12/marked.min.js"></script>`,
            css: `
body { margin: 0; font-family: -apple-system, "Segoe UI", system-ui, sans-serif; }
.split { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
#md { border: 0; border-right: 1px solid #d0d7de; padding: 14px; font: 13px/1.5 ui-monospace, monospace; resize: none; background: #f6f8fa; }
.markdown { padding: 4px 18px; color: #1f2328; line-height: 1.5; overflow: auto; }
.markdown h1, .markdown h2 { border-bottom: 1px solid #d8dee4; padding-bottom: .3em; }
.markdown code { background: #eff1f3; padding: .2em .4em; border-radius: 6px; font-size: 85%; }
@media (max-width: 500px) { .split { grid-template-columns: 1fr; } #md { min-height: 200px; border-right: 0; border-bottom: 1px solid #d0d7de; } }`,
            js: `
const md = document.querySelector("#md");
const out = document.querySelector("#out");

function render() {
  if (window.marked) {
    out.innerHTML = marked.parse(md.value);
  } else {
    out.textContent = "(Couldn't load the Markdown library. Are you offline?)";
  }
}

md.addEventListener("input", render);
window.addEventListener("load", render);`,
          }),
        ],
        quiz: [
          Q(`What is a README for?`,
            ['Storing passwords', 'Explaining what a project is and how to use it', 'Speeding up the site', 'Tracking branches'], 1,
            `It's the front page of your repository.`),
          Q(`In Markdown, how do you write a top-level heading?`,
            ['{{<h1>Title</h1>}} only', '{{# Title}}', '{{*Title*}}', '{{-- Title --}}'], 1,
            `One {{#}} is a top heading, {{##}} the next level down, and so on.`),
          Q(`How do you make text **bold** in Markdown?`,
            ['{{_bold_}}', '{{**bold**}}', '{{#bold#}}', '{{<<bold>>}}'], 1,
            `Two asterisks on each side. One on each side makes it italic.`),
        ],
      },
    ],
    quiz: [
      Q(`Put the everyday Git workflow in order.`,
        ['commit → add → edit → push', 'edit → add → commit → push', 'push → commit → add → edit', 'add → push → edit → commit'], 1,
        `Edit files, stage them, commit with a message, push to GitHub.`),
      Q(`Which command shows which files have changed?`,
        ['{{git log}}', '{{git status}}', '{{git push}}', '{{git init}}'], 1,
        `{{git status}} is the command you'll type most. Use it constantly.`),
      Q(`What should never go into a Git repository?`,
        ['HTML files', 'Images', 'Passwords and API keys', 'A README'], 2,
        `Secrets in history are effectively leaked, especially on a public GitHub repo.`),
      Q(`You want to redesign your site without breaking the live version. What do you do first?`,
        ['Delete main', 'Create a new branch', 'Run git init again', 'Push to a new repository'], 1,
        `Work on a branch, then merge into main when it's ready.`),
      Q(`What does {{git clone <url>}} do?`,
        ['Copies a repository from GitHub onto your computer', 'Duplicates a branch', 'Deletes the remote', 'Commits twice'], 0,
        `Cloning downloads the whole repository, history included.`),
    ],
    exercise: {
      title: 'Put your portfolio on GitHub',
      minutes: 40,
      blocks: [
        P(`Time to do it for real. Open your portfolio folder in VS Code, open the terminal (**View → Terminal**), and follow the goals below. Practise the full flow in the terminal simulator first if you like.`),
        TIP(`Stuck on signing in when you push? Use VS Code's **Source Control → Publish to GitHub** button, or GitHub Desktop. They handle authentication for you.`),
      ],
      goals: [
        `Install Git and set your {{user.name}} and {{user.email}}`,
        `Add a {{.gitignore}} containing {{.DS_Store}}`,
        `Run {{git init}} in your portfolio folder and make your first commit`,
        `Make at least three more small commits with clear messages`,
        `Create a GitHub account and an empty repository called {{portfolio}}`,
        `Connect it with {{git remote add origin ...}} and {{git push -u origin main}}`,
        `Write a {{README.md}}, commit it, and push it. Check it on GitHub!`,
        `Bonus: try a change on a branch, then merge it into {{main}}`,
      ],
      sim: {
        prompt: `Practise the complete workflow from scratch before doing it on your computer.`,
        start: { files: { 'index.html': 1, 'projects.html': 1, 'about.html': 1, 'contact.html': 1, 'styles.css': 1 } },
        welcome: 'A portfolio folder that is not a repository yet. Go for it!',
        tasks: [
          ['Configure your name', 'config'],
          ['Create the repository', 'init'],
          ['Stage and make your first commit', 'commit'],
          ['Reach 3 commits', 'commit3'],
          ['Add the GitHub remote', 'remote'],
          ['Push to GitHub', 'push'],
          ['Create a branch, commit on it, and merge it', 'merge'],
        ],
      },
    },
  });
})();
