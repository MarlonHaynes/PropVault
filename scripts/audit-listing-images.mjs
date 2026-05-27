import fs from 'fs';

const text = fs.readFileSync('data/listings.ts', 'utf8');
const listings = [...text.matchAll(/id: '(lst-\d+)'[\s\S]*?images: \[([\s\S]*?)\],/g)];

const thumbRe = /id: '(lst-\d+)'[\s\S]*?thumbnail: '(https:\/\/[^']+)'/g;
const thumbs = new Map();
for (const m of text.matchAll(thumbRe)) thumbs.set(m[1], m[2]);

const photoId = (url) => url.match(/photo-([a-z0-9-]+)/)?.[1];

for (const m of listings) {
  const id = m[1];
  const urls = [...m[2].matchAll(/https:\/\/[^\s']+/g)].map((x) => x[0]);
  console.log(id, 'thumb:', photoId(thumbs.get(id)), 'images:', urls.map(photoId).join(', '));
}

const allThumbs = [...thumbs.values()].map(photoId);
const dupThumbs = allThumbs.filter((id, i) => allThumbs.indexOf(id) !== i);
console.log('\nDuplicate thumbnails:', [...new Set(dupThumbs)]);

const allIds = [];
for (const m of text.matchAll(/photo-([a-z0-9-]+)/g)) allIds.push(m[1]);
const counts = {};
for (const id of allIds) counts[id] = (counts[id] || 0) + 1;
const shared = Object.entries(counts).filter(([, c]) => c > 5).sort((a, b) => b[1] - a[1]);
console.log('\nMost reused photo IDs (>5 uses):', shared.slice(0, 15));
