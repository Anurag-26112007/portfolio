# Anurag Saini — Portfolio

A single-page portfolio themed around Anne of Green Gables ("you as a character").

## Files
- `index.html` — the page
- `style.css` — all styling
- `script.js` — fireflies animation, scroll-reveal, portrait fade-in, journey photo slideshow, contact form (AJAX submit)
- `portrait.jpg` — your hero photo (must keep this exact filename, or update the `<img src>` in index.html)
- `gallery-1.jpg`, `gallery-2.jpg` — the two photos in the crossfading slideshow next to "the road so far"
- `resume.pdf` — your résumé, bundled locally so the link never depends on an outside service

## Put this on GitHub Pages
All files already use their standard names, so nothing needs renaming before you deploy —
`index.html` is what GitHub Pages looks for automatically, and it's already named that.

1. Create a new repo (e.g. `portfolio`) on GitHub.
2. In VS Code, open this folder, then in the terminal:
   ```
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/Anurag-26112007/portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from branch → main / (root)** → Save.
4. Your site goes live at `https://anurag-26112007.github.io/portfolio/` after a minute or two.

## Résumé
The résumé links (hero + contact section) now point straight at `resume.pdf`,
which is bundled in this folder. Make sure that file is committed and pushed along with
the other files — GitHub Pages will serve it just like any other static file, so the link
works immediately with no outside service to depend on. If you ever replace your résumé,
just overwrite this PDF (keeping the same filename) or update the filename in `index.html`.

## Contact form
The form posts to FormSubmit's **AJAX endpoint**
(`https://formsubmit.co/ajax/anurasaini2007@gmail.com`) via `fetch()`, so:
- the visitor stays on your page the whole time — no redirect, no mail app opening
- they see an inline "Sent" or error message right on the site
- the message itself still lands in your Gmail inbox in the background

**One-time step:** the very first submission triggers a confirmation email to
anurasaini2007@gmail.com from FormSubmit — click the link in it once to activate
the endpoint. After that, every note gets delivered automatically. Test it
yourself once the site is live, before sharing the link.
