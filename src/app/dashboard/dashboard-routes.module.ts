import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboarRoutes } from './dashboard.routes';

const rutasHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboarRoutes,
    //canActivate: [ AuthGuard ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( rutasHijas )
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutesModule { }
