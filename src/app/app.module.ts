import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderNavComponent } from './header-nav/header-nav.component';
import { AddUserComponent } from './add-user/add-user.component';

import { UtilsModule } from './utils/utils.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    AddUserComponent,
  ],
  imports: [
    UtilsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
