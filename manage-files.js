// mkdir: Crear un directorio de forma recursiva
// readFile: Leer el contenido de un archivo
// writeFile: Escribir contenido en un archivo
import { mkdir, readFile, writeFile } from 'node:fs/promises';
// join: Unir segmentos de ruta de manera segura dependiendo del sistema operativo (Windows tiene las barras al revés, Linux hacia adelante /linux vs \windows)
// extname: Obtener la extensión de un archivo // .js
// basename: Obtener el nombre base de un archivo // archivo.txt
import { join, extname, basename } from 'node:path';

//! Mala práctica: hardcodear rutas -> Rompería en Windows
// const outputDir = './output/files/documents';
//* Buena práctica: usar path.join para crear rutas multiplataforma
const outputDir = join('output', 'files', 'documents'); // output/files/documents en Linux y output\files\documents en Windows

// Crear el directorio de forma recursiva (si no existe)
await mkdir(outputDir, { recursive: true });

const content = await readFile('archivo.txt', 'utf8');
const contentUpperCase = content.toUpperCase();
const newOutputPath = join(outputDir, 'archivo-en-uppercase.txt'); // output/files/documents/archivo-en-uppercase.txt`);
// await writeFile(`${outputDir}/archivo-en-uppercase.txt`, contentUpperCase);
await writeFile(newOutputPath, contentUpperCase);

console.log(
  `Archivo "./archivo.txt" convertido a mayúsculas en "${newOutputPath}" con éxito ✅`
);
console.log(basename(newOutputPath)); // archivo-en-uppercase.txt
console.log(extname(newOutputPath)); // .txt
