import { Command } from 'commander';

export function processArgs(args : string[]) {
  const program = new Command();

  program
    .option('-p, --port <type>', 'Specify port', '4000')

  program.parse(args);

  const options = program.opts();

  return options;
}