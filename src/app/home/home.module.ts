import {HomeComponent} from './home.component';
import {SharedModule} from '../shared';
import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';


@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule {
}
