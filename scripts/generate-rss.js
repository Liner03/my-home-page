#!/usr/bin/env node

/**
 * RSS Feed Generator Script
 *
 * This script generates an RSS 2.0 feed from the portfolio notes data.
 * It reads from public/data/portfolio-data.json and generates public/feed.xml
 *
 * Usage:
 *   node scripts/generate-rss.js
 */

import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://example.com';
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
      <category>${escapeXml(note.category)}</category>
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

/**
 * Main function
 */
async function main() {
  try {
    const dataPath = join(__dirname, '../public/data/portfolio-data.json');
    const outputPath = join(__dirname, '../public/feed.xml');

    console.log('📖 Reading portfolio data...');
    const data = await readFile(dataPath, 'utf-8');
    const portfolioData = JSON.parse(data);

    if (!portfolioData.notes || portfolioData.notes.length === 0) {
      console.warn('⚠️  No notes found in portfolio data');
      return;
    }

    console.log(`📝 Found ${portfolioData.notes.length} notes`);
    console.log('🔨 Generating RSS feed...');

    const rssContent = generateRSS(portfolioData.notes, portfolioData.about);

    await writeFile(outputPath, rssContent, 'utf-8');

    console.log('✅ RSS feed generated successfully!');
    console.log(`📄 Output: ${outputPath}`);
    console.log(`🔗 Feed URL: ${SITE_URL}/feed.xml`);
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error.message);
    process.exit(1);
  }
}

main();
