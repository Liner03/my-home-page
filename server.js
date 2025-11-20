#!/usr/bin/env node

/**
 * Simple Express server to serve the Angular app and dynamic RSS feed
 */

import express from 'express';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4200;
const SITE_URL = process.env.SITE_URL || `http://localhost:${PORT}`;
const SITE_TITLE = process.env.SITE_TITLE || 'My Portfolio';
const SITE_DESCRIPTION = process.env.SITE_DESCRIPTION || 'Notes and articles from my portfolio';
const AUTHOR_EMAIL = process.env.AUTHOR_EMAIL || 'author@example.com';

/**
 * Escapes XML special characters
 */
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Converts a timestamp string to RFC 822 date format (required for RSS)
 */
function toRFC822Date(timestamp) {
  const date = new Date(timestamp);
  return date.toUTCString();
}

/**
 * Generates RSS XML content from notes data
 */
function generateRSS(notes, aboutData) {
  const rssItems = notes
    .filter(note => note.category !== 'secure') // Exclude secure notes from RSS
    .map(note => {
      const itemUrl = note.url || `${SITE_URL}/#notes`;
      const pubDate = toRFC822Date(note.timestamp);

      return `    <item>
      <title>${escapeXml(note.title)}</title>
      <description>${escapeXml(note.description)}</description>
      <link>${escapeXml(itemUrl)}</link>
      <guid isPermaLink="${note.url ? 'true' : 'false'}">${escapeXml(itemUrl)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${note.category}]]></category>
      ${note.content ? `<content:encoded><![CDATA[${note.content}]]></content:encoded>` : ''}
    </item>`;
    })
    .join('\n');

  const buildDate = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>${SITE_URL}</link>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${aboutData?.email ? `<managingEditor>${escapeXml(AUTHOR_EMAIL)} (${escapeXml(aboutData.name)})</managingEditor>` : ''}
${rssItems}
  </channel>
</rss>`;
}

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist/browser')));

// Dynamic RSS feed endpoint
app.get('/feed.xml', async (req, res) => {
  try {
    const dataPath = join(__dirname, 'public/data/portfolio-data.json');
    const data = await readFile(dataPath, 'utf-8');
    const portfolioData = JSON.parse(data);

    if (!portfolioData.notes || portfolioData.notes.length === 0) {
      return res.status(404).send('No notes found');
    }

    const rssContent = generateRSS(portfolioData.notes, portfolioData.about);

    res.set('Content-Type', 'application/rss+xml; charset=utf-8');
    res.send(rssContent);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).send('Error generating RSS feed');
  }
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/browser/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📡 RSS feed available at http://localhost:${PORT}/feed.xml`);
});
