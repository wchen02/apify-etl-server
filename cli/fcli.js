const program = require('commander');
 
program
  .version('0.0.1')
  .command('archive', 'Archives data and downloaded files')
  .parse(process.argv);
