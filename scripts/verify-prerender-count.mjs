import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

const manifestPath = path.join(distDir, '.prerender-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('Missing dist/.prerender-manifest.json. Did the build run?');
  process.exit(1);
}
const { routeCount } = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

const countIndexFiles = (dir) => {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'assets') continue;
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countIndexFiles(entryPath);
    } else if (entry.name === 'index.html') {
      count += 1;
    }
  }
  return count;
};

const actual = countIndexFiles(distDir);

if (actual !== routeCount) {
  console.error(
    `Expected ${routeCount} prerendered index.html files, found ${actual}.`
  );
  process.exit(1);
}

console.log(`Verified ${actual} prerendered index.html files match ${routeCount} routes.`);
