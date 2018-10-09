import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule} from '@angular/material/list';

import { CameraPage } from './camera.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: '',
        component: CameraPage,
      }
    ])
  ],
  declarations: [
    CameraPage
  ]
})
export class CameraPageModule {}
