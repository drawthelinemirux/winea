import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WineaSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [WineaSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class WineaHomeModule {}
