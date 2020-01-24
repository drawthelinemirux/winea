import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequestLeave } from 'app/shared/model/request-leave.model';
import { RequestLeaveService } from './request-leave.service';

@Component({
  templateUrl: './request-leave-delete-dialog.component.html'
})
export class RequestLeaveDeleteDialogComponent {
  requestLeave?: IRequestLeave;

  constructor(
    protected requestLeaveService: RequestLeaveService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.requestLeaveService.delete(id).subscribe(() => {
      this.eventManager.broadcast('requestLeaveListModification');
      this.activeModal.close();
    });
  }
}
