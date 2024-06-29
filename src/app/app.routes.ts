import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'select-players',
    loadComponent: () => import('./pages/select-players/select-players.page').then( m => m.SelectPlayersPage)
  },
  {
    path: 'play',
    loadComponent: () => import('./pages/play/play.page').then( m => m.PlayPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage),
  },
  {
    path: 'purge-game-data',
    loadComponent: () => import('./pages/purge-game-data/purge-game-data.page').then( m => m.PurgeGameDataPage)
  },
  {
    path: 'edit-players/:onboard',
    loadComponent: () => import('./pages/edit-players/edit-players.page').then( m => m.EditPlayersPage)
  },
  {
    path: 'edit-players',
    loadComponent: () => import('./pages/edit-players/edit-players.page').then( m => m.EditPlayersPage)
  },
  {
    path: 'reports/:id',
    loadComponent: () => import('./pages/reports/reports.page').then( m => m.ReportsPage)
  },
  {
    path: 'export-game-data',
    loadComponent: () => import('./pages/export-game-data/export-game-data.page').then( m => m.ExportGameDataPage)
  },
  {
    path: 'import-game-data',
    loadComponent: () => import('./pages/import-game-data/import-game-data.page').then( m => m.ImportGameDataPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/game-history/game-history.page').then( m => m.GameHistoryPage)
  },
  {
    path: 'history/:id',
    loadComponent: () => import('./pages/game-history-detail/game-history-detail.page').then( m => m.GameHistoryDetailPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then( m => m.AboutPage)
  },
];
