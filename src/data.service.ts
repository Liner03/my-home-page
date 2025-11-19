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

export interface ProjectDetails {
  role: string;
  problem: string;
  solution: string;
  outcome: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  details: ProjectDetails;
}

export type NoteCategory = 'todo' | 'learning' | 'inspiration' | 'project' | 'secure';

export interface Note {
  id: number;
  content: string;
  category: NoteCategory;
  timestamp: string;
}

export interface PortfolioData {
  home: HomeData;
  about: AboutData;
  projects: Project[];
  notes: Note[];
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

  getProjects(): Project[] {
    return this.data()?.projects || [];
  }

  getNotes(): Note[] {
    return this.data()?.notes || [];
  }

  getPortfolioData() {
    return this.data;
  }
}
