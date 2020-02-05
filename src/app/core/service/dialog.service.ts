import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ComponentType} from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  open(componentOrTemplateRef: ComponentType<any> | TemplateRef<any>, config?: MatDialogConfig) {
    return this.dialog.open(componentOrTemplateRef, config);
  }

}
