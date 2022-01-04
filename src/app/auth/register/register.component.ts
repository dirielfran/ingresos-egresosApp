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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor( private fb: FormBuilder,
                private authService: AuthService,
                private store: Store<AppState>,
                private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required]]
    })

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario(){
    if(this.registerForm.invalid) return;

    /*Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      }
    })*/
    this.store.dispatch( ui.isLoading() );

    const { nombre, correo, password } = this.registerForm.value;
    this.authService.crearUsuario( nombre, correo, password)
      .then( credenciales => {
        console.log( credenciales );
        //Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigateByUrl('/')
      }).catch( error => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      });
  }
}
