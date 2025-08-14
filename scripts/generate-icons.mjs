import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const root = path.resolve(process.cwd());
const appDir = path.join(root, 'src', 'app');
const publicDir = path.join(root, 'public');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function generate() {
  const svgPath = path.join(appDir, 'icon.svg');
  const svg = await fs.readFile(svgPath);

  await ensureDir(appDir);
  await ensureDir(publicDir);

  // PNG sizes for apple-touch and others
  const sizes = [16, 32, 48, 64, 128, 180, 192, 256, 512];
  const pngPaths = [];

  for (const size of sizes) {
    const outPng = path.join(publicDir, `icon-${size}.png`);
    await sharp(svg).resize(size, size, { fit: 'cover' }).png().toFile(outPng);
    pngPaths.push(outPng);
  }

  // apple-touch-icon
  const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png');
  await sharp(svg).resize(180, 180, { fit: 'cover' }).png().toFile(appleTouchPath);

  // favicon.ico from multiple PNG sizes
  const icoBuffer = await pngToIco([
    path.join(publicDir, 'icon-16.png'),
    path.join(publicDir, 'icon-32.png'),
    path.join(publicDir, 'icon-48.png'),
  ]);
  await fs.writeFile(path.join(appDir, 'favicon.ico'), icoBuffer);

  console.log('Icons generated:');
  console.log('- src/app/favicon.ico');
  console.log('- public/apple-touch-icon.png');
  console.log('- public/icon-*.png');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});


