import { Injectable, signal } from '@angular/core';
import { DataService, type Note, type NoteCategory } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RssService {
  private notes = signal<Note[]>([]);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  constructor(private dataService: DataService) {}

  /**
   * Fetches and parses RSS feed from the configured URL
   */
  async fetchRSSFeed(): Promise<Note[]> {
    const config = this.dataService.getRssConfig();

    if (!config?.feedUrl) {
      this.error.set('RSS feed URL not configured');
      return [];
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      // Use CORS proxy if configured, otherwise fetch directly
      const fetchUrl = config.corsProxy
        ? `${config.corsProxy}${encodeURIComponent(config.feedUrl)}`
        : config.feedUrl;

      const response = await fetch(fetchUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      // Check for parsing errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error('Failed to parse RSS XML');
      }

      const items = xmlDoc.querySelectorAll('item');
      const parsedNotes: Note[] = [];
      let noteId = 1;

      items.forEach((item) => {
        const title = item.querySelector('title')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();

        // Get content:encoded if available, otherwise use description
        const contentEncoded = item.querySelector('encoded')?.textContent;
        const content = contentEncoded || description;

        // Get ALL category tags for this item
        const categoryElements = item.querySelectorAll('category');
        const categories: string[] = [];

        categoryElements.forEach(catElement => {
          const catText = catElement.textContent?.trim();
          if (catText) {
            categories.push(catText);
          }
        });

        // If no categories found, use a default
        if (categories.length === 0) {
          categories.push('未分类');
        }

        // Create a note for each category
        // This allows articles with multiple categories to appear in each category view
        categories.forEach(category => {
          parsedNotes.push({
            id: noteId++,
            title,
            description,
            content,
            category,
            timestamp: new Date(pubDate).toISOString(),
            url: link || undefined
          });
        });
      });

      this.notes.set(parsedNotes);
      this.loading.set(false);
      return parsedNotes;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      this.error.set(errorMessage);
      this.loading.set(false);
      console.error('RSS fetch error:', err);
      return [];
    }
  }

  /**
   * Returns the notes signal
   */
  getNotes() {
    return this.notes.asReadonly();
  }

  /**
   * Returns the loading state signal
   */
  isLoading() {
    return this.loading.asReadonly();
  }

  /**
   * Returns the error signal
   */
  getError() {
    return this.error.asReadonly();
  }
}
