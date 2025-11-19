
import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, type Project } from '../../services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ProjectsComponent {
  selectedProject = signal<Project | null>(null);
  projects = signal<Project[]>([]);

  constructor(private dataService: DataService) {
    effect(() => {
      const data = this.dataService.getProjects();
      if (data.length > 0) {
        this.projects.set(data);
      }
    });
  }

  selectProject(project: Project) {
    this.selectedProject.set(project);
  }

  closeModal() {
    this.selectedProject.set(null);
  }
}
