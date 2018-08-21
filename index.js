const Marked = require('marked');
const fs = require('fs');

mdLinks = (path, options) =>{
  return new Promise((resolve, reject) => { 
    validate.isFileOrDirectory(path).then((response)=>{
      if (response === 'file') {
        processFile(path).then((response)=>{
          resolve(response);
        }).catch((err)=>{
          reject(err);
        });
      } else if (response === 'directory') {
        read.directory(path).then((files) => {
          let array = [];
          files.forEach(file => {
            array.push(processFile(path + file).then((response) => {
              console.log(response)
              return response;
            }).catch((err)=>{
              // console.log(err);
            }));     
          });
          Promise.all(array).then(values => {
            console.log(values)
            if (values !== undefined) {
              resolve(values);
            }
          }); 
        });
      }
    }).catch((err)=>{
      reject(err);
    });
  });
};

let read = {};
let validate = {};

processFile = (path)=>{
  return new Promise((resolve, reject) => {
    if (validate.isMarkDown(path)) {
      read.file(path).then((data) => {
        let links = markdownLinkExtractor(path, data);
        validate.hasLinks(links) ? resolve(links) : reject('No se encontrarón Enlaces');
      });
    } else {
      reject('No es un archivo mark down');
    }
  });
};
read.file = (file) =>{
  return new Promise((resolve, reject) =>{
    fs.readFile(file, 'utf8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};
read.directory = (path)=> {
  return new Promise((resolve, reject) => {
    fs.readdir(path, 'utf8', (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
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