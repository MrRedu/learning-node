import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

// 1. Recuperar la carpeta a listar
const dir = process.argv[2] ?? '.';
const args = process.argv.slice(3);

// 2. Formateo simple de los tamaños
const formatSize = (size) => {
  if (size < 1024) return `${size} bytes`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

// 3. Leer los nombres, sin información
const files = await readdir(dir);

// 4. Recuperar la info de cada file
const entries = await Promise.all(
  files.map(async (file) => {
    const fullPath = join(dir, file);
    const info = await stat(fullPath);

    return {
      name: file,
      isDir: info.isDirectory(),
      size: formatSize(info.size),
    };
  })
);

// 5. Ordenar
entries.sort((a, b) => {
  if (a.isDir && !b.isDir) return -1;
  if (!a.isDir && b.isDir) return 1;
  return a.name.localeCompare(b.name);
});

console.log('- - - - - - - - - - - - - - - -');
if (args.includes('--only-dirs')) console.log('Listando solo directorios...');
if (args.includes('--only-files')) console.log('Listando solo archivos...');
if (args.includes('--only-dirs') && args.includes('--only-files'))
  console.log('Listando todos los archivos y directorios...');

for (const entry of entries) {
  if (args.includes('--only-dirs') && !entry.isDir) continue;
  if (args.includes('--only-files') && entry.isDir) continue;

  const icon = entry.isDir ? '📂' : '📄';
  const size = entry.isDir ? '' : `(${entry.size})`;
  console.log(`${icon} ${entry.name.padEnd(25)}       ${size}`);
}
console.log('- - - - - - - - - - - - - - - -');
