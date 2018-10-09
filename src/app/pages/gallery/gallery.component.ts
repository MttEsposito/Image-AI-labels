import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryPage {

  constructor(
    private fireStore: AngularFirestore
  ) { }


  loader: boolean = false;

  error: boolean = false;

  gallery: Array<any> = [];

  ngOnInit(): void {
    this.userGallery();
  }

  private userGallery(): void {
    this.loader = true;
    const currentUserUid = firebase.auth().currentUser.uid;
    this.fireStore.collection(currentUserUid, ref => {
      return ref.orderBy('dateNow', 'desc')
    }).valueChanges()
      .subscribe(
        res => { this.gallery = res; this.loader = false; },
        err => { this.error = true; this.loader = false; }
      )
  }

  checkIfFaces(faces:any):boolean{
    if(faces.length === 0){
      return false;
    }else{
      return true;
    }
  }
  
  checkFeeling(feelingObj: any): string {
    let stringFeeling = '';
    for (let i in feelingObj) {
      if (feelingObj[i] !== 'VERY_UNLIKELY') {
        stringFeeling += `${this.getTheStateToPrint(i)}, `;
      }
    }
    if (stringFeeling === '') {
      stringFeeling = "Can't predict the feelings well :(";
    } else {
      stringFeeling = stringFeeling.substring(0, stringFeeling.length - 2);
    }
    return stringFeeling;
  }

  getTheStateToPrint(feelingState: any): string {
    let feeling = '';
    switch (feelingState) {
      case 'joyLikelihood':
        feeling = 'Joy';
        break;
      case 'sorrowLikelihood':
        feeling = 'Sorrow';
        break;
      case 'blurredLikelihood':
        feeling = 'Blurred';
        break;
      case 'angerLikelihood':
        feeling = 'Anger';
        break;
      case 'underExposedLikelihood':
        feeling = 'Under exposed';
        break;
      case 'headwearLikelihood':
        feeling = 'headwear';
        break;
      default:
        break;
    }
    return feeling;
  }

}
