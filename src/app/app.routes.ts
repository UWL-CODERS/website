import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'opportunities',
        loadComponent: () =>
          import('./pages/opportunities/opportunities.component').then(
            (m) => m.OpportunitiesComponent,
          ),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/projects/projects.component').then((m) => m.ProjectsComponent),
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./pages/gallery/gallery.component').then((m) => m.GalleryComponent),
      },
      {
        path: '**',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
    ],
  },
];
