import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import QRCode from 'qrcode';
import sharp from 'sharp';

export const prerender = true;

const BASE_URL = 'https://qrooted.marat.dev';
const IMG_WIDTH = 400;
const IMG_HEIGHT = 480;
const QR_SIZE = 360;
const PADDING = 20;

export const getStaticPaths: GetStaticPaths = async () => {
  const plants = await getCollection('plants');
  return plants.map((plant) => ({
    params: { slug: plant.id.replace(/\.md$/, '') },
    props: { title: plant.data.title },
  }));
};

export const GET: APIRoute = async ({ params, props }) => {
  const url = `${BASE_URL}/plants/${params.slug}`;
  const title = (props as { title: string }).title;

  // Generate QR code as SVG string
  const qrSvg = await QRCode.toString(url, {
    type: 'svg',
    margin: 1,
    width: QR_SIZE,
    errorCorrectionLevel: 'M',
  });

  // Calculate font size — shrink for longer names
  let fontSize = 24;
  // Approximate: each character ~14px wide at size 24
  while (fontSize > 12 && title.length * (fontSize * 0.6) > IMG_WIDTH - PADDING * 2) {
    fontSize--;
  }

  const qrY = PADDING;
  const textY = qrY + QR_SIZE + (IMG_HEIGHT - qrY - QR_SIZE) / 2;
  const qrX = (IMG_WIDTH - QR_SIZE) / 2;

  // Compose full SVG with QR code and label
  const compositeSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${IMG_WIDTH}" height="${IMG_HEIGHT}">
      <rect width="100%" height="100%" fill="white"/>
      <g transform="translate(${qrX}, ${qrY})">
        ${qrSvg}
      </g>
      <text
        x="${IMG_WIDTH / 2}"
        y="${textY}"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="sans-serif"
        font-weight="bold"
        font-size="${fontSize}px"
        fill="black"
      >${escapeXml(title)}</text>
    </svg>
  `;

  const png = await sharp(Buffer.from(compositeSvg))
    .resize(IMG_WIDTH, IMG_HEIGHT)
    .png()
    .toBuffer();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
