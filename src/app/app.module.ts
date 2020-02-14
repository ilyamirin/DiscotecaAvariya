import {APP_INITIALIZER, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CoreModule} from './core';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared';
import {getTranslatePaginatorIntl} from './shared/add-data-dialog/translate-intl';
import {MatPaginatorIntl} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getTranslatePaginatorIntl()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
