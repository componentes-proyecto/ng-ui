import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderNavComponent } from './header-nav/header-nav.component';

import { UtilsModule } from './utils/utils.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { AppViewComponent } from './app-view/app-view.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SessionGuard } from './guards/session.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    AddUserComponent,
    LoginComponent,
    AppViewComponent,
  ],
  imports: [
    UtilsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ SessionGuard ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
