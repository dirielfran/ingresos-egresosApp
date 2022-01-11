import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

//Componentes
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';

//Pipes
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';

//Reducers
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule { }
