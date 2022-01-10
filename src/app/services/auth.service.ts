import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscripcion!: Subscription;
  private _user!: Usuario | null;

  get user(){
    return {... this._user};
  }

  constructor( public auth: AngularFireAuth,
                private firestore: AngularFirestore,
                private store: Store<AppState> ) { }

  initAuthLister(){
    this.auth.authState.subscribe( (user) =>{
        if(user){
          //Existe
          this.userSubscripcion = this.firestore.doc(`${user.uid}/usuario`).valueChanges().subscribe( (firestoreUser:any) => {
            const user = Usuario.fronFirebase( firestoreUser );
            this._user = user;
            this.store.dispatch( authActions.setUser({ user: user }));
          })
        }else{
          this._user = null;
          this.userSubscripcion.unsubscribe();
          this.store.dispatch( authActions.unSetUser() );
          this.store.dispatch( ingresoEgresoActions.unSetItems() );
        }
    })
  }

  crearUsuario(nombre: string, email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email,password)
        .then( ({ user }) => {
          const newUser = new Usuario( user!.uid, nombre, user?.email! );
          return this.firestore.doc(`${user?.uid}/usuario`).set({...newUser});
        });
  }

  loginUsuario(email: string, password: string ){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map( user => user != null )
    );
  }
}
