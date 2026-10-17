// Makes the Quartz TOC render KaTeX from headings.
// Runs automatically via the "postinstall" npm script (see README), so local
// installs and the GitHub Actions build both get it. Idempotent; never fails
// the install (worst case the TOC shows raw LaTeX).
// Manual: node patch-toc-katex.mjs [path-to-plugin-components-index.js]
import fs from "node:fs";

const file =
  process.argv[2] ||
  "node_modules/@quartz-community/table-of-contents/dist/components/index.js";

const MARK = "/*toc-katex*/";
const code = `${MARK}
function tocKatex() {
  document.querySelectorAll(".toc-content a[data-for]").forEach((a) => {
    if (a.dataset.katex) return;
    const h = document.getElementById(a.dataset.for);
    if (!h || !h.querySelector(".katex")) return;
    const c = h.cloneNode(true);
    c.querySelectorAll('a[role="anchor"]').forEach((n) => n.remove());
    a.innerHTML = c.innerHTML;
    a.dataset.katex = "1";
  });
}
document.addEventListener("nav", tocKatex);
document.addEventListener("render", tocKatex);
`;

if (!fs.existsSync(file)) {
  console.warn("toc-katex: plugin not found at", file, "- skipped");
  process.exit(0);
}
let src = fs.readFileSync(file, "utf8");
if (src.includes(MARK)) {
  console.log("already patched");
  process.exit(0);
}
const needle = "TableOfContents.afterDOMLoaded = concatenateResources(\n    toc_inline_default,";
if (!src.includes(needle)) {
  console.warn("toc-katex: pattern not found (plugin version changed?) - skipped");
  process.exit(0);
}
src = src.replace(
  needle,
  `TableOfContents.afterDOMLoaded = concatenateResources(\n    toc_inline_default,\n    ${JSON.stringify(code)},`
);
fs.writeFileSync(file, src);
console.log("patched", file);
