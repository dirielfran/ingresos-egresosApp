import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, Subscription } from 'rxjs'
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as authActions from '../auth/auth.actions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription;
  ingresosEgresoSuscription!: Subscription;

  constructor( private store: Store<AppState>,
                private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
      )
    .subscribe( ({user}) => {
      this.ingresosEgresoSuscription = this.ingresoEgresoService.initIngreosEgresosListener(user?.uid!)
        .subscribe( ingresosEgresos => {
          this.store.dispatch( ingresoEgresoActions.setItems({ items : ingresosEgresos }));
        });
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.store.dispatch( authActions.unSetUser() );
    this.ingresosEgresoSuscription.unsubscribe();
  }

}
