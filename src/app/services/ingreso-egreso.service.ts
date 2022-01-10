import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: AngularFirestore,
                private authService: AuthService ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso){
    const uid = this.authService.user.uid;
    delete ingresoEgreso.uid;
    return this.firestore.doc(`${uid}/ingreso-egreso`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngreosEgresosListener (uid: string ){
    return this.firestore.collection(`${uid}/ingreso-egreso/items`).snapshotChanges()
    .pipe(
      map( snapshot => {
        return snapshot.map( doc => {
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          }
        })
      })
    )
  }


  borrarIngresoEgreso( uidItem: string){
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${ uid }/ingreso-egreso/items/${ uidItem }`).delete();
  }
}
