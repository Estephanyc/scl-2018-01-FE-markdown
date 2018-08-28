# Markdown link extractor
`Versión 0.0.1 `

Markdown link extractor te permite ver los enlaces que hay en un archivo md.

### Caracteristicas

- Extrae enlaces de un archivo md
- Información del enlace:
  Link, linea, texto, estado
- Opción de validar los enlaces 
- Opción de estadísticas de los enlaces 
- Recorre carpetas recursivamente
- Se puede importar como modulo
- Se puede usar por medio de la terminal

### Porque Markdown link extractor?

Aveces tenemos uno o múltiples archivos md que contienen enlaces y puede ser tedioso revisarlos uno a uno para ver su estado o para obtener estadísticas, Markdown Link Extractor te permite indicando la ruta de un archivo o carpeta obtener toda esta información.

### Instalación

##### Para ejecutar desde la terminal
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

La función retorna una promesa con un arreglo  de objetos, donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.
###### Ejemplo
```js
const mdLinks = require("md-links");

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
### Autor
Estephany Carvajal Hernandez
