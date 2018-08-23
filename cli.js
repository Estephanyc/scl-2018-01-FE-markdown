#!/usr/bin/env node

const [, , ...args] = process.argv;

const mdLinks = require('./md-links').mdLinks;
let options = {};

if (args.indexOf('--validate') >= 0) options.validate = true;
if (args.indexOf('--stats') >= 0) options.stats = true;

if (require.main === module) {
  mdLinks(args[0], options).then((links) => {
    links.forEach(element => {
      if (options.validate) {
        console.log(element.path + ' : ' + element.href + ' : ' + element.text + ' : ' + element.ok + ' : ' + element.status);
      } else {
        console.log(element.path + ' : ' + element.href + ' : ' + element.text);
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}
module.exports = mdLinks;