import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'coping-library',
    loadComponent: () =>
      import('./features/coping-library/coping-library.component').then(
        (m) => m.CopingLibraryComponent
      ),
  },
  {
    path: 'crisis-resources',
    loadComponent: () =>
      import('./features/crisis-resources/crisis-resources.component').then(
        (m) => m.CrisisResourcesComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
