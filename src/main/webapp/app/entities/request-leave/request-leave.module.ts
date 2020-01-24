import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WineaSharedModule } from 'app/shared/shared.module';
import { RequestLeaveComponent } from './request-leave.component';
import { RequestLeaveDetailComponent } from './request-leave-detail.component';
import { RequestLeaveUpdateComponent } from './request-leave-update.component';
import { RequestLeaveDeleteDialogComponent } from './request-leave-delete-dialog.component';
import { requestLeaveRoute } from './request-leave.route';

@NgModule({
  imports: [WineaSharedModule, RouterModule.forChild(requestLeaveRoute)],
  declarations: [RequestLeaveComponent, RequestLeaveDetailComponent, RequestLeaveUpdateComponent, RequestLeaveDeleteDialogComponent],
  entryComponents: [RequestLeaveDeleteDialogComponent]
})
export class WineaRequestLeaveModule {}
