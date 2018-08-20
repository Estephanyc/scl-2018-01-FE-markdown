#!/usr/bin/env node
const [, , ...args] = process.argv;
const mdLinks = require('./index');
// const mdLinks = require("md-links");
mdLinks(args[0]).then((links)=>{
  console.log(links)
  links.forEach(element => {
    console.log(element.path + ' : ' + element.href + ' : ' + element.text);
  });  
})
  .catch((error) => {
    console.log(error);
  });
