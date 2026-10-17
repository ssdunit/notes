# Sunit's Notes

Notes, findings and research, published with [Quartz v5](https://quartz.jzhao.xyz/) at **https://ssdunit.github.io/notes**. Linked from the portfolio at https://ssdunit.github.io.

## Where things live

| Path | What |
| --- | --- |
| `content/Notes/<Topic>/` | Study notes, one folder per topic (e.g. `Quantum Cryptography`, `Robot Learning`) |
| `content/Findings/` | Short results, experiments, things I found |
| `content/Research/` | Papers, reading notes, research threads |
| `quartz.config.yaml` | Site config: title, colors, fonts, plugins (TOC depth is set here) |
| `quartz/styles/custom.scss` | Theme (matches the portfolio), KaTeX sizing, reader mode |
| `patch-toc-katex.mjs` | Makes the table of contents render KaTeX (runs on `npm install`) |

## Run locally

Needs Node 22+ and npm 10.9+.

```bash
git clone https://github.com/ssdunit/notes.git
cd notes
git checkout v5
npm ci                      # also applies the TOC KaTeX patch (postinstall)
npx quartz plugin install   # fetch/refresh Quartz plugins
npx quartz build --serve    # live preview, rebuilds on save
```

Open the URL printed in the terminal (usually http://localhost:8080). Hard-refresh (Ctrl+Shift+R) after changing config or SCSS.

## Add a note

1. Pick the folder: `content/Notes/<Topic>/`, `content/Findings/` or `content/Research/`. A new topic is just a new folder under `content/Notes/`.
2. Create a `.md` file, e.g. `content/Notes/Quantum Cryptography/finite-fields-17-10-2026.md`, starting with:

   ```yaml
   ---
   title: Groups, Rings, and Fields
   date: 2026-10-17
   tags: [cryptography, algebra, modular-arithmetic]
   ---
   ```

3. Write the body. Save, and the preview reloads.

Writing rules that avoid known problems:

- **Headings:** use `##` for main sections and `###` for subsections. The table of contents shows only `##`. Don't add a `#` heading; the title comes from the front matter.
- **Math (KaTeX):** `$...$` inline, `$$...$$` for display. Put `$$` on its own lines with a blank line before and after. Use `aligned` for multi-line equations (`\begin{aligned} ... \end{aligned}`), not `align*`. Math in `##` headings is fine and shows in the TOC.
- **Arrows:** a literal `->` in prose becomes an arrow. Write it inside math (`$\to$`) or reword.
- **Tags:** no spaces (`modular-arithmetic`, not `modular arithmetic`).
- **Links between notes:** `[[Note title]]` or `[[Note title|text]]`.
- **Images:** put files in `content/` (e.g. `content/assets/`) and use `![[image.png]]`.
- Files named in `ignorePatterns` (`private`, `templates`, `.obsidian`) are never published.

## Publish

```bash
git add .
git commit -m "notes: finite fields"
git push origin v5
```

GitHub Actions builds and deploys to GitHub Pages. In the repo, Settings → Pages → Source must be **GitHub Actions** (one-time). Progress shows in the Actions tab; the site updates after a minute or two.

## The TOC KaTeX patch

Quartz's table-of-contents plugin only outputs plain text, so headings with math would show raw LaTeX. `patch-toc-katex.mjs` edits the installed plugin in `node_modules` to copy the rendered math from each heading into its TOC entry. It is wired in `package.json`:

```json
"scripts": {
  "postinstall": "node patch-toc-katex.mjs"
}
```

It runs after every `npm install` / `npm ci`, including in CI. It never fails the install. If you see `toc-katex: pattern not found` after a plugin update, the plugin changed and the TOC falls back to raw LaTeX until the patch is updated.

## Change the look or TOC depth

- TOC depth: `maxDepth` under the `table-of-contents` plugin in `quartz.config.yaml` (`2` = only `##`).
- Math size: `.katex` and `.katex-display > .katex` in `quartz/styles/custom.scss`.
- Reader mode column width: `minmax(0, 760px)` in the reader-mode block at the end of `custom.scss`.