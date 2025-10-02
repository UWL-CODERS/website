import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomeComponent),
      },
      {
        path: 'opportunities',
        loadComponent: () =>
          import('./pages/opportunities/opportunities.page').then((m) => m.OpportunitiesComponent),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/projects/projects.page').then((m) => m.ProjectsComponent),
      },
      {
        path: 'gallery',
        loadComponent: () => import('./pages/gallery/gallery.page').then((m) => m.GalleryComponent),
      },
      {
        path: '**',
        loadComponent: () => import('./pages/home/home.page').then((m) => m.HomeComponent),
      },
    ],
  },
];
