import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

import { GalleryPage } from './gallery.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatExpansionModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: '',
        component: GalleryPage,
      }
    ])
  ],
  declarations: [
    GalleryPage
  ]
})
export class GalleryPageModule {}
