const Marked = require('marked');
const fs = require('fs');
const fetch = require('node-fetch');
let validate = false;
let mdLinks = {};

mdLinks.mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (!path)reject('Ingrese un archivo o directorio');
    if (options) {
      if (options.validate) validate = true;
      if (options.stats) console.log('stats');
    }
    mdLinks.validateIsFileOrDirectory(path).then((response) => {
      if (response === 'file') {
        mdLinks.processFile(path).then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      } else if (response === 'directory') {
        mdLinks.processDirectory(path).then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

mdLinks.processDirectory = (path) =>{
  return new Promise((resolve, reject) => {
    fs.readdir(path, 'utf8', (err, files) => {
      console.log(files);
      let promises = [];
      files.forEach(file => {
        if (mdLinks.validateIsMarkDown(file)) {
          promises.push(mdLinks.processFile(path + file).then((response) => {
            return response;
          }).catch((err) => {
            reject(err);
          }));
        }
      });
      Promise.all(promises).then(values => {
        let array = values.reduce((elem1, elem2) => {
          return elem1.concat(elem2);
        });
        resolve(array);
      });
    });
  });
};
mdLinks.processFile = (path) => {
  return new Promise((resolve, reject) => {
    if (mdLinks.validateIsMarkDown(path)) {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) reject(err);
        let links = markdownLinkExtractor(path, data);
        if (validate) mdLinks.validateUrl(links).then((values) =>{
          Promise.all(values).then((values) =>{
            resolve(values);
          });
        });
        else resolve(links);
      });
    } else {
      reject('No es un archivo markdown');
    }
  });
};
mdLinks.validateUrl = (links) =>{
  return new Promise((resolve, reject) => {
    let promises = [];
    links.forEach((link)=>{
      promises.push(fetch(link.href)
        .then(res => {
          link.status = res.status;
          link.ok = res.statusText;
          return link;
        }).catch((e) =>{
          link.status = 'fail';
          link.ok = 'fail';
          return link;
        })
      );
      resolve(promises);
    });
  });
};
mdLinks.validateIsFileOrDirectory = (path) => {
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
mdLinks.validateIsMarkDown = (file) => {
  let allowedExtension = /(\.md)$/i;
  return result = !allowedExtension.exec(file) ? false : true;
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