import {NgModule} from '@angular/core';
import {SharedModule} from '../shared';
import {DataRoutingModule} from './data-routing.module';
import {DataComponent} from './data.component';


@NgModule({
  imports: [
    SharedModule,
    DataRoutingModule
  ],
  declarations: [
    DataComponent
  ]
})
export class DataModule {
}
