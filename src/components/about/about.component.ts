
import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, type AboutData } from '../../data.service';

interface GitHubContribution {
  date: string;
  count: number;
  intensity: string;
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
  errorMessage = signal<string>('');

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
    this.errorMessage.set('');

    try {
      const url = `https://gh-calendar.rschristian.dev/user/${username}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch GitHub contributions`);
      }

      const data: GitHubCalendarData = await response.json();

      // Flatten the nested array structure (weeks -> days)
      const flatContributions: GitHubContribution[] = [];
      if (Array.isArray(data.contributions)) {
        data.contributions.forEach((week: any) => {
          if (Array.isArray(week)) {
            week.forEach((day: any) => {
              flatContributions.push(day);
            });
          }
        });
      }
      this.githubContributions.set(flatContributions);

      // Calculate total - it's already a number in this API
      const total = typeof data.total === 'number' ? data.total : 0;
      this.totalContributions.set(total);
    } catch (error) {
      console.error('Error loading GitHub contributions:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to load contributions';
      this.errorMessage.set(errorMsg);
      this.githubContributions.set([]);
    } finally {
      this.isLoadingGitHub.set(false);
    }
  }

  getContributionColor(intensity: string | number): string {
    const level = typeof intensity === 'string' ? parseInt(intensity, 10) : intensity;
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
