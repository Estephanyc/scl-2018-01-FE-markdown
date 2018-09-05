# Markdown link extractor
`Versión 0.0.3 `

Markdown link extractor te permite ver los enlaces que hay en un archivo md.

### Caracteristicas

- Extrae enlaces de un archivo md
- Información del enlace:
  link, linea, texto, estado
- Opción de validar los enlaces individuales y en carpetas 
- Opción de estadísticas de enlaces en los archivos y carpetas
- Recorre carpetas recursivamente
- Se puede importar como modulo
- Se puede usar por medio de la terminal

### Porque Markdown link extractor?

Aveces tenemos uno o múltiples archivos md que contienen enlaces y puede ser tedioso revisarlos uno a uno para ver su estado o para obtener estadísticas, Markdown Link Extractor te permite indicando la ruta de un archivo o carpeta obtener esta información.

### Instalación

##### Para instalar globalmente y usar desde la terminal
```bash
 npm install -g md-links-extractor
 ```
 o
```bash
npm install -g https://github.com/Estephanyc/scl-2018-01-FE-markdown/
```
##### Para instalar como dependencia
```bash
npm i md-links-extractor --save
```
### Uso

#### Linea de comandos
La ruta ingresada puede ser absoluta o relativa y puede ser un archivo o un directorio

`$ md-links ./some/example.md`
```sh
./some/example.md:10 http://algo.com/2/3/ Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html algún doc
./some/example.md:40 http://google.com/ Google
```

`$ md-links ./some/example.md --validate`
```sh
./some/example.md:10 http://algo.com/2/3/ ok 200 Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md:40 http://google.com/ ok 301 Google
```
`$ md-links ./some/example.md --stats`
```sh
total: 3 ok : 2 fails: 1
```

#### Importar el modulo

##### `mdLinks(path, options)`
###### Argumentos

- `path`: Ruta absoluta o relativa al archivo.

- `options`: Un objeto con las siguientes propiedades:
  - `validate`: Valor que determina si se desea validar los links encontrados en el archivo. (tipo de dato booleano)
  - `stats`: Valor que determina si se desea obtener estadisticas de los enlaces del archivo. (tipo de dato booleano)

###### Valor de retorno

Una promesa con un arreglo  de objetos, cada objeto representa un link y contiene las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link.
- `file`: Ruta del archivo donde se encontró el link.
- `line`: Linea donde se encontró el link.

###### Ejemplo
```js
const mdLinks = require("md-links-extractor");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ file, line, href, text }]
  })
  .catch(err)

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ file, line, href, text, ok, status }]
  })
  .catch(err)
  
mdLinks("./some/example.md", { stats: true })
  .then(links => {
    // => [{ total, ok,fails }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
  ```
  
### Demo
![files](https://user-images.githubusercontent.com/38702172/44786053-4a398700-ab69-11e8-93c2-d914bd73a0a6.gif)
![dir](https://user-images.githubusercontent.com/38702172/44786065-57ef0c80-ab69-11e8-80b5-4607c2579ffa.gif)

### Versiones
`0.0.3`
- Demo incluido en README.md
`0.0.2`
- Se pueden validar los enlaces de archivos individuales o archivos dentro de carpetas
- Se pueden obtener estadisticas de archivos individuales o archivos dentro de carpetas
- Muestra los enlaces de un archivo markdown  

`0.0.1` 
- Muestra los enlaces de un archivo markdown 

### npm
[Proyecto publicado en npm](https://www.npmjs.com/package/md-links-extractor)

### Test
Test implementados con Jest con 95% de cobertura
```bash
npm test 
 ```

### Planeación
[Trello](https://trello.com/b/rOVgvZNp/markdown)

### Autor
Estephany Carvajal Hernandez
