import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IRequestLeave {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  employeeid?: number;
  acceptedLeave?: number;
  employee?: IEmployee;
}

export class RequestLeave implements IRequestLeave {
  constructor(
    public id?: number,
    public startDate?: Moment,
    public endDate?: Moment,
    public employeeid?: number,
    public acceptedLeave?: number,
    public employee?: IEmployee
  ) {}
}
