const fs = require("fs");
const path = require("path");

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules" && file !== ".next") {
        walk(fullPath);
      }
    } else {
      let content = fs.readFileSync(fullPath, "utf8");

      if (content.includes("<<<<<<<")) {
        content = content
          .split("\n")
          .filter(line =>
            !line.startsWith("<<<<<<<") &&
            !line.startsWith("=======") &&
            !line.startsWith(">>>>>>>")
          )
          .join("\n");

        fs.writeFileSync(fullPath, content, "utf8");
        console.log("Fixed:", fullPath);
      }
    }
  });
}

walk(".");
console.log("Done fixing merge conflicts");