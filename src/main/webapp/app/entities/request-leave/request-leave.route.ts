import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRequestLeave, RequestLeave } from 'app/shared/model/request-leave.model';
import { RequestLeaveService } from './request-leave.service';
import { RequestLeaveComponent } from './request-leave.component';
import { RequestLeaveDetailComponent } from './request-leave-detail.component';
import { RequestLeaveUpdateComponent } from './request-leave-update.component';

@Injectable({ providedIn: 'root' })
export class RequestLeaveResolve implements Resolve<IRequestLeave> {
  constructor(private service: RequestLeaveService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRequestLeave> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((requestLeave: HttpResponse<RequestLeave>) => {
          if (requestLeave.body) {
            return of(requestLeave.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RequestLeave());
  }
}

export const requestLeaveRoute: Routes = [
  {
    path: '',
    component: RequestLeaveComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wineaApp.requestLeave.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RequestLeaveDetailComponent,
    resolve: {
      requestLeave: RequestLeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wineaApp.requestLeave.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RequestLeaveUpdateComponent,
    resolve: {
      requestLeave: RequestLeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wineaApp.requestLeave.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RequestLeaveUpdateComponent,
    resolve: {
      requestLeave: RequestLeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wineaApp.requestLeave.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
