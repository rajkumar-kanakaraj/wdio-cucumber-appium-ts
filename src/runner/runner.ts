import path from "node:path";
import { Launcher, RunCommandArguments, run } from "@wdio/cli";
import { commandLineArgement, getArgv } from "./commandlineArgumentParser.js";
import { getAllFilesInDir } from "../utils/utils.js";
import { parseFeatureFile } from "./FeatureFileParser.js";
import parse from "@cucumber/tag-expressions";

const getFeatureFiles = async () =>
  await getAllFilesInDir(path.resolve("./src/featureFiles/"), ".feature");

const cucumberOps = async (tags) => {
  const spec = [];
  for await (const data of await parseFeatureFile(await getFeatureFiles())) {
    const { compiledPickels } = data;
    const output = compiledPickels.map((pickle) => {
      const fileContainsRunnableScenario = (
        rawData,
        commandLineTagExpression
      ) => {
        const fileTags = rawData.tags;
        const ast = parse(commandLineTagExpression);
        return fileTags.some((tags) => ast.evaluate(tags));
      };
      return fileContainsRunnableScenario(pickle, tags);
    });

    if (output.includes(true)) {
      spec.push(data.name);
    }
  }

// console.log(spec)
   return spec;
};

const runWdio = async (argv: commandLineArgement) => {
  const configFile = `./src/config/wdio.${argv.provider}.config.ts`;

  const opts = {
    cucumberOpts: {
      tagExpression: argv.tag,
      deviceIds: argv.deviceIds,
      require: await getAllFilesInDir(
        path.resolve("./src/stepDefinitions/"),
        ".ts"
      ),
      backtrace: true,
      failFast: false,
      timeout: 1000 * 60,
      ignoreUndefinedDefinitions: false,
    },
    specs: await cucumberOps(argv.tag),
  };

 await new Launcher(configFile, opts).run();
};



getArgv(process.argv.slice(2)).then(async (argv) => runWdio(argv));

//  console.log(await getFeatureFiles());

//  console.log(await parseFeatureFile(await getFeatureFiles()));

// for await (const data of await parseFeatureFile(await getFeatureFiles())) {

//     console.log(data)
//     // process.exit(0);
    
//     }

//   console.log(await cucumberOps("@smoke1"));
