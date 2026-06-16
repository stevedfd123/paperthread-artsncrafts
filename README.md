# 🌸 PaperThreads Portfolio Portal

An elegant, interactive, and beautifully responsive portfolio website for **PaperThreads**, founded by artist and crafter **Kavindi Samudika**. 

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

## 🎨 Creative Architecture & Fallbacks

Since GitHub Pages serves static files, any standard dynamic server elements have been designed with **resilient client-side fallbacks**:

* **PaperThreads AI Chatbot:**
  * When hosted on full-stack servers, it communicates with the Express backend using the **Gemini 3.5 Flash** model.
  * When hosted statically on GitHub Pages, the chatbot triggers a **local semantic chatbot router**, allowing users to get smart, context-matched answers immediately in the browser.
* **Order Tracker & Inquiry Sheets:**
  * Interactive contact sheets have a robust offline-catch block that saves input states and lets buyers text their exact specifications directly via instant **WhatsApp redirection links**!
