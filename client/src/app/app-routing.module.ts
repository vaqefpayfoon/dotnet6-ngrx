import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
    data: { breadcrumb: 'auth' },
  },
  {
    path: 'customer',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./customer/customer.module').then((mod) => mod.CustomerModule),
    data: { breadcrumb: 'customer' },
  },
  {
    path: 'admin-panel',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin-panel/admin-panel.module').then(
        (mod) => mod.AdminPanelModule
      ),
    data: { breadcrumb: 'admin-panel' },
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule {}
