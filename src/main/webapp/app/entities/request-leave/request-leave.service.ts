import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRequestLeave } from 'app/shared/model/request-leave.model';

type EntityResponseType = HttpResponse<IRequestLeave>;
type EntityArrayResponseType = HttpResponse<IRequestLeave[]>;

@Injectable({ providedIn: 'root' })
export class RequestLeaveService {
  public resourceUrl = SERVER_API_URL + 'api/request-leaves';

  constructor(protected http: HttpClient) {}

  create(requestLeave: IRequestLeave): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(requestLeave);
    return this.http
      .post<IRequestLeave>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(requestLeave: IRequestLeave): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(requestLeave);
    return this.http
      .put<IRequestLeave>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRequestLeave>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRequestLeave[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(requestLeave: IRequestLeave): IRequestLeave {
    const copy: IRequestLeave = Object.assign({}, requestLeave, {
      startDate: requestLeave.startDate && requestLeave.startDate.isValid() ? requestLeave.startDate.toJSON() : undefined,
      endDate: requestLeave.endDate && requestLeave.endDate.isValid() ? requestLeave.endDate.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((requestLeave: IRequestLeave) => {
        requestLeave.startDate = requestLeave.startDate ? moment(requestLeave.startDate) : undefined;
        requestLeave.endDate = requestLeave.endDate ? moment(requestLeave.endDate) : undefined;
      });
    }
    return res;
  }
}
