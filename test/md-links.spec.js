const mdLinks = require('../md-links');
describe(
  'Casos donde deberia fallar la promesa', 
  () => {
    test('Si no se envia el path como argumento', () => {
      expect.assertions(1);
      return mdLinks.mdLinks().catch(e => expect(e).toMatch('Ingrese un archivo o directorio'));
    });
    test('Si no es archivo ni directorio', () => {
      expect.assertions(1);
      return mdLinks.mdLinks('./md/f').catch(e => expect(e).toMatch('No es un archivo ni directorio'));
    });
    test('Si el archivo enviado no es un md', () => {
      expect.assertions(1);
      return mdLinks.mdLinks('./md/file.js').catch(e => expect(e).toMatch('No es un archivo markdown'));
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