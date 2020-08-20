const commander = require('commander');
const program = new commander.Command();

program
  .allowUnknownOption()
  .option('--debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

if (program.debug) {
  console.log(program.opts());
}
if (program.small) {
  console.log('small');
}
if (program.pizzaType) {
  console.log(`- ${program.pizzaType}`);
}
console.log('done.');
