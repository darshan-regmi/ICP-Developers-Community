// Rasterizes the brand SVGs into the PNGs Next.js auto-discovers in app/.
// Run: node scripts/build-images.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const faviconSvg = fs.readFileSync(path.join(root, "public/favicon.svg"));
const ogSvg = fs.readFileSync(path.join(root, "public/og-image.svg"));

async function write(buffer, rel) {
  const out = path.join(root, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buffer);
  const size = (buffer.length / 1024).toFixed(1);
  console.log(`✓ ${rel}  (${size} KB)`);
}

// 1) app/icon.svg — copy of the source so Next.js auto-injects it as <link rel="icon">.
fs.copyFileSync(
  path.join(root, "public/favicon.svg"),
  path.join(root, "app/icon.svg")
);
console.log("✓ app/icon.svg  (copied)");

// 2) app/icon.png — 32×32 PNG fallback for browsers without SVG favicon support.
{
  const png = await sharp(faviconSvg, { density: 512 })
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await write(png, "app/icon.png");
}

// 3) app/apple-icon.png — 180×180 iOS home-screen icon.
//    iOS shows wallpapers behind transparent PNGs, so we composite onto the
//    #222831 ink backplate (matches the site's logo block).
{
  const inner = await sharp(faviconSvg, { density: 1024 })
    .resize(132, 132, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const apple = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 0x22, g: 0x28, b: 0x31, alpha: 1 },
    },
  })
    .composite([{ input: inner, top: 24, left: 24 }])
    .png()
    .toBuffer();

  await write(apple, "app/apple-icon.png");
}

// 4) app/opengraph-image.png — 1200×630 social card.
{
  const png = await sharp(ogSvg, { density: 192 })
    .resize(1200, 630, { fit: "contain", background: { r: 0x22, g: 0x28, b: 0x31, alpha: 1 } })
    .png()
    .toBuffer();
  await write(png, "app/opengraph-image.png");
}

// 5) app/twitter-image.png — Twitter sometimes prefers a dedicated asset;
//    identical to opengraph-image for now but kept as a separate file so we
//    can diverge later (eg. for Twitter's slightly different safe area).
{
  const png = await sharp(ogSvg, { density: 192 })
    .resize(1200, 630, { fit: "contain", background: { r: 0x22, g: 0x28, b: 0x31, alpha: 1 } })
    .png()
    .toBuffer();
  await write(png, "app/twitter-image.png");
}

console.log("\nDone.");
