import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

import { HomePage } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          { path: 'camera', loadChildren: '../camera/camera.module#CameraPageModule' },
          { path: 'gallery', loadChildren: '../gallery/gallery.module#GalleryPageModule' },
          { path: '**', redirectTo: 'camera' },
        ]
      }
    ])
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule { }
