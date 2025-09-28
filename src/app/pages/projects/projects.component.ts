import {Component, inject, OnInit} from '@angular/core';
import {CarouselComponent} from '../../components/carousel/carousel.component';
import {Project} from '../../models/project.model';
import {SeoService} from '../../services/seo.service';
import {PageMeta} from '../../models/meta.model';

@Component({
  selector: 'app-projects',
  imports: [CarouselComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    const pageMeta: PageMeta = {
      title: 'Projects',
      description:
        'Check out the projects our members have been working on. Contact an executive to showcase your work!',
      keywords:
        'CODERS Club, UWL, student projects, web development, programming, computer science',
    };
    this.seoService.setPageMeta(pageMeta);
  }

  projectData: Project[] = [
    {
      title: 'CODERS Website',
      description:
        'This website, which you are currently viewing, was developed by the UWL CODERS Club and is built using a range of modern web technologies.',
      imageUrl:
        'https://raw.githubusercontent.com/UWL-CODERS/website/refs/heads/main/src/assets/images/Logos/logo.png',
      externalUrl: 'https://github.com/UWL-CODERS/website',
      tags: ['TypeScript', 'HTML', 'SCSS', 'Angular'],
      button: 'View Project',
    },
    {
      title: 'YMCA Project',
      description:
        'A web app to manage YMCA programs and registrations as part of a minor project at UW-La Crosse.',
      imageUrl: 'https://avatars.githubusercontent.com/u/63300213',
      externalUrl: 'https://github.com/bishalkarki01/YMCAProject',
      tags: ['JavaScript', 'HTML', 'CSS'],
      button: 'View Project',
    },
    {
      title: 'FaceMesh',
      description:
        'This project utilizes the CV2 Python package and external Machine-Learning HTML Sources to make a visual face mesh.',
      imageUrl: 'https://avatars.githubusercontent.com/u/132915020',
      externalUrl: 'https://github.com/BlambrechtCodes/FaceMesh',
      tags: ['Python', 'CV2', 'HTML'],
      button: 'View Project',
    },
  ];

  // researchData: Project[] = [
  //     {
  //         title: 'CODERS Website',
  //         description: 'This website, which you are currently viewing, was developed by the UWL CODERS Club and is built using a range of modern web technologies.',
  //         imageUrl: 'https://raw.githubusercontent.com/UWL-CODERS/website/refs/heads/main/src/assets/images/Logos/logo.png',
  //         externalUrl: 'https://github.com/UWL-CODERS/website',
  //         tags: ['TypeScript', 'HTML', 'SCSS', 'Angular'],
  //         button: 'View Research'
  //     },
  //     {
  //         title: 'YMCA Project',
  //         description: 'A web app to manage YMCA programs and registrations as part of a minor project at UW-La Crosse.',
  //         imageUrl: 'https://avatars.githubusercontent.com/u/63300213',
  //         externalUrl: 'https://github.com/bishalkarki01/YMCAProject',
  //         tags: ['JavaScript', 'HTML', 'CSS'],
  //         button: 'View Research'
  //     },
  //     {
  //         title: 'FaceMesh',
  //         description: 'This project utilizes the CV2 Python package and external Machine-Learning HTML Sources to make a visual face mesh.',
  //         imageUrl: 'https://avatars.githubusercontent.com/u/132915020',
  //         externalUrl: 'https://github.com/BlambrechtCodes/FaceMesh',
  //         tags: ['Python', 'CV2', 'HTML'],
  //         button: 'View Research'
  //     }
  // ];

  lightningTalksData: Project[] = [
    {
      title: '2023 Lightning Talks',
      description: '',
      imageUrl: 'assets/images/Logos/logo.png',
      externalUrl: 'https://cs.uwlax.edu/~mzheng/LightningTalks2023.pdf',
      tags: ['Samantha Foley', 'Mao Zheng', 'Rig Das', 'W. Michael Petullo', 'Dipankar Mitra'],
      button: 'View Slides',
    },
    {
      title: '2024 Lightning Talks',
      description: '',
      imageUrl: 'assets/images/Logos/logo.png',
      externalUrl: 'https://cs.uwlax.edu/~mzheng/Lightning2024.pdf',
      tags: ['Mao Zheng', 'Niusen Chen', 'Dipankar Mitra', 'Samantha Foley', 'Rig Das'],
      button: 'View Slides',
    },
  ];
}
