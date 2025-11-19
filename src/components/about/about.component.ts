
import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, type AboutData } from '../../data.service';

interface GitHubContribution {
  date: string;
  count: number;
  level: number;
}

interface GitHubCalendarData {
  contributions: GitHubContribution[];
  total: {
    [year: string]: number;
  };
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class AboutComponent {
  aboutData = signal<AboutData | null>(null);
  githubContributions = signal<GitHubContribution[]>([]);
  totalContributions = signal<number>(0);
  isLoadingGitHub = signal<boolean>(false);

  constructor(private dataService: DataService) {
    effect(() => {
      const data = this.dataService.getAboutData();
      if (data) {
        this.aboutData.set(data);
        if (data.githubUsername) {
          this.loadGitHubContributions(data.githubUsername);
        }
      }
    });
  }

  async loadGitHubContributions(username: string) {
    this.isLoadingGitHub.set(true);
    try {
      const response = await fetch(`https://gh-calendar.rschristian.dev/user/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub contributions');
      }
      const data: GitHubCalendarData = await response.json();
      this.githubContributions.set(data.contributions || []);

      // Calculate total contributions for current year
      const currentYear = new Date().getFullYear().toString();
      this.totalContributions.set(data.total?.[currentYear] || 0);
    } catch (error) {
      console.error('Error loading GitHub contributions:', error);
      this.githubContributions.set([]);
    } finally {
      this.isLoadingGitHub.set(false);
    }
  }

  getContributionColor(level: number): string {
    const colors = [
      'rgba(255, 255, 255, 0.05)', // level 0 - no contributions
      'rgba(139, 92, 246, 0.3)',   // level 1 - low
      'rgba(139, 92, 246, 0.5)',   // level 2 - medium
      'rgba(139, 92, 246, 0.7)',   // level 3 - high
      'rgba(139, 92, 246, 0.9)',   // level 4 - very high
    ];
    return colors[Math.min(level, 4)] || colors[0];
  }
}
