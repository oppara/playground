import { Command  } from 'commander';

const program = new Command();
program.parse(process.argv);
console.log(program.args);
console.log(program.args.length);
