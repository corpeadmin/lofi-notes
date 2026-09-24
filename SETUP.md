# SETUP.md — Git Step by Step: Contribute to Lofi Notes

> Hi! This guide is written **for you — a contributor / groupmate**. It walks
> you through Git from zero: getting ready, cloning the project, running it,
> making your first small contribution, and opening a Pull Request. No prior
> Git experience needed — just follow along, one step at a time.

---

## Part 0 — Getting Ready

Before you can use Git, you need three small things in place. Give yourself
about 10 minutes.

### 0.1 Install (or check) Git

Git is a tool that tracks changes to files. Check if it is already installed:

```bash
git --version
```

- If you see something like `git version 2.x.x` → Git is ready. Move to
  step 0.2.
- If the command is not found:
  - **Windows:** download and install from <https://git-scm.com/download/win>.
    Accept the defaults. After installing, open a **new** terminal so the
    changes take effect.
  - **macOS:** install the "Command Line Tools" by running `xcode-select --install`,
    or use `brew install git` if you have Homebrew.
  - **Linux (Debian/Ubuntu):** run `sudo apt install git`.

Then run `git --version` again to confirm.

### 0.2 Create or use a GitHub account

GitHub is a website that acts like Google Drive for Git repositories — it
stores a shared copy of the project (the **remote**) that everyone can pull
from and push to.

- Go to <https://github.com>, then **Sign in** (if you already have an account)
  or **Sign up** for a new one (it's free). Pick a username you like — you'll
  use it a lot.

### 0.3 Tell Git who you are: `user.name` and `user.email`

Git stamps every commit with the person who made it. Git has no idea who you
are until you tell it. Run these two commands, **replacing the values with
your own name and email**:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

> **Beginner tip:** use the same email as your GitHub account — that way your
> commits get linked to your GitHub profile. Use your full real name so your
> groupmates know who did what.

Check it worked:

```bash
git config --global user.name
git config --global user.email
```

Each command should print what you just set.

### 0.4 "There is no `git login`" — how Git authentication actually works

A very common beginner question is *"which command do I type to log into Git?"*
The answer: **Git has no `git login` command.** That command does not exist.

Here's why:

- Git's job is just to *record the history* of your project on your computer.
- The *account* you created on GitHub in step 0.2 is separate from Git.
  Git and GitHub are two different things that work together.
- The first time you push to GitHub, GitHub asks **you** (in the browser or
  via a small pop-up) to prove you're you. Git connects to GitHub using that
  login — but the login happens **through GitHub's website or a personal
  access token**, not through a Git command.

So remember: set up `user.name` / `user.email` with `git config`, create your
GitHub account in the browser, and that's it. There's no `git login` to run.

✅ **You're ready.** Now let's get the project onto your computer.

---

## Part 1 — Get the Project on Your Computer

> **Heads up for the leader:** if you are the **group leader / repository
> owner**, before anyone can clone, you must publish the starter project to
> GitHub first. See the box ⤵ at the end of Part 1 (or check the README) and
> push the project once. Everyone else: you clone from the leader's repo.

### 1.1 The local/remote repository workflow (the big picture)

A **repository** ("repo" for short) is just a folder Git is watching. There
are two copies in play:

```
  YOUR COMPUTER               GITHUB (shared copy)
  ┌────────────┐   push up   ┌────────────┐
  │  local     │ ──────────▶ │  remote    │
  │  repo      │             │  repo      │
  └────────────┘ ◀────────── └────────────┘
                  pull down
```

- **Clone** = copy the remote repo **down** to your computer for the first time.
- **Push** = send your local commits **up** to GitHub.
- **Pull** = bring your groupmates' commits **down** from GitHub to your computer.

You work on your local copy, then share your changes by pushing them up.

### 1.2 Clone the repository

Open a terminal in the folder where you want the project to live, then run:

```bash
git clone https://github.com/<owner-username>/lofi-notes.git
cd lofi-notes
```

Replace `<owner-username>` with your leader's GitHub username (your leader
sends you the link, or you copy it from the repo page: the green
**Code ▾** button → HTTPS → the copy icon).

You now have a local copy of Lofi Notes. Peek inside:

```bash
ls            # Windows:  dir
```

You should see `README.md`, `SETUP.md`, `backend/`, and `frontend/`.

### 1.3 Run the Django backend (first time setup)

```bash
cd backend
python -m venv venv
# Windows:   venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

You should see "Starting development server at <http://127.0.0.1:8000/>".
Keep this terminal window open — that's the backend running.

> **First run only:** `migrate` creates the SQLite database and a friendly
> welcome note automatically. `venv/`, `node_modules/`, and `db.sqlite3` are
> already in `.gitignore`, so nobody accidentally commits them.

### 1.4 Run the React frontend (new terminal window)

Open a **second** terminal window:

```bash
cd frontend
npm install
npm run dev
```

Vite will tell you the app is live, usually at <http://localhost:5173>.

### 1.5 Test the app

Open <http://localhost:5173> in your browser. You should see the cozy Lofi
Notes landing page. Click **"Open my notes"**, write a note, save it, open it,
edit it, delete it. If all of that works, your local setup is working.

✅ **Project runs.** You're ready for the Git part.

> ### 📦 Box for the leader (the repository owner) only
>
> Before anyone can clone, the project must exist on GitHub. Do this once:
>
> ```bash
> cd lofi-notes          # the project root (it contains README.md)
> git init
> git add .
> git commit -m "feat: initial lofi notes app"
> # on GitHub: click "+" → "New repository" → name it "lofi-notes" → Create.
> # then copy the repo URL and run:
> git branch -M main
> git remote add origin https://github.com/<your-username>/lofi-notes.git
> git push -u origin main
> ```
>
> Now give your groupmates the repo link
> (`https://github.com/<your-username>/lofi-notes.git`) and send them to
> Part 1.2. Remember: as the owner, **you are the only one who merges PRs**
> (see the ⚠️ WARNING in Part 5/6).

---

## Part 2 — Commits: "Git is like a camera"

Now the fun part. Git is like a **camera**, and commits are the **photos**.

Think about a day out:

1. **`git status`** = look through the viewfinder. It shows you *exactly what
   is in front of the lens* — which files changed and which are brand new.
2. **`git add <file>`** = press the shutter. You *choose what goes in the
   frame* (which files are part of this change). Nothing is saved yet.
3. **`git commit -m "caption"`** = save the photo into your album. The
   commit message is the *caption* you write under the photo.
4. **`git log`** = open the album. A list of every photo (commit) ever taken,
   newest first.

The big trick: **you always take the picture first (add), then save it to the
album (commit).** Two separate steps. Forgetting the `add` step is the #1
beginner mistake — your camera clicks, but nothing gets saved to the album.

Let's see it in action with the Lofi Notes code.

### 2.1 Have a look around

Make sure you're in the project root (`cd lofi-notes`), then:

```bash
git status
```

Git tells you what's happening: which branch you're on, and which files are
new or changed. Before you've changed anything, you'll probably see
"nothing to commit, working tree clean" — an empty album, so far.

### 2.2 The three places a change lives

```
Working directory        Staging area (the frame)     Repository (the album)
  the files on disk      git add <file> sends files   git commit -m "..."
  you just edited        here ("taking the photo")    saves the snapshot here
```

### 2.3 Write a logical commit message (choose the caption well)

Your captions must tell the future-you and your groupmates **what** changed
and **why**. This project uses short, logical "type:" messages:

- `docs: fix typo in README`
- `fix: add notes helper message`
- `feat: add new note form` *(you won't need this today, but it exists!)*

Now the **anti-examples** 🚫. These captions tell nobody anything:

- `update` ❌ — *update what??*
- `stuff` ❌ — *what stuff??*
- `asdf` ❌ — *...okay, thanks for nothing.*

Compare them:
"`asdf`" vs "`docs: fix typo in README`". One is a mystery, the other reads
like a tiny newspaper headline. Groupmates (and real employers) notice the
difference.

---

## Part 3 — Branching: never work directly on `main`

Git lets you work on a **branch** — a private lane that's separate from the
main timeline, so you can experiment without breaking anything.

- **`main`** is the *final combined version* of the project. Your leader keeps
  it clean and merges only finished, reviewed work into it.
- **feature branches** (like `feature/notes-helper`) are *your private lanes*
  where you do your work, then offer it to the team via a Pull Request.

Professional rule of thumb — worth adopting today: **never commit directly on
`main`.** Always create a branch first.

Create your own branch now (pick a simple, descriptive name):

```bash
git switch -c feature/notes-helper
```

Check you're on the new branch:

```bash
git status
```

You'll see `On branch feature/notes-helper`. You can switch back to the main
lane anytime with `git switch main` (your work stays safe on its branch).

---

## Part 4 — Your contribution exercises

Pick **one** of the two options below. Both are tiny on purpose: the point is
to practice the Git steps, not to write lots of code. Before you start, make
sure you are on your `feature/notes-helper` branch (Part 3).

### Option 1 — Documentation 📄

Open `README.md` and make a mini improvement:

- Fix one typo if you spot it, **or**
- Add one friendly sentence somewhere helpful — for example, under
  "Purpose" or "Features", a line like:
  `- ☕ No teapots were involved in making this app.`

Then capture it with a logical commit message:

```bash
git add README.md
git commit -m "docs: fix typo in README"
```

### Option 2 — React/JSX ⚛️

Open `frontend/src/components/NotesPage.jsx` and add a gentle helper message
right **after the `</form>` tag and before `<section className="notes-list">`**:

```jsx
{/* Gentle reminder to write things down (Git exercise: Option 2). */}
<p className="notes-helper">Write something down.</p>
```

The `.notes-helper` style already exists in `styles.css`, so it will look
right at home when you reload the app. The `{/* ... */}` line is a JSX
comment — it explains the change to anyone reading the code later.

Then capture it:

```bash
git add frontend/src/components/NotesPage.jsx
git commit -m "fix: add notes helper message"
```

**Test it:** with the frontend server running, open the Notes page
(<http://localhost:5173/notes>) — you should see "Write something down."
under the new-note form.

Whichever option you chose, run `git log --oneline` to admire your photo
in the album — and use `git status` to confirm your working tree is clean.

---

## Part 5 — From your branch to a Pull Request

Your change now exists **on your computer, on your branch**. Time to share it.

### 5.1 Stage and commit (if you haven't yet)

```bash
git status                  # what's in view?
git add <the-file-you-edited>
git commit -m "your logical message"
```

### 5.2 Push your branch up to GitHub

```bash
git push -u origin feature/notes-helper
```

The `-u` (upstream) remembers: *"from now on, this local branch talks to this
branch on GitHub."* When you scan the terminal, you'll see a URL that starts
with `https://github.com/.../pull/new/...` — that's the magic link you need.

### 5.3 Open a Pull Request on GitHub

Copy that link into your browser (or go to the repo page → **"Compare &
pull request"**). Add the two things every good PR needs:

**A small PR description.** Write from the point of view: *what changed and
why?*

```markdown
## What changed
Added a small helper message ("Write something down.") on the Notes page.

## Why
Makes the page feel friendlier and demonstrates the Git workflow.

## How to test
1. Run the backend: cd backend && python manage.py runserver
2. Run the frontend: cd frontend && npm run dev
3. Open http://localhost:5173/notes and see the helper message.
```

**A review checklist** helps your reviewer (the leader) move fast:

- [ ] App starts without errors (backend + frontend)
- [ ] Change matches the description
- [ ] No unrelated files were modified
- [ ] Tested in the browser
- [ ] Commit message is logical (`docs:` / `fix:` style)

Then click **"Create pull request"**. ✅ Done with your part!

---

## ⚠️ WARNING — Read this. It matters.

> ### Only the repository owner merges into `main`.
>
> As a **contributor / groupmate**, you are allowed to:
> - create branches ✅
> - make changes ✅
> - commit ✅
> - push your branch ✅
> - create Pull Requests ✅
>
> **You are NOT allowed to** merge a Pull Request into `main`. ❌
>
> Only the **repository owner** (your group leader) reviews each Pull Request
> and performs the final merge. The owner keeps `main` as the **final
> combined version** of the project — this is what prevents accidents and
> keeps everyone's work organized. When your PR is accepted, the owner merges
> it. When it needs tweaks, the owner will comment and you push more commits —
> they automatically appear on your PR.

---

## Part 6 — What happens next (owner review → owner merge)

**Leader, this part is for you.** A good review flow:

1. Open the PR. Read the description and work through the review checklist.
2. Look at the diff (the **Files changed** tab) — the green lines are what
   the groupmate added.
3. Leave comments if something needs fixing. The contributor pushes more
   commits, and they show up automatically.
4. When it's good, click **"Merge pull request"** → **"Confirm merge"**.
   Your contributor's work is now part of `main`.

**Contributors:** once the leader merges (or rebases) your branch, pull the
new combined version down to your local machine:

```bash
git switch main
git pull origin main
git log --oneline
```

You now have everyone's merged work — including your own. 🎉

---

## Part 7 (Optional but fun!) — The merge-conflict exercise

**Goal:** break Git on purpose, and learn to fix it. A merge conflict happens
when **two branches both edit the same lines** — Git literally can't decide
whose version to keep, so it stops and asks you.

### How to make one

1. Contributor A branches off `main` and edits the line where the helper
   message goes in `NotesPage.jsx` (the `</form>` / `<section className="notes-list">`
   spot) to:
   `<p className="notes-helper">Write something down.</p>` → commit →
   push → the leader merges that PR into `main`.
2. Contributor B does the **same exercise**, but in *their* branch writes a
   different line at the **exact same spot**, for example:
   `<p className="notes-helper">You've got this.</p>` → commit → push → opens
   a PR.
3. When the leader merges Contributor B's PR into `main`, Git finds both
   versions at the same place and raises a conflict.

### What a conflict looks like

When a conflicted file is opened, Git paints the two versions and puts
markers between them:

```
<<<<<<< HEAD
        <p className="notes-helper">You've got this.</p>
=======
        <p className="notes-helper">Write something down.</p>
>>>>>>> feature/notes-helper-b
```

- `<<<<<<< HEAD` — start of *your current* version (the one already in `main`)
- `=======` — the border between the two versions
- `>>>>>>> feature/...` — end of *theirs* (the incoming branch's version)

### How to resolve it

1. Find any files Git marks as conflicted with `git status` (they'll be
   listed as "both modified").
2. Open `NotesPage.jsx`, look at the markers, and decide: keep **one** line,
   keep **both** lines, or write something new.
3. **Delete the markers** (`<<<<<<<`, `=======`, `>>>>>>>`) — Git leaves
   markers in the file, and leftover markers are an error.
4. Save the file, then tell Git the fight is over:

```bash
git add frontend/src/components/NotesPage.jsx
git commit -m "fix: resolve merge conflict in notes helper"
```

5. Test the app (backend + frontend running) — the Notes page should show
   your resolved helper text.

Conflicts look scary, but they're just Git asking, *"two people changed the
same line — which way should I go?"* Once you've fixed one, you've handled
the worst Git has to offer.

---

## Part 8 — Git cheat sheet

| Want to...                    | Command                                    |
| ----------------------------- | ------------------------------------------ |
| See Git version               | `git --version`                            |
| Who am I (Git)?               | `git config --global user.name` / `user.email` |
| Copy the project to you       | `git clone <repo-url>`                     |
| Which files changed?          | `git status`                               |
| Stage a file (take the photo) | `git add <file>`  (or `git add .` for all) |
| Save a commit (add caption)   | `git commit -m "your logical message"`     |
| Show the commit album         | `git log --oneline`                        |
| New branch                    | `git switch -c feature/notes-helper`       |
| Switch branches               | `git switch main`                          |
| Send branch to GitHub         | `git push -u origin feature/notes-helper`  |
| Get latest `main`             | `git switch main; git pull origin main`    |
| See remote copies             | `git remote -v`                            |

## Part 9 — Words you'll hear (mini glossary)

| Term            | Meaning in plain words                                   |
| --------------- | -------------------------------------------------------- |
| **Repository**  | A folder Git watches, with its full history.             |
| **Commit**      | One saved snapshot ("photo") of the project, with a message. |
| **Staging area**| The "frame" — files you've selected with `git add`, awaiting the commit that saves them. |
| **Branch**      | A separate lane of history you can work on safely.       |
| **Main branch** | The final, combined version of the project — only the owner merges here. |
| **Feature branch** | A branch made for one specific feature or task (e.g. `feature/notes-helper`). |
| **Pull Request**| An offer to GitHub: "please review and merge my branch into `main`." |
| **Merge**       | Combining one branch's changes into another.             |
| **Merge conflict** | When two branches change the same lines; Git asks you to pick the final result. |
| **Clone**       | Copy a remote repository from GitHub to your computer.   |
| **Push**        | Send your local commits to GitHub (the remote).          |
| **Pull**        | Download a repository's latest commits from GitHub to your computer. |

---

## The full workflow (one recap)

```
clone → branch → change → add → commit → push → Pull Request
     → owner review → owner merge → main
```

You've now done the whole journey as a contributor. 🎧 Write something down,
open a PR, and enjoy your first merged contribution to Lofi Notes.