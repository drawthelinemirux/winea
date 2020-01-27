import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRequestLeave } from 'app/shared/model/request-leave.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { RequestLeaveService } from './request-leave.service';
import { RequestLeaveDeleteDialogComponent } from './request-leave-delete-dialog.component';

@Component({
  selector: 'jhi-request-leave',
  templateUrl: './request-leave.component.html'
})
export class RequestLeaveComponent implements OnInit, OnDestroy {
  requestLeaves: IRequestLeave[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected requestLeaveService: RequestLeaveService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.requestLeaves = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.requestLeaveService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IRequestLeave[]>) => this.paginateRequestLeaves(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.requestLeaves = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    /* eslint-disable no-console */
    console.log(this.requestLeaves);
    /* eslint-enable no-console */
    this.registerChangeInRequestLeaves();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRequestLeave): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRequestLeaves(): void {
    this.eventSubscriber = this.eventManager.subscribe('requestLeaveListModification', () => this.reset());
  }

  delete(requestLeave: IRequestLeave): void {
    const modalRef = this.modalService.open(RequestLeaveDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.requestLeave = requestLeave;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateRequestLeaves(data: IRequestLeave[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.requestLeaves.push(data[i]);
      }
    }
  }
}
