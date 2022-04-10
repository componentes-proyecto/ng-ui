import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

import { PageDataModel } from '../models/pageDataModel.model';
import { constants } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UIDataService {
  private readonly pageDataObsv: Subject<PageDataModel> = new Subject<PageDataModel>();
  public readonly pageDataState = this.pageDataObsv.asObservable();
 
  constructor(
    private snackbar: MatSnackBar
  ) { }

  updatePageData(pageData: PageDataModel) {
    this.pageDataObsv.next(pageData);
  }

  displaySnackBar(title: string, type: string, action: string) {
      this.snackbar.open(title, action, {
      duration: constants.INTERVAL,
      panelClass: [ type ],
      verticalPosition: constants.SNACKBAR_Y_POS as MatSnackBarVerticalPosition,
      horizontalPosition: constants.SNACKBAR_X_POS as MatSnackBarHorizontalPosition
    })
  }
}
