import fs from "fs";
import path from "path";

function fixDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      fixDir(full);
      continue;
    }

    if (!file.endsWith(".js")) continue;

    let content = fs.readFileSync(full, "utf8");

    // Replace your existing content.replace block with this:
    content = content.replace(
      /from\s+["'](\.\.?\/[^"']+)["']/g,
      (match, p1) => {
        // If it already ends in .js, return the match unchanged
        if (p1.endsWith(".js")) return match;

        const fromFileDir = path.dirname(full);
        const resolvedPath = path.resolve(fromFileDir, p1);

        // If the import refers to a directory (e.g. "./app/routes"), point it at index.js
        if (
          fs.existsSync(resolvedPath) &&
          fs.statSync(resolvedPath).isDirectory()
        ) {
          const indexJs = path.join(resolvedPath, "index.js");
          if (fs.existsSync(indexJs)) {
            return match.replace(p1, `${p1}/index.js`);
          }
        }

        // Otherwise, if there's a corresponding .js file next to it, append .js
        if (fs.existsSync(`${resolvedPath}.js`)) {
          return match.replace(p1, `${p1}.js`);
        }

        return match;
      },
    );

    fs.writeFileSync(full, content);
  }
}

fixDir("./dist");
