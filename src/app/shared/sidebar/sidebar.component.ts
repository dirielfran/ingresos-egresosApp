import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  nameUsuario!: String | undefined;
  nameSubscription!: Subscription;

  constructor( private authService: AuthService,
                private router: Router,
                private store: Store<AppState>) { }

  ngOnInit(): void {
    this.nameSubscription = this.store.select('user')
    .pipe(
      filter( ({ user }) => user != null )
    )
    .subscribe( ({user}) => {
      this.nameUsuario = user?.nombre;
    });
  }

  ngOnDestroy(): void {
    this.nameSubscription.unsubscribe();
  }

  logout(){
    this.authService.logout().then( () => {
      this.router.navigateByUrl('/login');
    });
  }

}
