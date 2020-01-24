import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequestLeave } from 'app/shared/model/request-leave.model';

@Component({
  selector: 'jhi-request-leave-detail',
  templateUrl: './request-leave-detail.component.html'
})
export class RequestLeaveDetailComponent implements OnInit {
  requestLeave: IRequestLeave | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ requestLeave }) => {
      this.requestLeave = requestLeave;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
