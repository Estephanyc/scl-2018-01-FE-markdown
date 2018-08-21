const Marked = require('marked');
const fs = require('fs');

mdLinks = (path, options) =>{
  return new Promise((resolve, reject) => { 
    validate.isFileOrDirectory(path).then((response)=>{
      console.log(response);
      if (response === 'file') {
        if (validate.isMarkDown(path)) {
          read.file(path).then((data) => {
            let links = markdownLinkExtractor(path, data);
            validate.hasLinks(links) ? resolve(links) : reject('No se encontrarón Enlaces');
          });
        } else {
          reject('No es un archivo mark down');
        }
      } else if (response === 'directory') {
        console.log('es directorio');
      }
    }).catch((err)=>{
      reject(err);
    });
  });
};

let read = {};
let validate = {};
read.file = (file) =>{
  return new Promise((resolve, reject) =>{
    fs.readFile(file, 'utf8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};
read.directory = ()=> {

};
validate.isFileOrDirectory = (path)=>{
  return new Promise((resolve, reject) => {
    fs.stat(path, function(err, stats) {
      if (err !== null) {
        reject('No es un archivo ni directorio');
      } else if (stats.isFile()) {
        resolve('file');
      } else if (stats.isDirectory()) {
        resolve('directory');
      }       
    });
  });
};
validate.isMarkDown = (file) =>{
  let allowedExtension = /(\.md)$/i;
  return result = !allowedExtension.exec(file) ? false : true;
};
validate.hasLinks = (array) =>{
  return result = array.length === 0 ? false : true;
};
function markdownLinkExtractor(path, markdown) {
  const links = [];
  const renderer = new Marked.Renderer();
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      path: path,
    });
  };
  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      path: path,
    });
  };
  Marked(markdown, { renderer: renderer });

  return links;
}; 
module.exports = mdLinks; 