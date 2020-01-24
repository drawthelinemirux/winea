import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRequestLeave, RequestLeave } from 'app/shared/model/request-leave.model';
import { RequestLeaveService } from './request-leave.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';

@Component({
  selector: 'jhi-request-leave-update',
  templateUrl: './request-leave-update.component.html'
})
export class RequestLeaveUpdateComponent implements OnInit {
  isSaving = false;

  employees: IEmployee[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: [],
    employeeid: [],
    acceptedLeave: [],
    employee: []
  });

  constructor(
    protected requestLeaveService: RequestLeaveService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ requestLeave }) => {
      this.updateForm(requestLeave);

      this.employeeService
        .query()
        .pipe(
          map((res: HttpResponse<IEmployee[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEmployee[]) => (this.employees = resBody));
    });
  }

  updateForm(requestLeave: IRequestLeave): void {
    this.editForm.patchValue({
      id: requestLeave.id,
      startDate: requestLeave.startDate != null ? requestLeave.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: requestLeave.endDate != null ? requestLeave.endDate.format(DATE_TIME_FORMAT) : null,
      employeeid: requestLeave.employeeid,
      acceptedLeave: requestLeave.acceptedLeave,
      employee: requestLeave.employee
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const requestLeave = this.createFromForm();
    if (requestLeave.id !== undefined) {
      this.subscribeToSaveResponse(this.requestLeaveService.update(requestLeave));
    } else {
      this.subscribeToSaveResponse(this.requestLeaveService.create(requestLeave));
    }
  }

  private createFromForm(): IRequestLeave {
    return {
      ...new RequestLeave(),
      id: this.editForm.get(['id'])!.value,
      startDate:
        this.editForm.get(['startDate'])!.value != null ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value != null ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      employeeid: this.editForm.get(['employeeid'])!.value,
      acceptedLeave: this.editForm.get(['acceptedLeave'])!.value,
      employee: this.editForm.get(['employee'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRequestLeave>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IEmployee): any {
    return item.id;
  }
}
