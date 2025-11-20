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
      const response = await fetch(config.feedUrl);

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

      items.forEach((item, index) => {
        const title = item.querySelector('title')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
        const categoryText = item.querySelector('category')?.textContent || 'learning';

        // Get content:encoded if available, otherwise use description
        const contentEncoded = item.querySelector('encoded')?.textContent;
        const content = contentEncoded || description;

        // Map category to valid NoteCategory
        const category = this.mapCategory(categoryText);

        parsedNotes.push({
          id: index + 1,
          title,
          description,
          content,
          category,
          timestamp: new Date(pubDate).toISOString(),
          url: link || undefined
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
   * Maps RSS category to valid NoteCategory
   */
  private mapCategory(category: string): NoteCategory {
    const normalized = category.toLowerCase().trim();
    const validCategories: NoteCategory[] = ['todo', 'learning', 'inspiration', 'project', 'secure'];

    if (validCategories.includes(normalized as NoteCategory)) {
      return normalized as NoteCategory;
    }

    // Default to 'learning' if category is not recognized
    return 'learning';
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
