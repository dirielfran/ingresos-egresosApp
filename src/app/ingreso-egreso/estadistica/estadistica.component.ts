import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [  ] },
    ]
  };

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public doughnutChartType: ChartType = 'doughnut';


  constructor( private store: Store<AppState>) {

  }

  ngOnInit(): void {

    this.store.select('ingresosEgresos').subscribe( ({items}) => {
      this.generarEstadisticas( items );
    });

  }

  generarEstadisticas( items: IngresoEgreso[]){
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    items.forEach((item: IngresoEgreso) => {
      if( item.tipo === 'ingreso' ){
        this.totalIngresos += item.monto;
        this.ingresos ++;
      }else{
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    });
    this.doughnutChartData.datasets[0].data[0] = this.totalIngresos;
    this.doughnutChartData.datasets[0].data[1] = this.totalEgresos;
  }

}
