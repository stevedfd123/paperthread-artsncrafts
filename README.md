# 🌸 PaperThreads Portfolio Portal

An elegant, interactive, and beautifully responsive portfolio website for **PaperThreads**, founded in 2019 by artist and crafter **Kavindi**. 

This application is built with React 19, TypeScript, and Tailwind CSS. It features a complete dual-architecture: running as a fully fledged Express full-stack application with Gemini AI integration in development, and transitioning seamlessly to a fully self-contained static single-page application (SPA) when hosted on static environments such as **GitHub Pages**.

---

## 🚀 How to Host on GitHub Pages

The project has been fully configured for automated GitHub Pages hosting. It utilizes **relative asset resolution** (`base: './'`) to handle custom subfolders, and includes a **GitHub Actions integration** that builds and publishes your site automatically when you push updates.

### Step-by-Step Deployment Guideline:

1. **Export or Push the Code to GitHub:**
   - Create a new, empty repository on GitHub (e.g., `paperthreads`).
   - Push your workspace files to the repository:
     ```bash
     git init
     git add .
     git commit -m "Initialize PaperThreads portal"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git push -u origin main
     ```

2. **Configure GitHub Pages to use Actions:**
   - Navigate to your repository page on GitHub.
   - Go to **Settings** (the gear tab at the top).
   - In the left sidebar, click on **Pages** (under the "Code and automation" section).
   - Under **Build and deployment > Source**, click the dropdown and change it from *Deploy from a branch* to **GitHub Actions**.

3. **Enjoy Live Hosting! ✨**
   - The `.github/workflows/deploy.yml` workflow will automatically trigger, install packages, compile your client app, and publish the static directory to:
     `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## ▲ How to Deploy on Vercel

The repo is configured for Vercel: `vercel.json` builds the client to `dist/`,
and the two API routes run as serverless functions from `api/`.

| File | Route |
| --- | --- |
| `api/chat.ts` | `POST /api/chat` |
| `api/inquiry.ts` | `POST /api/inquiry` |
| `api/_lib/assistant.ts` | shared logic (not a route — `_` prefix) |

### First-time setup

1. Go to [vercel.com/new](https://vercel.com/new) and **import this GitHub repo**.
2. Leave the framework preset as **Other** — `vercel.json` already supplies the
   build command (`vite build`) and output directory (`dist`).
3. Add the environment variable below under **Settings → Environment Variables**.
4. Click **Deploy**.

Every later push to `main` redeploys production; pushes to any other branch get
their own preview URL.

### Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `GEMINI_API_KEY` | Recommended | Without it the chatbot silently serves canned fallback replies. |
| `GEMINI_MODEL` | Optional | Defaults to `gemini-2.0-flash`. |

### Deploying from your own machine instead

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Known limitations before a real launch

* **Product images are hotlinked from Google Drive.** Drive is not a CDN and can
  throttle or intermittently return 403 under traffic. Move the files into
  `public/` or an image host before launch — every item in
  `src/products.generated.ts` carries a `driveId` to make that straightforward.
* **`/api/inquiry` only logs to the console.** Submissions are not stored
  anywhere; connect it to email, a database or a Sheet before depending on it.

---

## 🖼️ Updating the product galleries

`src/products.generated.ts` is generated — do not hand-edit it. Change the
collections, titles or descriptions in `scripts/gen-products.mjs`, then:

```bash
node scripts/gen-products.mjs
```

---

## 🎨 Creative Architecture & Fallbacks

Since GitHub Pages serves static files, any standard dynamic server elements have been designed with **resilient client-side fallbacks**:

* **PaperThreads AI Chatbot:**
  * When hosted on full-stack servers, it communicates with the Express backend using the configured Gemini model (`gemini-2.0-flash` by default).
  * When hosted statically on GitHub Pages, the chatbot triggers a **local semantic chatbot router**, allowing users to get smart, context-matched answers immediately in the browser.
* **Order Tracker & Inquiry Sheets:**
  * Interactive contact sheets have a robust offline-catch block that saves input states and lets buyers text their exact specifications directly via instant **WhatsApp redirection links**!
