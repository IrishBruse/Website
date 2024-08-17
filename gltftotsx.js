import { ChildProcess, spawnSync, execSync, exec } from "child_process";
import fs from "fs"
import path from "path";

let glbFolder = "public/models/";
let tsxFolder = "src/models/";

let dir = fs.opendirSync(glbFolder)

let file;
while ((file = dir.readSync()) != null)
{
    processFile(file);
}

async function processFile(file)
{
    let glb = glbFolder + file.name;
    let tsxFile = path.basename(file.name, ".glb") + ".tsx"
    let tsx = tsxFolder + tsxFile;

    let command = "npx gltfjsx " + glb + " --types true --keepnames --keepgroups true --meta true --shadows true --precision 5"

    console.log("> " + command);
    exec(command, () =>
    {
        fs.renameSync("./" + tsxFile, tsx)

        let text = fs.readFileSync(tsx).toString()

        text = text.replace(new RegExp('/' + file.name, 'g'), "/home/models/" + file.name)
        text = text.replace(new RegExp('as GLTFResult', 'g'), "as unknown as GLTFResult")

        text = "// @ts-nocheck\n" + text

        text = text.replace("<group ref={group} {...props}", "<group animations={actions} ref={group} {...props}")

        fs.writeFileSync(tsx, text)
    })
}
