import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppSnackbar } from '../../services/snackbar.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss']
})

export class CameraPage {

    constructor(
        private camera: Camera,
        private snack: AppSnackbar,
        private fireStorage: AngularFireStorage,
        private fireStore: AngularFirestore,
        private http: HttpClient
    ) { }

    photo: any;

    faces: any;

    facesPresent:boolean=false;

    loader: boolean = false;

    labels: Array<any> = [];

    takePicture(): void {
        const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            correctOrientation: true
        }
        this.camera.getPicture(options)
            .then(image => this.getImage(image))
            .catch(err => this.setError(err))
    }

    private getImage(image: any): void {
        this.photo = "data:image/jpeg;base64," + image;
        this.uploadPicture();
    }

    private setError(err: any): void {
        this.loader = false;
        //alert(JSON.stringify(err))
        this.snack.show('something goes wrong :(', 'snack-error');
    }

    private uploadPicture(): void {
        this.loader = true;
        const documentId = this.fireStore.createId();
        const uid = firebase.auth().currentUser.uid;
        const path = `${uid}/${documentId}.jpg`;
        this.fireStorage.ref(path).putString(this.photo, 'data_url')
            .then(success => this.getFilePathUrl(documentId, path, uid))
            .catch(err => this.setError(err))
    }

    private getFilePathUrl(docId: string, path: string, uid: string): void {
        this.fireStorage.ref(path).getDownloadURL()
            .subscribe(
                url => this.executeImageAI(docId, url, uid, path),
                err => this.setError(err)
            )

    }

    private executeImageAI(id: string, url: string, uid: string, path: string): void {
        const payload = {
            docId: id,
            filePath: path,
            user: uid,
            url: url
        };
        this.http.post('call your service here', payload)
            .subscribe(
                res => this.printResult(res),
                err => this.setError(err)
            )
    }

    private printResult(res: any): void {
        this.labels = res.labels;
        if (res.faces.length === 0) {
            this.facesPresent = false;
        } else {
            this.facesPresent = true;
            this.faces = res.faces
        }
        this.loader = false;
    }

    checkFeeling(feelingObj: any): string {
        let stringFeeling = '';
        for (let i in feelingObj) {
            if (feelingObj[i] !== 'VERY_UNLIKELY') {
                stringFeeling += `${this.getTheStateToPrint(i)}, `;
            }
        }
        if (stringFeeling === ''){
            stringFeeling = "Can't predict the feelings well :(";
        }else{
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
