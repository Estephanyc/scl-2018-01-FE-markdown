const mdLinks = require('../md-links'); 
describe(
  'Casos donde deberia fallar la promesa',
  () => {
    test('Si no se envia el path como argumento', () => {
      expect.assertions(1);
      return mdLinks.mdLinks().catch(e => expect(e).toMatch('Ingrese un archivo o directorio'));
    });
});
describe(
  'Casos donde deberia devolver arreglo vacio', 
  () => {
    test('Si no es archivo ni directorio', () => {
      expect.assertions(1);
      return mdLinks.mdLinks('./md/f').then(e => expect(e).toEqual([]));
    });
    test('Si el archivo enviado no es un md', () => {
      expect.assertions(1);
      return mdLinks.mdLinks('./md/file.js').then(e => expect(e).toEqual([]));
    });   
  });
describe(
  'Casos donde se resuelve la promesa',
  () => {
    test('Deberia retornar un arreglo vacio si no se encontrarón enlaces', () => {
      expect.assertions(1);
      return mdLinks.mdLinks('./md/no-links.md').then(data => expect(data).toEqual([]));
    });
    test('Deberia retornar un arreglo con los enlaces para un archivo con enlaces', () => {
      expect.assertions(2);
      return mdLinks.mdLinks('./md/file.md').then(data => {
        let element = data[0];
        expect(element.href).toEqual('http://google.com');
        expect(element.text).toEqual('link to Google!');
      });
    });
  });
describe(
  'mdLinks.validateIsFileOrDirectory() Deberia validar si es archivo o directorio',
  () => {
    test('Deberia retornar file para un archivo', () => {
      expect(mdLinks.validateIsFileOrDirectory('./md/no-links.md')).toBe('file');
    });
    test('Deberia retornar directory para una carpeta', () => {
      expect(mdLinks.validateIsFileOrDirectory('./md/')).toBe('directory');
    });
  });
describe(
  'mdLinks.validateIsMarkDown() Deberia validar si es archivo md',
  () => {
    test('Deberia retornar false para un archivo que no es md', () => {
      expect(mdLinks.validateIsMarkDown('./md/file.js')).toBe(false);
    });
    test('Deberia retornar true para un archivo md', () => {
      expect(mdLinks.validateIsMarkDown('./md/file.md')).toBe(true);
    });
  });
describe(
  'mdLinks.markdownLinkExtractor() Deberia extraer los links de un texto',
  () => {
    test('Deberia retornar un arreglo con un objecto para un texto con enlaces', () => {
      expect(mdLinks.markdownLinkExtractor('', '[GitHub](http://github.com)', 6))
        .toEqual([{ 
          'href': 'http://github.com',
          'line': 6,
          'path': '',
          'text': 'GitHub' 
        }]);
    });
    test('Deberia retornar un arreglo vacio si no  hay enlaces', () => {
      expect(mdLinks.markdownLinkExtractor('', 'hola, este es el contenido', 9)).toEqual([]);
    });
  });
describe(
  'mdLinks.stats() Deberia dar estadisticas de total, ok y fails',
  () => {
    let link1 = {};
    link1.ok = 'OK';
    let link2 = {};
    link2.ok = 'fail';
    let array = [link1, link2];
    test('Deberia retornar un arreglo con un objecto con las estadisticas', () => {
      expect(mdLinks.stats(array)).toEqual([{total: 2,
        'ok': 1,
        'fails': 1}]);
    });
  });
/* describe(
  'mdLinks.validateUrl() Deberia validar los enlaces malos en un arreglo de objectos',
  () => {
    expect.assertions(1);
    let links = mdLinks.markdownLinkExtractor('', '[GitHub](http://github.com)', 6);
    return mdLinks.validateUrl(links).then((values) => {
      Promise.all(values).then((values) => {
        
      });
    });
  }); */