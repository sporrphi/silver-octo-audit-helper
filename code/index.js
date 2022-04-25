const {program} = require("commander");

const stdin = "";

program.command("filter")
    .description("Usage: filter [file path]\n" +
     "Filters a vulnerability report created by 'npm audit --json'")
    .argument("<input>", "The vulnerability report file path.")
    .option("--whitelist", "Whitelist used for filter the report.", "")
    .option("--output", "Output file path", "./output.json")
    .action((input, options) => {
      console.log("Start filter.");
    });

