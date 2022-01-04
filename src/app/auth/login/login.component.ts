import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor( private fb: FormBuilder,
                private authService: AuthService,
                private store: Store<AppState>,
                private route: Router ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.uiSubscription =this.store.select('ui').subscribe( ui => {
                            this.cargando = ui.isLoading;
                            console.log('Pasando por el store');
                          })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario(){
    if( this.loginForm.invalid ) return;

    this.store.dispatch( ui.isLoading() )

    /*Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      }
    })*/

    const { email, password } = this.loginForm.value;
    this.authService.loginUsuario(email, password)
      .then( auth => {
        console.log( auth);
        //Swal.close();
        this.store.dispatch( ui.stopLoading() )
        this.route.navigateByUrl('/');
      }).catch( error => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      })
  }

}
