import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { UIDataService } from '../services/ui-data.service';
import { ApiDataService } from '../services/api-data.service';
import { HttpClientModule } from '@angular/common/http';

const sharedModules = [
  BrowserModule,
  BrowserAnimationsModule,
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatProgressBarModule,
  ReactiveFormsModule,
  MatInputModule,
  MatSnackBarModule,
  HttpClientModule
];

@NgModule({
  declarations: [
  ],
  imports: [ sharedModules ],
  providers: [ UIDataService, ApiDataService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [ sharedModules ]
})
export class UtilsModule { }
