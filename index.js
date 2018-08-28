#!/usr/bin/env node
const mdLinks = require('./lib/md-links').mdLinks;

if (require.main === module) {
  const [, , ...args] = process.argv;
  let options = {};
  if (args.includes('--validate')) options.validate = true;
  if (args.includes('--stats')) options.stats = true;

  mdLinks(args[0], options).then((links) => {
    if (links.length === 0) console.error('Error, no es un archivo markdown o no se encontrarón enlaces');
    links.forEach(element => {
      let result = '';
      if (options.validate) result = `${element.path} : ${element.line} : ${element.href} : ${element.text} : ${element.ok} : ${element.status}`;
      else if (options.stats) result = `total: ${element.total} ok : ${element.ok} fails: ${element.fails}`;
      else result = `${element.path} : ${element.line} : ${element.href} : ${element.text}`;
      console.log(result);
    });
  }).catch((error) => {
    console.error(error);
  });
}
module.exports = mdLinks;