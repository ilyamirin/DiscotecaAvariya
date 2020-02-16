import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CoreModule} from './core';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared';
import {getTranslatePaginatorIntl} from './shared/add-data-dialog/translate-intl';
import {MatPaginatorIntl} from '@angular/material';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
    {
      provide: MatPaginatorIntl,
      useValue: getTranslatePaginatorIntl()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
