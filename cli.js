#!/usr/bin/env node
const [, , ...args] = process.argv;
const mdLinks = require('./index');
// const mdLinks = require("md-links");
mdLinks(args[0]).then((links) => {
  let directory = Array.isArray(links[0]);
  if (directory) {
    links.forEach(element => {
      element.forEach(element => {
        console.log(element.path + ' : ' + element.href + ' : ' + element.text);
      });
    });
  } else {
    links.forEach(element => {
      console.log(element.path + ' : ' + element.href + ' : ' + element.text);
    });
  }
}).catch((error) => {
  console.log(error);
});