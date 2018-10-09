import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { InterfaceTab } from '../../interfaces/tab.interface';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})

export class HomePage {

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth
  ) { }

  user: firebase.User;

  tabs: Array<InterfaceTab> = [
    { label: 'Home', path: 'camera' },
    { label: 'Gallery', path: 'gallery' }
  ]

  activeTab: string = '';

  setTabActive: any = this.router.events.subscribe(
    events => {
      this.activeTab = this.router.url.slice(6);
    }
  )

  ngOnInit(): void {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.user = currentUser;
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnDestroy(): void {
    this.setTabActive.unsubscribe();
  }

  appSignOut(): void {
    this.fireAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

}
