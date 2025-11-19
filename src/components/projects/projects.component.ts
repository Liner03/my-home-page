
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tech: string[];
  details: {
    role: string;
    problem: string;
    solution: string;
    outcome: string;
  };
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class ProjectsComponent {
  selectedProject = signal<Project | null>(null);

  projects: Project[] = [
    {
      title: 'AI-Powered Code Assistant',
      description: 'An intelligent assistant integrated into the IDE to provide real-time code suggestions and bug fixes using the Gemini API.',
      tech: ['Angular', 'TypeScript', 'Gemini API', 'WebSockets'],
      details: {
        role: 'Lead Full-Stack Engineer',
        problem: 'Developers spend significant time on boilerplate code and debugging common errors, slowing down the development cycle.',
        solution: 'Developed a browser extension and VS Code plugin that communicates with a secure backend. The backend processes code snippets via the Gemini API to generate context-aware suggestions, documentation, and refactoring options.',
        outcome: 'Reduced development time for new features by an estimated 20% and improved code quality by catching potential bugs earlier.'
      }
    },
    {
      title: 'Interactive Data Visualization Platform',
      description: 'A web platform for creating and sharing dynamic, interactive charts and maps from complex datasets.',
      tech: ['D3.js', 'React', 'Node.js', 'PostgreSQL'],
       details: {
        role: 'Frontend Developer & UI/UX Designer',
        problem: 'Static charts and reports fail to convey the rich stories hidden within large datasets, making data exploration difficult for non-technical users.',
        solution: 'Designed and built a highly performant, component-based frontend using React and D3.js. It allows users to upload data, choose from various visualization types, and customize them with interactive filters and tooltips.',
        outcome: 'Adopted by several data analytics teams, enabling them to create compelling data narratives for stakeholders and uncover previously unseen trends.'
      }
    },
    {
      title: 'Automated Content Generation Pipeline',
      description: 'A serverless pipeline that automatically generates marketing copy and social media posts from product information.',
      tech: ['Python', 'Google Cloud Functions', 'Google GenAI'],
      details: {
        role: 'Cloud & AI Engineer',
        problem: 'The marketing team was manually writing repetitive content for hundreds of products, which was time-consuming and prone to inconsistencies.',
        solution: 'Architected a serverless workflow on GCP. A Cloud Function triggers on new product data, calls the Gemini API with a structured prompt to generate multiple content variations, and saves them to a database for review.',
        outcome: 'Freed up 15+ hours per week for the marketing team, allowing them to focus on strategy. Ensured consistent brand voice across all generated content.'
      }
    },
    {
      title: 'Smart Home IoT Dashboard',
      description: 'A responsive dashboard to monitor and control various smart home devices from a single interface.',
      tech: ['Angular', 'NgRx', 'Firebase', 'MQTT'],
       details: {
        role: 'IoT Developer',
        problem: 'Managing multiple smart devices from different brands, each with its own app, leads to a fragmented and frustrating user experience.',
        solution: 'Created a unified Angular PWA that uses Firebase for real-time data synchronization and an MQTT broker to communicate with various IoT devices (lights, sensors, thermostats). The state is managed predictably with NgRx.',
        outcome: 'Provided a seamless, centralized control hub for the home, improving convenience and energy efficiency through automated routines.'
      }
    }
  ];

  selectProject(project: Project) {
    this.selectedProject.set(project);
  }

  closeModal() {
    this.selectedProject.set(null);
  }
}
