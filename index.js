const Marked = require('marked');
const fs = require('fs');

mdLinks = (path, options) =>{
  return new Promise((resolve, reject) => { 
    let allowedExtension = /(\.md)$/i;
    if (!allowedExtension.exec(path)) {
      reject('No es un archivo mark down');
    } else {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          throw err;
          reject(err);
        }
        let links = markdownLinkExtractor(path, data);
        if (links.length === 0) {
          reject('No se encontrarón Enlaces');
        } else {
          resolve(links);
        }
      });
    }
  });
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