const {program} = require("commander");
const {readFile} = require("./ioUtilities");

let stdin = "";

program
    .version("0.0.1");

program.command("filter")
    .description("Usage: filter [file path]\n" +
     "Filters a vulnerability report created by 'npm audit --json'")
    .argument("<input>", "The vulnerability report file path.")
    .option("--whitelist", "Whitelist used for filter the report.", "")
    .option("--output", "Output file path", "./output.json")
    .action(function(input, options) {
      console.log("Start filter.");

      let auditReport = null;

      if (stdin) {
        auditReport = stdin;
      } else {
        auditReport = JSON.parse(readFile(input));
      }

      const whitelist = readFile(options.whitelist);
      if (whitelist === -1) return;

      const filteredReport = commandFilter(auditReport, whitelist.whitelist);

      console.log(JSON.stringify(filteredReport));
    });


if (process.stdin.isTTY()) {
  program.parse(process.argv);
} else {
  process.stdin.on("readable", function(input) {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      stdin += chunk;
    }
  });

  process.stdin.on("end", function() {
    program.parse(process.argv);
  });
}
