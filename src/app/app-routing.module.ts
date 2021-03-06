import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard]},
  {path: 'payments', loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule), canActivate: [AuthGuard]},
  {path: 'assign-tariff', loadChildren: () => import('./assign-tariff/assign-tariff.module').then(m => m.AssignTariffModule), canActivate: [AuthGuard]},
  {path: 'new-report', loadChildren: () => import('./new-report/new-report.module').then(m => m.NewReportModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
