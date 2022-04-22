import * as core from "@actions/core";
import * as fs from "fs";

try {
  if (!fs.existsSync("README.md")) {
    throw new Error("README.md not found");
  }

  var mdContent = fs.readFileSync("README.md", "utf-8").replace(/^\uFEFF/, "") // strip BOM
  var missingFiles = Array<string>();

  //![aaa](bbb)
  const regex = /!\[[^\[\]]*?\]\((?<filename>.+?)\)/gmi;

  // check file for each found match
  let match = regex.exec(mdContent);
  while(match !== null) {
    let [, filename] = match
    core.info(`Found file ${filename} in README.md`)

    if (!fs.existsSync(filename)) {
      missingFiles.push(filename);
    }

    // next match
    match = regex.exec(mdContent)
  }

  // final check and report error
  if (missingFiles.length > 0) {
    throw new Error(`README.md contains images that do not exist (mind the case of the name): ${missingFiles.join(" ")}`);
  }
} catch (error) {
  if (typeof error === "string") {
    core.setFailed(error)
  } else if (error instanceof Error) {
    core.setFailed(error.message)
  } else {
    core.setFailed("unknown error");
  }
}
