import { Injectable, signal } from '@angular/core';

export interface SocialLinks {
  github: string;
  website: string;
  email: string;
}

export interface HomeData {
  name: string;
  avatarUrl: string;
  socialLinks: SocialLinks;
}

export interface AboutData {
  name: string;
  avatarUrl: string;
  title: string;
  description: string;
  githubUsername: string;
  skills: string[];
}

export interface Website {
  title: string;
  description: string;
  url: string;
  icon?: string;
  tags?: string[];
}

export type NoteCategory = 'todo' | 'learning' | 'inspiration' | 'project' | 'secure';

export interface Note {
  id: number;
  title: string;
  description: string;
  content: string;
  category: NoteCategory;
  timestamp: string;
  url?: string;
}

export interface RssConfig {
  feedUrl: string;
  corsProxy?: string;  // Optional CORS proxy URL prefix (e.g., 'https://api.allorigins.win/raw?url=')
}

export interface PortfolioData {
  home: HomeData;
  about: AboutData;
  websites: Website[];
  notes?: Note[];  // Optional: can be provided or fetched from RSS
  rss: RssConfig;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = signal<PortfolioData | null>(null);

  async loadData(): Promise<void> {
    try {
      const response = await fetch('/data/portfolio-data.json');
      const jsonData = await response.json();
      this.data.set(jsonData);
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
    }
  }

  getHomeData(): HomeData | null {
    return this.data()?.home || null;
  }

  getAboutData(): AboutData | null {
    return this.data()?.about || null;
  }

  getWebsites(): Website[] {
    return this.data()?.websites || [];
  }

  getNotes(): Note[] {
    return this.data()?.notes || [];
  }

  getRssConfig(): RssConfig | null {
    return this.data()?.rss || null;
  }

  getPortfolioData() {
    return this.data;
  }
}
