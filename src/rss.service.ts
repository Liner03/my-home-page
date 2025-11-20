import { Injectable } from '@angular/core';
import { DataService, type Note } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RssService {
  constructor(private dataService: DataService) {}

  private getConfig() {
    const config = this.dataService.getRssConfig();
    return {
      siteUrl: config?.siteUrl || window.location.origin,
      siteTitle: config?.siteTitle || 'My Portfolio',
      siteDescription: config?.siteDescription || 'Notes and articles from my portfolio',
      authorEmail: config?.authorEmail || 'author@example.com'
    };
  }

  /**
   * Escapes XML special characters
   */
  private escapeXml(unsafe: string | undefined): string {
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
  private toRFC822Date(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toUTCString();
  }

  /**
   * Generates RSS XML content from notes data
   */
  generateRSS(): string {
    const config = this.getConfig();
    const portfolioData = this.dataService.getPortfolioData()();
    const notes = this.dataService.getNotes();

    if (!notes || notes.length === 0) {
      throw new Error('No notes available for RSS generation');
    }

    const rssItems = notes
      .filter(note => note.category !== 'secure') // Exclude secure notes from RSS
      .map(note => {
        const itemUrl = note.url || `${config.siteUrl}/#notes`;
        const pubDate = this.toRFC822Date(note.timestamp);

        return `    <item>
      <title>${this.escapeXml(note.title)}</title>
      <description>${this.escapeXml(note.description)}</description>
      <link>${this.escapeXml(itemUrl)}</link>
      <guid isPermaLink="${note.url ? 'true' : 'false'}">${this.escapeXml(itemUrl)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${note.category}]]></category>
      ${note.content ? `<content:encoded><![CDATA[${note.content}]]></content:encoded>` : ''}
    </item>`;
      })
      .join('\n');

    const buildDate = new Date().toUTCString();
    const aboutData = portfolioData?.about;

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${this.escapeXml(config.siteTitle)}</title>
    <description>${this.escapeXml(config.siteDescription)}</description>
    <link>${config.siteUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${config.siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${aboutData?.name ? `<managingEditor>${this.escapeXml(config.authorEmail)} (${this.escapeXml(aboutData.name)})</managingEditor>` : ''}
${rssItems}
  </channel>
</rss>`;
  }

  /**
   * Downloads the RSS feed as an XML file
   */
  downloadRSS(): void {
    try {
      const rssContent = this.generateRSS();
      const blob = new Blob([rssContent], { type: 'application/rss+xml' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'feed.xml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating RSS feed:', error);
      alert('Failed to generate RSS feed');
    }
  }

  /**
   * Opens RSS feed in a new window for copying/subscribing
   */
  openRSS(): void {
    try {
      const rssContent = this.generateRSS();
      const blob = new Blob([rssContent], { type: 'application/rss+xml' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      // Clean up after a delay
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error('Error generating RSS feed:', error);
      alert('Failed to generate RSS feed');
    }
  }
}
