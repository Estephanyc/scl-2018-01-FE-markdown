const mdLinks = require('../index');
test('La promesa deberia fallar si no se encontrarón enlaces en el archivo', () => {
  expect.assertions(1);
  return mdLinks('./md/no-links.md').catch(e => expect(e).toMatch('No se encontrarón Enlaces'));
});
test('Deberia retornar un arreglo con los enlaces para un archivo con enlaces', () => {
  expect.assertions(3);
  return mdLinks('./md/file.md').then(data => {
    let element = data[0];
    expect(element.href).toEqual('http://google.com');
    expect(element.text).toEqual('link to Google!');
    expect(element.path).toEqual('./md/file.md');
  });
});
test('La promesa deberia fallar si no es un archivo md', () => {
  expect.assertions(1);
  return mdLinks('./md/file.js').catch(e => expect(e).toMatch('No es un archivo mark down'));
});
test('La promesa deberia fallar si no es un archivo ni un directorio', () => {
  expect.assertions(1);
  return mdLinks('./md/f').catch(e => expect(e).toMatch('No es un archivo ni directorio'));
});