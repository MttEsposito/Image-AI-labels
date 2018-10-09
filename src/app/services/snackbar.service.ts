import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()

export class AppSnackbar {

    constructor(private snackBar: MatSnackBar) { }

    show(message: string, cssClass: string) {
        this.snackBar.open(message, '', {
            panelClass: cssClass,
            duration: 3000,
        })
    }

}
