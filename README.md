# Markdown link extractor

Markdown link extractor te permite ver los enlaces que hay en un archivo md

## Caracteristicas

- Extrae enlaces de un archivo md
- Información del enlace
  Link, linea, texto, estado
- Opción de validar los enlaces 
- Opción de estadisticas de los enlaces 
- Recorre carpetas recursivamente
- Se puede importar como modulo
- Se puede usar por medio de la terminal

## Porque Markdown link extractor?

Aveces tenemos uno o multiples archivos md que contienen enlaces y puede ser tedioso revisarlos uno a uno para ver su estado o para obtener estadisticas, Markdown Link Extractor te permite indicando la ruta de un archivo o carpeta obtener toda esta información.

## Instalación

#### npm

```bash
npm install Estephanyc/md-links
```

```bash
npm i md-links-extractor
```

## Uso

### Linea de comandos

Para ejecutar a través de la terminal:
`md-links <path-to-file>`

Retornara los enlaces presentes en el archivo

```sh
$ md-links ./some/example.md
./some/example.md:10 http://algo.com/2/3/ Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html algún doc
./some/example.md:40 http://google.com/ Google
```

##### `--validate`
```sh
$ md-links ./some/example.md --validate
./some/example.md:10 http://algo.com/2/3/ ok 200 Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md:40 http://google.com/ ok 301 Google
```
