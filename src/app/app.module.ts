import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {CoreModule} from './core';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
