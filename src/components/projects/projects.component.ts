
import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, type Project } from '../../data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ProjectsComponent {
  selectedProject = signal<Project | null>(null);
  projects = signal<Project[]>([]);
  isClosingModal = signal(false);

  constructor(private dataService: DataService) {
    effect(() => {
      const data = this.dataService.getProjects();
      if (data.length > 0) {
        this.projects.set(data);
      }
    });
  }

  selectProject(project: Project) {
    this.isClosingModal.set(false);
    this.selectedProject.set(project);
  }

  closeModal() {
    this.isClosingModal.set(true);
    // Wait for animation to complete before clearing the project
    setTimeout(() => {
      this.selectedProject.set(null);
      this.isClosingModal.set(false);
    }, 300); // Match the animation duration
  }
}
